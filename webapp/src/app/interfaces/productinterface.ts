export interface Productinterface {
    id?: number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    discount?: number;
    categoryId: string;
    brandId: string;
    images?: File | string[];
}