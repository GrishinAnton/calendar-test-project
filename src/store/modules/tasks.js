import tasks from "../../data/tasks";
import { isSameDay, isSameMonth } from "date-fns";

export default {
  namespaced: true,
  state: {
    tasks: [],
    currentDayTasks: [],
    addTaskState: true
  },
  mutations: {
    setTasks(state, payLoad) {
      state.tasks = payLoad;
    },
    currentDayTasks(state, payLoad) {
      state.currentDayTasks = payLoad;
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
      try {
        commit(
          "setTasks",
          tasks.tasks.filter(item => isSameMonth(item.date, payLoad))
        );
      } catch (e) {
        console.log(e);
      }
    },
    getTask: async ({ state, commit }, payLoad) => {
      try {
        commit(
          "currentDayTasks",
          state.tasks.filter(item => isSameDay(item.date, payLoad))
        );
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
    addTask: async ({ commit, dispatch }, payLoad) => {
      try {
        await commit("addTask", taskFactory(payLoad));
        await dispatch("getTask", payLoad.date);
        commit("setAddTaskState", true);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getAddTaskState: state => state.addTaskState,
    getCurrentDayTasks: state => state.currentDayTasks
  }
};

function taskFactory({ time, text, date }) {
  return {
    id: String(Math.floor(Math.random() * 100)),
    time: time,
    text: text,
    complete: false,
    date: date
  };
}
