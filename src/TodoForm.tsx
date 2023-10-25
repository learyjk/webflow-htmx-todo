import * as elements from "typed-html";
import { url } from "./constants";

export function TodoForm() {
  return (
    <form
      method="post"
      hx-swap="beforebegin"
      hx-post={`${url}/todos`}
      //@ts-ignore
      _="on submit target.reset()"
      class="form"
      style="width: 100%;"
      aria-label="content"
    >
      <input
        type="text"
        class="text-field w-input"
        maxlength="256"
        name="content"
        data-name="content"
        placeholder=""
        id="todo-form"
        required=""
      />
      <input
        type="submit"
        id="submit-button"
        value="Add ToDo"
        class="button w-button"
      />
    </form>
  );
}
