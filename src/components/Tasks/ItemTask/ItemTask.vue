<template>
  <div class="task-item">
    <label :for="`checkbox_${task.id}`">
      <input
        type="checkbox"
        :id="`checkbox_${task.id}`"
        :checked="task.complete"
        @change="change"
      />
      <div class="task-item__description">
        <span class="task-item__time">
          {{ task.time }}
        </span>
        <span class="task-item__task">
          {{ task.text }}
        </span>
      </div>
    </label>
  </div>
</template>

<script>
import "./style.sass";
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    change(event) {
      this.$emit("change", { id: this.task.id, checked: event.target.checked });
    }
  }
};
</script>
