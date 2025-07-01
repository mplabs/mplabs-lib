export type IntersectionObserverCallback = (params: {
    entry: IntersectionObserverEntry;
    entries: IntersectionObserverEntry[];
    observer: IntersectionObserver;
}) => void;

/**
 * Create an IntersectionObserver for a specific DOM element.
 * This function allows you to use the IntersectionObserver API with a callback or as an event listener.
 * Example usage:
 * ```javascript
 * import { intersectionObserver } from '@mplabs/intersection-observer';
 * const node = document.getElementById('my-node');
 * // Using a callback
 * intersectionObserver(node, {
 *   callback: ({ entry, entries, observer }) => {
 *     // Handle intersection
 *   }
 * });
 * // Using as an event listener
 * intersectionObserver(node, {
 *   root: null,
 *   rootMargin: '0px',
 *   threshold: 0.1,
 *   callback: undefined, // No callback, use event listener instead
 * });
 * node.addEventListener('intersection', (event) => {
 *   const { entry, entries, observer } = event.detail;
 *   // Handle intersection
 * });
 * ```
 * @param node - The DOM element to observe for intersection events.
 * @param options - The options for the IntersectionObserver. If a callback is provided, it
 * will be called with the entries and observer when an intersection is observed.
 * If no callback is provided, an 'intersection' event will be dispatched on the node
 * with the details of the intersection.
 * @returns An object with `unobserve`, `disconnect`, and `takeRecords` methods that can be used to manage the observer.
 * The `unobserve` method stops observing the node, the `disconnect` method stops observing all nodes and processes any unprocessed records,
 * and the `takeRecords` method retrieves the records that have not yet been processed.
 */
export function intersectionObserver(
    node: HTMLElement,
    options: IntersectionObserverInit & {
        callback?: IntersectionObserverCallback;
    } = {}
) {
    const { callback, ...opts } = options;
    const observer = new IntersectionObserver(observerFn, opts);
    observer.observe(node);

    return {
        unobserve() {
            observer.unobserve(node);
        },

        disconnect() {
            // Take records before disconnecting
            const unprocessedRecords = observer.takeRecords();
            observer.disconnect();
            if (unprocessedRecords.length > 0) {
                observerFn(unprocessedRecords, observer);
            }
        },

        takeRecords() {
            return observer.takeRecords();
        },
    };

    /////////////

    function observerFn(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        for (const entry of entries) {
            // Callback pattern
            if (callback !== undefined) {
                callback({ entry, entries, observer });
            }
            // Event listener pattern
            else {
                node.dispatchEvent(
                    new CustomEvent('intersection', {
                        detail: { entry, entries, observer },
                    })
                );
            }
        }
    }
}
