import { assertEquals, assertRejects } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import { AeadId, CipherSuite, KdfId, KemId } from "../../../mod.ts";
// } from "https://deno.land/x/hpke/mod.ts";

import { DhkemX448HkdfSha512 } from "../mod.ts";
import { loadCrypto, loadSubtleCrypto } from "./utils.ts";

describe("DhkemX448HkdfSha512", () => {
  describe("with valid parameters", () => {
    it("should have a correct KEM object", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);
      assertEquals(typeof kem, "object");
      assertEquals(kem.id, KemId.DhkemX448HkdfSha512);
      assertEquals(kem.secretSize, 64);
      assertEquals(kem.encSize, 56);
      assertEquals(kem.publicKeySize, 56);
      assertEquals(kem.privateKeySize, 56);
    });
  });
});

describe("generateKeyPair", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);
      const kp = await kem.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "X448");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "X448");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "X448");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "X448");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });
  });
});

describe("deriveKeyPair", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance", async () => {
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);
      const ikm = new Uint8Array(56);
      cryptoApi.getRandomValues(ikm);
      const kp = await kem.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "X448");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "X448");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "X448");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "X448");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });
  });
});

describe("serialize/deserializePublicKey", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance with DhkemX448HkdfSha512", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);
      const kp = await kem.generateKeyPair();
      const bPubKey = await kem.serializePublicKey(kp.publicKey);
      const pubKey = await kem.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "X448");
      // assertEquals(pubKey.algorithm.namedCurve, "X448");
      assertEquals(pubKey.usages.length, 0);
      // assertEquals(pubKey.usages[0], "deriveBits");
    });
  });
});

describe("importKey", () => {
  describe("with valid parameters", () => {
    it("should return a valid private key for DhkemX448HkdfSha512 from raw key", async () => {
      const api = await loadSubtleCrypto();
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(56);
      cryptoApi.getRandomValues(rawKey);
      const privKey = await kem.importKey("raw", rawKey, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemX448HkdfSha512 from raw key", async () => {
      const api = await loadSubtleCrypto();
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(56);
      cryptoApi.getRandomValues(rawKey);
      const privKey = await kem.importKey("raw", rawKey, true);

      // assert
      assertEquals(privKey.usages.length, 0);
      // assertEquals(privKey.usages[0], "deriveBits");
    });
  });

  describe("with invalid parameters", () => {
    it("should throw DeserializeError with invalid DhkemX448HkdfSha512 private key", async () => {
      const api = await loadSubtleCrypto();
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kem.importKey("raw", rawKey, false),
        Error,
      );
    });

    it("should throw DeserializeError with invalid DhkemX448HkdfSha512 public key", async () => {
      const api = await loadSubtleCrypto();
      const kem = new DhkemX448HkdfSha512();
      kem.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kem.importKey("raw", rawKey, true),
        Error,
      );
    });
  });
});

describe("CipherSuite", () => {
  describe("constructor with DhkemX448HkdfSha512", () => {
    it("should have a correct ciphersuite", () => {
      const suite: CipherSuite = new CipherSuite({
        kem: new DhkemX448HkdfSha512(),
        kdf: KdfId.HkdfSha512,
        aead: AeadId.ExportOnly,
      });
      assertEquals(suite.kem.secretSize, 64);
      assertEquals(suite.kem.encSize, 56);
      assertEquals(suite.kem.publicKeySize, 56);
      assertEquals(suite.kem.privateKeySize, 56);

      // assert
      assertEquals(suite.kem.id, KemId.DhkemX448HkdfSha512);
      assertEquals(suite.kem.id, 0x0021);
      assertEquals(suite.kdf.id, KdfId.HkdfSha512);
      assertEquals(suite.kdf.id, 0x0003);
      assertEquals(suite.aead.id, AeadId.ExportOnly);
      assertEquals(suite.aead.id, 0xFFFF);
    });
  });

  describe("A README example of DhkemX448HkdfSha512", () => {
    it("should work normally", async () => {
      // setup
      const kem = new DhkemX448HkdfSha512();
      const suite = new CipherSuite({
        kem: kem,
        kdf: KdfId.HkdfSha512,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
      });
      assertEquals(sender.enc.byteLength, kem.encSize);
      assertEquals(sender.enc.byteLength, kem.publicKeySize);

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });
  });
});
