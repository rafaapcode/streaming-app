import { create } from "zustand";

export interface CreatorSidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
};

export const useCreatorSidebar = create<CreatorSidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}));