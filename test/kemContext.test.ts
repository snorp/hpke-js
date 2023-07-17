import { assertEquals, assertRejects } from "testing/asserts.ts";

import { describe, it } from "testing/bdd.ts";

import { isDeno } from "../src/utils/misc.ts";
import {
  DhkemP256HkdfSha256,
  DhkemP384HkdfSha384,
  DhkemP521HkdfSha512,
  DhkemSecp256K1HkdfSha256,
  DhkemX25519HkdfSha256,
  DhkemX448HkdfSha512,
} from "../src/kems/dhkem.ts";
import { KemId } from "../src/identifiers.ts";
import { loadCrypto, loadSubtleCrypto } from "../src/webCrypto.ts";

import * as errors from "../src/errors.ts";

import { hexStringToBytes } from "./utils.ts";

describe("constructor", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const dhkemP256 = new DhkemP256HkdfSha256();
      await assertRejects(
        () => dhkemP256.generateKeyPair(),
        errors.NotSupportedError,
      );
      dhkemP256.init(api);
      assertEquals(typeof dhkemP256, "object");
      assertEquals(dhkemP256.id, KemId.DhkemP256HkdfSha256);
      assertEquals(dhkemP256.secretSize, 32);
      assertEquals(dhkemP256.encSize, 65);
      assertEquals(dhkemP256.publicKeySize, 65);
      assertEquals(dhkemP256.privateKeySize, 32);

      const dhkemP384 = new DhkemP384HkdfSha384();
      dhkemP384.init(api);
      assertEquals(typeof dhkemP384, "object");
      assertEquals(dhkemP384.id, KemId.DhkemP384HkdfSha384);
      assertEquals(dhkemP384.secretSize, 48);
      assertEquals(dhkemP384.encSize, 97);
      assertEquals(dhkemP384.publicKeySize, 97);
      assertEquals(dhkemP384.privateKeySize, 48);

      const dhkemP521 = new DhkemP521HkdfSha512();
      dhkemP521.init(api);
      assertEquals(typeof dhkemP521, "object");
      assertEquals(dhkemP521.id, KemId.DhkemP521HkdfSha512);
      assertEquals(dhkemP521.secretSize, 64);
      assertEquals(dhkemP521.encSize, 133);
      assertEquals(dhkemP521.publicKeySize, 133);
      assertEquals(dhkemP521.privateKeySize, 64);

      const dhkemSecp256K1 = new DhkemSecp256K1HkdfSha256();
      dhkemSecp256K1.init(api);
      assertEquals(typeof dhkemP256, "object");
      assertEquals(dhkemSecp256K1.id, KemId.DhkemSecp256K1HkdfSha256);
      assertEquals(dhkemSecp256K1.secretSize, 32);
      assertEquals(dhkemSecp256K1.encSize, 65);
      assertEquals(dhkemSecp256K1.publicKeySize, 65);
      assertEquals(dhkemSecp256K1.privateKeySize, 32);

      const dhkemX25519 = new DhkemX25519HkdfSha256();
      dhkemX25519.init(api);
      assertEquals(typeof dhkemX25519, "object");
      assertEquals(dhkemX25519.id, KemId.DhkemX25519HkdfSha256);
      assertEquals(dhkemX25519.secretSize, 32);
      assertEquals(dhkemX25519.encSize, 32);
      assertEquals(dhkemX25519.publicKeySize, 32);
      assertEquals(dhkemX25519.privateKeySize, 32);

      const dhkemX448 = new DhkemX448HkdfSha512();
      dhkemX448.init(api);
      assertEquals(typeof dhkemX448, "object");
      assertEquals(dhkemX448.id, KemId.DhkemX448HkdfSha512);
      assertEquals(dhkemX448.secretSize, 64);
      assertEquals(dhkemX448.encSize, 56);
      assertEquals(dhkemX448.publicKeySize, 56);
      assertEquals(dhkemX448.privateKeySize, 56);
    });
  });
});

describe("generateKeyPair", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance with DhkemP256HkdfSha256", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "P-256");
      assertEquals(kp.publicKey.usages.length, 0);
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "P-256");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemP384HkdfSha384", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP384HkdfSha384();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "P-384");
      assertEquals(kp.publicKey.usages.length, 0);
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "P-384");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemP521HkdfSha512", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP521HkdfSha512();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "P-521");
      assertEquals(kp.publicKey.usages.length, 0);
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "P-521");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemSecp256K1HkdfSha256", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "secp256k1");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "secp256k1");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemX25519HkdfSha256", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "X25519");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "X25519");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemX448HkdfSha512", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "X448");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "X448");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });
  });

  describe("with invalid parameters", () => {
    it("should throw NotSupportedError with DhkemP521HkdfSha512", async () => {
      if (!isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP521HkdfSha512();
      kemContext.init(api);
      await assertRejects(
        () => kemContext.generateKeyPair(),
        errors.NotSupportedError,
      );
    });
  });
});

