import React, { FormEvent, useState } from 'react'
import { uuidv4 } from '@firebase/util';

import axios from 'axios';
// import InviteUser from './sample/InviteUser';
// import { cardarray } from '../App'

function CardTemplate({toggleCard,setToggleCard,changeTask,setchangeTask,nameBoard,setNameBoard,colLength,setColLength,getColumn,user}:{user:any,getColumn:any,colLength:any,setColLength:any,toggleCard:any,setToggleCard:any,changeTask:any,setchangeTask:any,nameBoard:any,setNameBoard:any}) {
  
 const [card,setCard]=useState({
  taskId:uuidv4(),
  imageUrl:'',
  taskName:'',
  color:'white',
  tag:[''],
  description:'',
  date:''
 })
  function handleColor(e:React.ChangeEvent<HTMLSelectElement>){
    setCard({...card,color:e.target.value})

    
  }

console.log(changeTask);
async function postCard(){
  let data={id:changeTask.id, TaskName:changeTask.TaskName, task:[...changeTask.task,{...card}]}
  console.log(data)
  try {
    let response=await axios.put("http://localhost:8000/Column/"+changeTask.id,data)
    setToggleCard(false)
    console.log(response)
    getColumn()
  } catch (error) {
    console.log(error);
  }
}

const handleToggle=()=>{
  setToggleCard(false)
}
const handleTitle=()=>{
  postCard();
}
  const handleSubmit=(e:FormEvent)=>{
      e.preventDefault()
  }
  const handleChecked=(e:any,index:any)=>{
    let val:any=[];
    if(e.target.checked){
      val.push(e.target.value)
      setCard({...card,tag:val})
    }
    else{
      val.splice(index,1)
      setCard({...card,tag:val})
    }
  }
  console.log(card);
  return (
    <div className='flex flex-col items-center border-[1px] border-white rounded-md shadow-md shadow-black'>
      <div style={{backgroundColor:card.color}}>
      <div  className='flex flex-row justify-between gap-4 m-2'>
      <h2 className='font-semibold text-center my-2'>Create Card</h2>

      <button type='reset' className='bg-[#FBFBFB]  border-[1px] border-[#EBECF0] hover:bg-[#F3F3F3] rounded-md' onClick={handleToggle}>Close</button>
      </div>
      <hr />
        <form className="content flex flex-col gap-6 p-4 "  id='card' onSubmit={(e)=>handleSubmit}>
        
       <div className='flex flex-col'>
       {/* <p>{changeTask}available</p> */}
       <label htmlFor="">Image Url:</label>
       <input type="url" autoFocus className='border-[1px] border-[#EBECF0]  rounded-md pl-1' value={card.imageUrl} onChange={(e)=>{setCard({...card,imageUrl:e.target.value})}} />
       </div> 
          
        <div className='flex flex-col'>
        <label htmlFor="">Task Name:</label> 
        <input type="text" className='border-[1px] border-[#EBECF0] rounded-md pl-1' value={card.taskName} onChange={(e)=>{setCard({...card,taskName:e.target.value})}} />
        </div>
        
        <div className='flex flex-col'>
        <label htmlFor="">Color</label>
        <select name="" id="" className='border-[1px] border-[#FFFFFF] rounded-md pl-1' onChange={(e)=>handleColor(e)} value={card.color}>
        <option value="#FFFFFF">White</option>
          <option value="#00C7E6">Blue</option>
          <option value="#8778D7">Purple</option>
          <option value="#FF80CE">Pink</option>
          <option value="#FEC404">Yellow</option>
        </select>
        </div>
       
        <div className='flex flex-col'>
        <label htmlFor="">Description:</label>
        <textarea  className='border-[1px] border-[#EBECF0] rounded-md pl-1' value={card.description} onChange={(e)=>{setCard({...card,description:e.target.value})}} />
        </div>
        <div className='flex flex-col'>
        <label htmlFor="">users:</label>
          {user.map((item:any,index:any)=>(
                 <div>
          <input type="checkbox" id="one" name="" value={item.mail} onChange={(e)=>handleChecked(e,index)}/>
          <label>{item.mail}</label>
          </div>
          ))}
        
        </div>
        
        <div className='flex flex-col'>
        <label htmlFor="">Date:</label> 
        <input type="date" className='border-[1px] border-[#EBECF0] rounded-md pl-1' value={card.date} onChange={(e)=>{setCard({...card,date:e.target.value})}} />
        </div>
        <hr />
        <button type='button' className='bg-[#FBFBFB] w-1/5 ml-[70%] border-[1px] border-[#EBECF0] hover:bg-[#F3F3F3] rounded-md'onClick={handleTitle} >Save</button>
        </form>
    </div>
    </div> 

  )
}

export default CardTemplate