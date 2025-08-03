export function getFocusableElements(container = document.body) {
    return {
        get all() {
            const elements = Array.from(
                container.querySelectorAll(
                    `a[href],
                    button:not([disabled]), button:not([hidden]),
                    input:not([type="hidden"]), input:not([disabled]), input:not([hidden]),
                    select:not([disabled]), select:not([hidden]),
                    textarea:not([disabled]), textarea:not([hidden]),
                    details:not([disabled]), details:not([hidden]),
                    iframe:not([disabled]), iframe:not([hidden]),
                    embed:not([disabled]), embed:not([hidden]),
                    object:not([disabled]), object:not([hidden]),
                    summary:not([disabled]), summary:not([hidden]),
                    dialog:not([disabled]), dialog:not([hidden]),
                    audio[controls]:not([disabled]), audio[controls]:not([hidden]),
                    video[controls]:not([disabled]), video[controls]:not([hidden]),
                    [contenteditable]:not([contenteditable="false"]),
                    [tabindex]`
                )
            ) as HTMLElement[];
            
            return elements.filter(el =>
                window.getComputedStyle(el).display !== 'none' &&
                el.offsetWidth > 0 &&
                el.offsetHeight > 0)
        },

        get keyboardOnly() {
            return this.all.filter(el => el.tabindex > -1)
        },

        get first() {
            return this.keyboardOnly[0] || null
        },

        get last() {
            return this.keyboardOnly[this.keyboardOnly.length - 1] || null
        }
    }
}

export function isTab(event: KeyboardEvent) {
    return !event.shiftKey &&  event.key === 'Tab'
}

export function isShiftTab(event: KeyboardEvent) {
    return event.shiftKey && event.key === 'Tab'
}

export function trapFocus({ event, focusables }: {
    event: KeyboardEvent,
    focusables: ReturnType<typeof getFocusableElements>
}) {
    if (document.activeElement === focusables.last && isTab(event)) {
        focusables.first?.focus();
        event.preventDefault();
    } else if (document.activeElement === focusables.first && isShiftTab(event)) {
        focusables.last?.focus();
        event.preventDefault();
    }
}