describe("deriveKeyPair", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance with DhkemP256HkdfSha256", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);
      const kp = await kemContext.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "P-256");
      assertEquals(kp.publicKey.usages.length, 0);
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "P-256");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemP384HkdfSha384", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kemContext = new DhkemP384HkdfSha384();
      kemContext.init(api);
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);
      const kp = await kemContext.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "P-384");
      assertEquals(kp.publicKey.usages.length, 0);
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "P-384");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemP521HkdfSha512", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kemContext = new DhkemP521HkdfSha512();
      kemContext.init(api);
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);
      const kp = await kemContext.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "P-521");
      assertEquals(kp.publicKey.usages.length, 0);
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "P-521");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemSecp256K1HkdfSha256", async () => {
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);
      const kp = await kemContext.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "ECDH");
      // assertEquals(kp.publicKey.algorithm.namedCurve, "secp256k1");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "ECDH");
      // assertEquals(kp.privateKey.algorithm.namedCurve, "secp256k1");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });
    it("should return a proper instance with DhkemX25519HkdfSha256", async () => {
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);
      const kp = await kemContext.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "X25519");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "X25519");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemX448HkdfSha512", async () => {
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();

      // assert
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);
      const kp = await kemContext.deriveKeyPair(ikm.buffer);
      assertEquals(kp.publicKey.type, "public");
      assertEquals(kp.publicKey.extractable, true);
      assertEquals(kp.publicKey.algorithm.name, "X448");
      assertEquals(kp.publicKey.usages.length, 0);
      // assertEquals(kp.publicKey.usages[0], "deriveBits");
      assertEquals(kp.privateKey.type, "private");
      assertEquals(kp.privateKey.extractable, true);
      assertEquals(kp.privateKey.algorithm.name, "X448");
      assertEquals(kp.privateKey.usages.length, 1);
      assertEquals(kp.privateKey.usages[0], "deriveBits");
    });
  });

  describe("with invalid parameters", () => {
    it("should throw NotSupportedError with DhkemP256HkdfSha256", async () => {
      if (!isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();
      const cryptoApi = await loadCrypto();
      const ikm = new Uint8Array(32);
      cryptoApi.getRandomValues(ikm);

      // assert
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);
      await assertRejects(
        () => kemContext.deriveKeyPair(ikm.buffer),
        errors.DeriveKeyPairError,
      );
    });
  });
});

describe("serialize/deserializePublicKey", () => {
  describe("with valid parameters", () => {
    it("should return a proper instance with DhkemP256HkdfSha256", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      const bPubKey = await kemContext.serializePublicKey(kp.publicKey);
      const pubKey = await kemContext.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "ECDH");
      // assertEquals(pubKey.algorithm.namedCurve, "P-256");
      assertEquals(pubKey.usages.length, 0);
    });

    it("should return a proper instance with DhkemP384HkdfSha384", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP384HkdfSha384();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      const bPubKey = await kemContext.serializePublicKey(kp.publicKey);
      const pubKey = await kemContext.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "ECDH");
      // assertEquals(pubKey.algorithm.namedCurve, "P-384");
      assertEquals(pubKey.usages.length, 0);
    });

    it("should return a proper instance with DhkemP521HkdfSha512", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP521HkdfSha512();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      const bPubKey = await kemContext.serializePublicKey(kp.publicKey);
      const pubKey = await kemContext.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "ECDH");
      // assertEquals(pubKey.algorithm.namedCurve, "P-521");
      assertEquals(pubKey.usages.length, 0);
    });

    it("should return a proper instance with DhkemSecp256K1HkdfSha256", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      const bPubKey = await kemContext.serializePublicKey(kp.publicKey);
      const pubKey = await kemContext.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "ECDH");
      // assertEquals(pubKey.algorithm.namedCurve, "secp256k1");
      assertEquals(pubKey.usages.length, 0);
      // assertEquals(pubKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemX25519HkdfSha256", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      const bPubKey = await kemContext.serializePublicKey(kp.publicKey);
      const pubKey = await kemContext.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "X25519");
      assertEquals(pubKey.usages.length, 0);
      // assertEquals(kp.privateKey.usages[0], "deriveBits");
    });

    it("should return a proper instance with DhkemX448HkdfSha512", async () => {
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);
      const kp = await kemContext.generateKeyPair();
      const bPubKey = await kemContext.serializePublicKey(kp.publicKey);
      const pubKey = await kemContext.deserializePublicKey(bPubKey);
      assertEquals(pubKey.type, "public");
      assertEquals(pubKey.extractable, true);
      assertEquals(pubKey.algorithm.name, "X448");
      assertEquals(pubKey.usages.length, 0);
      // assertEquals(kp.privateKey.usages[0], "deriveBits");
    });
  });

  describe("with invalid parameters", () => {
    it("should throw SerializeError on serializePublicKey with a public key for X25519", async () => {
      if (!isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();

      // assert
      const ctx = new DhkemX25519HkdfSha256();
      ctx.init(api);
      const kp = await ctx.generateKeyPair();
      const kemContext = new DhkemP256HkdfSha256();
      await assertRejects(
        () => kemContext.serializePublicKey(kp.publicKey),
        errors.SerializeError,
      );
    });

    it("should throw DeserializeError on deserializePublicKey with DhkemP256HkdfSha256", async () => {
      if (!isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();

      // assert
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);
      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);
      await assertRejects(
        () => kemContext.deserializePublicKey(rawKey.buffer),
        errors.DeserializeError,
      );
    });
  });
});

