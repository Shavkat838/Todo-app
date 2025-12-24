"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useTodoStore from "@/store/todoStore";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Modal() {
  const {
    open,
    setClose,
    date,
    setEditingId,
    description,
    editingId,
    setDate,
    setDescription,
    setTitle,
    title,
    isCompleted,
    isImportant,
    setCompleted,
    setImportant,
  } = useTodoStore();
  const router = useRouter();
  const [saveloading,setSaveLoading]=useState(false)
  const [editloading,setEditLoading]=useState(false)
  const { user } = useUser();

  async function handleSave() {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (editingId !== -1) {
      try {
        setEditLoading(true)
       const res= await axios.put(`/api/todos/${editingId}`, {
          title,
          description,
          date: new Date(date),
          isCompleted,
          isImportant,
          userId: user.id,
        });

        if(!res.data){
          return  alert("edit qilishda xatolik")
        }
        setEditLoading(false)
        setEditingId(-1);
        router.refresh();
      } catch (error) {
        setEditLoading(false)
        console.log(error);
      }
    } else {
      try {

        if(title===""||description===""||date===""){
          alert("Iltimos forma malumotlarini kiritishingiz kerak!")
          return
        }
        setSaveLoading(true)
       const res= await axios.post("/api/todos", {
          title,
          description,
          date: new Date(date),
          isCompleted,
          isImportant,
          userId: user.id,
        });
      if (!res.data){
           return alert("qoshishda xatolik")
      }

      setSaveLoading(false)
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }

    setClose();
    clearForm();
  }

  function clearForm() {
    setCompleted(false);
    setDate("");
    setDescription("");
    setImportant(false);
    setTitle("");
  }

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogContent className="max-w-[350px]  sm:max-w-[550px] w-full  !shadow-md bg-neutral-900   rounded-[20px]    p-[40px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-[24px] text-white font-bold ">
              Create task
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-[40px] flex flex-col gap-[12px] sm:mt-[53px]">
              <>
                <span className=" text-[14px] sm:text-[20px] text-white text-left   font-medium ">
                  Title
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                  className="max-w-[523px] bg-black px-[10px] w-full mt-[4px]  h-[50px] rounded-[10px] placeholder:text-gray-300"
                />
              </>
              <>
                <span className=" text-[14px] sm:text-[20px] text-left   text-white  font-medium ">
                  Description
                </span>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Description"
                  className="max-w-[523px]  bg-black px-[10px] w-full mt-[4px]  h-[50px] rounded-[10px] placeholder:text-gray-300"
                />
              </>
              <>
                <span className=" text-[14px] sm:text-[20px]  text-left text-white  font-medium ">
                  Date
                </span>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  placeholder="Manzilingizni kiriting"
                  className="max-w-[523px] text-white px-[10px] w-full mt-[4px]  h-[50px] rounded-[10px] [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer  bg-black placeholder:text-gray-300"
                />
              </>
              <span className="flex items-center justify-between">
                <span className="text-white">Togle Important</span>
                <input
                  checked={isImportant}
                  onChange={(e) => setImportant(e.target.checked)}
                  type="checkbox"
                />
              </span>
              <span
                className={`${
                  editingId === -1 ? "hidden" : "block"
                }   flex flex-col gap-2`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-white">Togle Completed</span>
                  <input
                    checked={isCompleted}
                    onChange={(e) => setCompleted(e.target.checked)}
                    type="checkbox"
                  />
                </span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setClose()}>
              Close
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} className="rounded-[30px] flex items-center justify-center " >
              {saveloading || editloading ? (
                <AiOutlineLoading3Quarters size={30} className="animate-spin" />
              ) : editingId === -1 ? (
                "+ Create Task"
              ) : (
                "Edit Task"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
