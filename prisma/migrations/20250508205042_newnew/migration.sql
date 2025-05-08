/*
  Warnings:

  - Added the required column `image_generated_name` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "image_generated_name" TEXT NOT NULL;
