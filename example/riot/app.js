//import * as riot from "riot";
//import App from "./app.riot";

const riot = require("riot");
const App = require("./todo.riot").default;

const mountApp = riot.component(App);

const app = mountApp(document.getElementById("root"), {
  message: "Hello World",
  items: [{ title: "First" }, { title: "Second" }],
});

// const Todo = require("./todo.riot").default;
// const { component } = require("riot");

// component(Todo)(document.getElementById("todo"));
