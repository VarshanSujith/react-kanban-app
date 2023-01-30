import { FormEvent, useState } from 'react';
import { ObjectType } from 'typescript';
import axios from 'axios';

const Board = ({defaultvalue,setDefaultvalue,setToggleBoard,nameBoard,setNameBoard,colLength,setColLength,getColumn}:{getColumn:any,colLength:any,setColLength:React.Dispatch<React.SetStateAction<string[]>>,defaultvalue:any,setDefaultvalue:any,setToggleBoard:any,nameBoard:any,setNameBoard:any}) => {
  
function addDatatodb(board:any){
  let a={id:1,board:board.boardName}
   axios.put("http://localhost:8000/boardName/"+1,a)
   console.log(board.columns.length)
   for(let i=0;i<board.columns.length;i++){
    let dval=board.columns
    console.log(board.columns+"   acvd")
    let data={id:dval[i].id, TaskName:dval[i].TaskName, task:[...dval[i].task]}
    console.log(data);
    // if(board.columns[i].id)
    //     axios.put("http://localhost:8000/Column/"+dval[i].id,data)
    // else  
        axios.post("http://localhost:8000/Column/",data)    
   }
   for(let i=0;i<board.inviteuser;i++){
    let data={mail:board.inviteuser[i]}
    axios.post("http://localhost:8000/Column/",data)
   }
   getColumn()
}
   const [count,setCount]=useState(5)
  const [steps,changeSteps]=useState(1)
  const [mail,setMail]=useState(0)
  const addColumns = () => {
		let _defaultvalue = [...board.columns]
		_defaultvalue.push({
      id: count,
      TaskName: "",
      limit:0,
      task:[],
      // tag:[],
    })
		setBoard({...board,columns:_defaultvalue})
    setCount(count+1)
	}

  const removeColumns = (id:number) => {
    if(id>4){
		let _defaultvalue = [...board.columns]
		_defaultvalue=_defaultvalue.filter((val)=>val.id!== id)
		setBoard({...board,columns:_defaultvalue})
	}}

  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    changeSteps(steps+1)
  }
  const handleMStep=()=>{
    if(steps>1){
      changeSteps(steps-1)
    }
  }
  var _col:string[]=[];
  function addColName(){
        board.columns.map((v)=>{
          console.log(v.TaskName);
          _col.push(v.TaskName)     
  }) 
  // console.log(_col)  
      setColLength(_col);
       console.log(colLength);
  }
  const finalStep=()=>{
      addColName();
      addDatatodb(board);
      console.log(colLength);
      setToggleBoard(false)
  }
  type colObjProps={
      id:string, 
      TaskName:string,
      limit:number,
      task:any[]
  }

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>,i:number)=>{
    let _columns : any[]=[...board.columns]
    _columns[i][e.target.name as keyof ObjectType]=e.target.value
    setBoard({...board,columns:_columns})
    console.log(board.columns)
    // setColLength(...colLength,e.target.value)
  }
  // const handleval=(e:React.ChangeEvent<HTMLInputElement>)=>{
  //   let _inviteuser:{}[] =[...board.inviteuser];
  //   _inviteuser.push(e.target.value);
  //   setBoard({...board,inviteuser:_inviteuser})
  // }
  const handleMail=()=>{
      setMail(mail+1)

  }
  const handleClose=()=>{
    setToggleBoard(false)
  }
  // const [nameBoard, setNameBoard]=useState('')

  const [board,setBoard]=useState({
    boardName:'',
    columns:[
        {id:1, TaskName:'To-do',limit:0,task:[{}]},
        {id:2, TaskName:'Do today',limit:0,task:[{}]},
        {id:3, TaskName:'In Progress',limit:3,task:[{}]},
        {id:4, TaskName:'Done',limit:0,task:[{}]}
    ],
    inviteuser:[
      {mail:"one@gmail.com"},
      {mail:"two@gmail.com"}
  ],
  })
  return (
    <>
    <div className='flex flex-col gap-2 h-screen bg-[#333333]'>
    <div className='mt-2 w-1/3 ml-[30%] rounded-md  flex flex-col justify-center bg-[#EBECF0] border-[1px] border-[#FFFFFF] shadow-sm shadow-black'>
      <div className='flex flex-row justify-between mx-3'>
      <h3 className='text-center font-bold text-[#333333]  border-[#D3E8F2] border-[1px] text-xl rounded-t-md p-2.5'>Create board</h3>
      <button onClick={handleClose}>Close</button>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className='flex flex-col justify-center pl-4 border-[#BBCDD6] border-[1px] rounded-b-md pt-2'>
      {steps===1 &&  <div>
        <h3 className='font-semibold mb-2'>General Settings</h3>
        <hr />
        <div className='my-2'>
        <label>Board Name: <input autoFocus required type="text" className='border-[1px] border-[#FFFFFF] mb-4 rounded-md' name="" id="" onChange={(e)=>{setBoard({...board,boardName:e.target.value}); setNameBoard(e.target.value)}} /></label></div></div> }
      {steps===2 &&  <div>
        <h3 className='font-semibold mb-2'>Columns and LWIP</h3>
        <hr />
        <div className='my-2 '>
    {
      board.columns.map((val,i)=>(
        <div className='flex flex-row ml-2 gap-14 mb-2' key={val.id}>
        <input className='w-[30%] border-[1px] border-[#ECDCDC] pl-1 rounded-md' autoFocus name='TaskName' type="text" defaultValue={val.TaskName}  onChange={(e)=>handleChange(e,i)}/>
        <input className='w-[15%] border-[1px] border-[#ECDCDC] pl-1 rounded-md' autoFocus name="limit" type='number' defaultValue={val.limit} onChange={(e)=>handleChange(e,i)}/>
        <button className='bg-[#FBFBFB]  border-[1px] border-[#FFFFFF] hover:bg-[#F3F3F3] p-1 rounded-md' onClick={()=>removeColumns(val.id)}>Remove</button>
        </div>
      ))
    }
    </div>
    <button onClick={addColumns} type='button' className='bg-[#FBFBFB]  border-[1px] border-[#FFFFFF] hover:bg-[#F3F3F3] rounded-md p-1 ml-2 mb-2'>Add Columns</button>
    </div> }
      {steps===3 &&  
          <div>
            <h3 className='font-semibold mb-2'>Invite User</h3>
            <hr />
          <div>
          <p>Add emails for users that you want to invite to your board.</p>
          <h3 className='font-semibold'>Email</h3>
          <div className='flex flex-col gap-2'>
          <div className='flex flex-row my-2 gap-4'>
          <input autoFocus required className='border-[1px] border-[#FFFFFF] rounded-md' name="email" type="text" />
          <button className='bg-[#FBFBFB] w-1/5 border-[1px] border-[#FFFFFF] hover:bg-[#F3F3F3] rounded-md' onClick={handleMail}>Invite User</button></div>
          <div >
           { 
              board.inviteuser.map((ab)=>(
                <div>
                   <input type="checkbox" id="one" name="vehicle1" value={ab.mail}/>
                  <label>{ab.mail}</label>
                </div>
               
              ))
            }
          </div>

          {/* {mail && <p>{board.inviteuser[0]}</p>}
          <p>{board.boardName}</p> */}
      </div>  
      </div>   
      </div>
      }
      <hr />
      <div className='flex justify-between flex-row-reverse gap-6 p-2'>
      {steps===3 &&  (<button type='submit' className='hover:bg-[#449D44] text-[#FFFFFF] p-1 bg-[#49A849] rounded-md' onClick={finalStep}>Create Board</button>)}
      {steps<3 &&(<button type='submit' className='bg-[#2185D0] text-[#FFFFFF] w-1/5 h-[35px]  hover:bg-[#1F7DC3] rounded-md'> Next</button>)}
          {steps>1 && steps <=3 &&  (<button type='button' onClick={handleMStep} className='bg-[#FBFBFB] w-1/5 border-[1px] border-[#DBDBDB] hover:bg-[#F3F3F3] rounded-md' >Previous</button>)}
      </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default Board