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
      try {
        commit("addTask", taskFactory(payLoad));
        commit("setAddTaskState", true);
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getAddTaskState: state => state.addTaskState
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
