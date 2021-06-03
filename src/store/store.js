import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/config.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userLoggedIn: false,
    userName: "",
    userPhoto: "",
    messages: [],
    users: [],
    todos: [],
  },
  mutations: {
    setUserLoggedIn(state, payload) {
      state.userLoggedIn = payload.loggedIn;
      state.userName = payload.name;
      state.userPhoto = payload.photoUrl;
    },
    setUserLoggedOut(state) {
      state.userLoggedIn = "";
      state.userName = "";
      state.userPhoto = "";
    },
    setMessages(state, payload) {
      state.messages = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setTodos(state, payload) {
      state.todos = payload;
    },
  },
  actions: {
    fetchCollection({ commit }) {
      db.collection("posts")
        .orderBy("createdAt")
        .onSnapshot((snap) => {
          var messages = [];
          snap.docs.forEach((doc) => {
            doc.data().createdAt &&
              messages.push({ ...doc.data(), id: doc.id });
          });
          commit("setMessages", messages);
        });
    },
    fetchUsers({ commit }) {
      db.collection("users")
        .orderBy("createdOn")
        .onSnapshot((snap) => {
          var users = [];
          snap.docs.forEach((doc) => {
            doc.data().createdOn && users.push({ ...doc.data(), id: doc.id });
          });
          commit("setUsers", users);
        });
    },
    fetchTodos({ commit }) {
      db.collection("todos")
        .orderBy("added")
        .onSnapshot((snap) => {
          var todos = [];
          snap.docs.forEach((doc) => {
            console.log("add");
            doc.data().added && todos.push({ ...doc.data(), id: doc.id });
          });
          commit("setTodos", todos);
        });
        
    },
  },
  modules: {},
  getters: {
    finishedTodosCount: (state) => {
      //return state.todos.filter(todo => todo.completed); ES6
      return state.todos.filter(function(todo) {
        if (todo.completed) {
          return todo;
        }
      }).length;
    },
    unfinishedTodosCount: (state) => {
      //return state.todos.filter(todo => !todo.completed); ES6
      return state.todos.filter(function(todo) {
        if (!todo.completed) {
          return todo;
        }
      }).length;
    },
    filterTodos: (state) => (spec) => {       //ES6, kéne az ES5
      if (spec === "all") {
        return state.todos;
      } else if (spec == "finished") {
        return state.todos.filter((todo) => todo.completed);
      } else if (spec == "unfinished") {
        return state.todos.filter((todo) => !todo.completed);
      }
    },
    filterTodos2: function(state) {  //ES5 a dupla arrow azt jelenti a function function returnul (ua. mint a felső fgv)
      return function(spec) {
        if (spec === "all") {
          return state.todos;
        } else if (spec == "finished") {
          return state.todos.filter(function(todo) {
            if (todo.completed) {
              return todo;
            }
          });
        } else if (spec == "unfinished") {
          return state.todos.filter(function(todo) {
            if (!todo.completed) {
              return todo;
            }
          });
        }
      };
    },
  },
});

export default store;
