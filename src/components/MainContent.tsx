import { Component, For, Show } from 'solid-js';
import { CountryData, Genre, User } from '../types';
import GenreTable from './GenreTable';
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

/**
 * MainContent Component
 * 
 * This component is responsible for rendering the main content area of the application,
 * including the search functionality, data grouping, and expandable item lists.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {() => 'country' | 'genre'} props.groupBy - Function returning the current grouping mode
 * @param {string} props.searchTerm - Current search term
 * @param {(value: string) => void} props.setSearchTerm - Function to update the search term
 * @param {() => (CountryData | Genre)[]} props.filteredData - Function returning the filtered data based on current filters
 * @param {() => Set<string>} props.expandedItems - Function returning the set of currently expanded items
 * @param {(item: string) => void} props.toggleItem - Function to toggle the expanded state of an item
 * @param {() => number} props.loadTime - Function returning the load time of the data
 * 
 * @example
 * <MainContent
 *   groupBy={groupBy}
 *   searchTerm={searchTerm}
 *   setSearchTerm={setSearchTerm}
 *   filteredData={filteredData}
 *   expandedItems={expandedItems}
 *   toggleItem={toggleItem}
 *   loadTime={loadTime}
 * />
 */
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
        <div class="flex-1 p-8 overflow-auto bg-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-3xl font-bold text-gray-800">Netflix User Data</h1>
                <p class="text-sm text-gray-600">⌛ Load time: {props.loadTime().toFixed(2)}ms</p>
            </div>
            <div class="mb-6">
                <input
                    type="text"
                    value={props.searchTerm}
                    onInput={(e) => props.setSearchTerm(e.currentTarget.value)}
                    placeholder="Search name, email..."
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <Show when={props.searchTerm !== ''} fallback={
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-200 text-gray-700">
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{props.groupBy() === 'country' ? 'Country' : 'Genre'}</th>
                                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <For each={props.filteredData()}>
                                {(item) => (
                                    <>
                                        <tr 
                                            class="cursor-pointer hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                            onClick={() => props.toggleItem(props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre)}
                                        >
                                            <td class="px-6 py-4 whitespace-nowrap">{props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {props.expandedItems().has(props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre) ? '▼' : '▶'}
                                                    {props.groupBy() === 'country' ? (item as CountryData).genres.length + ' genres' : (item as Genre).users.length + ' users'}
                                                </span>
                                            </td>
                                        </tr>
                                        <Show when={props.expandedItems().has(props.groupBy() === 'country' ? (item as CountryData).country : (item as Genre).genre)}>
                                            <tr>
                                                <td colSpan={2} class="px-6 py-4">
                                                    {props.groupBy() === 'country' 
                                                        ? <GenreTable genres={(item as CountryData).genres} />
                                                        : <UserTable users={(item as Genre).users} />
                                                    }
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

/**
 * Additional Component Documentation
 * 
 * Structure:
 * - Renders a search input, data table, and conditional user table based on search results.
 * - Displays load time for performance monitoring.
 * 
 * Key Features:
 * - Dynamic grouping by country or genre.
 * - Search functionality across user names and emails.
 * - Expandable/collapsible rows for detailed information.
 * 
 * State Management:
 * - Utilizes props for state management, following a unidirectional data flow.
 * 
 * Performance Considerations:
 * - Uses SolidJS's `For` component for efficient list rendering.
 * - Implements conditional rendering to optimize for large datasets.
 * 
 * Accessibility:
 * - TODO: Enhance keyboard navigation for the data table.
 * - TODO: Add proper ARIA labels for interactive elements.
 * 
 * Future Improvements:
 * - Implement virtualization for handling very large datasets.
 * - Add sorting capabilities for columns.
 */