import { listaMercadoPrisma } from '../db.ts';

export const categoryService = {
  findMany: () => listaMercadoPrisma.category.findMany(),
  findById: (id: string) => listaMercadoPrisma.category.findFirst({ where: { id } }),
  create: (data: any) => listaMercadoPrisma.category.create({ data }),
  update: (id: string, data: any) => listaMercadoPrisma.category.update({ where: { id }, data }),
  delete: (id: string) => listaMercadoPrisma.category.delete({ where: { id } }),
  deleteShopItemsByCategory: (categoryId: string) =>
    listaMercadoPrisma.shopItem.deleteMany({ where: { categoryId } }),
};
