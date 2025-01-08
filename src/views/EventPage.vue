<template>
  <div class="event-page">
    <h1>📋 Events for {{ formattedDate }}</h1>
    <ul class="event-list">
      <li v-for="(event, index) in events" :key="index">
        <span class="event-item">{{ event }}</span>
        <button class="delete-button" @click="deleteEvent(index)">Delete</button>
      </li>
    </ul>
    <div class="event-controls">
      <input v-model="newEvent" placeholder="Add new event" />
      <button @click="addNewEvent">Add Event</button>
      <button @click="goBack">Back to Date Selection</button>
    </div>
  </div>
</template>

<script>
import { useEventStore } from '../stores/eventStore';
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['date'],
  setup(props) {
    const store = useEventStore();
    const router = useRouter();

    const events = ref([]);

    const fetchEvents = async () => {
      events.value = await store.fetchEvents(props.date);
      console.log('Fetched events:', events.value);
    };

    watch(
        () => props.date,
        () => {
          fetchEvents();
        }
    );

    onMounted(() => {
      fetchEvents();
    });

    const addNewEvent = () => {
      if (newEvent.value.trim()) {
        store.addEvent(props.date, newEvent.value);
        newEvent.value = '';
        fetchEvents();
      }
    };

    const deleteEvent = (index) => {
      store.deleteEvent(props.date, index);
      fetchEvents();
    };

    const newEvent = ref('');

    const formattedDate = computed(() => {
      const [year, month, day] = props.date.split('-');
      return `${day}/${month}/${year}`;
    });

    return { events, newEvent, addNewEvent, deleteEvent, formattedDate, router };
  },
  methods: {
    goBack() {
      this.router.push('/');
    },
  },
};
</script>

<style scoped>
.event-page {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f1f1f1;
  min-height: 100vh;
}
.event-list {
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
}
.event-list li {
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.event-item {
  flex: 1;
}
.delete-button {
  padding: 5px 10px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.delete-button:hover {
  background-color: #d32f2f;
}
.event-controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
}
button {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #1e88e5;
}
</style>