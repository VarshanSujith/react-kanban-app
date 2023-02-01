import React, { useEffect, useState } from 'react';
import CardEditor from './CardEditor';
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';
import CardTemplate from './CardTemplate';
import Board from './CreateBoard';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';
import { useNavigate } from 'react-router-dom';

export type boardProps={
  boardName:string
  columns:[]
  inviteuser:{}[]
}
export type columed={
  id:string,
  TaskName:string,
  limit:number,
  tasks:object[],
}
export type userarray={
  email:'',
  password:''
}
export type cardarray={
  taskId:string,
  imageUrl:string,
  taskName:string,
  tag:[],
  color:string,
  description:string,
  date:string
}



function Kanban() { 

  // dummy db 
  const [defaultvalue,setDefaultvalue]=useLocalStorage("boardData",[
    {id:'1', TaskName:'To-do',task:[{
        taskId:'11',
        imageUrl:'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        taskName:'Complete Phase 1',
        // color:'white',
        description:'Phase 1 is important so kindly focus',
        tag:[
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
          }
        ],
        date:'2023-01-22'
       }]},
    {id:'2', 
    TaskName:'Do today',
    task:[
      {
        taskId:'21',
        imageUrl:'https://www.istockphoto.com/resources/images/PhotoFTLP/P4-JAN-iStock-1432854572.jpg',
        taskName:'Find Bugs',
        // color:'white',
        description:'',
        tag:[
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
          }

        ],
        date:'2023-01-24'
       }
      ]
    },
    {id:'3', TaskName:'In Progress',task:[{
        taskId:'31',
        imageUrl:'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=',
        taskName:'Change the Outlook',
        // color:'white',
        description:'',
        tag:[
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
          }
        ],
        date:'2023-01-26'
       }]},
    {id:'4', TaskName:'Done',task:[{
        taskId:'41',
        imageUrl:'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
        taskName:'Fix the Bug',
        // color:'white',
        description:'',
        tag:[
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

        ],
        date:'2023-01-28'  
       }]}   
  ])

//dummy db 


  
const [changeTask,setChangeTask]=useState();
  const handleCard=(val:any)=>{
    setChangeTask(val)

    setToggleCard(!toggleCard)
    console.log(changeTask,val);
    console.log(toggleCard);
  }
  const [toggleBoard,setToggleBoard]=useState(false)
  const [toggleCard,setToggleCard]=useState(false)

  // const [showPopup, setShowPopup] = useState(false)
  const handleBoard=()=>{
    if (toggleBoard){
      console.log(toggleBoard);
      setToggleBoard(false)    }
    else{
      console.log(toggleBoard);
      setToggleBoard(true)
    }
  }
  const [edit,setEdit]=useState({
    taskId:'',
    imageUrl:'',
    taskName:'',
    color:'',
    description:'',
    tag:[],
    date:''
  })
  const [tEdit,setTEdit]=useState(false)
  function handleEdit(val:any,v:any){
    setEdit(v)
    setChangeTask(val)
    console.log(edit)
    if (tEdit){setTEdit(false)}
    else{
      setTEdit(true)
  }
    } 
 function updateColumn(dval:any){
  let temp=[]
  for(let i=0;i<dval.length;i++){
  let data={id:dval[i].id, TaskName:dval[i].TaskName, task:[...dval[i].task]}
  // axios.put("http://localhost:8000/Column/"+data.id,data)
  temp.push(data)
  console.log(data)
}
setDefaultvalue(temp)
 }


    const onDragEnd=(result:any)=>{
      if(!result.destination) return 
      const {source ,destination } = result

      if(source.droppableId !==destination.droppableId){
        const sourceColIndex= defaultvalue.findIndex((e:any)=>e.id===source.droppableId)
        const destinationColIndex= defaultvalue.findIndex((e:any)=>e.id===destination.droppableId)

        const sourceCol=defaultvalue[sourceColIndex]
        const destinationCol=defaultvalue[destinationColIndex]

        const sourceTask=[...sourceCol.task]
        const destinationTask=[...destinationCol.task]

        const [removed]=sourceTask.splice(source.index,1)
        destinationTask.splice(destination.index,0,removed)

        defaultvalue[sourceColIndex].task =sourceTask
        defaultvalue[destinationColIndex].task=destinationTask
       
      }
      // console.log(defaultvalue)
      updateColumn(defaultvalue)
    }
 
  // function focusHandler(index: any): void {
  //   throw new Error('Function not implemented.');
  // }
