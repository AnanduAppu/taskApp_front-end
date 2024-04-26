import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import UserContex from "../../userContex/UserContex";
function TaskViewing() {
    let { taskId } = useParams()
    const { taskData } = useContext(UserContex);
    const findTask = taskData.find((ele)=>ele._id==taskId)
  return (
    <div className="px-72">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">{findTask.title}</h3>
        </div>
        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {findTask.description}
          </p>
        </div>
        {/* Modal footer */}
        <div className="flex justify-between items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
          <div>Due Date: {findTask.dueDate.slice(0, 10)}</div>
          <div>Priority: {findTask.priority}</div>
        </div>
      </div>
    </div>
  )
}

export default TaskViewing