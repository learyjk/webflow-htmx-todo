export type Bindings = {
  todos: KVNamespace;
};

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};
