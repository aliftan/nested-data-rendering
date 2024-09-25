import { createSignal, createEffect } from 'solid-js';

/**
 * useLoadTime Hook
 * 
 * This custom hook measures and returns the load time of a component or operation.
 * It simulates an asynchronous loading process and calculates the time taken.
 * 
 * @returns {() => number} A function that returns the current load time in milliseconds.
 * 
 * @example
 * const MyComponent = () => {
 *   const loadTime = useLoadTime();
 *   return <div>Load time: {loadTime().toFixed(2)}ms</div>;
 * };
 */
export function useLoadTime() {
    const [loadTime, setLoadTime] = createSignal(0);

    createEffect(() => {
        const start = performance.now();
        // Simulate some asynchronous loading
        setTimeout(() => {
            const end = performance.now();
            setLoadTime(end - start);
        }, 50); // Simulating 50ms load time
    });

    return loadTime;
}

/**
 * Additional Hook Documentation
 * 
 * Purpose:
 * - Provides a way to measure and display load times in components.
 * - Useful for performance monitoring and user feedback.
 * 
 * Implementation Details:
 * - Uses SolidJS's `createSignal` for state management.
 * - Utilizes `createEffect` to run the timing logic after component mounting.
 * - Simulates an asynchronous process with `setTimeout`.
 * 
 * Limitations:
 * - The current implementation uses a fixed 50ms delay. In a real-world scenario,
 *   this should be replaced with actual asynchronous operations.
 * 
 * Usage Notes:
 * - Can be used in any component where load time measurement is needed.
 * - The returned value is reactive and will update if the effect re-runs.
 * 
 * Future Improvements:
 * - Add options to customize the simulation time or replace it with real async operations.
 * - Implement error handling for more robust usage in various scenarios.
 */