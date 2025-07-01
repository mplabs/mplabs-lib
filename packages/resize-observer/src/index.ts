export type ResizeObserverCallback = (params: {
    entry: ResizeObserverEntry;
    entries: ResizeObserverEntry[];
    observer: ResizeObserver;
}) => void;

/**
 * Create a ResizeObserver for a specific DOM element.
 * This function allows you to use the ResizeObserver API with a callback or as an event listener.
 * Example usage:
 * ```javascript
 * import { resizeObserver } from '@mplabs/resize-observer';
 * const node = document.getElementById('my-node');
 * // Using a callback
 * resizeObserver(node, {
 *   callback: ({ entry, entries, observer }) => {
 *     // Handle resize
 *   }
 * });
 * // Using as an event listener
 * resizeObserver(node, {
 *   box: 'border-box',
 *   callback: undefined, // No callback, use event listener instead
 * });
 * node.addEventListener('resize', (event) => {
 *   const { entry, entries, observer } = event.detail;
 *   // Handle resize
 * });
 * ```
 * @param node - The DOM element to observe for resize events.
 * @param options - The options for the ResizeObserver. If a callback is provided, it
 * will be called with the entries and observer when a resize is observed.
 * If no callback is provided, a 'resize' event will be dispatched on the node
 * with the details of the resize.
 * * @returns An object with a `disconnect` method that can be called to stop observing resizes.
 * The `disconnect` method will also process any unprocessed records before disconnecting.
 */
export function resizeObserver(
    node: HTMLElement,
    options: ResizeObserverOptions & { callback?: ResizeObserverCallback } = {}
): { disconnect: () => void; unobserve: () => void } {
    const { callback, ...opts } = options;
    const observer = new ResizeObserver(observerFn);
    observer.observe(node, opts);

    return {
        unobserve() {
            observer.unobserve(node);
        },

        disconnect() {
            observer.disconnect();
        },
    };

    ////////////

    function observerFn(entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
            // Callback pattern
            if (callback !== undefined) {
                callback({ entry, entries, observer });
            }
            // Event listener pattern
            else {
                node.dispatchEvent(
                    new CustomEvent('resize', { detail: { entry, entries, observer } })
                );
            }
        }
    }
}
