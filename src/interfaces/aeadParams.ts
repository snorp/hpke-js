import type { AeadId } from "../identifiers.ts";

/**
 * The AEAD parameters for building a encryption context.
 */
export interface AeadParams {
  /** The Aead indentifier. */
  aead: AeadId;

  /** A secret used for the secret export interface. */
  exporterSecret: ArrayBuffer;

  /** A secret key. */
  key?: ArrayBuffer;

  /** A base nonce. */
  baseNonce?: Uint8Array;

  /** A sequence number. */
  seq?: number;
}
