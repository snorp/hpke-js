var A=["deriveBits"],pe=["encrypt","decrypt"];var c=new Uint8Array(0),oe=new Uint8Array([72,80,75,69,45,118,49]),be=new Uint8Array([72,80,75,69,0,0,0,0,0,0]),_e=new Uint8Array([75,69,77,0,0]),we=new Uint8Array([100,107,112,95,112,114,107]),xe=new Uint8Array([101,97,101,95,112,114,107]),me=new Uint8Array([105,110,102,111,95,104,97,115,104]),ge=new Uint8Array([112,115,107,95,105,100,95,104,97,115,104]),ke=new Uint8Array([115,101,99,114,101,116]),Pe=new Uint8Array([115,104,97,114,101,100,95,115,101,99,114,101,116]),Ee=new Uint8Array([107,101,121]),Se=new Uint8Array([98,97,115,101,95,110,111,110,99,101]),Ae=new Uint8Array([101,120,112]),ve=new Uint8Array([115,101,99]),Ke=new Uint8Array([99,97,110,100,105,100,97,116,101]),Qe=new Uint8Array([115,107]),Ie=new Uint8Array([255,255,255,255,0,0,0,0,255,255,255,255,255,255,255,255,188,230,250,173,167,23,158,132,243,185,202,194,252,99,37,81]),Le=new Uint8Array([255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,199,99,77,129,244,55,45,223,88,26,13,178,72,176,167,122,236,236,25,106,204,197,41,115]),Ue=new Uint8Array([1,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,250,81,134,135,131,191,47,150,107,127,204,1,72,247,9,165,208,59,181,201,184,137,156,71,174,187,111,183,30,145,56,100,9]);var G=class{constructor(){Object.defineProperty(this,"_api",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}checkInit(){if(typeof this._api>"u")throw new Error("Not initialized. Call init()")}},y=class extends G{constructor(){super()}init(e){this._api=e}},Y=class extends G{constructor(){super(),Object.defineProperty(this,"_suiteId",{enumerable:!0,configurable:!0,writable:!0,value:c})}init(e,t){this._api=e,this._suiteId=t}};var m={Base:0,Psk:1,Auth:2,AuthPsk:3},Ye={DhkemP256HkdfSha256:16,DhkemP384HkdfSha384:17,DhkemP521HkdfSha512:18,DhkemSecp256k1HkdfSha256:19,DhkemX25519HkdfSha256:32,DhkemX448HkdfSha512:33},h=Ye,Fe={HkdfSha256:1,HkdfSha384:2,HkdfSha512:3},g=Fe,qe={Aes128Gcm:1,Aes256Gcm:2,Chacha20Poly1305:3,ExportOnly:65535},p=qe;var F=class{constructor(e,t){Object.defineProperty(this,"_rawKey",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_key",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_api",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._api=e,this._rawKey=t}async seal(e,t,r){this._key===void 0&&(this._key=await this.importKey(this._rawKey),new Uint8Array(this._rawKey).fill(0));let n={name:"AES-GCM",iv:e,additionalData:r};return await this._api.encrypt(n,this._key,t)}async open(e,t,r){this._key===void 0&&(this._key=await this.importKey(this._rawKey),new Uint8Array(this._rawKey).fill(0));let n={name:"AES-GCM",iv:e,additionalData:r};return await this._api.decrypt(n,this._key,t)}async importKey(e){return await this._api.importKey("raw",e,{name:"AES-GCM"},!0,pe)}},z=class extends y{constructor(){super(...arguments),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:p.Aes128Gcm}),Object.defineProperty(this,"keySize",{enumerable:!0,configurable:!0,writable:!0,value:16}),Object.defineProperty(this,"nonceSize",{enumerable:!0,configurable:!0,writable:!0,value:12}),Object.defineProperty(this,"tagSize",{enumerable:!0,configurable:!0,writable:!0,value:16})}createEncryptionContext(e){return this.checkInit(),new F(this._api,e)}},N=class extends y{constructor(){super(...arguments),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:p.Aes256Gcm}),Object.defineProperty(this,"keySize",{enumerable:!0,configurable:!0,writable:!0,value:32}),Object.defineProperty(this,"nonceSize",{enumerable:!0,configurable:!0,writable:!0,value:12}),Object.defineProperty(this,"tagSize",{enumerable:!0,configurable:!0,writable:!0,value:16})}createEncryptionContext(e){return this.checkInit(),new F(this._api,e)}};var l=class extends Error{constructor(e){let t;e instanceof Error?t=e.message:typeof e=="string"?t=e:t="",super(t),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.message===""?this.message=this.name:this.message=this.name+": "+this.message}},f=class extends l{},He=class extends l{},q=class extends l{},K=class extends l{},W=class extends l{},X=class extends l{},$=class extends l{},J=class extends l{},V=class extends l{},Z=class extends l{},Q=class extends l{},w=class extends l{};var I=class{constructor(e,t,r){Object.defineProperty(this,"_api",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"exporterSecret",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_kdf",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._api=e,this._kdf=t,this.exporterSecret=r}async seal(e,t){return await this._emitError()}async open(e,t){return await this._emitError()}async export(e,t){if(e.byteLength>128)throw new f("Too long exporter context");try{return await this._kdf.labeledExpand(this.exporterSecret,ve,new Uint8Array(e),t)}catch(r){throw new $(r)}}_emitError(){return new Promise((e,t)=>{t(new w("Not available"))})}},ee=class extends I{},te=class extends I{constructor(e,t,r,n){super(e,t,r),Object.defineProperty(this,"enc",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.enc=n}};var re=class extends y{constructor(){super(...arguments),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:p.ExportOnly}),Object.defineProperty(this,"keySize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"nonceSize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"tagSize",{enumerable:!0,configurable:!0,writable:!0,value:0})}createEncryptionContext(e){throw new w("createEncryptionContext() is not supported on ExportOnly")}};var C=class extends Y{constructor(){super(),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:g.HkdfSha256}),Object.defineProperty(this,"hashSize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"algHash",{enumerable:!0,configurable:!0,writable:!0,value:{name:"HMAC",hash:"SHA-256",length:256}})}buildLabeledIkm(e,t){let r=new Uint8Array(7+this._suiteId.byteLength+e.byteLength+t.byteLength);return r.set(oe,0),r.set(this._suiteId,7),r.set(e,7+this._suiteId.byteLength),r.set(t,7+this._suiteId.byteLength+e.byteLength),r}buildLabeledInfo(e,t,r){let n=new Uint8Array(9+this._suiteId.byteLength+e.byteLength+t.byteLength);return n.set(new Uint8Array([0,r]),0),n.set(oe,2),n.set(this._suiteId,9),n.set(e,9+this._suiteId.byteLength),n.set(t,9+this._suiteId.byteLength+e.byteLength),n}async extract(e,t){if(this.checkInit(),e.byteLength===0&&(e=new ArrayBuffer(this.hashSize)),e.byteLength!==this.hashSize)throw new f("The salt length must be the same as the hashSize");let r=await this._api.importKey("raw",e,this.algHash,!1,["sign"]);return await this._api.sign("HMAC",r,t)}async expand(e,t,r){this.checkInit();let n=await this._api.importKey("raw",e,this.algHash,!1,["sign"]),s=new ArrayBuffer(r),o=new Uint8Array(s),a=c,u=new Uint8Array(t),b=new Uint8Array(1);if(r>255*this.hashSize)throw new Error("Entropy limit reached");let _=new Uint8Array(this.hashSize+u.length+1);for(let B=1,d=0;d<o.length;B++)b[0]=B,_.set(a,0),_.set(u,a.length),_.set(b,a.length+u.length),a=new Uint8Array(await this._api.sign("HMAC",n,_.slice(0,a.length+u.length+1))),o.length-d>=a.length?(o.set(a,d),d+=a.length):(o.set(a.slice(0,o.length-d),d),d+=o.length-d);return s}async extractAndExpand(e,t,r,n){this.checkInit();let s=await this._api.importKey("raw",t,"HKDF",!1,A);return await this._api.deriveBits({name:"HKDF",hash:this.algHash.hash,salt:e,info:r},s,n*8)}async labeledExtract(e,t,r){return await this.extract(e,this.buildLabeledIkm(t,r))}async labeledExpand(e,t,r,n){return await this.expand(e,this.buildLabeledInfo(t,r,n),n)}},P=class extends C{constructor(){super(...arguments),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:g.HkdfSha256}),Object.defineProperty(this,"hashSize",{enumerable:!0,configurable:!0,writable:!0,value:32}),Object.defineProperty(this,"algHash",{enumerable:!0,configurable:!0,writable:!0,value:{name:"HMAC",hash:"SHA-256",length:256}})}},E=class extends C{constructor(){super(...arguments),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:g.HkdfSha384}),Object.defineProperty(this,"hashSize",{enumerable:!0,configurable:!0,writable:!0,value:48}),Object.defineProperty(this,"algHash",{enumerable:!0,configurable:!0,writable:!0,value:{name:"HMAC",hash:"SHA-384",length:384}})}},S=class extends C{constructor(){super(...arguments),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:g.HkdfSha512}),Object.defineProperty(this,"hashSize",{enumerable:!0,configurable:!0,writable:!0,value:64}),Object.defineProperty(this,"algHash",{enumerable:!0,configurable:!0,writable:!0,value:{name:"HMAC",hash:"SHA-512",length:512}})}};var We={},Oe=Xe(globalThis,We);function Xe(i,e){return new Proxy(i,{get(t,r,n){return r in e?e[r]:i[r]},set(t,r,n){return r in e&&delete e[r],i[r]=n,!0},deleteProperty(t,r){let n=!1;return r in e&&(delete e[r],n=!0),r in i&&(delete i[r],n=!0),n},ownKeys(t){let r=Reflect.ownKeys(i),n=Reflect.ownKeys(e),s=new Set(n);return[...r.filter(o=>!s.has(o)),...n]},defineProperty(t,r,n){return r in e&&delete e[r],Reflect.defineProperty(i,r,n),!0},getOwnPropertyDescriptor(t,r){return r in e?Reflect.getOwnPropertyDescriptor(e,r):Reflect.getOwnPropertyDescriptor(i,r)},has(t,r){return r in e||r in i}})}var De=()=>typeof Oe<"u",Te=()=>typeof caches<"u";var M=i=>typeof i=="object"&&i!==null&&typeof i.privateKey=="object"&&typeof i.publicKey=="object";function x(i,e){if(e<=0)throw new Error("i2Osp: too small size");if(i>=256**e)throw new Error("i2Osp: too large integer");let t=new Uint8Array(e);for(let r=0;r<e&&i;r++)t[e-(r+1)]=i%256,i=i>>8;return t}function je(i,e){if(i.byteLength!==e.byteLength)throw new Error("xor: different length inputs");let t=new Uint8Array(i.byteLength);for(let r=0;r<i.byteLength;r++)t[r]=i[r]^e[r];return t}function R(i,e){let t=new Uint8Array(i.length+e.length);return t.set(i,0),t.set(e,i.length),t}function ze(i,e,t){let r=new Uint8Array(i.length+e.length+t.length);return r.set(i,0),r.set(e,i.length),r.set(t,i.length+e.length),r}var U=class extends I{constructor(e,t,r){if(super(e,t,r.exporterSecret),Object.defineProperty(this,"_aead",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_nK",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_nN",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_nT",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_ctx",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),r.key===void 0||r.baseNonce===void 0||r.seq===void 0)throw new Error("Required parameters are missing");this._aead=r.aead,this._nK=this._aead.keySize,this._nN=this._aead.nonceSize,this._nT=this._aead.tagSize;let n=this._aead.createEncryptionContext(r.key);this._ctx={key:n,baseNonce:r.baseNonce,seq:r.seq}}computeNonce(e){let t=x(e.seq,e.baseNonce.byteLength);return je(e.baseNonce,t)}incrementSeq(e){if(e.seq>Number.MAX_SAFE_INTEGER)throw new Z("Message limit reached");e.seq+=1}};var ie=class extends U{async open(e,t=c){let r;try{r=await this._ctx.key.open(this.computeNonce(this._ctx),e,t)}catch(n){throw new V(n)}return this.incrementSeq(this._ctx),r}};var ne=class extends U{constructor(e,t,r,n){super(e,t,r),Object.defineProperty(this,"enc",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.enc=n}async seal(e,t=c){let r;try{r=await this._ctx.key.seal(this.computeNonce(this._ctx),e,t)}catch(n){throw new J(n)}return this.incrementSeq(this._ctx),r}};async function Ne(){if((De()||Te())&&globalThis.crypto!==void 0)return globalThis.crypto.subtle;try{let{webcrypto:i}=await import("crypto");return i.subtle}catch{throw new w("Web Cryptograph API not supported")}}var H=class extends y{constructor(e,t){super(),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:h.DhkemP256HkdfSha256}),Object.defineProperty(this,"secretSize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"encSize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"publicKeySize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"privateKeySize",{enumerable:!0,configurable:!0,writable:!0,value:0}),Object.defineProperty(this,"_prim",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_kdf",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._prim=e,this._kdf=t}init(e){super.init(e);let t=new Uint8Array(_e);t.set(x(this.id,2),3),this._prim.init(e),this._kdf.init(e,t),super.init(e)}async generateKeyPair(){try{return await this._prim.generateKeyPair()}catch(e){throw new w(e)}}async deriveKeyPair(e){try{return await this._prim.deriveKeyPair(e)}catch(t){throw new Q(t)}}async serializePublicKey(e){try{return await this._prim.serializePublicKey(e)}catch(t){throw new q(t)}}async deserializePublicKey(e){try{return await this._prim.deserializePublicKey(e)}catch(t){throw new K(t)}}async importKey(e,t,r){try{return await this._prim.importKey(e,t,r)}catch(n){throw new K(n)}}async encap(e){try{let t=e.nonEphemeralKeyPair===void 0?await this.generateKeyPair():e.nonEphemeralKeyPair,r=await this._prim.serializePublicKey(t.publicKey),n=await this._prim.serializePublicKey(e.recipientPublicKey),s;if(e.senderKey===void 0)s=new Uint8Array(await this._prim.dh(t.privateKey,e.recipientPublicKey));else{let u=M(e.senderKey)?e.senderKey.privateKey:e.senderKey,b=new Uint8Array(await this._prim.dh(t.privateKey,e.recipientPublicKey)),_=new Uint8Array(await this._prim.dh(u,e.recipientPublicKey));s=R(b,_)}let o;if(e.senderKey===void 0)o=R(new Uint8Array(r),new Uint8Array(n));else{let u=M(e.senderKey)?e.senderKey.publicKey:await this._prim.derivePublicKey(e.senderKey),b=await this._prim.serializePublicKey(u);o=ze(new Uint8Array(r),new Uint8Array(n),new Uint8Array(b))}let a=await this.generateSharedSecret(s,o);return{enc:r,sharedSecret:a}}catch(t){throw new W(t)}}async decap(e){let t;try{t=await this._prim.deserializePublicKey(e.enc)}catch(r){throw new K(r)}try{let r=M(e.recipientKey)?e.recipientKey.privateKey:e.recipientKey,n=M(e.recipientKey)?e.recipientKey.publicKey:await this._prim.derivePublicKey(e.recipientKey),s=await this._prim.serializePublicKey(n),o;if(e.senderPublicKey===void 0)o=new Uint8Array(await this._prim.dh(r,t));else{let u=new Uint8Array(await this._prim.dh(r,t)),b=new Uint8Array(await this._prim.dh(r,e.senderPublicKey));o=R(u,b)}let a;if(e.senderPublicKey===void 0)a=R(new Uint8Array(e.enc),new Uint8Array(s));else{let u=await this._prim.serializePublicKey(e.senderPublicKey);a=new Uint8Array(e.enc.byteLength+s.byteLength+u.byteLength),a.set(new Uint8Array(e.enc),0),a.set(new Uint8Array(s),e.enc.byteLength),a.set(new Uint8Array(u),e.enc.byteLength+s.byteLength)}return await this.generateSharedSecret(o,a)}catch(r){throw new X(r)}}async generateSharedSecret(e,t){let r=this._kdf.buildLabeledIkm(xe,e),n=this._kdf.buildLabeledInfo(Pe,t,this.secretSize);return await this._kdf.extractAndExpand(c,r,n,this.secretSize)}};var se=class{constructor(e){Object.defineProperty(this,"_num",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._num=new Uint8Array(e)}val(){return this._num}reset(){this._num.fill(0)}set(e){if(e.length!==this._num.length)throw new Error("Bignum.set: invalid argument");this._num.set(e)}isZero(){for(let e=0;e<this._num.length;e++)if(this._num[e]!==0)return!1;return!0}lessThan(e){if(e.length!==this._num.length)throw new Error("Bignum.lessThan: invalid argument");for(let t=0;t<this._num.length;t++){if(this._num[t]<e[t])return!0;if(this._num[t]>e[t])return!1}return!1}};var Je=new Uint8Array([48,65,2,1,0,48,19,6,7,42,134,72,206,61,2,1,6,8,42,134,72,206,61,3,1,7,4,39,48,37,2,1,1,4,32]),Ve=new Uint8Array([48,78,2,1,0,48,16,6,7,42,134,72,206,61,2,1,6,5,43,129,4,0,34,4,55,48,53,2,1,1,4,48]),Ze=new Uint8Array([48,96,2,1,0,48,16,6,7,42,134,72,206,61,2,1,6,5,43,129,4,0,35,4,73,48,71,2,1,1,4,66]),O=class extends y{constructor(e,t){switch(super(),Object.defineProperty(this,"_hkdf",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_alg",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_nPk",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_nSk",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_nDh",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_order",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_bitmask",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_pkcs8AlgId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this._hkdf=t,e){case h.DhkemP256HkdfSha256:this._alg={name:"ECDH",namedCurve:"P-256"},this._nPk=65,this._nSk=32,this._nDh=32,this._order=Ie,this._bitmask=255,this._pkcs8AlgId=Je;break;case h.DhkemP384HkdfSha384:this._alg={name:"ECDH",namedCurve:"P-384"},this._nPk=97,this._nSk=48,this._nDh=48,this._order=Le,this._bitmask=255,this._pkcs8AlgId=Ve;break;default:this._alg={name:"ECDH",namedCurve:"P-521"},this._nPk=133,this._nSk=66,this._nDh=66,this._order=Ue,this._bitmask=1,this._pkcs8AlgId=Ze;break}}async serializePublicKey(e){this.checkInit();let t=await this._api.exportKey("raw",e);if(t.byteLength!==this._nPk)throw new Error("Invalid public key for the ciphersuite");return t}async deserializePublicKey(e){if(this.checkInit(),e.byteLength!==this._nPk)throw new Error("Invalid public key for the ciphersuite");try{return await this._api.importKey("raw",e,this._alg,!0,[])}catch{throw new Error("Invalid public key for the ciphersuite")}}async importKey(e,t,r){if(this.checkInit(),e==="raw")return await this._importRawKey(t,r);if(t instanceof ArrayBuffer)throw new Error("Invalid jwk key format");return await this._importJWK(t,r)}async _importRawKey(e,t){if(t&&e.byteLength!==this._nPk)throw new Error("Invalid public key for the ciphersuite");if(!t&&e.byteLength!==this._nSk)throw new Error("Invalid private key for the ciphersuite");try{if(t)return await this._api.importKey("raw",e,this._alg,!0,[]);let r=new Uint8Array(e),n=new Uint8Array(this._pkcs8AlgId.length+r.length);return n.set(this._pkcs8AlgId,0),n.set(r,this._pkcs8AlgId.length),await this._api.importKey("pkcs8",n,this._alg,!0,A)}catch{throw new Error("Invalid key for the ciphersuite")}}async _importJWK(e,t){if(typeof e.crv>"u"||e.crv!==this._alg.namedCurve)throw new Error(`Invalid crv: ${e.crv}`);if(t){if(typeof e.d<"u")throw new Error("Invalid key: `d` should not be set");return await this._api.importKey("jwk",e,this._alg,!0,[])}if(typeof e.d>"u")throw new Error("Invalid key: `d` not found");return await this._api.importKey("jwk",e,this._alg,!0,A)}async derivePublicKey(e){this.checkInit();let t=await this._api.exportKey("jwk",e);return delete t.d,delete t.key_ops,await this._api.importKey("jwk",t,this._alg,!0,[])}async generateKeyPair(){return this.checkInit(),await this._api.generateKey(this._alg,!0,A)}async deriveKeyPair(e){this.checkInit();let t=await this._hkdf.labeledExtract(c,we,new Uint8Array(e)),r=new se(this._nSk);for(let o=0;r.isZero()||!r.lessThan(this._order);o++){if(o>255)throw new Error("Faild to derive a key pair");let a=new Uint8Array(await this._hkdf.labeledExpand(t,Ke,x(o,1),this._nSk));a[0]=a[0]&this._bitmask,r.set(a)}let n=new Uint8Array(this._pkcs8AlgId.length+r.val().length);n.set(this._pkcs8AlgId,0),n.set(r.val(),this._pkcs8AlgId.length);let s=await this._api.importKey("pkcs8",n,this._alg,!0,A);return r.reset(),{privateKey:s,publicKey:await this.derivePublicKey(s)}}async dh(e,t){return this.checkInit(),await this._api.deriveBits({name:"ECDH",public:t},e,this._nDh*8)}};var D=class extends H{constructor(){let e=new P,t=new O(h.DhkemP256HkdfSha256,e);super(t,e),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:h.DhkemP256HkdfSha256}),Object.defineProperty(this,"secretSize",{enumerable:!0,configurable:!0,writable:!0,value:32}),Object.defineProperty(this,"encSize",{enumerable:!0,configurable:!0,writable:!0,value:65}),Object.defineProperty(this,"publicKeySize",{enumerable:!0,configurable:!0,writable:!0,value:65}),Object.defineProperty(this,"privateKeySize",{enumerable:!0,configurable:!0,writable:!0,value:32})}},T=class extends H{constructor(){let e=new E,t=new O(h.DhkemP384HkdfSha384,e);super(t,e),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:h.DhkemP384HkdfSha384}),Object.defineProperty(this,"secretSize",{enumerable:!0,configurable:!0,writable:!0,value:48}),Object.defineProperty(this,"encSize",{enumerable:!0,configurable:!0,writable:!0,value:97}),Object.defineProperty(this,"publicKeySize",{enumerable:!0,configurable:!0,writable:!0,value:97}),Object.defineProperty(this,"privateKeySize",{enumerable:!0,configurable:!0,writable:!0,value:48})}},j=class extends H{constructor(){let e=new S,t=new O(h.DhkemP521HkdfSha512,e);super(t,e),Object.defineProperty(this,"id",{enumerable:!0,configurable:!0,writable:!0,value:h.DhkemP521HkdfSha512}),Object.defineProperty(this,"secretSize",{enumerable:!0,configurable:!0,writable:!0,value:64}),Object.defineProperty(this,"encSize",{enumerable:!0,configurable:!0,writable:!0,value:133}),Object.defineProperty(this,"publicKeySize",{enumerable:!0,configurable:!0,writable:!0,value:133}),Object.defineProperty(this,"privateKeySize",{enumerable:!0,configurable:!0,writable:!0,value:64})}};var ae=class{constructor(e){if(Object.defineProperty(this,"_api",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_kem",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_kdf",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_aead",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"_suiteId",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),typeof e.kem!="number")this._kem=e.kem;else switch(e.kem){case h.DhkemP256HkdfSha256:this._kem=new D;break;case h.DhkemP384HkdfSha384:this._kem=new T;break;case h.DhkemP521HkdfSha512:this._kem=new j;break;default:throw new f(`The KEM (${e.kem}) cannot be specified by KemId. Use submodule for the KEM`)}if(typeof e.kdf!="number")this._kdf=e.kdf;else switch(e.kdf){case g.HkdfSha256:this._kdf=new P;break;case g.HkdfSha384:this._kdf=new E;break;default:this._kdf=new S;break}if(typeof e.aead!="number")this._aead=e.aead;else switch(e.aead){case p.Aes128Gcm:this._aead=new z;break;case p.Aes256Gcm:this._aead=new N;break;case p.ExportOnly:this._aead=new re;break;default:throw new f(`The AEAD (${e.aead}) cannot be specified by AeadId. Use submodule for the AEAD`)}this._suiteId=new Uint8Array(be),this._suiteId.set(x(this._kem.id,2),4),this._suiteId.set(x(this._kdf.id,2),6),this._suiteId.set(x(this._aead.id,2),8)}get kem(){return this._kem}get kdf(){return this._kdf}get aead(){return this._aead}async generateKeyPair(){return await this._setup(),await this._kem.generateKeyPair()}async deriveKeyPair(e){if(e.byteLength>128)throw new f("Too long ikm");return await this._setup(),await this._kem.deriveKeyPair(e)}async importKey(e,t,r=!0){return await this._setup(),await this._kem.importKey(e,t,r)}async createSenderContext(e){this._validateInputLength(e),await this._setup();let t=await this._kem.encap(e),r;return e.psk!==void 0?r=e.senderKey!==void 0?m.AuthPsk:m.Psk:r=e.senderKey!==void 0?m.Auth:m.Base,await this._keyScheduleS(r,t.sharedSecret,t.enc,e)}async createRecipientContext(e){this._validateInputLength(e),await this._setup();let t=await this._kem.decap(e),r;return e.psk!==void 0?r=e.senderPublicKey!==void 0?m.AuthPsk:m.Psk:r=e.senderPublicKey!==void 0?m.Auth:m.Base,await this._keyScheduleR(r,t,e)}async seal(e,t,r=c){let n=await this.createSenderContext(e);return{ct:await n.seal(t,r),enc:n.enc}}async open(e,t,r=c){return await(await this.createRecipientContext(e)).open(t,r)}async _setup(){if(this._api!==void 0)return;let e=await Ne();this._kem.init(e),this._kdf.init(e,this._suiteId),this._aead.init(e),this._api=e}async _keySchedule(e,t,r){let n=r.psk===void 0?c:new Uint8Array(r.psk.id),s=await this._kdf.labeledExtract(c,ge,n),o=r.info===void 0?c:new Uint8Array(r.info),a=await this._kdf.labeledExtract(c,me,o),u=new Uint8Array(1+s.byteLength+a.byteLength);u.set(new Uint8Array([e]),0),u.set(new Uint8Array(s),1),u.set(new Uint8Array(a),1+s.byteLength);let b=r.psk===void 0?c:new Uint8Array(r.psk.key),_=this._kdf.buildLabeledIkm(ke,b),B=this._kdf.buildLabeledInfo(Ae,u,this._kdf.hashSize),d=await this._kdf.extractAndExpand(t,_,B,this._kdf.hashSize);if(this._aead.id===p.ExportOnly)return{aead:this._aead,exporterSecret:d};let Me=this._kdf.buildLabeledInfo(Ee,u,this._aead.keySize),Re=await this._kdf.extractAndExpand(t,_,Me,this._aead.keySize),Be=this._kdf.buildLabeledInfo(Se,u,this._aead.nonceSize),Ge=await this._kdf.extractAndExpand(t,_,Be,this._aead.nonceSize);return{aead:this._aead,exporterSecret:d,key:Re,baseNonce:new Uint8Array(Ge),seq:0}}async _keyScheduleS(e,t,r,n){let s=await this._keySchedule(e,t,n);return s.key===void 0?new te(this._api,this._kdf,s.exporterSecret,r):new ne(this._api,this._kdf,s,r)}async _keyScheduleR(e,t,r){let n=await this._keySchedule(e,t,r);return n.key===void 0?new ee(this._api,this._kdf,n.exporterSecret):new ie(this._api,this._kdf,n)}_validateInputLength(e){if(e.info!==void 0&&e.info.byteLength>128)throw new f("Too long info");if(e.psk!==void 0){if(e.psk.key.byteLength<32)throw new f(`PSK must have at least ${32} bytes`);if(e.psk.key.byteLength>128)throw new f("Too long psk.key");if(e.psk.id.byteLength>128)throw new f("Too long psk.id")}}};var ue=class extends ae{},ce=class extends D{},he=class extends T{},le=class extends j{},fe=class extends P{},de=class extends E{},ye=class extends S{};export{p as AeadId,z as Aes128Gcm,N as Aes256Gcm,ue as CipherSuite,X as DecapError,Q as DeriveKeyPairError,K as DeserializeError,ce as DhkemP256HkdfSha256,he as DhkemP384HkdfSha384,le as DhkemP521HkdfSha512,W as EncapError,$ as ExportError,fe as HkdfSha256,de as HkdfSha384,ye as HkdfSha512,f as InvalidParamError,g as KdfId,h as KemId,Z as MessageLimitReachedError,w as NotSupportedError,V as OpenError,J as SealError,q as SerializeError,He as ValidationError};