describe("importKey", () => {
  describe("with valid parameters", () => {
    it("should return a valid private key for DhkemP256HkdfSha256 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: ["deriveBits"],
      };
      const privKey = await kemContext.importKey("jwk", jwk, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemP256HkdfSha256 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        key_ops: [],
      };
      const privKey = await kemContext.importKey("jwk", jwk, true);

      // assert
      assertEquals(privKey.usages.length, 0);
    });

    it("should return a valid private key for DhkemP384HkdfSha384 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP384HkdfSha384();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-384",
        kid: "P-384-01",
        x: "_XyN9woHaS0mPimSW-etwJMEDSzxIMjp4PjezavU8SHJoClz1bQrcmPb1ZJxHxhI",
        y: "GCNfc32p9sRotx7u2oDGJ3Eqz6q5zPHLdizNn83oRsUTN31eCWfGLHWRury3xF50",
        d: "1pImEKbrr771-RKi8Tb7tou_WjiR7kwui_nMu16449rk3lzAqf9buUhTkJ-pogkb",
        key_ops: ["deriveBits"],
      };
      const privKey = await kemContext.importKey("jwk", jwk, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemP384HkdfSha384 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP384HkdfSha384();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-384",
        kid: "P-384-01",
        x: "_XyN9woHaS0mPimSW-etwJMEDSzxIMjp4PjezavU8SHJoClz1bQrcmPb1ZJxHxhI",
        y: "GCNfc32p9sRotx7u2oDGJ3Eqz6q5zPHLdizNn83oRsUTN31eCWfGLHWRury3xF50",
        key_ops: [],
      };
      const privKey = await kemContext.importKey("jwk", jwk, true);

      // assert
      assertEquals(privKey.usages.length, 0);
    });

    it("should return a valid private key for DhkemP521HkdfSha512 from JWK", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP521HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-521",
        kid: "P-521-01",
        x: "APkZitSJMJUMB-iPCt47sWu_CrnUHg6IAR4qjmHON-2u41Rjg6DNOS0LZYJJt-AVH5NgGVi8ElIfjo71b9HXCTOc",
        y: "ASx-Cb--149HJ-e1KlSaY-1BOhwOdcTkxSt8BGbW7_hnGfzHsoXM3ywwNcp1Yad-FHUKwmCyMelMQEn2Rh4V2l3I",
        d: "ADYyo73ZKicOjwGDYQ_ybZKnVzdAcxGm9OVAxQjzgVM4jaS-Iwtkz90oLdDz3shgKlDgtRK2Aa9lMhqR94hBo4IE",
        key_ops: ["deriveBits"],
      };
      const privKey = await kemContext.importKey("jwk", jwk, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemP521HkdfSha512 from JWK", async () => {
      if (isDeno()) {
        return;
      }
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP521HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-521",
        kid: "P-521-01",
        x: "APkZitSJMJUMB-iPCt47sWu_CrnUHg6IAR4qjmHON-2u41Rjg6DNOS0LZYJJt-AVH5NgGVi8ElIfjo71b9HXCTOc",
        y: "ASx-Cb--149HJ-e1KlSaY-1BOhwOdcTkxSt8BGbW7_hnGfzHsoXM3ywwNcp1Yad-FHUKwmCyMelMQEn2Rh4V2l3I",
        key_ops: [],
      };
      const privKey = await kemContext.importKey("jwk", jwk, true);

      // assert
      assertEquals(privKey.usages.length, 0);
    });

    it("should return a valid private key for DhkemX25519HkdfSha256 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: ["deriveBits"],
      };
      const privKey = await kemContext.importKey("jwk", jwk, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemX25519HkdfSha256 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        key_ops: [],
      };
      const privKey = await kemContext.importKey("jwk", jwk, true);

      // assert
      assertEquals(privKey.usages.length, 0);
    });

    it("should return a valid private key for DhkemX448HkdfSha512 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: ["deriveBits"],
      };
      const privKey = await kemContext.importKey("jwk", jwk, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemX448HkdfSha512 from JWK", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        key_ops: [],
      };
      const privKey = await kemContext.importKey("jwk", jwk, true);

      // assert
      assertEquals(privKey.usages.length, 0);
    });

    it("should return a valid private key for DhkemSecp256K1HkdfSha256 from raw key", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);
      const privKey = await kemContext.importKey("raw", rawKey, false);

      // assert
      assertEquals(privKey.usages.length, 1);
      assertEquals(privKey.usages[0], "deriveBits");
    });

    it("should return a valid public key for DhkemSecp256K1HkdfSha256 from raw key", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(33);
      rawKey[0] = hexStringToBytes("04")[0];
      cryptoApi.getRandomValues(rawKey);
      const privKey = await kemContext.importKey("raw", rawKey, true);

      // assert
      assertEquals(privKey.usages.length, 0);
      // assertEquals(privKey.usages[0], "deriveBits");
    });
  });

  describe("with invalid parameters", () => {
    it("should throw DeserializeError with private raw key(EC/P-256) with 'jwk'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", rawKey.buffer, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with private JWK(EC/P-256) with 'raw'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("raw", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(EC/P-256) without 'kty'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        // kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(EC/P-256) without 'crv'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        // crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(EC/P-256) without 'd'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        // d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid public JWK(EC/P-256) without 'x'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        // x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        // d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: [],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, true),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid public JWK(EC/P-256) with 'd'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemP256HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "EC",
        crv: "P-256",
        kid: "P-256-01",
        x: "-eZXC6nV-xgthy8zZMCN8pcYSeE2XfWWqckA2fsxHPc",
        y: "BGU5soLgsu_y7GN2I3EPUXS9EZ7Sw0qif-V70JtInFI",
        d: "kwibx3gas6Kz1V2fyQHKSnr-ybflddSjN0eOnbmLmyo",
        key_ops: [],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, true),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with private raw key(OKP/X25519) with 'jwk'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", rawKey.buffer, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with private JWK(OKP/X25519) with 'raw'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("raw", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(OKP/X25519) without 'kty'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        // kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(OKP/X25519) without 'crv'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        // crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(OKP/X25519) without 'd'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        // d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid public JWK(OKP/X25519) without 'x'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        // x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        // d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: [],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, true),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid public JWK(OKP/X25519) with 'd'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX25519HkdfSha256();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X25519",
        kid: "X25519-01",
        x: "y3wJq3uXPHeoCO4FubvTc7VcBuqpvUrSvU6ZMbHDTCI",
        d: "vsJ1oX5NNi0IGdwGldiac75r-Utmq3Jq4LGv48Q_Qc4",
        key_ops: [],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, true),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with private raw key(OKP/448) with 'jwk'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(56);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", rawKey.buffer, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with private JWK(OKP/448) with 'raw'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("raw", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(OKP/X448) without 'kty'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        // kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(OKP/X448) without 'crv'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        // crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid private JWK(OKP/X448) without 'd'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        // d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: ["deriveBits"],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid public JWK(OKP/X448) without 'x'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        // x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        // d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: [],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, true),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid public JWK(X448) with 'd'", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemX448HkdfSha512();
      kemContext.init(api);

      const jwk = {
        kty: "OKP",
        crv: "X448",
        kid: "X448-01",
        x: "IkLmc0klvEMXYneHMKAB6ePohryAwAPVe2pRSffIDY6NrjeYNWVX5J-fG4NV2OoU77C88A0mvxI",
        d: "rJJRG3nshyCtd9CgXld8aNaB9YXKR0UOi7zj7hApg9YH4XdBO0G8NcAFNz_uPH2GnCZVcSDgV5c",
        key_ops: [],
      };

      // assert
      await assertRejects(
        () => kemContext.importKey("jwk", jwk, true),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid DhkemSecp256K1HkdfSha256 private key", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(33);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kemContext.importKey("raw", rawKey, false),
        errors.DeserializeError,
      );
    });

    it("should throw DeserializeError with invalid DhkemSecp256K1HkdfSha256 public key", async () => {
      const api = await loadSubtleCrypto();
      const kemContext = new DhkemSecp256K1HkdfSha256();
      kemContext.init(api);

      const cryptoApi = await loadCrypto();
      const rawKey = new Uint8Array(32);
      cryptoApi.getRandomValues(rawKey);

      // assert
      await assertRejects(
        () => kemContext.importKey("raw", rawKey, true),
        errors.DeserializeError,
      );
    });
  });
});
