<template>
  <div class="homepage">
    <h1>📅 Event Calendar</h1>
    <div class="date-picker">
      <input type="date" v-model="selectedDate" />
      <button @click="navigateToEventPage">View Events</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      selectedDate: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
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
</style>
