import AssembleAuthuserPages from "./pages/authorisedUser/AssembleAuthuserPages";
import Clintcontex from "./userContex/UserContex";
import { Routes, Route } from "react-router-dom";
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

function App() {

  const [userData,setUserData] = useState({})


useEffect(()=>{

  const fetchData = async()=>{
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!cookieToken) {
      toast.error("Token not found");
      return;
    }

    console.log(cookieToken);
    const cookieData = jwtDecode(cookieToken);
    const id = cookieData.userName;

    try {

      
    const response = await axios.get("http://localhost:3020/user/useraccess",{params:{userId:id}},{ withCredentials: true })
    if (!response.data.success){
      return console.log("an issue occured in useraccess route")
    }

    const userDetails = response.data.Data;

  

    if (!isEqual( userData,userDetails)){
      setUserData(userDetails )
    }


    } catch (error) {
      console.log("an error occured when task data retrieve from server:- ",error)
    }
  }

  fetchData();
},[userData])



const [taskData,SetTaskData] = useState([])


useEffect(() => {
  const fetchTask = async () => {
    try {
      const response = await axios.get('http://localhost:3020/user/taskaccess')
      const value = response.data.task;

      if (!isEqual(taskData, value)) {
        SetTaskData(value);
       
        console.log("blog details are ", value);
       
      }
    } catch (error) {
      console.log("we get an error in retriving blog datas", error);
    }
  };

  fetchTask();
}, [taskData]);



  const data = {userData,setUserData,taskData};

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
        </Routes>
      </Clintcontex.Provider>
    </>
  );
}

export default App;
