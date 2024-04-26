import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const clearCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const logOut = (e) => {
    e.preventDefault();
    clearCookie('userToken');
    toast.success("You logged out");
    navigate('/');
  };

  return (
    <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b">
            <h1 className="text-xl font-bold leading-none">
              <span className="text-yellow-700">Task App</span> App
            </h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/home"
                  className={`flex items-center rounded-xl font-bold text-sm py-3 px-4 ${
                    location.pathname === '/home' ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                  </svg>Home
                </Link>
              </li>
              <li>
                <Link
                  to="alltask"
                  className={`flex rounded-xl font-bold text-sm py-3 px-4 ${
                    location.pathname === 'alltask' ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zm-7 6v1H5V6h1zm0 2v1H5V8h1zm0 2v1H5v-1h1zm4-4v1H9V6h1zm0 2v1H9V8h1zm0 2v1H9v-1h1zm0 2v1H9v-1h1z"/>
                  </svg>Task list
                </Link>
              </li>
              <li>
                <Link
                  to="allusers"
                  className={`flex rounded-xl font-bold text-sm py-3 px-4 ${
                    location.pathname === 'allusers' ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                  </svg>Users
                </Link>
              </li>
              <li>
                <button onClick={(e) => logOut(e)} className="flex rounded-xl font-bold text-sm py-3 px-4 bg-white hover:bg-yellow-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  </svg>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
