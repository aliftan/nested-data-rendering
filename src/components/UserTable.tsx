import { Component, For, Show, createSignal } from 'solid-js';
import { User } from '../types';
import WatchHistoryTable from './WatchHistoryTable';

const UserTable: Component<{ users: User[] }> = (props) => {
    const [expandedUsers, setExpandedUsers] = createSignal<Set<string>>(new Set());

    const toggleUser = (email: string) => {
        setExpandedUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(email)) newSet.delete(email);
            else newSet.add(email);
            return newSet;
        });
    };

    return (
        <table class="min-w-full bg-white border">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Name</th>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Email</th>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Birthdate</th>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Subscription Date</th>
                    <th class="px-4 py-2 text-left bg-gray-200 border-b">Watch History</th>
                </tr>
            </thead>
            <tbody>
                <For each={props.users}>
                    {(user) => (
                        <>
                            <tr class="hover:bg-gray-50 cursor-pointer" onClick={() => toggleUser(user.email)}>
                                <td class="px-4 py-2 border-b">{user.name}</td>
                                <td class="px-4 py-2 border-b">{user.email}</td>
                                <td class="px-4 py-2 border-b">{user.birthdate}</td>
                                <td class="px-4 py-2 border-b">{user.subscription_date}</td>
                                <td class="px-4 py-2 border-b">
                                    {expandedUsers().has(user.email) ? '▼' : '▶'} {user.watch_history.length} items
                                </td>
                            </tr>
                            <Show when={expandedUsers().has(user.email)}>
                                <tr>
                                    <td colSpan={5} class="px-4 py-2 border-b">
                                        <WatchHistoryTable watchHistory={user.watch_history} />
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

export default UserTable;