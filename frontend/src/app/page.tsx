"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface TodoItem {
  id: number;
  dateAdded: Date;
  title: string;
  completed: boolean;
  dateCompleted: Date | null;
}

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  const mockData: TodoItem[] = [
    {
      id: 1,
      dateAdded: new Date(),
      title: "Test Todo",
      completed: false,
      dateCompleted: null,
    },
    {
      id: 2,
      dateAdded: new Date(),
      title: "Test Todo 1",
      completed: true,
      dateCompleted: new Date(),
    },
  ];

  const [todos, setTodos] = useState<TodoItem[]>(mockData);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (!user) router.push("/unauthorized");
  }, []);

  const addTodo = () => {
    setTodos((prev) => {
      return [
        ...prev,
        {
          id: prev[prev.length - 1].id + 1,
          dateAdded: new Date(),
          title: newTodo,
          completed: false,
          dateCompleted: null,
        },
      ];
    });

    setNewTodo("");
  };

  const todoList = useMemo(() => {
    return todos.map((todo) => {
      return (
        <div
          key={todo.id}
          className="flex px-5 mb-1 pt-2 pb-3 cursor-pointer items-center flex-row hover:bg-white hover:bg-opacity-50"
        >
          <div className="round">
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.completed}
              id="checkbox"
            />
            <label htmlFor="checkbox"></label>
          </div>
          <p className="ml-[20px]">{todo.title}</p>
        </div>
      );
    });
  }, [todos]);

  const updateNewTodo = (evt: any) => {
    setNewTodo(evt.target.value);
  };

  return (
    <main className="w-full flex flex-col gap-y-10 items-center justify-center">
      <div className="w-1/4 border-2 border-container-border rounded-lg p-10">
        <div className="header w-full flex justify-around">
          <div className="l-head">
            <h3 className="text-xl font-bold">Todo Done</h3>
            <p className="italic font-light">keep it up</p>
          </div>
          <div className="r-head bg-orange-300 rounded-full py-8 px-6">
            <p className="text-2xl font-bold">1 / 2</p>
          </div>
        </div>
      </div>
      <div className="flex w-1/4 p-10 gap-x-10">
        <input
          type="text"
          placeholder="write your next task"
          className="px-3 py-2 shadow appearance-none border rounded bg-gray-500 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={newTodo}
          onChange={updateNewTodo}
        />
        <button
          className="py-2 px-4 font-bold text-lg bg-orange-300 rounded-full"
          onClick={addTodo}
        >
          +
        </button>
      </div>

      <div className="flex w-1/4 border-2 border-container-border rounded-lg p-5 max-h-96">
        <div className="list flex-auto overflow-auto">{todoList}</div>
      </div>
    </main>
  );
}
