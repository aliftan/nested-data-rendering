/* @refresh reload */
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

import './index.css';
import App from './App';
import type { AppData } from './types';

// Import the JSON data
import netflixUsersData from './data/netflix_users_data.json';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

// Create a signal with the imported data
const [appData, setAppData] = createSignal<AppData>(netflixUsersData);

render(() => <App data={appData()} />, root!);