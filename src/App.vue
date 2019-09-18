<template>
  <div id="app">
    <div class="container container_tasks">
      <calendar v-model="currentDate" :tasks="getTasks" />
      <tasks :tasks="getTasks" :currentDate="currentDate"/>
    </div>    
  </div>
</template>

<script>
import calendar from "./components/Calendar/Calendar";
import tasks from "./components/Tasks/Tasks";
import { format, isSameDay } from "date-fns";

export default {
  components: {
    calendar,
    tasks
  },
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    getTasks(){
      return this.$store.getters["tasks/getTasks"]
    }
  },
  methods: {
    filterTasksByDate(){
      return this.tasks.filter(item => isSameDay(item.date, this.curr))
    }
  },
  watch: {
    currentDate: {
      handler: function(val){
        this.$store.dispatch("tasks/getTasks", val)        
      },
      immediate: true
    } 
  }
};
</script>
