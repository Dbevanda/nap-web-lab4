import { defineStore } from 'pinia';

export const useEventStore = defineStore('eventStore', {
    state: () => ({
        events: {
            '2025-01-01': [
                { name: 'New Year Party', description: 'Celebration at home', importance: 'High' },
                { name: 'Family Lunch', description: 'Lunch with family', importance: 'Medium' },
            ],
            '2025-01-10': [
                { name: 'Project Deadline', description: 'Submit project to client', importance: 'High' },
            ],
        },
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
        getAllEvents() {
            return Object.entries(this.events).flatMap(([date, events]) => {
                return events.map((event) => ({
                    date,
                    name: event.name,
                }));
            });
        },
    },
});