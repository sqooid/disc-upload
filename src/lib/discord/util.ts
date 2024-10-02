import { ChannelType, Client, TextChannel } from 'discord.js';

export const getTextChannel = async (bot: Client, channelId: string) => {
	const channel = await bot.channels.fetch(channelId);
	if (!channel) return null;
	const textChannel = channel as TextChannel;
	return textChannel;
};

export const getThread = async (bot: Client, channelId: string, threadId: string) => {
	const channel = await getTextChannel(bot, channelId);
	if (!channel) return null;
	const thread = await channel.threads.fetch(threadId);
	return thread;
};
