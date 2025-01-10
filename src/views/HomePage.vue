<template>
  <div class="homepage">
    <h1>📅 Event Calendar</h1>
    <div class="date-picker">
      <input type="date" v-model="selectedDate" />
      <button @click="navigateToEventPage">View Events</button>
    </div>
    <div class="all-events">
      <h2>All Events</h2>
      <ul>
        <li v-for="(event, index) in allEvents" :key="index">
          {{ event.date.split('-').reverse().join('.') }} - {{ event.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useEventStore } from '../stores/eventStore';
import { computed } from 'vue';

export default {
  data() {
    return {
      selectedDate: '',
    };
  },
  setup() {
    const router = useRouter();
    const store = useEventStore();

    const allEvents = computed(() => store.getAllEvents());

    return { router, store, allEvents };
  },
  methods: {
    navigateToEventPage() {
      if (this.selectedDate) {
        this.router.push(`/event/${this.selectedDate}`);
      }
    },
  },
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}
.date-picker {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
input[type='date'] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #45a049;
}
.all-events {
  margin-top: 30px;
  width: 100%;
}
.all-events h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
.all-events ul {
  list-style: none;
  padding: 0;
}
.all-events li {
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>