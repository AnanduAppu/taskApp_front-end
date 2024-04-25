import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import UserContex from '../../userContex/UserContex'
function Mainpage() {
    const{userData,setUserData} =  useContext(UserContex)

    console.log(userData)
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium', 
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
          ...taskData,
          [name]: value,
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        taskData.userID=userData._id
      

        try {
            const response = await axios.post('http://localhost:3020/user/createtask',{taskData})
            if(response.data.success){
            
                toast.success("task created")
                setTaskData({
                    title: '',
                    description: '',
                    dueDate: '',
                    priority: 'medium',
                  });
            }
        } catch (error) {
            console.log("the error from task creating",error)
            toast.error("an error occurred")
        }
       
        

      };


  return (
    <main className="ml-60 pt-16 max-h-screen overflow-auto">
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 mb-5">
            <h1 className="text-3xl font-bold mb-10">Create new Task</h1>
            <form onSubmit={handleSubmit}>
              <div className="max-w-4xl space-y-4 p-4 lg:mt-5">
                <div className="flex flex-col space-y-4 border border-gray-500 rounded-lg p-2">
                  <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="border rounded-lg bg-background ring-offset bg-background ring-offset text-2xl p-2"
                    required
                  />
                  <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    placeholder="About Task"
                    className="bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-lg border p-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  ></textarea>
                  <div className="flex justify-between">
                    <div>
                      <h1 className="mx-1 text-yellow-700 font-semibold">Priority</h1>
                      <label>
                        <input
                          type="radio"
                          name="priority"
                          value="low"
                          checked={taskData.priority === 'low'}
                          onChange={handleChange}
                          
                        />
                        Low
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="priority"
                          value="medium"
                          checked={taskData.priority === 'medium'}
                          onChange={handleChange}
                        />
                        Medium
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="priority"
                          value="high"
                          checked={taskData.priority === 'high'}
                          onChange={handleChange}
                        />
                        High
                      </label>
                    </div>
                    <div className="p-2">
                      <label htmlFor="dueDate" className="mx-1 text-blue-500 font-semibold">
                        Due date:-
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="ring-offset-background focus-visible:ring-ring hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <hr className="my-10" />
{ Object.keys(userData).length === 0?<div>Loading</div>:
            <div className="grid grid-cols-1 gap-x-20">
              <div>
                <h2 className="text-2xl font-bold mb-4">Stats</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="p-4 bg-green-100 rounded-xl">
                      <div className="font-bold text-xl text-gray-800 leading-none ">
                        Good day, <br />
                        {" "}
                       <span className="my-2">{userData.username}</span>
                      </div>
                      <div className="mt-5">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                        >
                          Start tracking
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                    <div className="font-bold text-2xl leading-none">{userData.tasks_finished.length}</div>
                    <div className="mt-2">Tasks finished</div>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                    <div className="font-bold text-2xl leading-none">5,5</div>
                    <div className="mt-2">Tracked hours</div>
                  </div>
                  <div className="col-span-2">
                    <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                      <div className="font-bold text-xl leading-none">
                        Total Task
                      </div>
                      <div className="mt-2">{userData.tasks.length}</div>
                    </div>
                  </div>
                </div>
              </div>
    
            </div>}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Mainpage;
