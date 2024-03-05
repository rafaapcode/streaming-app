import { Ephesis } from "next/font/google";
import { db } from "./db";

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        include: {
            stream: true
        }
    });

    return user;
};

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: { id }
    });

    return user;
}