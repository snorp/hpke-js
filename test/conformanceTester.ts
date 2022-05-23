import type { XCryptoKey } from '../src/kemPrimitives/x25519';
import type { PreSharedKey } from '../src/interfaces/preSharedKey';
import type { TestVector } from './testVector';

import { CipherSuite } from '../src/cipherSuite';
import { Kem, Kdf, Aead } from '../src/identifiers';
import { WebCrypto } from '../src/webCrypto';
import { loadSubtleCrypto } from '../src/webCrypto';

import * as errors from '../src/errors';

import { hexStringToBytes, kemToKeyGenAlgorithm } from './utils';

export class ConformanceTester extends WebCrypto {

  private _count = 0;

  public count(): number {
    return this._count;
  }

  public async test(v: TestVector) {

    const suite = new CipherSuite({ kem: v.kem_id, kdf: v.kdf_id, aead: v.aead_id });

    // importKey
    const pkEm = hexStringToBytes(v.pkEm);
    const skEm = hexStringToBytes(v.skEm);
    const pkRm = hexStringToBytes(v.pkRm);
    const skRm = hexStringToBytes(v.skRm);
    let skp: CryptoKeyPair | undefined = undefined;
    let pks: CryptoKey | undefined = undefined;
    if (v.skSm !== undefined && v.pkSm !== undefined) {
      const skSm = hexStringToBytes(v.skSm);
      const pkSm = hexStringToBytes(v.pkSm);
      skp = {
        privateKey: await suite.importKey('raw', skSm, false),
        publicKey: await suite.importKey('raw', pkSm, true),
      };
      pks = skp.publicKey;
    }
    const rkp = {
      privateKey: await suite.importKey('raw', skRm, false),
      publicKey: await suite.importKey('raw', pkRm, true),
    };
    const ekp = {
      privateKey: await suite.importKey('raw', skEm, false),
      publicKey: await suite.importKey('raw', pkEm), // true can be omitted
    };

    // deriveKeyPair
    const ikmE = hexStringToBytes(v.ikmE);
    const ikmR = hexStringToBytes(v.ikmR);
    const derivedR = await suite.deriveKeyPair(ikmR.buffer);
    const derivedPkRm = await this.cryptoKeyToBytes(derivedR.publicKey, kemToKeyGenAlgorithm(v.kem_id));
    expect(derivedPkRm).toEqual(pkRm);
    const derivedE = await suite.deriveKeyPair(ikmE.buffer);
    const derivedPkEm = await this.cryptoKeyToBytes(derivedE.publicKey, kemToKeyGenAlgorithm(v.kem_id));
    expect(derivedPkEm).toEqual(pkEm);

    // create EncryptionContext
    const info = hexStringToBytes(v.info);
    let psk: PreSharedKey | undefined = undefined;
    if (v.psk !== undefined && v.psk_id !== undefined) {
      psk = { id: new ArrayBuffer(0), key: new ArrayBuffer(0) };
      psk.key = hexStringToBytes(v.psk);
      psk.id = hexStringToBytes(v.psk_id);
    }
    const enc = hexStringToBytes(v.enc);

    const sender = await suite.createSenderContext({
      info: info,
      psk: psk,
      recipientPublicKey: rkp.publicKey,
      senderKey: skp,
      nonEphemeralKeyPair: ekp, // FOR DEBUGGING/TESTING PURPOSES ONLY.
    });
    expect(new Uint8Array(sender.enc)).toEqual(enc);

    const recipient = await suite.createRecipientContext({
      info: info,
      psk: psk,
      recipientKey: rkp,
      enc: sender.enc,
      senderPublicKey: pks,
    });

    // seal and open
    if (v.aead_id !== 0xFFFF) {
      for (const ve of v.encryptions) {
        const pt = hexStringToBytes(ve.pt);
        const aad = hexStringToBytes(ve.aad);
        const ct = hexStringToBytes(ve.ct);

        const sealed = await sender.seal(pt, aad);
        const opened = await recipient.open(sealed, aad);
        expect(new Uint8Array(sealed)).toEqual(ct);
        expect(new Uint8Array(opened)).toEqual(pt);
      }
    }

    // export
    for (const ve of v.exports) {
      const ec = ve.exporter_context.length === 0 ? new ArrayBuffer(0) : hexStringToBytes(ve.exporter_context);
      const ev = hexStringToBytes(ve.exported_value);

      let exported = await sender.export(ec, ve.L);
      expect(new Uint8Array(exported)).toEqual(ev);
      exported = await recipient.export(ec, ve.L);
      expect(new Uint8Array(exported)).toEqual(ev);
    }
    this._count++;
  }

