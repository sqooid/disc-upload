import { SERVER_BOT_TOKEN } from '$env/static/private';
import { ChannelType, Client, TextChannel } from 'discord.js';
import { getTextChannel, getThread } from './util';

export const serverBot = new Client({ intents: [] });

serverBot.login(SERVER_BOT_TOKEN);

export const createThread = async (channelId: string, name: string) => {
	const channel = await getTextChannel(serverBot, channelId);
	if (!channel) return null;
	const thread = await channel.threads.create({ name: name, type: ChannelType.PublicThread });
	return thread.id;
};

export const deleteThread = async (channelId: string, threadId: string) => {
	const thread = await getThread(serverBot, channelId, threadId);
	thread?.delete();
};

export const lockThread = async (channelId: string, threadId: string) => {
	const thread = await getThread(serverBot, channelId, threadId);
	thread?.setArchived(true);
	thread?.setLocked(true);
};
