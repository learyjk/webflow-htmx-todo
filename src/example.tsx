// example.tsx
import * as elements from "typed-html";

const w = "world";
export const helloWorld = (
  <p>
    Hello <strong>{w}</strong>
  </p>
);

typeof helloWorld; // => Just a string of course