const[toggleMenu,setToggleMenu]=useState(false)
  const handleDb=()=>{
    if(toggleMenu){
      setToggleMenu(false)
    }else{
    setToggleMenu(true)
  }
  }
const [nameBoard, setNameBoard]=useState('')
const[colLength,setColLength]=useState<string[]>([])

// useEffect(()=>{getColumn();getUser()},[])

async function getColumn(){
    try {
      let response=await axios.get("http://localhost:8000/Column")
      console.log(response)
      setDefaultvalue(response.data)
    } catch (error) {
      console.log(error);
    }
}
const [user,setUser]=useState()
async function getUser(){
  try {
    let response=await axios.get("http://localhost:8000/inviteUser")
    console.log(response)
    setUser(response.data)
  } catch (error) {
    console.log(error);
  }
}

function deleteItem(parent:any,child:any){
    let temp=[];
    console.log(parent.id,child.taskId +" c ds sd  ")
    console.log(defaultvalue);
    for(let i=0;i<defaultvalue.length;i++){
      if(defaultvalue[i].id===parent.id){
        var tempCard=defaultvalue[i].task.filter((item:any, i:number)=>(item.taskId !==child.taskId))
        temp.push({...defaultvalue[i],task:tempCard})
      }
      else{
        temp.push(defaultvalue[i])
      }
    }
    console.log(defaultvalue);
    setDefaultvalue(temp)

  // let data={id:par.id, TaskName:par.TaskName, task:[...par.task]}
  // let vv = par.task.length
  // for(let i=0;i<vv;i++){
  //   console.log(i,par.task+" hello  ");
  //   if(data.task[i].taskId===chi.taskId){
  //     console.log("gonna remove");
  //     data.task.splice(i,1);
  //     break
  //   }
  // }
  // try {
  //   let response=await axios.put("http://localhost:8000/Column/"+par.id,data)
  //   console.log(response)
  //   getColumn()
  // } catch (error) {
  //   console.log(error);
  // }
}

const navigate = useNavigate();
const handleDelete=(val:any,v:any)=>{
  deleteItem(val,v)
}
    const [loggedIn,setLoggedIn]=useState(false)
    const handleLogIn=()=>{
        setLoggedIn(true)
        navigate("/");
        console.log(defaultvalue)
    }
    
