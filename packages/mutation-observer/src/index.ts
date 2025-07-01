export type MutationObserverCallback = (
    entries: MutationRecord[],
    observer: MutationObserver
) => void;

/**
 * A wrapper around the MutationObserver API that allows you to use it
 * with a callback or as an event listener.
 *
 * Example usage:
 * ```javascript
 * import { mutationObserver } from '@mplabs/mutation-observer';
 * const node = document.getElementById('my-node');
 * // // Using a callback
 * mutationObserver(node, {
 *  callback: ({ entry, entries, observer }) => {
 *      // Handle mutations
 *  }
 * });
 * // // Using as an event listener
 * mutationObserver(node, {
 *  attributes: true,
 *  childList: true,
 *  subtree: true,
 * });
 * node.addEventListener('mutation', (event) => {
 *  const { entry, entries, observer } = event.detail;
 *  // Handle mutations
 * });
 * ````
 * @param node - The node to observe for mutations.
 * @param options - The options for the MutationObserver. If a callback is provided, it
 * will be called with the entries and observer when mutations are observed.
 * If no callback is provided, a 'mutation' event will be dispatched on the node
 * with the details of the mutation.
 * @returns An object with a `disconnect` method that can be called to stop observing mutations.
 * The `disconnect` method will also process any unprocessed records before disconnecting.
 */
export function mutationObserver(
    node: HTMLElement,
    options: MutationObserverInit & { callback?: MutationObserverCallback } = {}
): { disconnect: () => void } {
    const observer = new MutationObserver(observerFn);
    const { callback, ...opts } = options;
    observer.observe(node, opts);

    return {
        disconnect() {
            const unprocessedRecords = observer.takeRecords();
            observer.disconnect();
            if (unprocessedRecords.length > 0) {
                observerFn(unprocessedRecords);
            }
        },
    };

    ////////////

    function observerFn(entries: MutationRecord[]) {
        for (const entry of entries) {
            // Callback pattern
            if (callback !== undefined) {
                callback(entries, observer);
            }
            // Event listener pattern
            else {
                node.dispatchEvent(
                    new CustomEvent('mutation', { detail: { entry, entries, observer } })
                );
            }
        }
    }
}
