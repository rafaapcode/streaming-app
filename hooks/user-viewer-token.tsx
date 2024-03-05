"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { createViewerToken } from "@/actions/token";

export const UserViewerToken = ({ hostIdentity }: { hostIdentity: string }) => {
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

  return <div>
    Permitido a assistir
  </div>

};

export default UserViewerToken;