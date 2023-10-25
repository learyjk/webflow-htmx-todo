import { Hono } from "hono";
import { cors } from "hono/cors";
import { helloWorld } from "./example";
import * as elements from "typed-html";
import { Bindings, Todo } from "./types";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const app = new Hono<{ Bindings: Bindings }>();
app.use("/*", cors());
app.get("/", (c) => c.text(helloWorld));

// create a todo
app.post("/todos", async (c) => {
  const body = await c.req.parseBody();
  if (typeof body.content !== "string") {
    throw new Error("Content must be a string");
  }
  if (body.content.length < 1) {
    throw new Error("Content must not be empty");
  }

  const newId = uuidv4(); // Generate UUID

  const newTodo = {
    id: newId,
    content: body.content,
    completed: false,
  };

  console.log(newTodo);

  // Store new todo
  await c.env.todos.put(newId, JSON.stringify(newTodo));

  return c.text(<TodoItem {...newTodo} />);
});

app.get("/allTodos", async (c) => {
  const items = await c.env.todos.list({ prefix: "" });
  return c.json(items.keys);
});

// get all todos
app.get("/todos", async (c) => {
  try {
    const list = await c.env.todos.list({ prefix: "" });
    const keys = list.keys;

    const todos = await Promise.all(
      keys.map(async ({ name }) => {
        const todoStr = await c.env.todos.get(name);
        const parsedTodo = todoStr ? JSON.parse(todoStr) : null;
        return parsedTodo as Todo;
      })
    );

    return c.text(<TodoList todos={todos} />);
  } catch (error) {
    if (error instanceof TypeError) {
      return c.text("Error: " + error.message);
    }
  }
});

// update a todo
app.post("/todos/toggle/:id", async (c) => {
  // get params
  const { id } = c.req.param();

  console.log(`update id: ${id}`);

  // Get the todo from KV
  const todoStr = await c.env.todos.get(id);
  console.log(todoStr);

  if (!todoStr) {
    return c.text(<div>Not found</div>);
  }

  const todo: Todo = JSON.parse(todoStr);

  // Toggle the completed status
  todo.completed = !todo.completed;

  // Update the todo in KV
  await c.env.todos.put(id, JSON.stringify(todo));

  return c.text(<TodoItem {...todo} />);
});

// delete a todo
app.delete("/todos/:id", async (c) => {
  const { id } = c.req.param();

  // Remove the todo from KV
  await c.env.todos.delete(id);

  return c.text(""); // return empty string to remove the element
});

export default app;
