-- CreateTable
CREATE TABLE `traveler` (
    `id_traveler` INTEGER NOT NULL AUTO_INCREMENT,
    `image_link` VARCHAR(1000) NOT NULL,
    `image` LONGBLOB NULL,
    `user` INTEGER NOT NULL,
    `contact` INTEGER NOT NULL,

    PRIMARY KEY (`id_traveler`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact` (
    `id_contact` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `contact_mail_key`(`mail`),
    PRIMARY KEY (`id_contact`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permession` (
    `id_permission` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_permission`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_permission` (
    `id_permission` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `user_permission_id_permission_key`(`id_permission`),
    UNIQUE INDEX `user_permission_id_user_key`(`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `country` (
    `id_country` INTEGER NOT NULL AUTO_INCREMENT,
    `portuguese_name` VARCHAR(191) NOT NULL,
    `english_name` VARCHAR(191) NOT NULL,
    `image_link` VARCHAR(191) NULL,
    `image` LONGBLOB NULL,

    PRIMARY KEY (`id_country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id_region` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_region`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `state` (
    `id_state` INTEGER NOT NULL AUTO_INCREMENT,
    `uf_code` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `region` INTEGER NOT NULL,
    `country` INTEGER NOT NULL,

    UNIQUE INDEX `state_uf_code_key`(`uf_code`),
    PRIMARY KEY (`id_state`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `id_city` INTEGER NOT NULL AUTO_INCREMENT,
    `ibge_code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `state` INTEGER NOT NULL,

    PRIMARY KEY (`id_city`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `traveler` ADD CONSTRAINT `traveler_contact_fkey` FOREIGN KEY (`contact`) REFERENCES `contact`(`id_contact`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traveler` ADD CONSTRAINT `traveler_user_fkey` FOREIGN KEY (`user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permission` ADD CONSTRAINT `user_permission_id_permission_fkey` FOREIGN KEY (`id_permission`) REFERENCES `permession`(`id_permission`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_permission` ADD CONSTRAINT `user_permission_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `state` ADD CONSTRAINT `state_country_fkey` FOREIGN KEY (`country`) REFERENCES `country`(`id_country`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `state` ADD CONSTRAINT `state_region_fkey` FOREIGN KEY (`region`) REFERENCES `region`(`id_region`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `city` ADD CONSTRAINT `city_state_fkey` FOREIGN KEY (`state`) REFERENCES `state`(`uf_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
