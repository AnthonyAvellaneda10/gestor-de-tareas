export interface Task {
    id?: number;
    title: string;
    due_datetime: Date;
    created_at?: Date;
    status_id?: number;
}