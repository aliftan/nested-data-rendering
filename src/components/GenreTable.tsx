import { Component, For, Show, createSignal } from 'solid-js';
import { Genre } from '../types';
import UserTable from './UserTable';

const GenreTable: Component<{ genres: Genre[] }> = (props) => {
    const [expandedGenres, setExpandedGenres] = createSignal<Set<string>>(new Set());

    const toggleGenre = (genre: string) => {
        setExpandedGenres(prev => {
            const newSet = new Set(prev);
            if (newSet.has(genre)) newSet.delete(genre);
            else newSet.add(genre);
            return newSet;
        });
    };

    return (
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <For each={props.genres}>
                    {(genre) => (
                        <>
                            <tr class="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => toggleGenre(genre.genre)}>
                                <td class="px-6 py-4 whitespace-nowrap">{genre.genre}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {expandedGenres().has(genre.genre) ? '▼' : '▶'} {genre.users.length} users
                                    </span>
                                </td>
                            </tr>
                            <Show when={expandedGenres().has(genre.genre)}>
                                <tr>
                                    <td colSpan={2} class="px-6 py-4">
                                        <div class="bg-gray-50 rounded-lg p-4">
                                            <UserTable users={genre.users} />
                                        </div>
                                    </td>
                                </tr>
                            </Show>
                        </>
                    )}
                </For>
            </tbody>
        </table>
    );
};

export default GenreTable;