
// Defining the types for User, UserProfile, and other relevant types
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: { url: string }
    role: string
    createdAt: string
}

// Defining the type for UserProfile
export interface UserProfile {
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: { url: string };
    createdAt: string
}

export type AllUsersData = User[];

