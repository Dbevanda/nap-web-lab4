import { defineStore } from 'pinia';

export const useEventStore = defineStore('eventStore', {
    state: () => ({
        events: {},
    }),
    actions: {
        addEvent(date, event) {
            if (!this.events[date]) {
                this.events[date] = [];
            }
            this.events[date].push(event);
        },
        deleteEvent(date, index) {
            if (this.events[date]) {
                this.events[date].splice(index, 1);
            }
        },
        async fetchEvents(date) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.events[date] || []);
                }, 1000);
            });
        },
        getEvents(date) {
            return this.events[date] || [];
        },
    },
});