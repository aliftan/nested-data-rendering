import { Component, For } from 'solid-js';
import { WatchHistoryItem } from '../types';

const WatchHistoryTable: Component<{ watchHistory: WatchHistoryItem[] }> = (props) => (
    <table class="min-w-full bg-white border">
        <thead>
            <tr>
                <th class="px-4 py-2 text-left bg-gray-200 border-b">Title</th>
                <th class="px-4 py-2 text-left bg-gray-200 border-b">Watched Date</th>
            </tr>
        </thead>
        <tbody>
            <For each={props.watchHistory}>
                {(item) => (
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-2 border-b">{item.title}</td>
                        <td class="px-4 py-2 border-b">{item.watched_date}</td>
                    </tr>
                )}
            </For>
        </tbody>
    </table>
);

export default WatchHistoryTable;