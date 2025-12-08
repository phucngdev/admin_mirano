/**
 * Retrieves an item from the local storage based on the specified key.
 *
 * @param {string} key - The key used to identify the item in the local storage.
 * @return {string | null} The value associated with the specified key, or null if the key does not exist.
 */
export const getLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') return localStorage.getItem(key);
};

/**
 * Sets a value in the local storage for a given key.
 *
 * @param {string} key - The key to set the value for.
 * @param {string} value - The value to set.
 * @return {void} This function does not return anything.
 */
export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') return localStorage.setItem(key, value);
};

/**
 * Removes an item from the local storage based on the provided key.
 *
 * @param {string} key - The key of the item to be removed from local storage.
 * @return {void} - This function does not return anything.
 */
export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') return localStorage.removeItem(key);
};

export const removeLocalStorage = () => {
  if (typeof window !== 'undefined') return localStorage.clear();
};
