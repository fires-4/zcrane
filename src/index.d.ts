interface ZCraneInterface<T> {
    eventMap: Map<unknown, unknown>

    on: <Events extends keyof T>(eventName: Events, handler: (options?: T[Events]) => void) => string

    emit: <Events extends keyof T>(eventName: Events, option?: T[Events]) => void

    offAll: <Events extends keyof T>(eventName: Events) => void

    off: (key: string) => void

    clear: () => void
}


