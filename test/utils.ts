import { KemId } from "../src/identifiers.ts";
import { isDeno } from "../src/utils/misc.ts";

export function testVectorPath(): string {
  if (isDeno()) {
    return "./test/vectors";
  }
  return "../../test/vectors";
}

export function hexStringToBytes(v: string): Uint8Array {
  if (v.length === 0) {
    return new Uint8Array([]);
  }
  const res = v.match(/[\da-f]{2}/gi);
  if (res == null) {
    throw new Error("Not hex string.");
  }
  return new Uint8Array(res.map(function (h) {
    return parseInt(h, 16);
  }));
}

export function bytesToBase64Url(v: Uint8Array): string {
  return btoa(String.fromCharCode(...v))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=*$/g, "");
}

export function kemToKeyGenAlgorithm(kem: KemId): KeyAlgorithm {
  switch (kem) {
    case KemId.DhkemP256HkdfSha256:
      return {
        name: "ECDH",
        namedCurve: "P-256",
      } as KeyAlgorithm;
    case KemId.DhkemP384HkdfSha384:
      return {
        name: "ECDH",
        namedCurve: "P-384",
      } as KeyAlgorithm;
    case KemId.DhkemP521HkdfSha512:
      return {
        name: "ECDH",
        namedCurve: "P-521",
      } as KeyAlgorithm;
    default:
      // case KemId.DhkemX25519HkdfSha256
      return {
        name: "X25519",
      };
  }
}
