import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3020/user/normalUserAccess");
        if (response.data.success) {
          setAllUsers(response.data.users ?? []); // Provide a default empty array if response.data.users is undefined
        }
      } catch (error) {
      
        toast.error("an error occured in user retriving")
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center py-24">
      <div className="border rounded text-gray-500">
        {allUsers.length === 0 ? (
          <div>Loading...</div>
        ) : (
          allUsers.map((user) => (
            <div className="bg-slate-50 border border-purple-200 p-2 my-1" key={user._id}>
              <div className="flex items-center">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
                  >
                    {user.username}
                  </a>
                  <p>task user</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-900">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia Maiores et perferendis eaque
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Allusers;
