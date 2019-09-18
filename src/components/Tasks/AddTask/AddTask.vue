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
        class="input"
          type="text"
          :value="time"
          @input="timeChange"
          placeholder="Время"
        />
        <input
        class="input"
          :disabled="!timeValid"
          type="text"
          v-model.trim="text"
          placeholder="Текст"
        />
        <p v-if="errorValid">{{ errorValidationMessage }}</p>
      </div>
      <div class="add-task__control">
        <Button color="blue" @click="cancelTask">Отмена</Button>
        <Button :disabled="!(time && text)" color="blue" @click="saveTask"
          >Сохранить</Button
        >
      </div>
    </template>
  </div>
</template>

<script>
import Button from "./../../../elements/Button/Button";
import "./style.sass"
import "./../../../assets/styles/elements/_input.sass"

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
      let value = e.target.value;
      this.time = value;

      let promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(this.timeValidation(value))         
        }, 2000);
      });

      try {
        var result = await promise;
        console.log(result);
        
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
      console.log(time);
         
      if (time.length === 5) {
        return this.timeValidationPattern.test(time);
      } 
      
      return false;
   
      
      
    },
    saveTask() {
      this.$emit("btnHandler", {
        event: "saveTask",
        time: this.time,
        text: this.text
      });
      this.clear();
    },
    cancelTask() {
      this.$emit("btnHandler", { event: "cancelTask" });
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
