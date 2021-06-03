<template>
  <div>
    <v-row justify="center" align="start">
      <v-col cols="12" xl="6" lg="6">
        <v-card class="mx-auto" elevation="4" rounded="lg">
          <v-card-title primary-title class="text-h6">
            Amazing todo list
          </v-card-title>
          <v-card-text>
            <v-form v-on:submit.prevent v-model="isFormValid">
              <v-text-field
                color="primary"
                hint="Write your next todo here"
                class="mb-3"
                :rules="rules"
                counter="100"
                clearable
                label="my next todo is..."
                v-model="title"
                v-on:keyup.enter="addTodo()"
              ></v-text-field>
              <transition
                enter-active-class="animate__bounceIn"
                leave-active-class="animate__bounceOut"
              >
                <v-progress-linear
                  class="my-5"
                  v-if="todos.length > 0"
                  height="6"
                  :value="
                    (todos.filter((obj) => obj.completed).length /
                      todos.length) *
                    100
                  "
                  rounded
                  striped
                  color="primary"
                  background-color="error"
                ></v-progress-linear>
              </transition>
              <v-btn
                elevation="3"
                block
                rounded
                color="primary"
                @click="addTodo"
                class="mb-4"
                :disabled="!isFormValid"
                >Add todo</v-btn
              >
              <v-row>
                <v-col>
                  <v-btn-toggle
                    mandatory
                    dense
                    borderless
                    rounded
                    color="primary"
                    class="mb-4"
                  >
                    <v-btn elevation="1" @click="filter = 'all'">all</v-btn>
                    <v-btn elevation="1" @click="filter = 'finished'"
                      >finished</v-btn
                    >
                    <v-btn elevation="1" @click="filter = 'unfinished'"
                      >unfinished</v-btn
                    >
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-form>

            <v-list v-if="todos.length > 0" class="overflow-y-auto" max-height="300px">
              <v-list-item-group>
                <v-list-item
                  two-line
                  v-for="todo in todos"
                  :key="todo.id"
                  @click="todo.completed = !todo.completed"
                >
                  <v-list-item-action>
                    <v-checkbox
                      color="primary"
                      :input-value="todo.completed"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="text-button font-weight-bold">{{
                      todo.todo
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      todo.added
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn color="error" rounded @click.stop="deleteTodo(todo)"
                      >delete</v-btn
                    >
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import uuid from "uuid";
import { db } from "../firebase/config.js";

export default {
  name: "todo",
  data() {
    return {
      isFormValid: false,
      title: "",
      filter: "all",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 100 || "Max 100 characters",
        (value) => (value || "").length >= 3 || "Minimum 3 charaters",
      ],
    };
  },
  methods: {
    addTodo() {
      if (
        this.title != "" &&
        this.title.length >= 3 &&
        this.title.length < 100
      ) {
        const data = {
          id: uuid.v4(),
          todo: this.title,
          completed: false,
          added: new Date().toISOString().slice(5, 10),
        };
        db.collection("todos").doc().set(data);
        this.title = "";
      }
    },
    deleteTodo(todo) {
      db.collection("todos").doc(todo.id).delete();
    },
  },
  computed: {
    todosCompleted() {
      return this.$store.getters.finishedTodosCount;
    },
    todosNotCompleted() {
      return this.$store.getters.unfinishedTodosCount;
    },
    todos() {
      return this.$store.getters.filterTodos(this.filter);
    },
  },
  created() {
    this.$store.dispatch("fetchTodos");
  },
};
</script>

<style></style>
