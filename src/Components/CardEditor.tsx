import React, { FormEvent} from 'react'
import { cardarray } from './Kanban'
import Select from 'react-select'
import { usersInfo } from './CardTemplate'

function cardEditor({edit,setEdit,setTEdit,nameBoard,setNameBoard,changeTask,colLength,setColLength,getColumn,user, defaultvalue,setDefaultvalue}:{setDefaultvalue:any,defaultvalue:any, user:any,getColumn:any,colLength:any,setColLength:any,edit:any,setEdit:any,setTEdit:any,nameBoard:any,setNameBoard:any,changeTask:any}) {

function handleColor(e:React.ChangeEvent<HTMLSelectElement>){
    setEdit({...edit,color:e.target.value})
    console.log(e)
    }
    const handleClick=()=>{
            setTEdit(false)
    }
const handleSubmit=(e:FormEvent)=>{
    console.log() 
        e.preventDefault()
        console.log(edit)
        addCardtoDb(edit)  
        
    }
  const handleMe=()=>{
    addCardtoDb(edit) 
  }  

// async function addCardtoDb(card:cardarray){
//   console.log(changeTask);
//   let data={id:changeTask.id, TaskName:changeTask.TaskName, task:[...changeTask.task,{...edit}]}
//   for(let i=0;i<changeTask.task.length;i++){
//     if(changeTask.task[i].taskId===edit.taskId){
//       data.task.splice(i,1)
//       break;
//     }
//   }
//   console.log(data)
//   try {
    
//     let response=await axios.put("http://localhost:8000/Column/"+changeTask.id,data)
//     console.log(response)
//     getColumn()
//     setTEdit(false)
//   } catch (error) {
//     console.log(error);
//   }
//     }

function addCardtoDb(card:cardarray){
  console.log(changeTask);
  let data={id:changeTask.id, TaskName:changeTask.TaskName, task:[...changeTask.task,{...edit}]}
  let temp=[];
    console.log(defaultvalue);
    for(let i=0;i<defaultvalue.length;i++){
      if(defaultvalue[i].id===data.id){
        var tempCard=defaultvalue[i].task.filter((item:any, i:number)=>(item.taskId !==edit.taskId))
        temp.push({...defaultvalue[i],task:[...tempCard,{...edit}]})
        // temp.push({...defaultvalue[i],task:edit})
      }
      else{
        temp.push(defaultvalue[i])
      }
    }
    setDefaultvalue(temp)
}

  return (
    <div className='flex flex-col w-fit items-center border-[1px] border-white rounded-md shadow-md shadow-black'>
      <div style={{backgroundColor:edit.color}}>
        <div className='flex flex-row justify-between gap-4 m-2 '>
          <h2 className='font-semibold text-center my-2'>Edit Card</h2>
      <button type='button' className='bg-[#FBFBFB] border-[1px]  border-[#EBECF0] hover:bg-[#F3F3F3] rounded-md' onClick={handleClick}>Close</button>
      </div>
      <hr />
        <form className="content flex flex-col gap-6 p-4 "  id='card' onSubmit={(e)=>handleSubmit}>
       <div className='flex flex-col gap-2'>
       <label htmlFor="">Image Url </label>
       <input type="url" autoFocus className='border-[1px] border-[#EBECF0]  rounded-md pl-1' value={edit.imageUrl} onChange={(e)=>{setEdit({...edit,imageUrl:e.target.value})}} />
       </div> 
       <div className='flex flex-col gap-2'>
        <label htmlFor="">Task Name</label>
        <input type="text" className='border-[1px] border-[#EBECF0] rounded-md pl-1' value={edit.taskName} onChange={(e)=>{setEdit({...edit,taskName:e.target.value})}} /> 
        </div>
        <div> 
          <label htmlFor="">Color</label>
        <select name="" id="" className='border-[1px] border-[#FFFFFF] rounded-md pl-1' onChange={(e)=>handleColor(e)} value={edit.color}>
        <option value="#FFFFFF">White</option>
          <option value="#00C7E6"> Blue</option>
          <option value="#8778D7">Purple</option>
          <option value="#FF80CE">Pink</option>
          <option value="#FEC404">Yellow</option>
        </select>
        </div>
        <div className='flex flex-col gap-2'>
        <label htmlFor="">Description</label>
        <textarea className='border-[1px] border-[#EBECF0] rounded-md pl-1' value={edit.description} onChange={(e)=>{setEdit({...edit,description:e.target.value})}} />
        </div>
        <div className='flex flex-col'>
        <label htmlFor="">users:</label>
        <Select
              isMulti
              name="colors"
              options={usersInfo}
              className="basic-multi-select"
              defaultValue={edit.tag}
              classNamePrefix="select"
              onChange={(e:any)=>{setEdit({...edit,tag:e})}}
              />
        
        </div>
        <div className='flex flex-col gap-2'>
        <label htmlFor="">Date</label>
        <input type="date" className='border-[1px] border-[#EBECF0] rounded-md pl-1' value={edit.date} onChange={(e)=>{setEdit({...edit,date:e.target.value})}} /> 
        </div><hr />
        <button type='button' className='bg-[#FBFBFB] w-1/5 ml-[70%] border-[1px] border-[#EBECF0] hover:bg-[#F3F3F3] rounded-md'onClick={handleMe}>Save</button>
        </form>
    </div>
    </div> 
  )
}

export default cardEditor



