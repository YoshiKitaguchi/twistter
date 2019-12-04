export interface Post {
    title: string;
    content: string;
    num_post: number;
    id?: string;
    sender?: string;
    reciever?: string;
    likes?:number;
}