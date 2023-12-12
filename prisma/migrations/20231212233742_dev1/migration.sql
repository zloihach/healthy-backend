/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edited_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_confirmed_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notification_period` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'VISITOR', 'MODERATOR');

-- CreateEnum
CREATE TYPE "VaccineType" AS ENUM ('CALENDAR', 'EPIDEMIOLOGY');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_ownerId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "hash",
DROP COLUMN "id",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dob" DATE NOT NULL,
ADD COLUMN     "edited_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "is_confirmed_email" BOOLEAN NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "midname" TEXT,
ADD COLUMN     "notification_period" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "sex" "Sex" NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "Child" (
    "child_id" SERIAL NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "midname" TEXT,
    "dob" DATE NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("child_id")
);

-- CreateTable
CREATE TABLE "UserChild" (
    "user_child_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "child_id" INTEGER NOT NULL,

    CONSTRAINT "UserChild_pkey" PRIMARY KEY ("user_child_id")
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "vaccine_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "VaccineType" NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "edited_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("vaccine_id")
);

-- CreateTable
CREATE TABLE "UserVaccine" (
    "user_vaccine_id" SERIAL NOT NULL,
    "vaccine_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "medical_center" TEXT,
    "dose" DOUBLE PRECISION,
    "serial_number" TEXT,
    "vaccination_date" DATE,
    "commentary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVaccine_pkey" PRIMARY KEY ("user_vaccine_id")
);

-- CreateTable
CREATE TABLE "ChildVaccine" (
    "child_vaccine_id" SERIAL NOT NULL,
    "vaccine_id" INTEGER NOT NULL,
    "child_id" INTEGER NOT NULL,
    "medical_center" TEXT,
    "dose" DOUBLE PRECISION,
    "serial_number" TEXT,
    "vaccination_date" DATE,
    "commentary" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildVaccine_pkey" PRIMARY KEY ("child_vaccine_id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "publication_id" SERIAL NOT NULL,
    "full_title" TEXT NOT NULL,
    "short_title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("publication_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "inotification_id" SERIAL NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "is_delivered" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("inotification_id")
);

-- CreateTable
CREATE TABLE "UserNotification" (
    "user_notification_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "inotification_id" INTEGER NOT NULL,

    CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("user_notification_id")
);

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChild" ADD CONSTRAINT "UserChild_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChild" ADD CONSTRAINT "UserChild_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("child_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVaccine" ADD CONSTRAINT "UserVaccine_vaccine_id_fkey" FOREIGN KEY ("vaccine_id") REFERENCES "Vaccine"("vaccine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVaccine" ADD CONSTRAINT "UserVaccine_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildVaccine" ADD CONSTRAINT "ChildVaccine_vaccine_id_fkey" FOREIGN KEY ("vaccine_id") REFERENCES "Vaccine"("vaccine_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildVaccine" ADD CONSTRAINT "ChildVaccine_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("child_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_inotification_id_fkey" FOREIGN KEY ("inotification_id") REFERENCES "Notification"("inotification_id") ON DELETE RESTRICT ON UPDATE CASCADE;