  public async testValidEcPublicKey(crv: string, pk: string) {

    let kemId: Kem;
    let nPk: number;
    switch (crv) {
      case 'P-256':
        kemId = Kem.DhkemP256HkdfSha256;
        nPk = 65;
        break;
      case 'P-384':
        kemId = Kem.DhkemP384HkdfSha384;
        nPk = 97;
        break;
      case 'P-521':
        kemId = Kem.DhkemP521HkdfSha512;
        nPk = 133;
        break;
      default:
        throw new Error('Invalid crv');
    }

    const suite = new CipherSuite({ kem: kemId, kdf: Kdf.HkdfSha256, aead: Aead.Aes128Gcm });
    const rkp = await suite.generateKeyPair();

    const pkb = hexStringToBytes(pk);
    const alg = kemToKeyGenAlgorithm(kemId);

    const cpk = await this._api.importKey('raw', pkb, alg, true, ['deriveKey', 'deriveBits']);
    const sender = await suite.createSenderContext({
      recipientPublicKey: cpk,
    });
    await expect(sender.open(new Uint8Array([1, 2, 3, 4]))).rejects.toThrow(errors.OpenError);

    if (pkb.length < nPk) {
      // Compressed public key not supported.
      return;
    }
    const recipient = await suite.createRecipientContext({
      recipientKey: rkp,
      enc: pkb,
    });

    // assert
    await expect(recipient.seal(new Uint8Array([1, 2, 3, 4]))).rejects.toThrow(errors.SealError);
    this._count++;
  }

  public async testInvalidEcPublicKey(crv: string, pk: string) {

    let kemId: Kem;
    switch (crv) {
      case 'P-256':
        kemId = Kem.DhkemP256HkdfSha256;
        break;
      case 'P-384':
        kemId = Kem.DhkemP384HkdfSha384;
        break;
      case 'P-521':
        kemId = Kem.DhkemP521HkdfSha512;
        break;
      default:
        throw new Error('Invalid crv');
    }

    const suite = new CipherSuite({ kem: kemId, kdf: Kdf.HkdfSha256, aead: Aead.Aes128Gcm });
    const rkp = await suite.generateKeyPair();

    const pkb = hexStringToBytes(pk);
    const alg = kemToKeyGenAlgorithm(kemId);

    // assert
    await expect(suite.importKey('raw', pkb)).rejects.toThrow(errors.DeserializeError);
    await expect(suite.importKey('raw', pkb)).rejects.toThrow('Invalid key for the ciphersuite');
    await expect(suite.createRecipientContext({
      recipientKey: rkp,
      enc: pkb,
    })).rejects.toThrow(errors.DeserializeError);
    await expect(suite.createRecipientContext({
      recipientKey: rkp,
      enc: pkb,
    })).rejects.toThrow('Invalid public key for the ciphersuite');
    this._count++;
  }

  public async testValidX25519PublicKey(pk: string) {

    const suite = new CipherSuite({ kem: Kem.DhkemX25519HkdfSha256, kdf: Kdf.HkdfSha256, aead: Aead.Aes128Gcm });
    const rkp = await suite.generateKeyPair();

    const pkb = hexStringToBytes(pk);

    const recipient = await suite.createRecipientContext({
      recipientKey: rkp,
      enc: pkb,
    });

    // assert
    await expect(recipient.seal(new Uint8Array([1, 2, 3, 4]))).rejects.toThrow(errors.SealError);
    this._count++;
  }

  public async testInvalidX25519PublicKey(pk: string) {

    const suite = new CipherSuite({ kem: Kem.DhkemX25519HkdfSha256, kdf: Kdf.HkdfSha256, aead: Aead.Aes128Gcm });
    const rkp = await suite.generateKeyPair();

    const pkb = hexStringToBytes(pk);

    // assert
    await expect(suite.createRecipientContext({
      recipientKey: rkp,
      enc: pkb,
    })).rejects.toThrow(errors.DecapError);
    this._count++;
  }

  private async cryptoKeyToBytes(ck: CryptoKey, alg: KeyAlgorithm): Promise<Uint8Array> {
    if (alg.name === 'ECDH') {
      return new Uint8Array(await this._api.exportKey('raw', ck));
    }
    // X25519
    return (ck as XCryptoKey).key;
  }
}

export async function createConformanceTester(): Promise<ConformanceTester> {
  const api = await loadSubtleCrypto();
  return new ConformanceTester(api);
}
