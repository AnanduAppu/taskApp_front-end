import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import UserContex from "../../userContex/UserContex";
function Alltask() {
  const { taskData } = useContext(UserContex);
  const [taskid,setTaskId]= useState("");
  // pagination area
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = taskData.slice(startIndex, endIndex);
  
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  // view the task is here 
  const [isModalView, setIsModalView] = useState(false);

  const [isModalEdit, setIsModalEdit] = useState(false);

  const [viewTask, setViewTask] = useState({});

  const openModalview = (id) => {
    const taskView = taskData.find((ele) => ele._id == id);
    setViewTask(taskView);
    setIsModalView(true);
  };

  const closeModalview = () => {
    setIsModalView(false);
  };



//delete task code 
const [deleteModel,setDeleteModel]=useState(false)

const openModelDelete = (id)=>{
  setTaskId(id)
  setDeleteModel(true)
}


const submitDelete = async(e)=>{
  e.preventDefault()

  try {
   
    const responseDele = await axios.delete("http://localhost:3020/user/deletetask",{
      data: { taskid: taskid }})
    if (responseDele.data.success) {
      toast.success("deleted successful")
      setTaskId('')
    }
  } catch (error) {
    console.log("an error occured when editing time:- ", error)
    toast.error("an error occcured")
  }
}


const closeDeleteModel = ()=>{
  setTaskId('')
  setDeleteModel(false)
}





// editing the task is here 
  const [dateEdit, setDateEdit] = useState("");
  const [headingEdit, setHeadingEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [priorityEdit, setPriorityEdit] = useState("");
 
  const  openModalEdit=(id) => {
    const taskView = taskData.find((ele) => ele._id == id);
    setTaskId(taskView._id)
    setDateEdit(taskView.dueDate);
    setPriorityEdit(taskView.priority)
    setHeadingEdit(taskView.title);
    setDescriptionEdit(taskView.description);
    setIsModalEdit(true)
  }

  const closeModalEdit = () => {
    setIsModalEdit(false);
    setTaskId('')
  };


 const handleSubmit = async(e)=>{
  e.preventDefault()


  try {

    const responseEdit = await axios.put("http://localhost:3020/user/edittask",{dateEdit,headingEdit,descriptionEdit,priorityEdit,taskid})

    if (responseEdit.data.success) {
      toast.success("edited successful")
      setTaskId('')
    }
    
  } catch (error) {
    console.log("an error occured when editing time:- ", error)
    toast.error("an error occcured")
  }
 }

  return (
    <>
        <main className="ml-60 pt-16 max-h-screen overflow-auto">
      <div className="px-6 py-8">
        
        <div className="container flex justify-center  ">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-gray-200 shadow">
                <table className="divide-y divide-green-400">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                      <th className="px-6 py-2 text-xs text-gray-500">Title</th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Description
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Created_at
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        due Date
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Delete
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Priority
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500"></th>
                    </tr>
                  </thead>
                  {taskData.length === 0 ? (
                    <div>Loading..</div>
                  ) : (
                    <tbody className="bg-white divide-y divide-gray-300 ">
                      {currentTasks.map((ele, index) => {
                        return (
                          <tr className="whitespace-nowrap" key={index}>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {ele.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500">
                                {ele.description.slice(0, 25)}...
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {ele.createdAt.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {ele.dueDate.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4">
                              <button onClick={() => openModalEdit(ele._id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6 text-blue-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 
                  2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button  onClick={() =>openModelDelete(ele._id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6 text-red-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                  4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </td>

                            <td
                              className={`px-6 py-4 text-${
                                ele.priority === "medium"
                                  ? "blue"
                                  : ele.priority === "high"
                                  ? "red"
                                  : "black"
                              }-400`}
                            >
                              {ele.priority}
                            </td>
                            <td className="px-6 py-4 ">
                              <button onClick={() => openModalview(ele._id)}>
                                view
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* this area for view the task */}
      {isModalView && (
        <div
          id="medium-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-lg max-h-full mx-auto border border-yellow-700">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {viewTask.title}
                </h3>
                <button
                  onClick={closeModalview}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="medium-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {viewTask.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
       {/* this area for view the task end here */}



        {/* this area for edit the task*/}
        {isModalEdit&&(
           <div id="medium-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ms-96 mt-10">
           <div className="relative w-full max-w-4xl max-h-full">
             {/* Modal content */}
             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
               {/* Modal header */}
               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                
                 <input
                    className="text-xl font-semibold"
                    value={headingEdit}
                    onChange={(e) => setHeadingEdit(e.target.value)}
                  />
                
                 <button type="button" onClick={ closeModalEdit} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="large-modal">
                   <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                   </svg>
                   <span className="sr-only">Close modal</span>
                 </button>
               </div>
               {/* Modal body */}
               <div className="p-4 md:p-5 space-y-4">
               <textarea
                    cols="112"
                    rows="10"
                    className="border border-gray-400 p-1"
                    value={descriptionEdit}
                    onChange={(e) => setDescriptionEdit(e.target.value)}
                  ></textarea>
                 <div className="flex justify-between">
                   <div>
                     {dateEdit.slice(0,10)} / change:- 
                     <input type="date"  
                     onChange={(e) => setDateEdit(e.target.value)}
                     />
                   </div>
                   <div>
                     priority
                     <select 
  value={priorityEdit} 
  onChange={(e) => setPriorityEdit(e.target.value)}
  className="border border-gray-300 rounded-md px-3 py-1 text-sm">
  <option value="">Select Priority</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
                   </div>
                 </div>
               </div>
               {/* Modal footer */}
               <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                 <button data-modal-hide="large-modal"
                  type="button"
                   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                   onClick={(e)=>handleSubmit(e)}
                   >Edit</button>
               </div>
             </div>
           </div>
         </div>
        )
        }

        

        {/* this area for edit the task end here */}


        {/*delete the task start here */}
  {deleteModel&&(<div id="popup-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full mx-96 mt-10">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button 
                        type="button" 
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                        onClick={closeDeleteModel}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this task?</h3>
                        <button 
                          onClick={(e)=>submitDelete(e)}
                            type="button" 
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                            Yes, I'm sure
                        </button>
                        <button 
                            onClick={closeDeleteModel} 
                            type="button" 
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>)}
{/*delete the task end here */}



{/*pagination start here */}
        <div className="flex justify-center mb-5">
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
          </svg>
          Previous
        </button>

        <button 
          onClick={goToNextPage} 
          disabled={currentTasks.length < itemsPerPage}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
      {/*pagination end  here */}
      </main>
    </>
  );
}

export default Alltask;
