import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProjectItem {
    id: bigint;
    client: string;
    photoUrls: Array<string>;
    name: string;
    createdAt: bigint;
    year: string;
    description: string;
    location: string;
}
export interface Feedback {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    createProject(name: string, description: string, client: string, location: string, year: string, photoUrls: Array<string>): Promise<ProjectItem>;
    deleteProject(id: bigint): Promise<boolean>;
    getFeedbacks(): Promise<Array<Feedback>>;
    getProjects(): Promise<Array<ProjectItem>>;
    submitFeedback(name: string, email: string, message: string): Promise<void>;
}
