<template>
  <div id="app">
    <div class="container container_tasks">
      <calendar
        @changeMonth="changeMonth"
        @changeDay="changeDay"
        :tasks="getTasks"
      />
      <tasks :tasks="getCurrentDayTasks" :currentDate="currentDate" />
    </div>
  </div>
</template>

<script>
import calendar from "./components/Calendar/Calendar";
import tasks from "./components/Tasks/Tasks";
import { isSameDay } from "date-fns";

export default {
  components: {
    calendar,
    tasks
  },
  data() {
    return {
      currentDate: new Date()
    };
  },
  computed: {
    getTasks() {
      return this.$store.getters["tasks/getTasks"];
    },
    getCurrentDayTasks() {
      return this.$store.getters["tasks/getCurrentDayTasks"];
    }
  },
  methods: {
    filterTasksByDate() {
      return this.tasks.filter(item => isSameDay(item.date, this.curr));
    },
    changeMonth(date) {
      this.$store.dispatch("tasks/getTasks", date);
    },
    changeDay(date) {
      this.currentDate = date;
      this.$store.dispatch("tasks/getTask", date)
    }
  },
  async created() {
    await this.$store.dispatch("tasks/getTasks", this.currentDate);
    this.$store.dispatch("tasks/getTask", this.currentDate)
  }
};
</script>
