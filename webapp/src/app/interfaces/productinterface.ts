export interface Productinterface {
    id?: number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    discount: number;
    categoryId: { _id?: string; name: string };
    brandId: { _id?: string; name: string };
    offerId: { _id?: string; description: string, edited?: boolean }[];
    images?: File | string[];
    rating?: number;
    reviews?: number;
    sizes?: string[];
    frameColors?: string[];
    offers?: string[];
}