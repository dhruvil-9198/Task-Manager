"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { useSession, signIn, signOut } from "next-auth/react"
import { useUser } from '@auth0/nextjs-auth0/client'

const Page = () => {
    const [todo, setTodo] = useState("")
    const [tar, settar] = useState([])
    const [setshowbtn, setSetshowbtn] = useState(false);
    // const { data: session } = useSession()
    const { user, error, isLoading } = useUser();

    let u_name;
    // const saveLS = (newtar) => {
    //   localStorage.setItem("user_det", JSON.stringify(newtar))
    // }
    if(user){
      u_name = user.email;
      // saveLS(user.email);
    }
      
    
  
    const getPasswords = async () => {
      console.log("ENTERED")
      // let nt = localStorage.getItem("user_det");
      // if(nt){
      //     let ntar = JSON.parse(localStorage.getItem("user_det"))
      //     u_name = ntar;
      // }
      let url = 'https://task-manager-l1rs.onrender.com'
      const params = new URLSearchParams({
        u_name : u_name
      });
      console.log("MID")
      let req = await fetch(`${url}?${params.toString()}`)
      let tasks = await req.json()
      settar(tasks);
      console.log("FINISHED")
  }
  
  
  useEffect(() => {
    if(user){
      getPasswords();
    }
    
  }, [user])
  
  
  
  

    const HandleSaveclick = async () => {
      let newtar = [...tar, { id: uuidv4(), u_name ,todo, isCompleted: false }];
      settar(newtar)
      // saveLS(newtar);
      
      //deletes task if it already exists
      
      await fetch("https://task-manager-l1rs.onrender.com/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: uuidv4(), u_name, todo, isCompleted: false }) })
      setTodo("")
    //   alert("Todo changed")
    }
    const HandleEditclick = async (e, id) => {
      let t = tar.filter(item => item.id === id)
  
      setTodo(t[0].todo);
  
      let newtar = tar.filter(item => {
        return (item.id !== id && item.u_name === u_name)
      })
  
      await fetch("https://task-manager-l1rs.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) })
  
  
      settar(newtar)
      // saveLS(newtar);
    }
  
    const HandleDelclick = async (e) => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        let newtar = tar.filter(item => {
          return (item.id !== e.target.name && item.u_name === u_name)
  
        })
        
        settar(newtar)
        // saveLS(newtar);
        await fetch("https://task-manager-l1rs.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: e.target.name }) })
      }
    }
  
    // const handleClearAll = () => {
    //   localStorage.clear();
    //   settar('');
    // };
  
    const Handlechange = (e) => {
      setTodo(e.target.value)
    }
  
    const HandleshowBtn = () => {
      setSetshowbtn(!setshowbtn);
    }
  
    const HandleStrike = async (it) => {
      let id = it.id;
      let index = tar.findIndex(item => {
        return (item.id === id && item.u_name === it.u_name);
      })
      
      let newtar = [...tar]
      newtar[index].isCompleted = !newtar[index].isCompleted;
      settar(newtar);
      
      await fetch("https://task-manager-l1rs.onrender.com/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id }) })
      await fetch("https://task-manager-l1rs.onrender.com/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(it) })
  
  
  
      // saveLS(newtar);
    }
  
    return (
      <>
        {user && <div className="sup md:container  flex justify-center items-center my-5">
          <div className="container text-white bg-slate-900 rounded-xl w-2/3 flex flex-col">
            <div className='my-5 font-bold text-2xl text-center'>Manage your Tasks at one place</div>
            <div className='addtodo mb-5'>
              <div className='text-lg font-medium px-16'>Add a task</div>
              <div className='flex flex-col gap-3 md:flex-row md:gap-3 justify-center md:items-center'>
                <input onChange={Handlechange} value={todo} type="text" className='rounded-2xl text-black py-1 px-3 mt-3 md:ml-20 md:mr-5 ml-10 w-2/3' />
                <button onClick={HandleSaveclick} disabled={todo.length <= 0} className='bg-orange-500 px-5 py-1 rounded-full hover:font-medium mt-3 transition-all disabled:bg-orange-300'>Save</button>
              </div>
            </div>
            <div className="show p-8 text-sm border-b border-cyan-700 mb-3">
              <input onChange={HandleshowBtn} type="checkbox" name="show" id="toShow" /> Show Finished
            </div>
  
            <div className="my-4 pl-16 pr-24 lower flex flex-col">
              <div className='text-lg font-medium pb-3'>Your Tasks</div>
              {tar.length === 0 && <div className='m-5'>No Tasks to display</div>}
              {tar.map(item => {
                return (setshowbtn || !item.isCompleted) && <div className="cards flex border-b border-cyan-700 justify-around items-center py-2 mb-4">
                  <div className='flex gap-2 w-2/3 h-full'>
                    <input onChange={()=>HandleStrike(item)} checked={item.isCompleted} type="checkbox" name={item.id} id="1" />
                    <div className={(item.isCompleted) ? "line-through w-2/3 whitespace-pre-wrap break-words" : "w-2/3 whitespace-pre-wrap break-words"}>{item.todo}</div>
                  </div>
                  <div className='flex gap-3 h-full'>
                    <button onClick={(e) => HandleEditclick(e, item.id)} className='bg-orange-500 px-2 py-1 text-xs rounded-2xl hover:font-medium transition-all'>Edit</button>
                    <button onClick={HandleDelclick} name={item.id} className='bg-orange-500 px-2 py-1 text-xs rounded-2xl hover:font-medium transition-all'>Delete</button>
                  </div>
                </div>
              })}
            </div>
  
          </div>
        </div>}
      </>
    )
}

export default Page
