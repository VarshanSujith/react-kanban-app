import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Kanban from './Kanban';

const Login = () => {

    const myFunction=()=>{
        var x:any = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
const [loggedIn,setLoggedIn]=useState(false)
const [check,setCheck]=useState(false)
 const [account,setAccount]=useState({
    userName:'',
    password:'',
 })    
 var checkAccount={
    username:'Arjun',
    password:'Arjun1234'
 } 
 const navigate = useNavigate();
function handleClick(){
    if(checkAccount.username===account.userName && checkAccount.password ===account.password){
        setCheck(false)
        setLoggedIn(true)
        navigate("/kanban");
        console.log('yess'); 
    }
    else if(account.userName==="Varun" && account.password==="Varun1234")
    {
      setCheck(false)
      setLoggedIn(true)
      navigate("/kanban");
      console.log('yess'); 
    }
    else if(account.userName==="Anand" && account.password==="Anand1234")
    {
      setCheck(false)
      setLoggedIn(true)
      navigate("/kanban");
      console.log('yess'); 
    }
    else if(account.userName==="Parvati" && account.password==="Parvati1234")
    {
      setCheck(false)
      setLoggedIn(true)
      navigate("/kanban");
      console.log('yess'); 
    }

    else{
        setLoggedIn(false)
        setCheck(true)
    }
}
  return (
    <>
    <form onSubmit={handleClick} className='flex flex-col items-center justify-center w-1/3 my-[5%] mx-[35%] bg-[#EBECF0] p-16 rounded-lg gap-6 border-[1px] border-[#FFFFFF] shadow-sm shadow-black'>
        <h3 className='font-bold text-xl'>Sign In</h3>
        <hr />
        <div className='flex flex-col gap-1'>
            <label className='font-semibold'>Email:</label>
            <input required autoFocus name='email' type="text" placeholder='Arjun' onChange={(e)=>{setAccount({...account,userName:e.target.value});setCheck(false)}}/>
        </div>
        <div className='flex flex-col gap-1'>
            <label className='font-semibold'>Password:</label>
            <input required name='password' type="password" id='myInput'placeholder='Arjun1234' onChange={(e)=>{setAccount({...account,password:e.target.value});setCheck(false)}} />
            <div>
            <input type="checkbox" onClick={myFunction}/>Show Password</div>
        </div>
        <div className='flex flex-col gap-10 justify-evenly'>
            <button className='font-semibold border-[1px] bg-[#2185D0] border- py-2 px-6 text-[#EBECF0] hover:bg-[#1F7DC3] rounded-md' type='button' onClick={handleClick}>Log In</button>
             {check && <p className='text-red-600'>Invalid Account</p>}
            {/* <button className='font-semibold border-[1px] border-'>Sign Up</button> */}
        </div>
    </form>
    </>
  )
}

export default Login