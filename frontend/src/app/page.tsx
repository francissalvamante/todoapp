"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";

interface TodoItem {
  id: number;
  dateAdded: Date;
  title: string;
  completed: boolean;
  dateCompleted: Date | null;
}

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { user } = useAuthContext();
  const router = useRouter();

  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [todoCount, setTodoCount] = useState(0);
  const [completedTodo, setCompletedTodo] = useState(0);

  useEffect(() => {
    if (!user) router.push("/unauthorized");
    axios({
      method: "get",
      url: `${API_URL}/todos`,
      params: {
        identifier: user?.email,
      },
    }).then(({ data }: { data: any }) => {
      setTodos(data.todos);
      setLoading(false);
    });
  }, []);

  const addTodo = () => {
    const todoData = {
      title: newTodo,
      identifier: user?.email,
    };

    setNewTodo("");

    axios({
      method: "post",
      url: `${API_URL}/todos`,
      data: todoData,
    }).then(({ data }: { data: any }) => {
      setTodos((prev) => {
        return [...prev, data.todo];
      });
    });
  };

  const handleCompleteTodo = (id: number) => {
    setTodos((prev) => {
      let newTodos = prev.map((p) => {
        if (p.id !== id) return p;

        axios({
          method: "put",
          url: `${API_URL}/todos/${id}`,
          data: {
            completed: !p.completed,
          },
        });

        return {
          ...p,
          completed: !p.completed,
        };
      });

      return newTodos;
    });
  };

  useMemo(() => {
    setTodoCount(todos.length);
    setCompletedTodo(() => {
      let count = 0;
      todos.map((t: any) => {
        if (t.completed) count++;
      });

      return count;
    });
  }, [todos]);

  const todoList = useMemo(() => {
    return todos?.map((todo) => {
      return (
        <div
          key={todo.id}
          className="flex px-5 mb-1 pt-2 pb-3 cursor-pointer items-center flex-row hover:bg-white hover:bg-opacity-50"
        >
          <div className="round">
            <input
              className="checkbox"
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => handleCompleteTodo(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`}></label>
          </div>
          <p className="ml-[20px] font-bold text-gray-200">{todo.title}</p>
        </div>
      );
    });
  }, [todos]);

  const updateNewTodo = (evt: any) => {
    setNewTodo(evt.target.value);
  };

  return (
    <main className="w-full flex flex-col gap-y-10 items-center justify-center mt-10">
      <div className="md:w-1/4 sm:w-1/2 xs:w-full border-2 border-container-border rounded-lg p-10">
        <div className="header w-full flex justify-around">
          <div className="l-head flex flex-col justify-center">
            <h3 className="text-xl font-bold">Todo Done</h3>
            <p className="italic font-light">keep it up</p>
          </div>
          <div className="r-head bg-orange-300 rounded-full py-8 px-6">
            <p className="text-2xl font-bold">
              {completedTodo} / {todoCount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex md:w-1/4 sm:w-1/2 xs:w-full p-10 gap-x-10">
        <input
          type="text"
          placeholder="write your next task"
          className="px-3 py-2 shadow appearance-none border rounded bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={newTodo}
          onChange={updateNewTodo}
          onKeyDown={(evt) => evt.code === "Enter" && addTodo()}
        />
        <button
          className="py-2 px-4 font-bold text-lg bg-orange-300 rounded-full"
          onClick={addTodo}
        >
          +
        </button>
      </div>
      <div className="flex md:w-1/4 sm:w-1/2 xs:w-full border-2 border-container-border rounded-lg p-5 max-h-96">
        <div
          className={`list flex flex-col flex-auto overflow-auto ${
            loading ? "items-center" : ""
          }`}
        >
          {!loading ? todoList : <Loading loading={loading} />}
        </div>
      </div>
    </main>
  );
}
