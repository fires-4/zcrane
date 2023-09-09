import {nanoid} from "nanoid";

interface EventOption {
    [key: string]: (...args: any) => void
}

export class ZCrane<T> {

    eventMap: Map<string | number | symbol, EventOption>
    private idLen: number = 64

    constructor() {
        this.eventMap = new Map()
    }

    /**
     * 订阅事件
     * @param eventName
     * @param handler
     * @return {string} 返回一个key。用于标识该订阅
     */
    on<Events extends keyof T>(eventName: Events, handler: (option?: T[Events]) => void): string {
        const eventMap = this.eventMap.get(eventName) || {}
        const handlerKey = nanoid(this.idLen)
        eventMap[handlerKey] = handler
        this.eventMap.set(eventName, eventMap)
        return handlerKey
    }

    /**
     * 发布事件
     * @param eventName
     * @param option
     */
    emit<Events extends keyof T>(eventName: Events, option?: T[Events]) {
        const eventMap = this.eventMap.get(eventName)
        const handlerList = Object.values(eventMap || {})
        for (const handler of handlerList) {
            handler(option)
        }
    }

    /**
     * 根据key取消一个订阅
     * @param key
     */
    off(key: string) {
        const eventsIterator = this.eventMap.values()
        let isDone:boolean = false
        while (!isDone) {
            const {value, done} = eventsIterator.next()
            if (!value) return isDone = false
            for (const eventKey in value) {
                if (eventKey === key) {
                    delete value[key]
                }
            }
            isDone = done as boolean
        }
    }

    /**
     * 取消某个事件的所有订阅
     * @param eventName
     */
    offAll(eventName: keyof T) {
        this.eventMap.delete(eventName)
    }

    /**
     * 清除所有订阅
     */
    clear() {
        this.eventMap.clear()
    }
}
