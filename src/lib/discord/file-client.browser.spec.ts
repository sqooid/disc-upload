import { expect, test } from 'vitest';
import {
	chunkDecrypt,
	chunkEncrypt,
	encryptionAuxBytes,
	generateKey,
	readFileChunks
} from './file-upload';

test('file chunking', async () => {
	const file = new File(['hello world'], 'hello.txt');
	const chunkSize = 5;
	const chunks: ArrayBuffer[] = [];
	const callback = async (index: number, data: ArrayBuffer) => {
		chunks[index] = data;
	};
	await readFileChunks(file, chunkSize, callback);
	expect(chunks.length).toBe(3);
	const text = new TextDecoder().decode(chunks[0]);
	expect(text).toBe('hello');
	const text2 = new TextDecoder().decode(chunks[1]);
	expect(text2).toBe(' worl');
	const text3 = new TextDecoder().decode(chunks[2]);
	expect(text3).toBe('d');
});

test('chunk encrypt', async () => {
	const keyString = 'test-key';
	const key = await generateKey(keyString);
	const testData = new TextEncoder().encode('hello world');
	const encrypted = await chunkEncrypt(key, testData);

	expect(encrypted.byteLength).toBe(testData.byteLength + encryptionAuxBytes);
});

test('chunk decrypt', async () => {
	const keyString = 'test-key';
	const key = await generateKey(keyString);
	const testText = 'hello world';
	const testData = new TextEncoder().encode(testText);
	const encrypted = await chunkEncrypt(key, testData);
	const decrypted = await chunkDecrypt(key, encrypted);

	expect(decrypted.byteLength).toBe(testData.byteLength);
	expect(new TextDecoder().decode(decrypted)).toBe(testText);
});
