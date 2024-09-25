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
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Birthdate</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Date</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watch History</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <For each={props.users}>
                    {(user) => (
                        <>
                            <tr class="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => toggleUser(user.email)}>
                                <td class="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{user.birthdate}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{user.subscription_date}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {expandedUsers().has(user.email) ? '▼' : '▶'} {user.watch_history.length} items
                                    </span>
                                </td>
                            </tr>
                            <Show when={expandedUsers().has(user.email)}>
                                <tr>
                                    <td colSpan={5} class="px-6 py-4">
                                        <div class="bg-gray-50 rounded-lg p-4">
                                            <WatchHistoryTable watchHistory={user.watch_history} />
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

export default UserTable;