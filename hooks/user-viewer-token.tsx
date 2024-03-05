"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { LiveKitRoom } from "@livekit/components-react";
import { createViewerToken } from "@/actions/token";

export const UserViewerToken = ({ hostIdentity, children }: { hostIdentity: string, children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };
        console.log(decodedToken);
        const name = decodedToken?.name;
        const identity = decodedToken.sub;
        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
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
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL} className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      {children}
    </LiveKitRoom>
  </>

};

export default UserViewerToken;