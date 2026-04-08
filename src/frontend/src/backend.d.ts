import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Feedback {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getFeedbacks(): Promise<Array<Feedback>>;
    submitFeedback(name: string, email: string, message: string): Promise<void>;
}
