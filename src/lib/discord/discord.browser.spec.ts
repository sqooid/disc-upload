import { test } from 'vitest';
import { uploadChunk } from './browser-client';

test('file upload', async () => {
	const chunk = new TextEncoder().encode('hello world');
	await uploadChunk('1290873629743124534', chunk, '0');
});
