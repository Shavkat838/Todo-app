import { create } from "zustand";

type Store = {
  open:boolean;
  editingId:number;
  title:string;
  filter:string;
  description:string;
  date:string;
  isImportant:boolean;
  isCompleted:boolean;
  setFilter:(item:string)=>void;
  setEditingId:(item:number)=>void;
  setImportant:(item:boolean)=>void;
  setCompleted:(item:boolean)=>void;
  setTitle:(item:string)=>void;
  setDescription:(item:string)=>void;
  setDate:(item:string)=>void;
  setOpen:()=>void
  setClose:()=>void;
  
};

const useTodoStore = create<Store>()((set) => ({
  open: false,
  filter:"ALL",
  editingId:-1,
  title:"",
  date:"",
  description:"",
  isImportant:false,
  isCompleted:false,
  setFilter:(item)=>set(()=>({filter:item})),
  setEditingId:(item)=>set(()=>({editingId:item})),
  setCompleted:(item)=>set(()=>({isCompleted:item})),
  setImportant:(item)=>set(()=>({isImportant:item})),
  setTitle:(item)=>set(()=>({title:item})),
  setDate:(item)=>set(()=>({date:item})),
  setDescription:(item)=>set(()=>({description:item})),
  setOpen:()=>set(()=>({open:true})),
  setClose:()=>set(()=>({ editingId:-1,title:"",description:"",isCompleted:false, isImportant:false,date:"", open:false}))
}));


export default useTodoStore;
