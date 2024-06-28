export type User = {
    _id: string;
    name: string;
    email: string;
    image: string;
    username: string;
    customer_id?: string;
    price_id?: string;
    projects_limit: number;
    tasks_limit: number;
    has_access: boolean;
    ai_api_key?: string;
    created_at: Date;
}

export type UserResponse = {
    user: User
}