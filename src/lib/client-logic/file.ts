export const generateKey = async (keyString: string) => {
	const crypto = window.crypto.subtle;
	const keyBuffer = new TextEncoder().encode(keyString);
	const digest = await crypto.digest('SHA-256', keyBuffer);
	const key = await crypto.importKey('raw', digest, { name: 'AES-GCM' }, false, [
		'encrypt',
		'decrypt'
	]);
	return key;
};

const concatBuffers = (buffer1: ArrayBuffer, buffer2: ArrayBuffer) => {
	const result = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	result.set(new Uint8Array(buffer1), 0);
	result.set(new Uint8Array(buffer2), buffer1.byteLength);
	return result.buffer as ArrayBuffer;
};

export const ivLengthBytes = 12;
export const tagLengthBytes = 8;
export const encryptionAuxBytes = ivLengthBytes + tagLengthBytes;

export const chunkEncrypt = async (key: CryptoKey, data: ArrayBuffer) => {
	const crypto = window.crypto.subtle;
	const iv = window.crypto.getRandomValues(new Uint8Array(ivLengthBytes));
	const encrypted = await crypto.encrypt(
		{ name: 'AES-GCM', iv, tagLength: tagLengthBytes * 8 },
		key,
		data
	);
	const concat = concatBuffers(iv.buffer, encrypted);
	return concat;
};

export const chunkDecrypt = async (key: CryptoKey, data: ArrayBuffer) => {
	const crypto = window.crypto.subtle;
	const iv = data.slice(0, ivLengthBytes);
	const decrypted = await crypto.decrypt(
		{ name: 'AES-GCM', iv, tagLength: tagLengthBytes * 8 },
		key,
		data.slice(ivLengthBytes)
	);
	return decrypted;
};
