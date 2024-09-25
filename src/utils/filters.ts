import { AppData, CountryData, Genre } from '../types';

/**
 * Filters and groups the application data based on various criteria.
 * 
 * @param {AppData} data - The full dataset to be filtered.
 * @param {'country' | 'genre'} groupBy - The grouping criterion.
 * @param {string} searchTerm - The search term to filter users.
 * @param {Set<string>} selectedCountries - Set of selected countries for filtering.
 * @param {Set<string>} selectedGenres - Set of selected genres for filtering.
 * @returns {(CountryData | Genre)[]} Filtered and grouped data.
 */
export const filteredData = (
    data: AppData,
    groupBy: 'country' | 'genre',
    searchTerm: string,
    selectedCountries: Set<string>,
    selectedGenres: Set<string>
): (CountryData | Genre)[] => {
    const searchTermLower = searchTerm.toLowerCase();

    if (groupBy === 'country') {
        return data.filter(country =>
            (selectedCountries.size === 0 || selectedCountries.has(country.country)) &&
            (country.country.toLowerCase().includes(searchTermLower) ||
                country.genres.some(genre =>
                    (selectedGenres.size === 0 || selectedGenres.has(genre.genre)) &&
                    (genre.genre.toLowerCase().includes(searchTermLower) ||
                        genre.users.some(user =>
                            user.name.toLowerCase().includes(searchTermLower) ||
                            user.email.toLowerCase().includes(searchTermLower)
                        ))
                ))
        );
    } else {
        const allGenres: Genre[] = [];
        data.forEach(country => {
            if (selectedCountries.size === 0 || selectedCountries.has(country.country)) {
                country.genres.forEach(genre => {
                    const existingGenre = allGenres.find(g => g.genre === genre.genre);
                    if (existingGenre) {
                        existingGenre.users.push(...genre.users);
                    } else {
                        allGenres.push({ ...genre, users: [...genre.users] });
                    }
                });
            }
        });

        return allGenres.filter(genre =>
            (selectedGenres.size === 0 || selectedGenres.has(genre.genre)) &&
            (genre.genre.toLowerCase().includes(searchTermLower) ||
                genre.users.some(user =>
                    user.name.toLowerCase().includes(searchTermLower) ||
                    user.email.toLowerCase().includes(searchTermLower)
                ))
        );
    }
};

/**
 * Extracts and returns a sorted array of all unique countries from the dataset.
 * 
 * @param {AppData} data - The full dataset.
 * @returns {string[]} Sorted array of unique country names.
 */
export const getAllCountries = (data: AppData): string[] => {
    return [...new Set(data.map(country => country.country))].sort();
};

/**
 * Extracts and returns a sorted array of all unique genres from the dataset.
 * 
 * @param {AppData} data - The full dataset.
 * @returns {string[]} Sorted array of unique genre names.
 */
export const getAllGenres = (data: AppData): string[] => {
    return [...new Set(data.flatMap(country => country.genres.map(genre => genre.genre)))].sort();
};

/**
 * Toggles an item in a Set. If the item exists, it's removed; if not, it's added.
 * 
 * @param {Set<T>} set - The original Set.
 * @param {T} item - The item to toggle.
 * @returns {Set<T>} A new Set with the item toggled.
 */
export const toggleSetItem = <T>(set: Set<T>, item: T): Set<T> => {
    const newSet = new Set(set);
    if (newSet.has(item)) {
        newSet.delete(item);
    } else {
        newSet.add(item);
    }
    return newSet;
};

/**
 * Additional Module Documentation
 * 
 * Purpose:
 * - Provides utility functions for filtering, grouping, and manipulating the application's data.
 * - Centralizes data processing logic for consistent use across components.
 * 
 * Key Functions:
 * - filteredData: Core function for filtering and grouping data based on user selections.
 * - getAllCountries/getAllGenres: Extract unique values for filter options.
 * - toggleSetItem: Generic utility for toggling items in a Set, used for filter selections.
 * 
 * Performance Considerations:
 * - filteredData function may be computationally expensive for large datasets.
 *   Consider memoization or pagination for performance optimization.
 * 
 * Usage Notes:
 * - These functions are designed to be used with SolidJS's reactive system.
 * - Ensure that the AppData type accurately reflects the structure of your data.
 * 
 * Future Improvements:
 * - Implement more advanced search algorithms for better performance with large datasets.
 * - Add support for additional grouping and filtering criteria as needed.
 * - Consider implementing fuzzy search for more flexible user search capabilities.
 */