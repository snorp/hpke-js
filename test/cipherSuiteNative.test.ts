import { assertEquals, assertRejects, assertThrows } from "testing/asserts.ts";
import { describe, it } from "testing/bdd.ts";

import {
  AeadId,
  Aes128Gcm,
  // CipherSuite,
  DeserializeError,
  // DhkemP256HkdfSha256,
  // DhkemP384HkdfSha384,
  // DhkemP521HkdfSha512,
  // HkdfSha256,
  // HkdfSha384,
  // HkdfSha512,
  InvalidParamError,
  KdfId,
  KemId,
  NotSupportedError,
} from "../mod.ts";
import { CipherSuiteNative } from "../src/cipherSuiteNative.ts";
import {
  HkdfSha256Native,
  HkdfSha384Native,
  HkdfSha512Native,
} from "../src/kdfs/hkdf.ts";
import {
  DhkemP256HkdfSha256Native,
  DhkemP384HkdfSha384Native,
  DhkemP521HkdfSha512Native,
} from "../src/kems/dhkemNative.ts";
import { concat, isDeno } from "../src/utils/misc.ts";
import { loadCrypto } from "../src/webCrypto.ts";
import { hexStringToBytes } from "../test/utils.ts";

describe("CipherSuiteNative", () => {
  // RFC9180 A.1.
  describe("constructor with DhkemX25519HkdfSha256/HkdfSha256/Aes128Gcm", () => {
    it("should have a correct ciphersuite", () => {
      // assert
      assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // // assert
      // assertEquals(suite.kem.id, KemId.DhkemX25519HkdfSha256);
      // assertEquals(suite.kem.id, 0x0020);
      // assertEquals(suite.kem.secretSize, 32);
      // assertEquals(suite.kem.encSize, 32);
      // assertEquals(suite.kem.publicKeySize, 32);
      // assertEquals(suite.kem.privateKeySize, 32);
      // assertEquals(suite.aead.keySize, 16);
      // assertEquals(suite.aead.nonceSize, 12);
      // assertEquals(suite.aead.tagSize, 16);
      // assertEquals(suite.kdf.id, KdfId.HkdfSha256);
      // assertEquals(suite.kdf.id, 0x0001);
      // assertEquals(suite.aead.id, AeadId.Aes128Gcm);
      // assertEquals(suite.aead.id, 0x0001);
    });
  });

  // RFC9180 A.2.
  describe("constructor with DhkemX25519HkdfSha256/HkdfSha256/ChaCha20Poly1305", () => {
    it("should have a correct ciphersuite", () => {
      // assert
      assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Chacha20Poly1305,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Chacha20Poly1305,
      // });

      // // assert
      // assertEquals(suite.kem.id, KemId.DhkemX25519HkdfSha256);
      // assertEquals(suite.kem.id, 0x0020);
      // assertEquals(suite.kdf.id, KdfId.HkdfSha256);
      // assertEquals(suite.kdf.id, 0x0001);
      // assertEquals(suite.aead.id, AeadId.Chacha20Poly1305);
      // assertEquals(suite.aead.id, 0x0003);
    });
  });

  // RFC9180 A.3.
  describe("constructor with DhkemP256HkdfSha256/HkdfSha256/Aes128Gcm", () => {
    it("should have ciphersuites", () => {
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      // assert
      assertEquals(suite.kem.id, KemId.DhkemP256HkdfSha256);
      assertEquals(suite.kem.id, 0x0010);
      assertEquals(suite.kdf.id, KdfId.HkdfSha256);
      assertEquals(suite.kdf.id, 0x0001);
      assertEquals(suite.aead.id, AeadId.Aes128Gcm);
      assertEquals(suite.aead.id, 0x0001);
    });
  });

  // RFC9180 A.4.
  describe("constructor with DhkemP256HkdfSha256/HkdfSha512/Aes128Gcm", () => {
    it("should have ciphersuites", () => {
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha512,
        aead: AeadId.Aes128Gcm,
      });

      // assert
      assertEquals(suite.kem.id, KemId.DhkemP256HkdfSha256);
      assertEquals(suite.kem.id, 0x0010);
      assertEquals(suite.kdf.id, KdfId.HkdfSha512);
      assertEquals(suite.kdf.id, 0x0003);
      assertEquals(suite.aead.id, AeadId.Aes128Gcm);
      assertEquals(suite.aead.id, 0x0001);
    });
  });

  // RFC9180 A.5.
  describe("constructor with DhkemP256HkdfSha256/HkdfSha256/ChaCha20Poly1305", () => {
    it("should have ciphersuites", () => {
      // assert
      assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemP256HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Chacha20Poly1305,
          }),
        InvalidParamError,
        "The AEAD (3) cannot be specified by AeadId. Use submodule for the AEAD",
      );

      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemP256HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Chacha20Poly1305,
      // });

      // // assert
      // assertEquals(suite.kem.id, KemId.DhkemP256HkdfSha256);
      // assertEquals(suite.kem.id, 0x0010);
      // assertEquals(suite.kdf.id, KdfId.HkdfSha256);
      // assertEquals(suite.kdf.id, 0x0001);
      // assertEquals(suite.aead.id, AeadId.Chacha20Poly1305);
      // assertEquals(suite.aead.id, 0x0003);
    });
  });

  // RFC9180 A.6.
  describe("constructor with DhkemP521HkdfSha512/HkdfSha512/Aes256Gcm", () => {
    it("should have ciphersuites", () => {
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP521HkdfSha512,
        kdf: KdfId.HkdfSha512,
        aead: AeadId.Aes256Gcm,
      });

      // assert
      assertEquals(suite.kem.id, KemId.DhkemP521HkdfSha512);
      assertEquals(suite.kem.id, 0x0012);
      assertEquals(suite.kdf.id, KdfId.HkdfSha512);
      assertEquals(suite.kdf.id, 0x0003);
      assertEquals(suite.aead.id, AeadId.Aes256Gcm);
      assertEquals(suite.aead.id, 0x0002);
    });
  });

  // RFC9180 A.7.
  describe("constructor with DhkemP256HkdfSha256/HkdfSha256/ExportOnly", () => {
    it("should have ciphersuites", () => {
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.ExportOnly,
      });

      // assert
      assertEquals(suite.kem.id, KemId.DhkemP256HkdfSha256);
      assertEquals(suite.kem.id, 0x0010);
      assertEquals(suite.kdf.id, KdfId.HkdfSha256);
      assertEquals(suite.kdf.id, 0x0001);
      assertEquals(suite.aead.id, AeadId.ExportOnly);
      assertEquals(suite.aead.id, 0xFFFF);
    });
  });

  describe("constructor with DhkemSecp256KHkdfSha256/HkdfSha256/ExportOnly", () => {
    it("should throw InvalidParamError", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemSecp256k1HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.ExportOnly,
          }),
        InvalidParamError,
        "The KEM (19) cannot be specified by KemId. Use submodule for the KEM",
      );
    });
  });

  describe("A README example of Base mode", () => {
    it("should work normally with ids", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
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

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      await assertRejects(() => recipient.seal(pt), NotSupportedError);
      await assertRejects(() => sender.open(ct), NotSupportedError);
    });

    it("should work normally with instances", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: new DhkemP256HkdfSha256Native(),
        kdf: new HkdfSha256Native(),
        aead: new Aes128Gcm(),
      });

      const rkp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
      });

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      await assertRejects(() => recipient.seal(pt), NotSupportedError);
      await assertRejects(() => sender.open(ct), NotSupportedError);
    });

    it("should work normally with importKey('jwk')", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const jwkPkR = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        key_ops: [],
      };
      const pkR = await suite.importKey("jwk", jwkPkR, true);

      const sender = await suite.createSenderContext({
        recipientPublicKey: pkR,
      });

      const jwkSkR = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: ["deriveBits"],
      };
      const skR = await suite.importKey("jwk", jwkSkR, false);
      const recipient = await suite.createRecipientContext({
        recipientKey: skR,
        enc: sender.enc,
      });

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      await assertRejects(() => recipient.seal(pt), NotSupportedError);
      await assertRejects(() => sender.open(ct), NotSupportedError);
    });
  });

  describe("A README example of Base mode (KemId.DhkemP384HkdfSha384/KdfId.HkdfSha384)", () => {
    it("should work normally with ids", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP384HkdfSha384,
        kdf: KdfId.HkdfSha384,
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

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally with instances", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: new DhkemP384HkdfSha384Native(),
        kdf: new HkdfSha384Native(),
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

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally with importKey('jwk')", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP384HkdfSha384,
        kdf: KdfId.HkdfSha384,
        aead: AeadId.Aes128Gcm,
      });

      const jwkPkR = {
        kty: "EC",
        crv: "P-384",
        kid: "P-384-01",
        x: "_XyN9woHaS0mPimSW-etwJMEDSzxIMjp4PjezavU8SHJoClz1bQrcmPb1ZJxHxhI",
        y: "GCNfc32p9sRotx7u2oDGJ3Eqz6q5zPHLdizNn83oRsUTN31eCWfGLHWRury3xF50",
        key_ops: [],
      };
      const pkR = await suite.importKey("jwk", jwkPkR, true);

      const sender = await suite.createSenderContext({
        recipientPublicKey: pkR,
      });

      const jwkSkR = {
        kty: "EC",
        crv: "P-384",
        kid: "P-384-01",
        x: "_XyN9woHaS0mPimSW-etwJMEDSzxIMjp4PjezavU8SHJoClz1bQrcmPb1ZJxHxhI",
        y: "GCNfc32p9sRotx7u2oDGJ3Eqz6q5zPHLdizNn83oRsUTN31eCWfGLHWRury3xF50",
        d: "1pImEKbrr771-RKi8Tb7tou_WjiR7kwui_nMu16449rk3lzAqf9buUhTkJ-pogkb",
        key_ops: ["deriveBits"],
      };
      const skR = await suite.importKey("jwk", jwkSkR, false);
      const recipient = await suite.createRecipientContext({
        recipientKey: skR,
        enc: sender.enc,
      });

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      await assertRejects(() => recipient.seal(pt), NotSupportedError);
      await assertRejects(() => sender.open(ct), NotSupportedError);
    });
  });

  describe("A README example of Base mode (KemId.DhkemP521HkdfSha512/KdfId.HkdfSha512)", () => {
    it("should work normally with ids", async () => {
      if (isDeno()) {
        return;
      }

      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP521HkdfSha512,
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

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally with instances", async () => {
      if (isDeno()) {
        return;
      }

      // setup
      const suite = new CipherSuiteNative({
        kem: new DhkemP521HkdfSha512Native(),
        kdf: new HkdfSha512Native(),
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

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally with importKey('jwk')", async () => {
      if (isDeno()) {
        return;
      }

      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP521HkdfSha512,
        kdf: KdfId.HkdfSha512,
        aead: AeadId.Aes128Gcm,
      });

      const jwkPkR = {
        kty: "EC",
        crv: "P-521",
        kid: "P-521-01",
        x: "APkZitSJMJUMB-iPCt47sWu_CrnUHg6IAR4qjmHON-2u41Rjg6DNOS0LZYJJt-AVH5NgGVi8ElIfjo71b9HXCTOc",
        y: "ASx-Cb--149HJ-e1KlSaY-1BOhwOdcTkxSt8BGbW7_hnGfzHsoXM3ywwNcp1Yad-FHUKwmCyMelMQEn2Rh4V2l3I",
        key_ops: [],
      };
      const pkR = await suite.importKey("jwk", jwkPkR, true);

      const sender = await suite.createSenderContext({
        recipientPublicKey: pkR,
      });

      const jwkSkR = {
        kty: "EC",
        crv: "P-521",
        kid: "P-521-01",
        x: "APkZitSJMJUMB-iPCt47sWu_CrnUHg6IAR4qjmHON-2u41Rjg6DNOS0LZYJJt-AVH5NgGVi8ElIfjo71b9HXCTOc",
        y: "ASx-Cb--149HJ-e1KlSaY-1BOhwOdcTkxSt8BGbW7_hnGfzHsoXM3ywwNcp1Yad-FHUKwmCyMelMQEn2Rh4V2l3I",
        d: "ADYyo73ZKicOjwGDYQ_ybZKnVzdAcxGm9OVAxQjzgVM4jaS-Iwtkz90oLdDz3shgKlDgtRK2Aa9lMhqR94hBo4IE",
        key_ops: ["deriveBits"],
      };
      const skR = await suite.importKey("jwk", jwkSkR, false);
      const recipient = await suite.createRecipientContext({
        recipientKey: skR,
        enc: sender.enc,
      });

      // encrypt
      const ct = await sender.seal(
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      await assertRejects(() => recipient.seal(pt), NotSupportedError);
      await assertRejects(() => sender.open(ct), NotSupportedError);
    });
  });

  describe("A README example of Base mode (KemId.DhkemX25519HkdfSha256/KdfId.HkdfSha256)", () => {
    it("should work normally with ids", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const rkp = await suite.generateKeyPair();

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: rkp.publicKey,
      // });

      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp,
      //   enc: sender.enc,
      // });

      // // encrypt
      // const ct = await sender.seal(
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await recipient.open(ct);

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally with importKey('jwk')", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const jwkPkR = {
      //   kty: "OKP",
      //   crv: "X25519",
      //   kid: "X25519-01",
      //   x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
      //   key_ops: [],
      // };
      // const pkR = await suite.importKey("jwk", jwkPkR, true);

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: pkR,
      // });

      // const jwkSkR = {
      //   kty: "OKP",
      //   crv: "X25519",
      //   kid: "X25519-01",
      //   x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
      //   d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
      //   key_ops: ["deriveBits"],
      // };
      // const skR = await suite.importKey("jwk", jwkSkR, false);
      // const recipient = await suite.createRecipientContext({
      //   recipientKey: skR,
      //   enc: sender.enc,
      // });

      // // encrypt
      // const ct = await sender.seal(
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await recipient.open(ct);

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      // await assertRejects(() => recipient.seal(pt), NotSupportedError);
      // await assertRejects(() => sender.open(ct), NotSupportedError);
    });
  });

  describe("A README example of Base mode (KemId.DhkemX448HkdfSha256/KdfId.HkdfSha512)", () => {
    it("should work normally with ids", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX448HkdfSha512,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (33) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX448HkdfSha512,
      //   kdf: KdfId.HkdfSha512,
      //   aead: AeadId.Aes256Gcm,
      // });

      // const rkp = await suite.generateKeyPair();

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: rkp.publicKey,
      // });

      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp,
      //   enc: sender.enc,
      // });

      // // encrypt
      // const ct = await sender.seal(
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await recipient.open(ct);

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally with importKey('jwk')", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX448HkdfSha512,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (33) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX448HkdfSha512,
      //   kdf: KdfId.HkdfSha512,
      //   aead: AeadId.Aes256Gcm,
      // });

      // const jwkPkR = {
      //   kty: "OKP",
      //   crv: "X448",
      //   kid: "X448-01",
      //   x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
      //   key_ops: [],
      // };
      // const pkR = await suite.importKey("jwk", jwkPkR, true);

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: pkR,
      // });

      // const jwkSkR = {
      //   kty: "OKP",
      //   crv: "X448",
      //   kid: "X448-01",
      //   x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
      //   d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
      //   key_ops: ["deriveBits"],
      // };
      // const skR = await suite.importKey("jwk", jwkSkR, false);
      // const recipient = await suite.createRecipientContext({
      //   recipientKey: skR,
      //   enc: sender.enc,
      // });

      // // encrypt
      // const ct = await sender.seal(
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await recipient.open(ct);

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
      // await assertRejects(() => recipient.seal(pt), NotSupportedError);
      // await assertRejects(() => sender.open(ct), NotSupportedError);
    });
  });

  describe("A README example of Base mode (ExportOnly)", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.ExportOnly,
      });

      const rkp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
      });

      const te = new TextEncoder();

      // export
      const pskS = sender.export(te.encode("jugemujugemu"), 32);
      const pskR = recipient.export(te.encode("jugemujugemu"), 32);
      assertEquals(pskR, pskS);

      // other functions are disabled.
      await assertRejects(
        () => sender.seal(te.encode("my-secret-message")),
        NotSupportedError,
      );
      await assertRejects(
        () => sender.open(te.encode("xxxxxxxxxxxxxxxxx")),
        NotSupportedError,
      );
    });
  });

  describe("A README example of Base mode (ExportOnly/X25519)", () => {
    it("should work normally", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.ExportOnly,
      // });

      // const rkp = await suite.generateKeyPair();

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: rkp.publicKey,
      // });

      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp,
      //   enc: sender.enc,
      // });

      // const te = new TextEncoder();

      // // export
      // const pskS = sender.export(te.encode("jugemujugemu"), 32);
      // const pskR = recipient.export(te.encode("jugemujugemu"), 32);
      // assertEquals(pskR, pskS);

      // // other functions are disabled.
      // await assertRejects(
      //   () => sender.seal(te.encode("my-secret-message")),
      //   NotSupportedError,
      // );
      // await assertRejects(
      //   () => sender.open(te.encode("xxxxxxxxxxxxxxxxx")),
      //   NotSupportedError,
      // );
    });
  });

  describe("A README example of PSK mode", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
        psk: {
          id: new TextEncoder().encode("our-pre-shared-key-id"),
          key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
        },
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
        psk: {
          id: new TextEncoder().encode("our-pre-shared-key-id"),
          key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
        },
      });

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

  describe("A README example of Auth mode", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();
      const skp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
        senderKey: skp,
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
        senderPublicKey: skp.publicKey,
      });

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

  describe("A README example of AuthPSK mode", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();
      const skp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
        senderKey: skp,
        psk: {
          id: new TextEncoder().encode("our-pre-shared-key-id"),
          key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
        },
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
        senderPublicKey: skp.publicKey,
        psk: {
          id: new TextEncoder().encode("our-pre-shared-key-id"),
          key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
        },
      });

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

  describe("A README example of AuthPSK mode (X25519)", () => {
    it("should work normally", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const rkp = await suite.generateKeyPair();
      // const skp = await suite.generateKeyPair();

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: rkp.publicKey,
      //   senderKey: skp,
      //   psk: {
      //     id: new TextEncoder().encode("our-pre-shared-key-id"),
      //     key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
      //   },
      // });

      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp,
      //   enc: sender.enc,
      //   senderPublicKey: skp.publicKey,
      //   psk: {
      //     id: new TextEncoder().encode("our-pre-shared-key-id"),
      //     key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
      //   },
      // });

      // // encrypt
      // const ct = await sender.seal(
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await recipient.open(ct);

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });
  });

  describe("A README example of AuthPSK mode (X448)", () => {
    it("should work normally", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX448HkdfSha512,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (33) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX448HkdfSha512,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const rkp = await suite.generateKeyPair();
      // const skp = await suite.generateKeyPair();

      // const sender = await suite.createSenderContext({
      //   recipientPublicKey: rkp.publicKey,
      //   senderKey: skp,
      //   psk: {
      //     id: new TextEncoder().encode("our-pre-shared-key-id"),
      //     key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
      //   },
      // });

      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp,
      //   enc: sender.enc,
      //   senderPublicKey: skp.publicKey,
      //   psk: {
      //     id: new TextEncoder().encode("our-pre-shared-key-id"),
      //     key: new TextEncoder().encode("jugemujugemugokounosurikirekaija"),
      //   },
      // });

      // // encrypt
      // const ct = await sender.seal(
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await recipient.open(ct);

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });
  });

  describe("createRecipientContext with a private key as recipientKey", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp.privateKey,
        enc: sender.enc,
      });

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

  describe("createSenderContext with a privatekey as senderKey", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();
      const skp = await suite.generateKeyPair();

      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
        senderKey: skp.privateKey,
      });

      const recipient = await suite.createRecipientContext({
        recipientKey: rkp,
        enc: sender.enc,
        senderPublicKey: skp.publicKey,
      });

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

  describe("seal and open (single-shot apis)", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      // encrypt
      const { ct, enc } = await suite.seal(
        {
          recipientPublicKey: rkp.publicKey,
        },
        new TextEncoder().encode("my-secret-message"),
      );

      // decrypt
      const pt = await suite.open(
        {
          recipientKey: rkp,
          enc: enc,
        },
        ct,
      );

      // assert
      assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });

    it("should work normally (X25519)", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const rkp = await suite.generateKeyPair();

      // // encrypt
      // const { ct, enc } = await suite.seal(
      //   {
      //     recipientPublicKey: rkp.publicKey,
      //   },
      //   new TextEncoder().encode("my-secret-message"),
      // );

      // // decrypt
      // const pt = await suite.open(
      //   {
      //     recipientKey: rkp,
      //     enc: enc,
      //   },
      //   ct,
      // );

      // // assert
      // assertEquals(new TextDecoder().decode(pt), "my-secret-message");
    });
  });

  describe("seal empty byte string", () => {
    it("should work normally", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
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

      // encrypt
      const ct = await sender.seal(new TextEncoder().encode(""));

      // decrypt
      const pt = await recipient.open(ct);

      // assert
      assertEquals(new TextDecoder().decode(pt), "");
    });
  });

  describe("deriveKeyPair with too long ikm", () => {
    it("should throw InvalidParamError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      await assertRejects(
        () => suite.deriveKeyPair((new Uint8Array(129)).buffer),
        InvalidParamError,
        "Too long ikm",
      );
    });
  });

  describe("createSenderContext with too long info", () => {
    it("should throw InvalidParamError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      await assertRejects(
        () =>
          suite.createSenderContext({
            info: (new Uint8Array(129)).buffer,
            recipientPublicKey: rkp.publicKey,
          }),
        InvalidParamError,
        "Too long info",
      );
    });
  });

  describe("createSenderContext with too long psk.key", () => {
    it("should throw InvalidParamError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      await assertRejects(
        () =>
          suite.createSenderContext({
            psk: {
              key: (new Uint8Array(129)).buffer,
              id: new Uint8Array([1, 2, 3, 4]),
            },
            recipientPublicKey: rkp.publicKey,
          }),
        InvalidParamError,
        "Too long psk.key",
      );
    });
  });

  describe("createSenderContext with short psk.key", () => {
    it("should throw InvalidParamError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      await assertRejects(
        () =>
          suite.createSenderContext({
            psk: {
              key: (new Uint8Array(31)).buffer,
              id: new Uint8Array([1, 2, 3, 4]),
            },
            recipientPublicKey: rkp.publicKey,
          }),
        InvalidParamError,
        "PSK must have at least 32 bytes",
      );
    });
  });

  describe("createSenderContext with too long psk.id", () => {
    it("should throw InvalidParamError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const rkp = await suite.generateKeyPair();

      await assertRejects(
        () =>
          suite.createSenderContext({
            psk: {
              key: new Uint8Array(32),
              id: (new Uint8Array(129)).buffer,
            },
            recipientPublicKey: rkp.publicKey,
          }),
        InvalidParamError,
        "Too long psk.id",
      );
    });
  });

  describe("importKey with invalid EC(P-256) public key", () => {
    it("should throw DeserializeError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const kStr = "aabbccddeeff";
      const k = hexStringToBytes(kStr);

      // assert
      await assertRejects(
        () => suite.importKey("raw", k),
        DeserializeError,
      );
    });
  });

  describe("importKey with invalid EC(P-256) private key", () => {
    it("should throw DeserializeError", async () => {
      // setup
      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });

      const kStr = "aabbccddeeff";
      const k = hexStringToBytes(kStr);

      // assert
      await assertRejects(
        () => suite.importKey("raw", k, false),
        DeserializeError,
      );
    });
  });

  describe("importKey with invalid x25519 public key", () => {
    it("should throw DeserializeError", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const kStr = "aabbccddeeff";
      // const k = hexStringToBytes(kStr);

      // // assert
      // await assertRejects(
      //   () => suite.importKey("raw", k),
      //   DeserializeError,
      // );
    });
  });

  describe("importKey with invalid x25519 private key", () => {
    it("should throw DeserializeError", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX25519HkdfSha256,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (32) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX25519HkdfSha256,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const kStr = "aabbccddeeff";
      // const k = hexStringToBytes(kStr);

      // // assert
      // await assertRejects(
      //   () => suite.importKey("raw", k, false),
      //   DeserializeError,
      // );
    });
  });

  describe("importKey with invalid x448 public key", () => {
    it("should throw DeserializeError", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX448HkdfSha512,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (33) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX448HkdfSha512,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const kStr = "aabbccddeeff";
      // const k = hexStringToBytes(kStr);

      // // assert
      // await assertRejects(
      //   () => suite.importKey("raw", k),
      //   DeserializeError,
      // );
    });
  });

  describe("importKey with invalid x448 private key", () => {
    it("should throw DeserializeError", async () => {
      // assert
      await assertThrows(
        () =>
          new CipherSuiteNative({
            kem: KemId.DhkemX448HkdfSha512,
            kdf: KdfId.HkdfSha256,
            aead: AeadId.Aes128Gcm,
          }),
        InvalidParamError,
        "The KEM (33) cannot be specified by KemId. Use submodule for the KEM",
      );

      // // setup
      // const suite = new CipherSuiteNative({
      //   kem: KemId.DhkemX448HkdfSha512,
      //   kdf: KdfId.HkdfSha256,
      //   aead: AeadId.Aes128Gcm,
      // });

      // const kStr = "aabbccddeeff";
      // const k = hexStringToBytes(kStr);

      // // assert
      // await assertRejects(
      //   () => suite.importKey("raw", k, false),
      //   DeserializeError,
      // );
    });
  });

  describe("A README example of Oblivious HTTP (HKDF-SHA256)", () => {
    it("throw InvalidParamError bacause of the invalid hashSize", async () => {
      const te = new TextEncoder();
      const cryptoApi = await loadCrypto();

      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP256HkdfSha256,
        kdf: KdfId.HkdfSha256,
        aead: AeadId.Aes128Gcm,
      });
      const rkp = await suite.generateKeyPair();

      // The sender (OHTTP client) side:
      const _response = te.encode("This is the response.");
      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const secretS = await sender.export(
        te.encode("message/bhttp response"),
        suite.aead.keySize,
      );

      const responseNonce = new Uint8Array(suite.aead.keySize);
      cryptoApi.getRandomValues(responseNonce);
      const saltS = concat(new Uint8Array(sender.enc), responseNonce);

      const kdfS = suite.kdf;
      await assertRejects(
        () => kdfS.extract(saltS, new Uint8Array(secretS)),
        InvalidParamError,
      );
      // const prkS = await kdfS.extract(saltS, new Uint8Array(secretS));
      // const keyS = await kdfS.expand(
      //   prkS,
      //   te.encode("key"),
      //   suite.aead.keySize,
      // );
      // const nonceS = await kdfS.expand(
      //   prkS,
      //   te.encode("nonce"),
      //   suite.aead.nonceSize,
      // );

      // const aeadKeyS = await suite.aead.createEncryptionContext(keyS);
      // const ct = await aeadKeyS.seal(nonceS, response, te.encode(""));
      // const encResponse = concat(responseNonce, new Uint8Array(ct));

      // // The recipient (OHTTP server) side:
      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp.privateKey,
      //   enc: sender.enc,
      // });

      // const secretR = await recipient.export(
      //   te.encode("message/bhttp response"),
      //   suite.aead.keySize,
      // );

      // const saltR = concat(
      //   new Uint8Array(sender.enc),
      //   encResponse.slice(0, suite.aead.keySize),
      // );
      // const kdfR = suite.kdf;
      // const prkR = await kdfR.extract(
      //   saltR,
      //   new Uint8Array(secretR),
      // );
      // const keyR = await kdfR.expand(
      //   prkR,
      //   te.encode("key"),
      //   suite.aead.keySize,
      // );
      // const nonceR = await kdfR.expand(
      //   prkR,
      //   te.encode("nonce"),
      //   suite.aead.nonceSize,
      // );
      // const aeadKeyR = await suite.aead.createEncryptionContext(keyR);
      // const pt = await aeadKeyR.open(
      //   nonceR,
      //   encResponse.slice(suite.aead.keySize),
      //   te.encode(""),
      // );

      // // pt === "This is the response."
      // assertEquals(response, new Uint8Array(pt));
    });
  });

  describe("A README example of Oblivious HTTP (HKDF-SHA384)", () => {
    it("throw InvalidParamError bacause of the invalid hashSize", async () => {
      const te = new TextEncoder();
      const cryptoApi = await loadCrypto();

      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP384HkdfSha384,
        kdf: KdfId.HkdfSha384,
        aead: AeadId.Aes256Gcm,
      });
      const rkp = await suite.generateKeyPair();

      // The sender (OHTTP client) side:
      const _response = te.encode("This is the response.");
      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const secretS = await sender.export(
        te.encode("message/bhttp response"),
        suite.aead.keySize,
      );

      const responseNonce = new Uint8Array(suite.aead.keySize);
      cryptoApi.getRandomValues(responseNonce);
      const saltS = concat(new Uint8Array(sender.enc), responseNonce);

      const kdfS = suite.kdf;
      await assertRejects(
        () => kdfS.extract(saltS, new Uint8Array(secretS)),
        InvalidParamError,
      );
      // const prkS = await kdfS.extract(saltS, new Uint8Array(secretS));
      // const keyS = await kdfS.expand(
      //   prkS,
      //   te.encode("key"),
      //   suite.aead.keySize,
      // );
      // const nonceS = await kdfS.expand(
      //   prkS,
      //   te.encode("nonce"),
      //   suite.aead.nonceSize,
      // );

      // const aeadKeyS = await suite.aead.createEncryptionContext(keyS);
      // const ct = await aeadKeyS.seal(nonceS, response, te.encode(""));
      // const encResponse = concat(responseNonce, new Uint8Array(ct));

      // // The recipient (OHTTP server) side:
      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp.privateKey,
      //   enc: sender.enc,
      // });

      // const secretR = await recipient.export(
      //   te.encode("message/bhttp response"),
      //   suite.aead.keySize,
      // );

      // const saltR = concat(
      //   new Uint8Array(sender.enc),
      //   encResponse.slice(0, suite.aead.keySize),
      // );
      // const kdfR = suite.kdf;
      // const prkR = await kdfR.extract(
      //   saltR,
      //   new Uint8Array(secretR),
      // );
      // const keyR = await kdfR.expand(
      //   prkR,
      //   te.encode("key"),
      //   suite.aead.keySize,
      // );
      // const nonceR = await kdfR.expand(
      //   prkR,
      //   te.encode("nonce"),
      //   suite.aead.nonceSize,
      // );
      // const aeadKeyR = await suite.aead.createEncryptionContext(keyR);
      // const pt = await aeadKeyR.open(
      //   nonceR,
      //   encResponse.slice(suite.aead.keySize),
      //   te.encode(""),
      // );

      // // pt === "This is the response."
      // assertEquals(response, new Uint8Array(pt));
    });
  });

  describe("A README example of Oblivious HTTP (HKDF-SHA512)", () => {
    it("throw InvalidParamError bacause of the invalid hashSize", async () => {
      if (isDeno()) {
        return;
      }
      const te = new TextEncoder();
      const cryptoApi = await loadCrypto();

      const suite = new CipherSuiteNative({
        kem: KemId.DhkemP521HkdfSha512,
        kdf: KdfId.HkdfSha512,
        aead: AeadId.Aes256Gcm,
      });
      const rkp = await suite.generateKeyPair();

      // The sender (OHTTP client) side:
      const _response = te.encode("This is the response.");
      const sender = await suite.createSenderContext({
        recipientPublicKey: rkp.publicKey,
      });

      const secretS = await sender.export(
        te.encode("message/bhttp response"),
        suite.aead.keySize,
      );

      const responseNonce = new Uint8Array(suite.aead.keySize);
      cryptoApi.getRandomValues(responseNonce);
      const saltS = concat(new Uint8Array(sender.enc), responseNonce);

      const kdfS = suite.kdf;
      await assertRejects(
        () => kdfS.extract(saltS, new Uint8Array(secretS)),
        InvalidParamError,
      );
      // const prkS = await kdfS.extract(saltS, new Uint8Array(secretS));
      // const keyS = await kdfS.expand(
      //   prkS,
      //   te.encode("key"),
      //   suite.aead.keySize,
      // );
      // const nonceS = await kdfS.expand(
      //   prkS,
      //   te.encode("nonce"),
      //   suite.aead.nonceSize,
      // );

      // const aeadKeyS = await suite.aead.createEncryptionContext(keyS);
      // const ct = await aeadKeyS.seal(nonceS, response, te.encode(""));
      // const encResponse = concat(responseNonce, new Uint8Array(ct));

      // // The recipient (OHTTP server) side:
      // const recipient = await suite.createRecipientContext({
      //   recipientKey: rkp.privateKey,
      //   enc: sender.enc,
      // });

      // const secretR = await recipient.export(
      //   te.encode("message/bhttp response"),
      //   suite.aead.keySize,
      // );

      // const saltR = concat(
      //   new Uint8Array(sender.enc),
      //   encResponse.slice(0, suite.aead.keySize),
      // );
      // const kdfR = suite.kdf;
      // const prkR = await kdfR.extract(
      //   saltR,
      //   new Uint8Array(secretR),
      // );
      // const keyR = await kdfR.expand(
      //   prkR,
      //   te.encode("key"),
      //   suite.aead.keySize,
      // );
      // const nonceR = await kdfR.expand(
      //   prkR,
      //   te.encode("nonce"),
      //   suite.aead.nonceSize,
      // );
      // const aeadKeyR = await suite.aead.createEncryptionContext(keyR);
      // const pt = await aeadKeyR.open(
      //   nonceR,
      //   encResponse.slice(suite.aead.keySize),
      //   te.encode(""),
      // );

      // // pt === "This is the response."
      // assertEquals(response, new Uint8Array(pt));
    });
  });
});
