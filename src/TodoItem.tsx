import * as elements from "typed-html";
import { Todo } from "./types";
import { url } from "./constants";

export function TodoItem({ id, content, completed }: Todo) {
  return (
    <div class={`todo_item`}>
      <div class="todo_bullet"></div>
      <div
        class={`todo_item-text ${completed ? "is-completed" : ""}`}
        hx-post={`${url}/todos/toggle/${id}`}
        hx-swap="outerHTML"
        hx-target="closest .todo_item"
      >
        {content}
      </div>
      <button
        class="todo_delete-button"
        hx-delete={`${url}/todos/${id}`}
        hx-swap="outerHTML"
        hx-target="closest .todo_item"
      >
        X
      </button>
    </div>
  );
}
