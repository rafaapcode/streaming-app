"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { LiveKitRoom } from "@livekit/components-react";
import { createViewerToken } from "@/actions/token";
import { cn } from "@/lib/utils";
import { useStreamCredentials } from "@/store/stream-credentials";
import ChatToggle from "@/components/streamPlayer/ChatToggle";

export const UserViewerToken = ({ hostIdentity, children, collapsed }: { hostIdentity: string, children: React.ReactNode, collapsed: boolean }) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  const { setIdentitie, setToke, setNome } = useStreamCredentials((state) => state);

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);
        setToke(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };
        console.log(decodedToken);
        const name = decodedToken?.name;
        const identity = decodedToken.sub;
        if (identity) {
          setIdentity(identity);
          setIdentitie(identity);
        }

        if (name) {
          setName(name);
          setNome(name);
        }

      } catch {
        toast.error("Something went wrong");
      }
    }

    createToken();
  }, [hostIdentity]);

  if (!token || !name || !identity) {
    return (
      <div>
        Você não pode assistir a transmissão
      </div>
    )
  }

  return <>
    {collapsed && (
      <div className="hidden lg:block fixed top-[100px] right-2 z-50">
        <ChatToggle />
      </div>
    )}
    {/* "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full" */}
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL} className={cn("flex justify-between h-full", collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2")}>
      {children}
    </LiveKitRoom>
  </>

};

export default UserViewerToken;