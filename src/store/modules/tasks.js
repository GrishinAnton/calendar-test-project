import tasks from "../../data/tasks";
import { isSameMonth } from "date-fns";

export default {
  namespaced: true,
  state: {
    tasks: [],
    addTaskState: true
  },
  mutations: {
    setTasks(state, payLoad) {
      state.tasks = payLoad;
    },
    setAddTaskState(state, payLoad) {
      state.addTaskState = payLoad;
    },
    changeTask(state, { id, checked }) {
      state.tasks.map(item => {
        if (item.id === id) {
          item.complete = checked;
        }
      });
    },
    addTask(state, payLoad) {
      state.tasks.push(payLoad);
    }
  },
  actions: {
    getTasks: ({ commit }, payLoad) => {
      console.log("13123123");

      try {
        setTimeout(() => {
          commit(
            "setTasks",
            tasks.tasks.filter(item => isSameMonth(item.date, payLoad))
          );
        }, 200);
      } catch (e) {
        console.log(e);
      }
    },
    changeTask: ({ commit }, payLoad) => {
      try {
        setTimeout(() => {
          commit("changeTask", payLoad);
        }, 200);
      } catch (e) {
        console.log(e);
      }
    },
    addTask: ({ commit }, payLoad) => {
      commit("addTask", payLoad);
      commit("setAddTaskState", true);
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getAddTaskState: state => state.addTaskState
  }
};
