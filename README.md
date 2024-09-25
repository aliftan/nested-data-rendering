# Netflix User Data Table

## Overview

This project is a data visualization tool for analyzing Netflix user data. It demonstrates how to handle and display nested data structures efficiently using SolidJS, a modern JavaScript library for building user interfaces.

## Key Features

- Visualizes complex, nested Netflix user data
- Allows grouping by country or genre
- Implements filtering by search term, country, and genre
- Utilizes responsive design with Tailwind CSS
- Optimizes performance with SolidJS signals and memoization

## Data Structure

The application works with a nested data structure:

- Countries
  - Genres
    - Users
      - Watch History

## Main Components

1. `App`: The main component that manages the overall state and layout.
2. `Sidebar`: Handles filtering options and grouping selection.
3. `MainContent`: Displays the filtered and grouped data.
4. `GenreTable`: Shows genre-specific information when grouped by country.
5. `UserTable`: Displays user-specific information when grouped by genre.

## Key Implementations

- **Data Filtering**: Implemented in `utils/filters.ts`, allowing for efficient filtering of the nested data structure.
- **Dynamic Grouping**: Users can switch between grouping by country or genre, demonstrating flexible data manipulation.
- **Expandable Items**: Users can expand/collapse country or genre entries to view more detailed information.
- **Performance Optimization**: Utilizes SolidJS's reactive system for efficient updates and rendering.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Run the development server: `npm run dev` or `pnpm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Learn More

To learn more about SolidJS, check out the [Solid Documentation](https://www.solidjs.com/docs/latest/api).

## Contact

For any questions or feedback, please contact:

Email: aliftan29@gmail.com