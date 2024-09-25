import { Component, For, Show } from 'solid-js';

interface SidebarProps {
    groupBy: () => 'country' | 'genre';
    setGroupBy: (value: 'country' | 'genre') => void;
    allCountries: () => string[];
    allGenres: () => string[];
    selectedCountries: () => Set<string>;
    selectedGenres: () => Set<string>;
    toggleCountryFilter: (country: string) => void;
    toggleGenreFilter: (genre: string) => void;
    resetFilters: () => void;
}

/**
 * Sidebar Component
 * 
 * This component renders the sidebar containing filter options for the application.
 * It allows users to group data by country or genre and apply specific filters.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {() => 'country' | 'genre'} props.groupBy - Function returning the current grouping mode
 * @param {(value: 'country' | 'genre') => void} props.setGroupBy - Function to set the grouping mode
 * @param {() => string[]} props.allCountries - Function returning all available countries
 * @param {() => string[]} props.allGenres - Function returning all available genres
 * @param {() => Set<string>} props.selectedCountries - Function returning the set of selected countries
 * @param {() => Set<string>} props.selectedGenres - Function returning the set of selected genres
 * @param {(country: string) => void} props.toggleCountryFilter - Function to toggle a country filter
 * @param {(genre: string) => void} props.toggleGenreFilter - Function to toggle a genre filter
 * @param {() => void} props.resetFilters - Function to reset all filters
 * 
 * @example
 * <Sidebar
 *   groupBy={groupBy}
 *   setGroupBy={setGroupBy}
 *   allCountries={allCountries}
 *   allGenres={allGenres}
 *   selectedCountries={selectedCountries}
 *   selectedGenres={selectedGenres}
 *   toggleCountryFilter={toggleCountryFilter}
 *   toggleGenreFilter={toggleGenreFilter}
 *   resetFilters={resetFilters}
 * />
 */
const Sidebar: Component<SidebarProps> = (props) => {
    return (
        <div class="w-64 bg-white shadow-md p-4">
            <h2 class="text-xl font-bold mb-4">Filters</h2>
            <div class="mb-6">
                <h3 class="font-semibold mb-2">Group by</h3>
                <label class="flex items-center mb-2 cursor-pointer">
                    <input
                        type="radio"
                        name="groupBy"
                        value="country"
                        checked={props.groupBy() === 'country'}
                        onChange={() => props.setGroupBy('country')}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2">Country</span>
                </label>
                <label class="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="groupBy"
                        value="genre"
                        checked={props.groupBy() === 'genre'}
                        onChange={() => props.setGroupBy('genre')}
                        class="form-radio h-5 w-5 text-blue-600"
                    />
                    <span class="ml-2">Genre</span>
                </label>
            </div>

            <Show when={props.groupBy() === 'country'}>
                <div class="mb-6">
                    <h3 class="font-semibold mb-2">Countries</h3>
                    <div>
                        <For each={props.allCountries()}>
                            {(country) => (
                                <label class="flex items-center mb-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={props.selectedCountries().has(country)}
                                        onChange={() => props.toggleCountryFilter(country)}
                                        class="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span class="ml-2">{country}</span>
                                </label>
                            )}
                        </For>
                    </div>
                </div>
            </Show>

            <Show when={props.groupBy() === 'genre'}>
                <div class="mb-6">
                    <h3 class="font-semibold mb-2">Genres</h3>
                    <div class="max-h-60 overflow-y-auto">
                        <For each={props.allGenres()}>
                            {(genre) => (
                                <label class="flex items-center mb-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={props.selectedGenres().has(genre)}
                                        onChange={() => props.toggleGenreFilter(genre)}
                                        class="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span class="ml-2">{genre}</span>
                                </label>
                            )}
                        </For>
                    </div>
                </div>
            </Show>

            <button
                onClick={props.resetFilters}
                class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default Sidebar;

/**
 * Additional Component Documentation
 * 
 * Structure:
 * - Renders radio buttons for grouping selection.
 * - Displays checkboxes for country or genre filters based on the grouping mode.
 * - Includes a reset button to clear all filters.
 * 
 * Key Features:
 * - Dynamic rendering of filter options based on grouping selection.
 * - Individual toggle functionality for each filter option.
 * - Reset capability for all filters.
 * 
 * State Management:
 * - Relies on props for state, promoting a unidirectional data flow.
 * 
 * Accessibility:
 * - Uses semantic HTML elements for better screen reader support.
 * - TODO: Enhance keyboard navigation for filter options.
 * 
 * Future Improvements:
 * - Implement search functionality for filter options when the list is long.
 * - Add collapsible sections for better organization of filter options.
 */