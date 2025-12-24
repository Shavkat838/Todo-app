"use client";
import useTodoStore from "@/store/todoStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading, AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type Todo = {
  id: number;
  title: string;
  isImportant: boolean;
  isCompleted: boolean;
  description: string;
  date: Date;
};

type Props = {
  item: Todo;
};

export default function CartTodo({ item }: Props) {
  const router = useRouter();
  const [deleteloading,setDeleteloading]=useState(false
  )
  const {
    setOpen,
    setDescription,
    setTitle,
    setDate,
    setEditingId,
    setImportant,
    setCompleted,
  } = useTodoStore();

  async function handleDelete(id: number) {
    try {
      setDeleteloading(true)
     const deletedTodo=await axios.delete(`api/todos/${id}`);
     if(!deletedTodo){
      alert("O`chirishda kutilmagan xatolik yuz berdi")
      return
     }
     setDeleteloading(false)
      router.refresh();
    } catch (error) {
     setDeleteloading(false)
      console.log(error);
    }
  }

  function boshlangich(item: Todo) {
    setEditingId(item.id);
    setOpen();
    setTitle(item.title);
    setDate(String(item.date));
    setDescription(item.description);
    setImportant(item.isImportant);
    setCompleted(item.isCompleted);
  }

  return (
    <div className="sm:max-w-[270px] mx-auto sm:mx-0  max-w-[360px] w-full h-[190px] rounded-[12px] bg-[#2C2C2C] p-[16px] !shadow-md ">
      <div className="flex flex-col  justify-between h-[130px]  ">
        <span
          style={{ fontSize: "18px" }}
          className="text-white  line-clamp-1 font-medium "
        >
          {item.title}
        </span>
        <span className="text-[14px] line-clamp-3   text-[#CFCFCF]">
          {item.description}
        </span>
        <span className="text-[14px] mt-[5px] text-[#AAAAAA]">
          {item.date.toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center h-[40px] ">
        <button
          className={`text-[12px] ${
            item.isCompleted ? "bg-[#3DDC91]" : "bg-[#F65C5C]"
          }   text-white px-[14px]  py-[3px] flex items-center justify-center !rounded-[25px] `}
        >
          {item.isCompleted ? "Completed" : "Iscompleted"}
        </button>
        <div className="flex gap-2">
          <AiTwotoneEdit
            className="cursor-pointer"
            onClick={() => boshlangich(item)}
            color="white"
            size={22}
          />
          {deleteloading ? (
            <AiOutlineLoading size={18} className="animate-spin text-red-500"  />
          ) : (
            <MdDelete
              className="cursor-pointer"
              onClick={() => handleDelete(item.id)}
              color="white"
              size={22}
            />
          )}
        </div>
      </div>
    </div>
  );
}
