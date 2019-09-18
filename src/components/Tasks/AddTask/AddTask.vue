<template>
  <div class="add-task">
    <Button
      v-if="taskState"
      @click="$emit('btnHandler', { event: 'addTask' })"
      color="blue"
      >Добавить</Button
    >
    <template v-else>
      <div class="add-task__parts">
        <input
          type="text"
          :value="time"
          @input="timeChange"
          placeholder="Время"
        />
        <input
          :disabled="!timeValid"
          type="text"
          v-model.trim="text"
          placeholder="Текст"
        />
        <p v-if="errorValid">{{ errorValidationMessage }}</p>
      </div>
      <div class="add-task__control">
        <Button
          color="blue"
          @click="$emit('btnHandler', { event: 'cancelTask' })"
          >Отмена</Button
        >
        <Button :disabled="!(time && text)" color="blue" @click="saveTask"
          >Сохранить</Button
        >
      </div>
    </template>
  </div>
</template>

<script>
import Button from "./../../../elements/Button/Button";
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
  data() {
    return {
      time: "",
      text: "",
      timeValid: false,
      timeValidationPattern: /[0-2][0-9]\:[0-5][0-9]/g,
      errorValid: false,
      errorValidationMessage: "Формат ввода времени 01:25"
    };
  },
  methods: {
    async timeChange(e) {
      const value = e.target.value;
      this.time = value;

      let promise = new Promise(resolve => {
        setTimeout(() => resolve(this.timeValidation(value)), 2000);
      });

      try {
        let result = await promise;

        if (result) {
          this.timeValid = true;
        } else {
          this.timeValid = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    timeValidation(time) {
      return this.timeValidationPattern.test(time);
    },
    saveTask() {
      this.$emit("btnHandler", {
        event: "saveTask",
        time: this.time,
        text: this.text
      });
      this.clear();
    },
    clear() {
      this.time = "";
      this.text = "";
      this.timeValid = false;
    }
  }
};
</script>
