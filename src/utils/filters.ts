import { AppData, CountryData, Genre } from '../types';

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

export const getAllCountries = (data: AppData): string[] => {
    return [...new Set(data.map(country => country.country))].sort();
};

export const getAllGenres = (data: AppData): string[] => {
    return [...new Set(data.flatMap(country => country.genres.map(genre => genre.genre)))].sort();
};

export const toggleSetItem = <T>(set: Set<T>, item: T): Set<T> => {
    const newSet = new Set(set);
    if (newSet.has(item)) {
        newSet.delete(item);
    } else {
        newSet.add(item);
    }
    return newSet;
};