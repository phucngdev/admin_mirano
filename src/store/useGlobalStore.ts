/*
 * import {
 *   getLocalStorageItem,
 *   setLocalStorageItem,
 * } from '#/shared/utils/localStorage';
 * import { create } from 'zustand';
 * import { logger } from './logger';
 */

/*
 * interface GlobalState {
 *   isMenuOpen: boolean;
 * }
 */

/*
 * export interface GlobalStore extends GlobalState {
 *   toggleMenu: () => void;
 * }
 */

/*
 * const initialState: Pick<GlobalStore, keyof GlobalState> = {
 *   isMenuOpen: getLocalStorageItem('isMenuOpen') ?? false,
 * };
 */

/*
 * const useGlobalStore = create<GlobalStore>()(
 *   logger<GlobalStore>(
 *     set => ({
 *       ...initialState,
 *       toggleMenu: () => {
 *         set(state => {
 *           setLocalStorageItem('isMenuOpen', !state.isMenuOpen);
 *           return { isMenuOpen: !state.isMenuOpen };
 *         });
 *       },
 *     }),
 *     'globalStore',
 *   ),
 * );
 */

// export default useGlobalStore;