const dummy=()=>{
  console.log(colLength);
}

  return(

    <React.Fragment>
    
    <div className='flex flex-col gap-2 '>
    <div className='bg-[black] flex flex-row justify-between align-middle'>
      <button className='hover:bg-[#666666] bg-[#515151] text-[#EBFAFF] border-[1px] border-[#434343] m-2 rounded-sm' onClick={handleBoard}><i className="fas fa-bars"></i> Create Board</button>

      <p className='text-[#EBFAFF] mt-2'>Kanban</p>
      <div className='flex flex-row gap-2 pr-2'>
        <button className='hover:bg-[#666666] bg-[#515151] text-[#EBFAFF] border-[1px] border-[#434343] my-2 mx-1 rounded-sm w-[20px]' onClick={handleDb}><i className="fas fa-bell"></i></button>
        <button className='hover:bg-[#666666] bg-[#515151] text-[#EBFAFF] border-[1px] border-[#434343] my-2 mx-1 rounded-sm w-[20px]' onClick={dummy}><i className="fas fa-question"></i></button>
        <button className='hover:bg-[#666666] bg-[#515151] text-[#EBFAFF] border-[1px] border-[#434343] my-2 mx-1 rounded-sm' onClick={handleLogIn}>Logout</button>
      </div>
      {toggleMenu &&< div className=" pl-2 pr-2 p-2 absolute  right-0 w-[250px] bg-white mr-[25px] mt-[42px]  border-2  cursor-pointer rounded-md">
          <div className="font-bold ">Notifications</div>
          <div className="text-sm border-b-2">
            <p>Your are invited by Kumar to join new Board</p>
          </div>
          <div className="text-sm border-b-2">
            <p>Kumar moved the card to TO-DO</p>
          </div>
          <div className="text-sm border-b-2">
            <p>Your are invited by Krishna to join new Board</p>
          </div>
        </div>}
     </div>
    {toggleBoard && <Board colLength={colLength} setColLength={setColLength} defaultvalue={defaultvalue} setDefaultvalue={setDefaultvalue} getColumn={getColumn} nameBoard={nameBoard} setNameBoard={setNameBoard} setToggleBoard={setToggleBoard}/> }
    {toggleCard && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          padding: '20px',
          borderRadius: '10px'
        }}>
          <CardTemplate user={user} defaultvalue={defaultvalue} setDefaultvalue={setDefaultvalue} colLength={colLength} setColLength={setColLength} setToggleCard={setToggleCard} toggleCard={toggleCard} changeTask={changeTask} nameBoard={nameBoard} setNameBoard={setNameBoard}getColumn={getColumn} />
          {/* <button onClick={handleCard}>Close</button> */}
        </div>
      )}
      {tEdit && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          padding: '20px',
          borderRadius: '10px'
        }}>
          <CardEditor defaultvalue={defaultvalue} setDefaultvalue={setDefaultvalue} user={user} colLength={colLength} setColLength={setColLength} getColumn={getColumn} edit={edit} setEdit={setEdit} changeTask={changeTask} setTEdit={setTEdit} nameBoard={nameBoard} setNameBoard={setNameBoard}/>
          {/* <button onClick={handleCard}>Close</button> */}
        </div>
      )}
     {toggleBoard===false && 

      <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex flex-row justify-evenly gap-4 h-[85vh] mt-6 mx-3'>
      {defaultvalue.map(((val:any) =>

        <Droppable
        key={val.id} 
        droppableId={val.id}
        >
          {(provided)=>(

        <div className='flex flex-col h-fit  w-1/5 border-[1px] gap-12 bg-[#EBECF0] rounded-md'
        {...provided.droppableProps}  ref={provided.innerRef}
        >
          <header className=' h-fit'>
            <div className='mx-4 mt-2 flex flex-row justify-between gap-6 bg-[#EBECF0]'>
              <p className='text-[#172B4D] text-lg font-bold'>{val.TaskName}</p>
            <button className='mr-2' onClick={()=>handleCard(val)} id={val.TaskName}><i className="fas fa-plus"></i></button>
            </div>
          </header>
          <main>
           <div>
            {val.task && val.task.map(((v:any,index:number)=>

              <Draggable
              key={v.taskId}
              draggableId={v.taskId} 
              index={index}>
              {(provided,snapshot)=>(
                
              <div className='bg-[#FFFFFF] rounded-md flex flex-col m-4' style={{background:`${v.color}`,opacity:snapshot.isDragging?0.5:1}} 
                  ref={provided.innerRef} 
                  {...provided.draggableProps} 
                  {...provided.dragHandleProps} >
                   {/* {<p>{v.taskId}</p>} */}
                   {v.taskId&&<div className='flex flex-row justify-between mx-2 mt-1'>   
                <button onClick={()=>handleDelete(val,v)}><i className="fas fa-trash"></i> Delete</button>
                <button onClick={()=>handleEdit(val,v)}><i className="fas fa-pen"></i> Edit</button>
              </div>}
                <div className='mx-2 mt-2'>
                  {v.imageUrl && <img src={v.imageUrl} alt=""className='w-[310px] h-[120px] rounded-md'/>}</div>
                  <div className='m-2'>
                    <div className='flex flex-row justify-between mb-2'>
                      {v.taskName&&<p className='text-sm font-semibold text-[#172B4D]'>{v.taskName}</p>}
                      <p></p>
                      </div>
                    <div className='flex flex-row justify-between mb-2'>
                      {v.description && <p className='text-sm text-[#172B4D]'>{v.description}</p>}
                      </div>
                      {v.tag &&<div className='flex flex-row-reverse'>
                        {v.tag.map((t:any)=>(
                            <img src={t.imgUrl} alt="" className='h-8 w-8 rounded-full' />
                        ))}
                      </div> }
                    {v.date && <p className='text-[#6D798E]'><i className="fas fa-calendar-alt"></i> {v.date}</p>}
                  </div>
                </div>
              
                )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </main>
       </div>
       )}
       </Droppable>
        ))}
    </div>
    </DragDropContext>
    }

    </div>
    
    </React.Fragment>
  );
    
  }
export default Kanban;

