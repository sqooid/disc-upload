import { PUBLIC_CHANNEL_ID } from '$env/static/public';
import { serverBot } from '$lib/discord/server-client';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TextChannel, ChannelType } from 'discord.js';
import { clientBot } from '$lib/discord/browser-client';

export const GET: RequestHandler = async (req) => {
	const channel = await clientBot.channels.fetch(PUBLIC_CHANNEL_ID);
	if (!channel) return json({ message: 'notfound' });
	const textChannel = channel as TextChannel;
	const thread = await textChannel.threads.create({ name: 'test', type: ChannelType.PublicThread });

	return json({ threadId: thread.id });
};
