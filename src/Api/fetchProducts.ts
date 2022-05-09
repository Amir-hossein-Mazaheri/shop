import axiosInstance from "./axiosInstance";
import { ProductProps } from "../Components/ProductCard";

export async function fetchProducts() {
  const { data } = await axiosInstance.get("/products/");

  return data.map(({ inventory_status, ...restData }: any) => ({
    ...restData,
    inventoryStatus: inventory_status,
  })) as ProductProps[];
}

export async function fetchProduct(id: string) {
  const { data } = await axiosInstance.get(`/products/${id}`);

  return { ...data, inventoryStatus: data.inventory_status } as ProductProps;
}
