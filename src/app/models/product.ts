export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
}

export interface ProductAndId {
    id: string;
    product: Product;
}

export interface ProductInOrder {
    productId: string;
    quantity: number;
    specialRequest?: string;
}