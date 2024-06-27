export type Project = {
    _id: string;
    name: string;
    repository: string;
    description: string;
    public: boolean;
    creator: string;
    created_at: Date;
}

export type ProjectList = {
    projects: Project[]
    skip: number
    limit: number
}