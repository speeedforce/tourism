
export enum Role {
    User = 'User',
    Admin = 'Admin'
}


export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    token?: string;
}

export interface IForum {
    id: number;
    title: string;
    description: string;
    created: string;
    imageUrl: string; 
    articles: any[];
}



export interface IForumEdit {
    title: string;
    description: string;
    created: string;
    imageUrl: string; 
}


export interface IArticle {
    id: number;
    title: string;
    content: string;
    created: string;
    imageUrl: string;
    author: string;
    forumId: number;
    replies: any[];
}


export interface IArticleInput {
    title: string;
    content: string;
    created: string;
    imageUrl: string;
    author: string;
}

