import { v4 as uuid } from 'uuid';
import uuidBuffer from 'uuid-buffer';

export const generateId = () => {
	const id = uuid();
	const buffer = uuidBuffer.toBuffer(id);
	const arrayBuffer = new ArrayBuffer(buffer.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < buffer.length; i++) {
		view[i] = buffer[i];
	}
	return { id, buffer: arrayBuffer };
};
