/*
  Warnings:

  - You are about to drop the column `image1` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `image3` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `image4` on the `ProductImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "image3",
DROP COLUMN "image4";

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productImageId" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_productImageId_fkey" FOREIGN KEY ("productImageId") REFERENCES "ProductImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
