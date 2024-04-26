import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContex from "../../userContex/UserContex";
function Tasklisting() {
  const { taskData } = useContext(UserContex);
const navigate = useNavigate()

   const HandleView = (e,taskId)=>{
    e.preventDefault
  
     navigate( `viewtask/${taskId}`)
  }


  // pagination area
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = taskData.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
        {taskData.length === 0 ? (
          <>loading...</>
        ) : (
          currentTasks.map((ele, index) => (
            <div key={index} className="mx-auto max-w-3xl m-2">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {ele.title}
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>{ele.description.slice(0, 110)}...</p>
                  </div>
                  <div className="flex mt-2 justify-between">
                    <div>due date:- {ele.dueDate.slice(0, 10)}</div>
                    <div
                      className={` text-${
                        ele.priority === "medium"
                          ? "blue"
                          : ele.priority === "high"
                          ? "red"
                          : "black"
                      }-400`}
                    >
                      {" "}
                      priority:-{ele.priority}
                    </div>
                  <p>Task by:- {ele.user.username}</p>
                  </div>
                  <div className="mt-3 text-sm">
                    <button onClick={(e)=>HandleView(e,ele._id)} className="font-medium text-indigo-600 hover:text-indigo-500">
                      view
                      <span aria-hidden="true"> →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/*pagination start here */}
      <div className="flex justify-center">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>

        <button
          onClick={goToNextPage}
          disabled={currentTasks.length < itemsPerPage}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
      {/*pagination end  here */}
    </div>
  );
}

export default Tasklisting;
