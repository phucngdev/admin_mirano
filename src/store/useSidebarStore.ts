import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
}

export interface SidebarStore extends SidebarState {
  setIsCollapsed: (args: SidebarState['isCollapsed']) => void;
}

const initialState: Pick<SidebarStore, keyof SidebarState> = {
  isCollapsed: false,
};

const useSidebarStore = create<SidebarStore>()(
  persist(
    set => ({
      ...initialState,
      setIsCollapsed: isCollapsed => {
        set(() => ({ isCollapsed }));
      },
    }),
    {
      name: 'sidebar-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSidebarStore;
