import { EMPTY } from "./consts.ts";
import { EncryptionContext } from "./encryptionContext.ts";

import * as errors from "./errors.ts";

export class RecipientContext extends EncryptionContext {
  public async open(
    data: ArrayBuffer,
    aad: ArrayBuffer = EMPTY,
  ): Promise<ArrayBuffer> {
    let pt: ArrayBuffer;
    try {
      pt = await this._ctx.key.open(this.computeNonce(this._ctx), data, aad);
    } catch (e: unknown) {
      throw new errors.OpenError(e);
    }
    this.incrementSeq(this._ctx);
    return pt;
  }
}
