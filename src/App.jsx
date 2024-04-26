import AssembleAuthuserPages from "./pages/authorisedUser/AssembleAuthuserPages";
import Clintcontex from "./userContex/UserContex";
import { Routes, Route, useNavigate } from "react-router-dom";
import Mainpage from "./pages/authorisedUser/Mainpage";
import Login from "./pages/Authorisation/Login";
import Signup from "./pages/Authorisation/Signup";
import Alltask from "./pages/authorisedUser/Alltask";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { isEqual } from "lodash";
import axios from "axios";
import { useEffect } from "react";
import Allusers from "./pages/authorisedUser/Allusers";
import Assembleuserpage from "./pages/users/Assembleuserpage";
import TaskViewing from "./pages/users/TaskViewing";
import Tasklisting from "./pages/users/Tasklisting";
import Pagenotfound from "./pages/Pagenotfound";

function App() {

  const [userData,setUserData] = useState({})
  const [AuthtaskData,SetauthTaskData] = useState([])
  const navigate = useNavigate()

useEffect(()=>{

  const fetchData = async()=>{
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!cookieToken) {
   
      navigate('/')
      return;
    }


    const cookieData = jwtDecode(cookieToken);
    const id = cookieData.userID;

    try {

      const [response1, response2] = await Promise.all([
        axios.get("http://localhost:3020/user/useraccess",{params:{userId:id}},{ withCredentials: true }),
        axios.get('http://localhost:3020/user/Authtaskaccess',{params:{userId:id}})
      ]);
      if (!response1.data.success || !response2.data.success) {
        navigate('/')
        return response1.data.error , response2.data.error
      }


    const userDetails = response1.data.Data;
    const tasks = response2.data.task;

    if (!isEqual( userData,userDetails)|| !isEqual(AuthtaskData, tasks)) {
      SetauthTaskData(tasks);
      setUserData(userDetails )
    }


    } catch (error) {
      console.error("an error occured when task data retrieve from server:- ",error)
    }
  }

  fetchData();
},[userData,AuthtaskData])





const [taskData,SetTaskData] = useState([])
useEffect(() => {
  const fetchTask = async () => {
    try {
      const response = await axios.get('http://localhost:3020/user/taskaccess')
      const value = response.data.task;

      if (!isEqual(taskData, value)) {
        SetTaskData(value);
       
      }
    } catch (error) {
      toast.error("we get an error in retriving blog datas");
    }
  };

  fetchTask();
}, [taskData]);



  const data = {userData,setUserData,taskData,SetTaskData,AuthtaskData,SetauthTaskData};

  return (
    <>
     <Toaster />
      <Clintcontex.Provider value={data}>
      
        <Routes>
        <Route path="/" element={<Login/>}>
          
        </Route>
        <Route path="/signup" element={<Signup/>} />


          <Route path="/home" element={<AssembleAuthuserPages />}>
            <Route index element={<Mainpage />} />
            <Route path="alltask" element={<Alltask />} />
            <Route path="allusers" element={<Allusers />} />
          </Route>

          <Route path="/userhome" element={<Assembleuserpage />}>
            <Route index element={<Tasklisting />} />
            <Route path="viewtask/:taskId" element={<TaskViewing />}/>
          </Route>

          <Route path="*" element={<Pagenotfound/>} />
        </Routes>
      </Clintcontex.Provider>
    </>
  );
}

export default App;
