import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            role: string;
        }
    }
    
    interface User {
        id: number;
        role: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string
    }
}