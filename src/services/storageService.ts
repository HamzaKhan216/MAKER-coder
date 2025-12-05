/**
 * @file src/services/storageService.ts
 * @description A localStorage wrapper service that centralizes all interactions with localStorage.
 * Handles JSON serialization/deserialization for stored values.
 */

/**
 * Sets an item in localStorage, serializing the value to JSON.
 * @param key The key under which to store the item.
 * @param value The value to store. Can be any serializable type.
 * @returns void
 */
export function set<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item with key "${key}" in localStorage:`, error);
    // Depending on the application, you might want to throw the error or notify the user.
  }
}

/**
 * Retrieves an item from localStorage, deserializing it from JSON.
 * @param key The key of the item to retrieve.
 * @returns The deserialized value of type T, or null if the item does not exist, cannot be parsed, or an error occurs.
 */
export function get<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null; // Item not found
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting or parsing item with key "${key}" from localStorage:`, error);
    return null; // Return null on error during retrieval or parsing
  }
}

/**
 * Removes an item from localStorage.
 * @param key The key of the item to remove.
 * @returns void
 */
export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item with key "${key}" from localStorage:`, error);
  }
}

/**
 * Clears all items from localStorage managed by this service (or any other).
 * Use with caution, as this will remove ALL data in localStorage for the current domain.
 * @returns void
 */
export function clearAll(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing all items from localStorage:', error);
  }
}

/**
 * Exports all data currently stored in localStorage as a single JSON string.
 * Each key-value pair is included. Values that were stored as JSON will be parsed;
 * otherwise, they will be included as raw strings.
 * @returns A JSON string representing all key-value pairs in localStorage.
 */
export function exportAllData(): string {
  try {
    const allData: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        try {
          // Attempt to parse the value if it looks like JSON
          allData[key] = value ? JSON.parse(value) : null;
        } catch (parseError) {
          // If parsing fails, store as a raw string
          allData[key] = value;
        }
      }
    }
    // Return pretty-printed JSON for readability
    return JSON.stringify(allData, null, 2);
  } catch (error) {
    console.error('Error exporting all data from localStorage:', error);
    return JSON.stringify({}); // Return an empty object string on error
  }
}

/**
 * Imports data into localStorage from a JSON string.
 * This function clears existing localStorage data before importing the new data.
 * Each key-value pair from the input string is stored using the `set` function,
 * ensuring proper serialization.
 * @param data A JSON string representing the data to import.
 * @returns void
 */
export function importAllData(data: string): void {
  try {
    const importedData: { [key: string]: any } = JSON.parse(data);

    // Optionally clear existing data before importing
    clearAll();

    for (const key in importedData) {
      if (Object.prototype.hasOwnProperty.call(importedData, key)) {
        // Use the `set` function to ensure values are properly serialized before storage
        set(key, importedData[key]);
      }
    }
    console.log('Successfully imported data into localStorage.');
  } catch (error) {
    console.error('Error importing data into localStorage:', error);
  }
}
