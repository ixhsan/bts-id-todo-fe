// src/pages/Todos.tsx
import { LogoutButton } from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { create, index, remove } from "@/store/features/todos/todoSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Todo } from "@/types/todo";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface NoteCard {
  id: string;
  title?: string;
  content: string;
  color: string;
}

const colorClasses = {
  lime: "bg-lime-100",
  orange: "bg-orange-100",
  blue: "bg-blue-100",
  yellow: "bg-yellow-100",
  green: "bg-green-100",
  pink: "bg-pink-100",
  cyan: "bg-cyan-100",
  rose: "bg-rose-100",
};

function getRandomColor() {
  const colorKeys = Object.keys(colorClasses) as (keyof typeof colorClasses)[]; // Get an array of color keys
  const randomIndex = Math.floor(Math.random() * colorKeys.length); // Pick a random index
  const randomColorKey = colorKeys[randomIndex]; // Get the key of the random color
  return colorClasses[randomColorKey]; // Return the corresponding color class
}

const NoteCard = ({
  todo,
  removeTodo,
}: {
  todo: Todo;
  removeTodo: () => void;
}) => {
  const deleteMe = useCallback(() => {
    console.log({ id: todo.id });
    removeTodo();
  }, [todo]);

  return (
    <div
      className={`p-6 rounded-lg shadow-sm ${getRandomColor()} h-full transition-transform hover:scale-102 relative`}
    >
      <Button
        size={"icon"}
        onClick={deleteMe}
        className="absolute top-2 right-2 bg-red-500 p-0"
      >
        <X size={10} color="white" />
      </Button>
      {todo.name && (
        <h3 className="text-sm font-medium text-gray-600 mb-2">{todo.name}</h3>
      )}
      {/* <p className="text-gray-700 whitespace-pre-line">{todo.content}</p> */}
    </div>
  );
};

export const TodosPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todo = useSelector((state: RootState) => state.todos);

  const { toast } = useToast();
  const [state, set] = useState(() => ({
    name: "",
    setName: (e: React.ChangeEvent<HTMLInputElement>) =>
      set((prev) => ({
        ...prev,
        name: e.target.value,
      })),
  }));

  const createTodo = async () => {
    try {
      const resultAction = await dispatch(create({ name: state.name }));
      if (create.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Success menambah todo!",
        });
      } else if (create.rejected.match(resultAction)) {
        throw new Error("gagal create");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed adding todo",
      });
    }
  };

  const removeTodo = async (id: number) => {
    try {
      const resultAction = await dispatch(remove({ id }));
      if (remove.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Todo Removed!",
        });
      } else if (remove.rejected.match(resultAction)) {
        throw new Error("gagal delete");
      }
    } catch (error) {
      toast({
        variant: "error",
        title: "Error",
        description: "Failed removing todo",
      });
    }
  };

  const indexTodo = useCallback(async () => {
    try {
      const resultAction = await dispatch(index());
      if (index.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          description: "Todos fetched!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed adding todo",
      });
    }
  }, [dispatch, toast]);

  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      indexTodo();
      ref.current = true;
    }
    return () => {};
  }, [indexTodo]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <div className="flex gap-4">
          <Input
            type="text"
            name="name"
            value={state.name}
            onChange={state.setName}
          />
          <Button variant="outline" onClick={createTodo}>
            Add Note
          </Button>
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {todo.todos.map((todo) => (
          <NoteCard
            key={todo.id}
            todo={todo}
            removeTodo={() => removeTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};
