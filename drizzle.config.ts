import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	schema: './src/lib/database/models.ts',
	out: './drizzle/migrations',
	dialect: 'sqlite'
});
