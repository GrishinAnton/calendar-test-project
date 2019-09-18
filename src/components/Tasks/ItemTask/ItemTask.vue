<template>
  <div class="task__item">
    <input type="checkbox" name="" >
    <div class="task__description">
      <span class="task__time">
        {{ task.time }} 
      </span>
      <span class="task__task">
        {{ task.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>