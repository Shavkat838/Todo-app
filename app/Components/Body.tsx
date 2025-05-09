"use client"
import { FiPlus } from "react-icons/fi";
import CartTodo from "./CartTodo";
import useTodoStore from "@/store/todoStore";


export type Todo = { 
  id:number;
  title: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  isImportant: boolean;
};

type Props={
   body:Todo[];
}

export default function Body({body}:Props) {
   
  const {setOpen,filter}=useTodoStore()
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="max-w-[1220px] w-full grid  grid-1 sm:grid-cols-4 gap-2 pt-[10px] ">
      {body
        .filter((item) => {
          if (filter === "ALL") return true;
          if (filter === "COMPLETED") return item.isCompleted;
          if (filter === "IMPORTANT") return item.isImportant;
          if (filter === "NOW")
          return item.date.toISOString().split("T")[0] === today;
          return false;
        })
        .map((item) => (
          <CartTodo key={item.id} item={item} />
        ))}
      <div className="sm:max-w-[270px]  max-w-[300px] w-full h-[190px] rounded-[12px] flex items-center justify-center bg-[#2C2C2C] p-[16px] shadow-md ">
        <div
          onClick={() => setOpen()}
          className="max-w-[200px] cursor-pointer w-full shadow-[20px] rounded-full  flex gap-[5px] items-center justify-center"
        >
          <FiPlus size={26} color="white" />
          <span className="text-white text-[18px] font-medium">
            Add new task
          </span>
        </div>
      </div>
    </div>
  );
}
