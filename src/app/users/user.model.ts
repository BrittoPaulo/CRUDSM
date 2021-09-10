export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
export interface ResponseObjectUsers {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}
export interface RequestObjectCreate {
    name: string;
    job: string;
}
export interface ResponseObjectCreate {
    name: string;
    job: string;
    id: string;
    createdAt: Date;
}