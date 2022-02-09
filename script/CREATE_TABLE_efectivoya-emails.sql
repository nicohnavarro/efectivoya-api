CREATE TABLE IF NOT EXISTS `users` 
    (`id` INTEGER NOT NULL auto_increment ,
    `email` VARCHAR(50) NOT NULL,
    `token` VARCHAR(240) NOT NULL,
    `enable` TINYINT(1) NOT NULL DEFAULT false,
    `userAgent` VARCHAR(120),
    `expiredTime` DATETIME,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)) ENGINE=InnoDB;
ALTER TABLE `users` CHANGE `email` `email` VARCHAR(50) NOT NULL;
ALTER TABLE `users` CHANGE `token` `token` VARCHAR(240) NOT NULL;
ALTER TABLE `users` CHANGE `enable` `enable` TINYINT(1) NOT NULL DEFAULT false;
ALTER TABLE `users` CHANGE `userAgent` `userAgent` VARCHAR(120);
ALTER TABLE `users` CHANGE `expiredTime` `expiredTime` DATETIME;
ALTER TABLE `users` CHANGE `createdAt` `createdAt` DATETIME NOT NULL;
ALTER TABLE `users` CHANGE `updatedAt` `updatedAt` DATETIME NOT NULL;