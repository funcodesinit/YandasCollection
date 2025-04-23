-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productImageId_fkey" FOREIGN KEY ("productImageId") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
