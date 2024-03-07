import { create } from "zustand";

export interface StreamCredenctials {
    token: string;
    identity: string;
    name: string;
    setToke: (newToken: string) => void;
    setNome: (newName: string) => void;
    setIdentitie: (newIdentity: string) => void;
};

export const useStreamCredentials = create<StreamCredenctials>((set) => ({
    identity: "",
    name: "",
    token: "",
    setIdentitie: (newIdentity: string) => set((state) => ({ ...state, identity: newIdentity })),
    setNome: (newName: string) => set((state) => ({ ...state, name: newName })),
    setToke: (newToken: string) => set((state) => ({ ...state, token: newToken }))
}));