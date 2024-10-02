import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { drizzle } from 'drizzle-orm/d1';
import { files } from '$lib/database/models';
import { generateId } from '$lib/database/files';

export const GET: RequestHandler = async (req) => {
	const db = drizzle(req.platform?.env.DB);
	const { id, buffer } = generateId();
	console.log({ id, buffer });
	await db.delete(files);

	await db.insert(files).values({ id: buffer as Buffer, threadId: 'test' });
	const result = await db.select().from(files).all();
	return json({ files: result });
};
