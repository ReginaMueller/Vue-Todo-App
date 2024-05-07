Vue.createApp({
  data() {
    return {
      currentDescription: "",
      filter: "all",
      hover: undefined,

      todos: [
        {
          id: 1,
          description: "learn Vue",
          done: false,
        },
        {
          id: 5,
          description: "learn HTML",
          done: true,
        },
      ],
    };
  },

  methods: {
    addTodo() {
      this.todos.push({
        description: this.currentDescription,
        id: 3,
        done: false,
      });
      this.currentDescription = "";
    },

    todoType(todo) {
      return todo.done ? "done" : "";
    },

    isActive(filter) {
      return this.filter === filter ? "activFilter" : "passivFilter";
    },

    changeDone(todo) {
      todo.done = !todo.done;
    },

    changeFilter(event) {
      this.filter = event.target.id;
    },

    deleteTodo(index) {
      this.todos.splice(index, 1);
    },

    isHidden(index) {
      return this.hover == index && this.todos[index].done;
    },
  },

  computed: {
    filteredTodos() {
      return this.filter == "all"
        ? this.todos
        : this.todos.filter(
            (todo) =>
              (this.filter == "done" && todo.done) ||
              (this.filter == "open" && !todo.done)
          );
    },
  },
}).mount("#app");
