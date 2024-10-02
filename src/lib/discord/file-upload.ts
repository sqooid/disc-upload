export const readFile = async (file: File) => {
	const reader = new FileReader();
	const promise = new Promise<Uint8Array>((resolve) => {
		reader.onload = () => {
			const arrayBuffer = reader.result as ArrayBuffer;
			const uint8Array = new Uint8Array(arrayBuffer);
			resolve(uint8Array);
		};
	});
	reader.readAsArrayBuffer(file);
	return promise;
};

export const readFileChunks = async (
	file: File,
	chunkSize: number,
	callback: (index: number, data: ArrayBuffer) => Promise<void>
) => {
	const size = file.size;
	let offset = 0;
	const maxIndex = Math.ceil(size / chunkSize);
	const promise = new Promise<void>((resolve) => {
		const readHandler = async (e: ProgressEvent<FileReader>, index: number) => {
			if (e.target?.result) {
				await callback(index, e.target.result as ArrayBuffer);
			}
			if (index === maxIndex - 1) {
				resolve();
			}
		};
		const chunkReader = (offset: number) => {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				readHandler(e, Math.ceil(offset / chunkSize));
			};
			const slice = file.slice(offset, offset + chunkSize);
			reader.readAsArrayBuffer(slice);
		};
		while (offset < size) {
			chunkReader(offset);
			offset += chunkSize;
			console.log('chunkReader', offset);
		}
	});
	return promise;
};

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
