CREATE TABLE `files` (
	`id` blob PRIMARY KEY NOT NULL,
	`encrypted` integer DEFAULT 0,
	`threadId` text NOT NULL,
	`createdTime` integer DEFAULT CURRENT_TIMESTAMP
);
