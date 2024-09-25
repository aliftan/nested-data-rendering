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
                    <div class="max-h-60 overflow-y-auto">
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