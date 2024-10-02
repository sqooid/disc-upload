import { v4 } from 'uuid';
import { expect, test } from 'vitest';
import { bufferToUuid, uuidToBuffer } from './files';

test('ids', async () => {
	const id = v4();
	const buffer = uuidToBuffer(id);
	const regenId = bufferToUuid(buffer);
	expect(regenId).toBe(id);
});
