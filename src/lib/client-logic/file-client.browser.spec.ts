import { expect, test } from 'vitest';
import { ChunkReader } from './chunking';
import { generateKey, chunkEncrypt, encryptionAuxBytes, chunkDecrypt } from './file';

test('file chunking', async () => {
	const file = new File(['hello world'], 'hello.txt');
	const reader = new ChunkReader(file, 5);
	const chunks: ArrayBuffer[] = [];
	while (!reader.isDone) {
		chunks.push(await reader.nextChunk());
	}
	expect(chunks.length).toBe(3);
	expect(new TextDecoder().decode(chunks[0])).toBe('hello');
	expect(new TextDecoder().decode(chunks[1])).toBe(' worl');
	expect(new TextDecoder().decode(chunks[2])).toBe('d');
});

test('chunk encrypt', async () => {
	const keyString = 'test-key';
	const key = await generateKey(keyString);
	const testData = new TextEncoder().encode('hello world');
	const encrypted = await chunkEncrypt(key, testData);

	expect(encrypted.byteLength).toBe(testData.byteLength + encryptionAuxBytes);
});

test('chunk encrypt/decrypt', async () => {
	const keyString = 'test-key';
	const key = await generateKey(keyString);
	const testText = 'hello world';
	const testData = new TextEncoder().encode(testText);
	const encrypted = await chunkEncrypt(key, testData);
	const decrypted = await chunkDecrypt(key, encrypted);

	expect(decrypted.byteLength).toBe(testData.byteLength);
	expect(new TextDecoder().decode(decrypted)).toBe(testText);
});
