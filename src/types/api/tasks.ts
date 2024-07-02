export type Task = {
    _id: string;
    title: string;
    description: string;
    issue_id: number;
    status: number;
    tags: string[];
    priority: number;
    creator: string;
    project: string;
    assignees: string[];
    created_at: Date;
}

export type TaskList = {
    tasks: Task[]
    skip: number
    limit: number
}

export type TaskView = {
    task: Task
}