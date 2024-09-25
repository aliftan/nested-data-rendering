import { createSignal, createEffect } from 'solid-js';

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