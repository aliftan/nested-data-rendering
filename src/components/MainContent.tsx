import { Component, For, Show } from 'solid-js';
import { CountryData, Genre, User } from '../types';
import UserTable from './UserTable';

interface MainContentProps {
    groupBy: () => 'country' | 'genre';
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filteredData: () => (CountryData | Genre)[];
    expandedItems: () => Set<string>;
    toggleItem: (item: string) => void;
    loadTime: () => number;
}

const MainContent: Component<MainContentProps> = (props) => {
    const matchesSearch = (user: User) => {
        const searchLower = props.searchTerm.toLowerCase();
        return user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower);
    };

    const filteredUsers = () => {
        return props.filteredData().flatMap(item => {
            if (props.groupBy() === 'country') {
                return (item as CountryData).genres.flatMap(genre =>
                    genre.users.filter(matchesSearch)
                );
            } else {
                return (item as Genre).users.filter(matchesSearch);
            }
        });
    };

    return (
        <div class="flex-1 p-8 overflow-auto">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-3xl font-bold">Netflix User Data</h1>
                <p>⌛ Load time: {props.loadTime().toFixed(2)}ms</p>
            </div>
            <div class="mb-4">
                <input
                    type="text"
                    value={props.searchTerm}
                    onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
                    placeholder="Search name, email..."
                    class="p-2 border rounded w-full"
                />
            </div>
            <div class="overflow-x-auto">
                <Show when={props.searchTerm !== ''} fallback={
                    <table class="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th class="px-4 py-2 text-left bg-gray-100 border-b">{props.groupBy() === 'country' ? 'Country' : 'Genre'}</th>
                                <th class="px-4 py-2 text-left bg-gray-100 border-b">Users</th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={props.filteredData()}>
                                {(item) => (
                                    <>
                                        <tr class="cursor-pointer hover:bg-gray-50" onClick={() => props.toggleItem(props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre)}>
                                            <td class="px-4 py-2 border-b">{props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre}</td>
                                            <td class="px-4 py-2 border-b">
                                                {props.expandedItems().has(props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre) ? '▼' : '▶'}
                                                {props.groupBy() === 'country' ? (item as CountryData).genres.reduce((acc, genre) => acc + genre.users.length, 0) : (item as Genre).users.length} users
                                            </td>
                                        </tr>
                                        <Show when={props.expandedItems().has(props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre)}>
                                            <tr>
                                                <td colSpan={2} class="px-4 py-2 border-b">
                                                    <UserTable users={props.groupBy() === 'country' ? (item as CountryData).genres.flatMap(genre => genre.users) : (item as Genre).users} />
                                                </td>
                                            </tr>
                                        </Show>
                                    </>
                                )}
                            </For>
                        </tbody>
                    </table>
                }>
                    <UserTable users={filteredUsers()} />
                </Show>
            </div>
        </div>
    );
};

export default MainContent;