"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf();
        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id
            }
        });


        if (!selfStream) {
            throw new Error("Stream not found");
        }

        const validData = {
            thumbnailUrl: values.thumbnailUrl,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed
        }

        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            }
        })

        revalidatePath(`/dashboard/u/${self.username}/chat`)
        revalidatePath(`/dashboard/u/${self.username}`)
        revalidatePath(`/browse/${self.username}`);

        return stream;
    } catch {
        throw new Error("Internal Error");
    }
};