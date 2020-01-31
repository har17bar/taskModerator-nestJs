export interface Task{
    id: string,
    title: string,
    description: string,
    status: TaskStatus;
}

export enum TaskStatus {
    Open = "OPEN",
    In_Progress = "IN_PROGRESS",
    Done = "DONE"
}