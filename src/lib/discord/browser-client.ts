import { PUBLIC_CLIENT_BOT_TOKEN } from '$env/static/public';
import { Client, type TextThreadChannel } from 'discord.js';

export const clientBot = new Client({ intents: [] });

clientBot.login(PUBLIC_CLIENT_BOT_TOKEN);

export const uploadChunk = async (thread: TextThreadChannel, data: Uint8Array) => {
	//@ts-ignore
	await thread.send({ files: [{ data }] });
};
