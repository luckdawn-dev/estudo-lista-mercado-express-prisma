import { listaMercadoPrisma } from '../db.ts';

export const shopItemService = {
  findMany: () => listaMercadoPrisma.shopItem.findMany(),
  findByCategory: (categoryId: string) => listaMercadoPrisma.shopItem.findMany({ where: { categoryId } }),
  create: (data: any) => listaMercadoPrisma.shopItem.create({ data }),
  update: (id: string, data: any) => listaMercadoPrisma.shopItem.update({ where: { id }, data }),
  delete: (id: string) => listaMercadoPrisma.shopItem.delete({ where: { id } }),
};
