import { hmac } from "npm:@noble/hashes@1.3.1/hmac";
import { sha512 } from "npm:@noble/hashes@1.3.1/sha512";

import { HkdfSha512Native } from "./hkdf.ts";

export class HkdfSha512 extends HkdfSha512Native {
  public override async extract(
    salt: ArrayBuffer,
    ikm: ArrayBuffer,
  ): Promise<ArrayBuffer> {
    this.checkInit();
    if (salt.byteLength === 0) {
      salt = new ArrayBuffer(this.hashSize);
    }
    if (salt.byteLength !== this.hashSize) {
      return hmac(sha512, new Uint8Array(salt), new Uint8Array(ikm));
    }
    const key = await (this._api as SubtleCrypto).importKey(
      "raw",
      salt,
      this.algHash,
      false,
      [
        "sign",
      ],
    );
    return await (this._api as SubtleCrypto).sign("HMAC", key, ikm);
  }
}
