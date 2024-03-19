
export type ProductRequest = {
    name: string;
    description: string;
    price: number;
    category: string;
}
export type ProductResponse = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    created_at: Date;
    updated_at: Date;
}
export type ProductQuery = {
    page?: number;
    name?: string;
    category?: string;
    limit?: number;
}
