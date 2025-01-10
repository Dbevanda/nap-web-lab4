<template>
  <div class="event-page">
    <h1>📋 Events for {{ formattedDate }}</h1>
    <ul class="event-list">
      <li v-for="(event, index) in events" :key="index">
        <div class="event-details">
          <span class="importance" :class="importanceClass(event.importance)">{{ importanceSymbols(event.importance) }}</span>
          <strong>{{ event.name }}</strong> - {{ event.description }}
        </div>
        <button class="delete-button" @click="deleteEvent(index)">Delete</button>
      </li>
    </ul>
    <div class="event-controls">
      <input v-model="newEventName" placeholder="Event name" />
      <input v-model="newEventDescription" placeholder="Event description" />
      <select v-model="newEventImportance">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
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

    const newEventName = ref('');
    const newEventDescription = ref('');
    const newEventImportance = ref('Low');

    const addNewEvent = () => {
      if (newEventName.value.trim() && newEventDescription.value.trim()) {
        const newEvent = {
          name: newEventName.value,
          description: newEventDescription.value,
          importance: newEventImportance.value,
        };
        store.addEvent(props.date, newEvent);
        newEventName.value = '';
        newEventDescription.value = '';
        newEventImportance.value = 'Low';
        fetchEvents();
      }
    };

    const deleteEvent = (index) => {
      store.deleteEvent(props.date, index);
      fetchEvents();
    };

    const formattedDate = computed(() => {
      const [year, month, day] = props.date.split('-');
      return `${day}.${month}.${year}`;
    });

    const importanceSymbols = (importance) => {
      switch (importance) {
        case 'Low':
          return '!';
        case 'Medium':
          return '!!';
        case 'High':
          return '!!!';
        default:
          return '';
      }
    };

    const importanceClass = (importance) => {
      return 'importance-' + importance.toLowerCase();
    };

    return {
      events,
      newEventName,
      newEventDescription,
      newEventImportance,
      addNewEvent,
      deleteEvent,
      formattedDate,
      importanceSymbols,
      importanceClass,
      router,
    };
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
.event-details {
  flex: 1;
}
.importance {
  font-weight: bold;
  margin-left: 10px;
}
.importance-low {
  color: #4caf50;
}
.importance-medium {
  color: #ff9800;
}
.importance-high {
  color: #f44336;
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
  flex-wrap: wrap;
  gap: 10px;
}
input, select {
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