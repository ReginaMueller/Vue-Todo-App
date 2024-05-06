Vue.createApp({
  data() {
    return {
      currentDescription: "",
      filter: "all",

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

    changeDone(todo) {
      todo.done = !todo.done;
    },

    changeFilter(event) {
      this.filter = event.target.id;
      event.target.style.backgroundColor = "white";
      event.target.style.color = "Midnightblue";
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

// const todo_list = document.getElementById("todo-list");
// const add_form = document.getElementById("add-form");
// const all_filter = document.getElementById("all");
// const open_filter = document.getElementById("open");
// const done_filter = document.getElementById("done");

// const localStorageKey = "key";

// let state = [];
// let filter = all_filter;

// function refresh() {
//   fetch("http://localhost:4730/todos")
//     .then((res) => res.json())
//     .then((todosFromApi) => {
//       state = todosFromApi;
//       render();
//     })
//     .catch((error) => {
//       handleError();
//     });
// }

// function render() {
//   todo_list.innerHTML = "";
//   all_filter.style.backgroundColor = "";
//   all_filter.style.color = "";
//   open_filter.style.backgroundColor = "";
//   open_filter.style.color = "";
//   done_filter.style.backgroundColor = "";
//   done_filter.style.color = "";
//   filter.style.backgroundColor = "white";
//   filter.style.color = "Midnightblue";

//   if (filter == all_filter) {
//     for (let todo of state) {
//       visualize(todo);
//     }
//   } else if (filter == open_filter) {
//     for (let todo of state) {
//       if (!todo.done) visualize(todo);
//     }
//   } else if (filter == done_filter) {
//     for (let todo of state) {
//       if (todo.done) visualize(todo);
//     }
//   }
// }

// function visualize(todoObject) {
//   // Span erstellen
//   const span = document.createElement("span");
//   span.textContent = todoObject.description;
//   //Form erstellen
//   const form = document.createElement("form");
//   // Span in Form einfügen
//   form.append(span);
//   form.checked = todoObject.done;
//   form.id = todoObject.id;
//   styleForm(form);
//   form.addEventListener("click", () => {
//     form.checked = !form.checked;
//     todoObject.done = form.checked;
//     styleForm(form);
//     /********** Backend **********/
//     fetch("http://localhost:4730/todos/" + todoObject.id, {
//       method: "PATCH",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({ done: todoObject.done }),
//     })
//       .then((res) => res.json())
//       .then(() => {})
//       .catch((error) => {
//         handleError();
//       });
//   });

//   todo_list.appendChild(form);
// }

// function styleForm(form) {
//   if (form.checked) {
//     form.style.border = "0.2rem solid";
//     form.style.borderColor = "white";
//     form.style.backgroundColor = "inherit";
//     form.style.color = "white";
// handleIcons(form);
// } else {
//   form.style.backgroundColor = "";
//   form.style.color = "";
// const check = document.getElementById(form.id + "check");
// if (check != null) {
//   check.parentNode.removeChild(check);
// }
// const trash = document.getElementById(form.id + "trash");
// if (trash != null) {
//   trash.parentNode.removeChild(trash);
// }
//   }
// }

// function handleIcons(form) {
//   const check_square = document.createElement("i");
//   check_square.classList.add("fa-regular", "fa-square-check");
//   const trash = document.createElement("i");
//   trash.classList.add("fa-regular", "fa-trash-can");
//   const h2_check = document.createElement("h2");
//   h2_check.id = form.id + "check";
//   h2_check.appendChild(check_square);
//   h2_check.style.color = "white";
//   const h2_trash = document.createElement("h2");
//   h2_trash.id = form.id + "trash";
//   h2_trash.appendChild(trash);
//   h2_trash.style.color = "white";
//   h2_trash.style.zIndex = "2";
//   h2_trash.hidden = "true";
//   form.append(h2_trash, h2_check);
//   form.addEventListener("mouseover", () => {
//     h2_trash.hidden = "";
//   });
//   form.addEventListener("mouseout", () => {
//     h2_trash.hidden = "true";
//   });
//   trash.addEventListener("click", (e) => {
//     /********** Backend **********/
//     fetch("http://localhost:4730/todos/" + form.id, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         refresh();
//       })
//       .catch((error) => {
//         handleError();
//       });

//     e.stopPropagation();
//   });
// }

// function createTodoObject(todo_txt) {
//   let todo = {};
//   todo.description = todo_txt;
//   todo.done = false;
//   return todo;
// }

// all_filter.addEventListener("click", () => {
//   if (filter != all_filter) {
//     filter = all_filter;
//     refresh();
//   }
// });

// open_filter.addEventListener("click", () => {
//   if (filter != open_filter) {
//     filter = open_filter;
//     refresh();
//   }
// });

// done_filter.addEventListener("click", () => {
//   if (filter != done_filter) {
//     filter = done_filter;
//     refresh();
//   }
// });

// add_form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const todo_input = document.getElementById("input");
//   const todoObject = createTodoObject(todo_input.value.trim());
//   /********** Backend **********/
//   fetch("http://localhost:4730/todos", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(todoObject),
//   })
//     .then((res) => res.json())
//     .then(() => {
//       refresh();
//       todo_input.value = "";
//     })
//     .catch((error) => {
//       handleError();
//     });
// });

// function handleError() {
//   todo_list.className = "error";
//   todo_list.innerHTML = "ups... the database is not available";
// }

// refresh();
// render();
