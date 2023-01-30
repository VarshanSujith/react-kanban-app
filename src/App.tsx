import { Route, Routes } from 'react-router-dom';
import './App.css';

import Kanban from './Components/Kanban';
import Login from './Components/Login';


function App() { 
  return(
  <>
  <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path='/kanban' element={<Kanban/>}/>
    <Route path="*" element={<NoPage />} />
  </Routes>
  </>
  );
}

export default App;


const NoPage=()=>{
  return(
    <p>Error 404 Not Found</p>
  );
}
export {NoPage}
