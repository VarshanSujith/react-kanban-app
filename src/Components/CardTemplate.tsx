import React, { FormEvent, useState } from 'react'
import { uuidv4 } from '@firebase/util';
import Select from 'react-select';

import axios from 'axios';
// import InviteUser from './sample/InviteUser';
// import { cardarray } from '../App'

type typeUsers = {
  imgUrl:string;
  value: string;
  label?: string;
  password: string;
};
export const usersInfo: typeUsers[] = [
  {
    imgUrl:"https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
    label: "Arjun",
    value: "Arjun",
    password: "Arjun1234",
  },
  {
    imgUrl:"https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
    label: "Varun",
    value: "Varun",
    password: "Varun1234",
  },
  {
    imgUrl:"https://www.morganstanley.com/content/dam/msdotcom/people/tiles/isaiah-dwuma.jpg.img.490.medium.jpg/1594668408164.jpg",
    label: "Anand",
    value: "Anand1234",
    password: "Anand1234",
  },
  {
    imgUrl:"https://cdn2.f-cdn.com/files/download/38547697/ddc116.jpg",
    label: "Parvati",
    value: "Parvati",
    password: "Parvati1234",
  },
 
];


function CardTemplate({toggleCard,setToggleCard,changeTask,nameBoard,setNameBoard,colLength,setColLength,getColumn,user,defaultvalue,setDefaultvalue}:{setDefaultvalue:any,defaultvalue:any ,user:any,getColumn:any,colLength:any,setColLength:any,toggleCard:any,setToggleCard:any,changeTask:any,nameBoard:any,setNameBoard:any}) {
  
 const [card,setCard]=useState({
  taskId:uuidv4(),
  imageUrl:'',
  taskName:'',
  color:'white',
  tag:[],
  description:'',
  date:''
 })
  function handleColor(e:React.ChangeEvent<HTMLSelectElement>){
    setCard({...card,color:e.target.value})

    
  }

console.log(changeTask);
function postCard(){
  console.log(changeTask);
  let data={id:changeTask.id, TaskName:changeTask.TaskName, task:[...changeTask.task,{...card}]}
  let temp=[];
    // console.log(parent.id,child.taskId +" c ds sd  ")
    console.log(defaultvalue);
    for(let i=0;i<defaultvalue.length;i++){
      if(defaultvalue[i].id===data.id){
        temp.push(data)
      }
      else{
        temp.push(defaultvalue[i])
      }
    }
    console.log(defaultvalue);
    console.log(temp);
    setDefaultvalue(temp)
}

const handleToggle=()=>{
  setToggleCard(false)
}
const handleTitle=()=>{
  postCard();
  // console.log(card,"savdv");
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
        <Select
              isMulti
              name="colors"
              options={usersInfo}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e:any)=>{setCard({...card,tag:e})}}
              />
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
// 
export default CardTemplate