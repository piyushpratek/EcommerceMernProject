
// Define the types for User, UserProfile, and other relevant types in your application
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: { url: string }
    role: string
}

// Define the type for UserProfile
export interface UserProfile {
    username: string;
    useremail: string;
    userpassword: string;
    userrole: string
}

export type AllUsersData = User[];

