import { sql } from 'drizzle-orm';
import { blob, sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const files = sqliteTable('files', {
	id: blob('id', { mode: 'buffer' }).primaryKey(),
	encrypted: integer('encrypted').default(0),
	threadId: text('threadId').notNull(),
	name: text('name').notNull().default(''),
	createdTime: integer('createdTime').default(sql`CURRENT_TIMESTAMP`)
});
