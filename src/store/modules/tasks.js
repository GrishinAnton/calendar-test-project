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
    }
  },
  getters: {
    getTasks: state => state.tasks,
    getAddTaskState: state => state.addTaskState
  }
};
