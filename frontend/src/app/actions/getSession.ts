'use server'
import { cookies } from "next/headers";

const getSession = async () => {
    try {
        const cookieStore = cookies();
        if (!cookieStore) return null;
       
        const encryptedToken = (await cookieStore).get('token')?.value; 


        if (!encryptedToken) return null;
        return {encryptedToken}; 
    } catch (error) {
        console.error("Error decoding session:", error);
        return null;
    }
};

export default getSession;
