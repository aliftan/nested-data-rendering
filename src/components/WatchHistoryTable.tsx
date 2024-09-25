import { Component, For } from 'solid-js';
import { WatchHistoryItem } from '../types';

/**
 * WatchHistoryTable Component
 * 
 * This component renders a table of watch history items for a user.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {WatchHistoryItem[]} props.watchHistory - Array of watch history items to display
 * 
 * @example
 * <WatchHistoryTable watchHistory={userWatchHistory} />
 */
const WatchHistoryTable: Component<{ watchHistory: WatchHistoryItem[] }> = (props) => (
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watched Date</th>
            </tr>
        </thead>
        <tbody class='bg-white divide-y divide-gray-200'>
            <For each={props.watchHistory}>
                {(item) => (
                    <tr class="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer">
                        <td class="px-6 py-4 whitespace-nowrap">{item.title}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{item.watched_date}</td>
                    </tr>
                )}
            </For>
        </tbody>
    </table>
);

export default WatchHistoryTable;

/**
 * Additional Component Documentation
 * 
 * Structure:
 * - Renders a simple table with columns for title and watched date.
 * 
 * Key Features:
 * - Efficient rendering of watch history items using SolidJS's `For` component.
 * 
 * Performance Considerations:
 * - Lightweight component suitable for rendering within expandable sections.
 * - For users with extensive watch histories, consider implementing pagination or virtualization.
 * 
 * Accessibility:
 * - TODO: Add proper ARIA labels for the table structure.
 * 
 * Future Improvements:
 * - Add sorting functionality for columns.
 * - Implement filtering options for watch history items.
 */