import { AesGcmKey } from "./aeadKeys/aesGcmKey.js";
import { Chacha20Poly1305Key } from "./aeadKeys/chacha20Poly1305Key.js";
import { ExporterContext } from "./exporterContext.js";
import { Aead } from "./identifiers.js";
import { i2Osp, xor } from "./utils/misc.js";
import * as consts from "./consts.js";
import * as errors from "./errors.js";
export class EncryptionContext extends ExporterContext {
    constructor(api, kdf, params) {
        super(api, kdf, params.exporterSecret);
        // AEAD id.
        Object.defineProperty(this, "_aead", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The length in bytes of a key for the algorithm.
        Object.defineProperty(this, "_nK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The length in bytes of a nonce for the algorithm.
        Object.defineProperty(this, "_nN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The length in bytes of an authentication tag for the algorithm.
        Object.defineProperty(this, "_nT", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Forward (sender to recipient) encryption key information.
        Object.defineProperty(this, "_f", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Reverse (recipient to sender) encryption key information.
        Object.defineProperty(this, "_r", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (params.key === undefined || params.baseNonce === undefined ||
            params.seq === undefined) {
            throw new Error("Required parameters are missing");
        }
        this._aead = params.aead;
        switch (this._aead) {
            case Aead.Aes128Gcm:
                this._nK = 16;
                this._nN = 12;
                this._nT = 16;
                break;
            case Aead.Aes256Gcm:
                this._nK = 32;
                this._nN = 12;
                this._nT = 16;
                break;
            case Aead.Chacha20Poly1305:
                this._nK = 32;
                this._nN = 12;
                this._nT = 16;
                break;
            default:
                // case Aead.ExportOnly:
                this._nK = 0;
                this._nN = 0;
                this._nT = 0;
                break;
        }
        const key = createAeadKey(this._aead, params.key, this._api);
        this._f = {
            key: key,
            baseNonce: params.baseNonce,
            seq: params.seq,
        };
        this._r = {
            key: key,
            baseNonce: consts.EMPTY,
            seq: 0,
        };
    }
    computeNonce(k) {
        const seqBytes = i2Osp(k.seq, k.baseNonce.byteLength);
        return xor(k.baseNonce, seqBytes);
    }
    incrementSeq(k) {
        // if (this.seq >= (1 << (8 * this.baseNonce.byteLength)) - 1) {
        if (k.seq > Number.MAX_SAFE_INTEGER) {
            throw new errors.MessageLimitReachedError("Message limit reached");
        }
        k.seq += 1;
        return;
    }
    async setupBidirectional(keySeed, nonceSeed) {
        try {
            this._r.baseNonce = new Uint8Array(await this.export(nonceSeed, this._nN));
            const key = await this.export(keySeed, this._nK);
            this._r.key = createAeadKey(this._aead, key, this._api);
            this._r.seq = 0;
        }
        catch (e) {
            this._r.baseNonce = consts.EMPTY;
            throw e;
        }
    }
}
export function createAeadKey(aead, key, api) {
    switch (aead) {
        case Aead.Aes128Gcm:
            return new AesGcmKey(key, api);
        case Aead.Aes256Gcm:
            return new AesGcmKey(key, api);
        case Aead.Chacha20Poly1305:
            return new Chacha20Poly1305Key(key);
        default:
            throw new Error("Invalid or unsupported AEAD id");
    }
}
