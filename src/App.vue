<template>
  <div id="app">
    <div class="container container_tasks">
      <calendar
        :startDate="currentDate"
        @changeMonth="changeMonth"
        @changeDay="changeDay"
        :tasks="getTasks"
      />
      <tasks :tasks="getTasks" :currentDate="currentDate" />
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
    }
  },
  created() {
    this.$store.dispatch("tasks/getTasks", this.currentDate);
  }
};
</script>
