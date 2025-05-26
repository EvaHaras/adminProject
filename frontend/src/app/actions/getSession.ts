'use server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

const getSession = async () => {
    try {
        const cookieStore = cookies();
        if (!cookieStore) return null;
       
        const encryptedToken = (await cookieStore).get('token')?.value; 

        if (!encryptedToken) return null;
        const session = jwt.verify(
        encryptedToken,
          process.env.JWT_PUBLIC_KEY!,
        ) as jwt.JwtPayload | null; 

        const decodedToken = jwt.decode(encryptedToken) as { exp?: number } | null;
        if (!decodedToken?.exp) return null;

        const expiredDate = new Date(decodedToken.exp * 1000);

        if (expiredDate.getTime() < Date.now()) {
            return null;
        }

        return {session, encryptedToken}; 
    } catch (error) {
        console.error("Error decoding session:", error);
        return null;
    }
};

export default getSession;
