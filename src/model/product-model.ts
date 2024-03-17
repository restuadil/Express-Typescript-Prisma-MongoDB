export type ProductResponse = {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export type ProductRequest = {
    name: string;
}