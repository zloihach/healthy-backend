/*
  Warnings:

  - The primary key for the `Child` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age` on the `Child` table. All the data in the column will be lost.
  - You are about to drop the column `child_id` on the `Child` table. All the data in the column will be lost.
  - The primary key for the `ChildVaccine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `child_vaccine_id` on the `ChildVaccine` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `ChildVaccine` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `inotification_id` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Publication` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publication_id` on the `Publication` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserChild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_child_id` on the `UserChild` table. All the data in the column will be lost.
  - The primary key for the `UserNotification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `inotification_id` on the `UserNotification` table. All the data in the column will be lost.
  - You are about to drop the column `user_notification_id` on the `UserNotification` table. All the data in the column will be lost.
  - The primary key for the `UserVaccine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `update_at` on the `UserVaccine` table. All the data in the column will be lost.
  - You are about to drop the column `user_vaccine_id` on the `UserVaccine` table. All the data in the column will be lost.
  - The primary key for the `Vaccine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vaccine_id` on the `Vaccine` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `ChildVaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notification_id` to the `UserNotification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UserVaccine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Child" DROP CONSTRAINT "Child_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ChildVaccine" DROP CONSTRAINT "ChildVaccine_child_id_fkey";

-- DropForeignKey
ALTER TABLE "ChildVaccine" DROP CONSTRAINT "ChildVaccine_vaccine_id_fkey";

-- DropForeignKey
ALTER TABLE "UserChild" DROP CONSTRAINT "UserChild_child_id_fkey";

-- DropForeignKey
ALTER TABLE "UserChild" DROP CONSTRAINT "UserChild_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_inotification_id_fkey";

-- DropForeignKey
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserVaccine" DROP CONSTRAINT "UserVaccine_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserVaccine" DROP CONSTRAINT "UserVaccine_vaccine_id_fkey";

-- AlterTable
ALTER TABLE "Child" DROP CONSTRAINT "Child_pkey",
DROP COLUMN "age",
DROP COLUMN "child_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "dob" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "Child_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChildVaccine" DROP CONSTRAINT "ChildVaccine_pkey",
DROP COLUMN "child_vaccine_id",
DROP COLUMN "update_at",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "is_vaccinated" BOOLEAN,
ADD COLUMN     "planned_vaccination_date" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "vaccination_date" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "ChildVaccine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "inotification_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Publication" DROP CONSTRAINT "Publication_pkey",
DROP COLUMN "publication_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD CONSTRAINT "Publication_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "age",
DROP COLUMN "hashed_password",
DROP COLUMN "user_id",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "dob" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserChild" DROP CONSTRAINT "UserChild_pkey",
DROP COLUMN "user_child_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserChild_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserNotification" DROP CONSTRAINT "UserNotification_pkey",
DROP COLUMN "inotification_id",
DROP COLUMN "user_notification_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "notification_id" INTEGER NOT NULL,
ADD CONSTRAINT "UserNotification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserVaccine" DROP CONSTRAINT "UserVaccine_pkey",
DROP COLUMN "update_at",
DROP COLUMN "user_vaccine_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "is_vaccinated" BOOLEAN,
ADD COLUMN     "planned_vaccination_date" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "UserVaccine_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vaccine" DROP CONSTRAINT "Vaccine_pkey",
DROP COLUMN "vaccine_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChild" ADD CONSTRAINT "UserChild_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChild" ADD CONSTRAINT "UserChild_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVaccine" ADD CONSTRAINT "UserVaccine_vaccine_id_fkey" FOREIGN KEY ("vaccine_id") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVaccine" ADD CONSTRAINT "UserVaccine_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildVaccine" ADD CONSTRAINT "ChildVaccine_vaccine_id_fkey" FOREIGN KEY ("vaccine_id") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildVaccine" ADD CONSTRAINT "ChildVaccine_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotification" ADD CONSTRAINT "UserNotification_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "Notification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
