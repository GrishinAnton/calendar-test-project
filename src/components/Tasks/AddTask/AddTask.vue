<template>
  <div class="add-task">
    <Button v-if="taskState" @click="$emit('btnHandler', {event: 'addTask'})" color="blue">Добавить</Button>
    <template v-else>
      <div class="add-task__parts">
        <input type="text" name="" v-model="time">
        <input type="text" name="" v-model="text">
      </div>
      <div class="add-task__control">
        <Button color="blue" @click="$emit('btnHandler', {event: 'cancelTask'})">Отмена</Button>
        <Button color="blue" @click="$emit('btnHandler', {event: 'saveTask'})">Сохранить</Button>
      </div>
    </template>    
  </div>  
</template>

<script>
import Button from "./../../../elements/Button/Button"
export default {
  components: {
    Button
  },
  props: {
    taskState: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      time: '',
      text: '',
    }
  },
  
}
</script>