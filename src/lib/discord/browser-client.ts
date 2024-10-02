import { PUBLIC_CLIENT_BOT_TOKEN } from '$env/static/public';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const clientRest = new REST({
	version: '10',
	api: `https://corsproxy.io/?${encodeURIComponent('https://discord.com/api')}`
}).setToken(PUBLIC_CLIENT_BOT_TOKEN);

export const uploadChunk = async (threadId: string, data: Uint8Array, name: string) => {
	const form = new FormData();
	form.append('files', new Blob([data]), name);
	await clientRest.post(encodeURIComponent(Routes.channelMessages(threadId)) as any, {
		body: form,
		passThroughBody: true
	});
};
