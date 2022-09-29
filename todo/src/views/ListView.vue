<!-- eslint-disable vue/return-in-computed-property -->
<script setup>
import { onMounted, computed, reactive } from "vue";
import axios from "axios";

const state = reactive({
  todo: "",
  list: [],
  edit: false,
  catchId: "",
  catchTodo: "",
  tab: null,
});

const createTodo = async () => {
  const url = "http://127.0.0.1:3000/todo/create";
  const payload = { title: state.todo, completed: false };
  const response = await axios.post(url, payload);
  if (!response.data.success) return;
  getList();
  alert(response.data.message);
};
const removeTodo = async (_id) => {
  const url = "http://127.0.0.1:3000/todo/delete";
  const payload = { _id };
  const response = await axios.post(url, payload);
  if (!response.data.success) return;
  getList();
  alert(response.data.message);
};
const getList = async () => {
  const response = await axios.get("http://127.0.0.1:3000/todo/all");
  state.list = response.data.list;
};
const completedTodo = async (_id, completed) => {
  const url = "http://127.0.0.1:3000/todo/checked";
  const payload = { _id, completed: !completed };
  const response = await axios.patch(url, payload);
  if (!response.data.success) return;
  getList();
  alert(response.data.message);
};
const editTodo = async (_id, title) => {
  state.catchId = _id;
  state.catchTodo = title;
};
const blurTodo = () => {
  state.catchId = "";
  state.catchTodo = "";
};
const updateTodo = async (_id) => {
  const url = "http://127.0.0.1:3000/todo/update";
  const payload = { _id, title: state.catchTodo };
  const response = await axios.patch(url, payload);
  if (!response.data.success) return;
  getList();
  blurTodo();
  alert(response.data.message);
};

onMounted(() => {
  getList();
});

const todos = computed(() => {
  switch (state.tab) {
    case true:
      return state.list.filter((todo) => todo.completed);
    case false:
      return state.list.filter((todo) => !todo.completed);
    case null:
      return state.list;
  }
});
</script>

<template>
  <div class="container my-5">
    <div class="input-group">
      <span class="input-group-text">請輸入代辦事項</span>
      <input
        type="text"
        class="form-control"
        v-model="state.todo"
        @keyup.enter="createTodo"
      />
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="createTodo"
      >
        Button
      </button>
    </div>
    <div class="card-header mt-5 bg-white border">
      <!-- Filter -->
      <ul class="nav nav-tabs">
        <li class="nav-item" @click="state.tab = null">
          <a class="nav-link" href="#" :class="{ active: state.tab == null }"
            >全部</a
          >
        </li>
        <li class="nav-item" @click="state.tab = true">
          <a class="nav-link" href="#" :class="{ active: state.tab == true }">已完成</a>
        </li>
        <li class="nav-item" @click="state.tab = false">
          <a class="nav-link" href="#" :class="{ active: state.tab == false }"
            >未完成</a
          >
        </li>
      </ul>

      <!-- Todos -->
      <ul class="list-group rounded-0 mt-3">
        <li
          class="list-group-item"
          v-for="{ title, _id, completed } in todos"
          :key="_id"
          @dblclick="editTodo(_id, title)"
        >
          <div class="d-flex" v-if="state.catchId === _id">
            <input
              class="form-control"
              type="text"
              @keyup.esc="blurTodo"
              @keyup.enter="updateTodo(_id)"
              v-model="state.catchTodo"
            />
            <button
              class="btn btn-outline-secondary ms-3"
              @click="updateTodo(_id)"
            >
              Update
            </button>
          </div>

          <div class="d-flex align-items-center" v-else>
            <label for="completed" class="d-flex">
              <input
                type="checkbox"
                name="completed"
                class="me-2"
                :checked="completed"
                @click="completedTodo(_id, completed)"
              />
              <p
                class="m-0"
                :class="{ 'text-decoration-line-through': completed }"
              >
                {{ title }}
              </p>
            </label>
            <button
              type="button"
              class="btn-close ms-auto"
              @click="removeTodo(_id)"
            ></button>
          </div>
        </li>
      </ul>

      <!-- Clear -->
      <div class="d-flex align-items-center mt-3">
        <div class="me-auto">剩餘任務 : {{ 3 }}</div>
        <button class="btn btn-outline-secondary rounded-0">
          清除所有任務
        </button>
      </div>
    </div>
  </div>
</template>
