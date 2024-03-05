import UserViewerToken from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client"

interface StreamPlayerProps {
    user: User & { stream: Stream | null }
    stream: Stream
    isFollowing: boolean;
}

export default function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
    return <UserViewerToken hostIdentity={user.id} />
};