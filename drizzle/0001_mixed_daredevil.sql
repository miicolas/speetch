CREATE TABLE `newsletter_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `newsletter_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
DROP TABLE `users_table`;