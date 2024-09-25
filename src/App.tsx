import { Component, createSignal } from 'solid-js';
import { AppData } from './types';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { useLoadTime } from './hooks/useLoadTime';
import { filteredData, getAllCountries, getAllGenres, toggleSetItem } from './utils/filters';

const App: Component<{ data: AppData }> = (props) => {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [expandedItems, setExpandedItems] = createSignal<Set<string>>(new Set());
  const [groupBy, setGroupBy] = createSignal<'country' | 'genre'>('country');
  const [selectedCountries, setSelectedCountries] = createSignal<Set<string>>(new Set());
  const [selectedGenres, setSelectedGenres] = createSignal<Set<string>>(new Set());

  const loadTime = useLoadTime();

  const allCountries = () => getAllCountries(props.data);
  const allGenres = () => getAllGenres(props.data);

  const toggleItem = (item: string) => {
    setExpandedItems(prev => toggleSetItem(prev, item));
  };

  const toggleCountryFilter = (country: string) => {
    setSelectedCountries(prev => toggleSetItem(prev, country));
  };

  const toggleGenreFilter = (genre: string) => {
    setSelectedGenres(prev => toggleSetItem(prev, genre));
  };

  const resetFilters = () => {
    setSelectedCountries(() => new Set<string>());
    setSelectedGenres(() => new Set<string>());
    setSearchTerm('');
  };

  const getFilteredData = () => filteredData(
    props.data,
    groupBy(),
    searchTerm(),
    selectedCountries(),
    selectedGenres()
  );

  return (
    <div class="flex h-screen bg-gray-100">
      <Sidebar
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        allCountries={allCountries}
        allGenres={allGenres}
        selectedCountries={selectedCountries}
        selectedGenres={selectedGenres}
        toggleCountryFilter={toggleCountryFilter}
        toggleGenreFilter={toggleGenreFilter}
        resetFilters={resetFilters}
      />
      <MainContent
        groupBy={groupBy}
        searchTerm={searchTerm()}
        setSearchTerm={setSearchTerm}
        filteredData={getFilteredData}
        expandedItems={expandedItems}
        toggleItem={toggleItem}
        loadTime={loadTime}
      />
    </div>
  );
};

export default App;