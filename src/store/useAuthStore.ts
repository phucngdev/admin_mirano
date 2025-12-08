import { create } from 'zustand';
import { logger } from './logger';
import type { UserEntity } from '#/api/requests';

interface AuthState {
  user: UserEntity;
  businessId: string;
}

export interface AuthStore extends AuthState {
  setUser: (args: AuthState['user']) => void;
  setBusinessId: (businessId: string) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  businessId: '',
  user: {} as UserEntity,
};

const useAuthStore = create<AuthStore>()(
  logger<AuthStore>(
    set => ({
      ...initialState,
      setBusinessId: businessId => {
        set(() => ({ businessId }));
      },
      setUser: user => {
        set(() => ({ user }));
      },
    }),
    'authStore',
  ),
);

export default useAuthStore;
