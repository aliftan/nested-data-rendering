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
        <table class="min-w-full bg-white border">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Genre</th>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Users</th>
                </tr>
            </thead>
            <tbody>
                <For each={props.genres}>
                    {(genre) => (
                        <>
                            <tr class="hover:bg-gray-50 cursor-pointer" onClick={() => toggleGenre(genre.genre)}>
                                <td class="px-4 py-2 border-b">{genre.genre}</td>
                                <td class="px-4 py-2 border-b">
                                    {expandedGenres().has(genre.genre) ? '▼' : '▶'} {genre.users.length} users
                                </td>
                            </tr>
                            <Show when={expandedGenres().has(genre.genre)}>
                                <tr>
                                    <td colSpan={2} class="px-4 py-2 border-b">
                                        <UserTable users={genre.users} />
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