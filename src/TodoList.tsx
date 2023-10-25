import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { Todo } from "./types";
import * as elements from "typed-html";

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="todo_item-list">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
}
