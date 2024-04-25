import React from "react";

const Allusers = () => {
  return (
    <div className="flex justify-center py-24">
      <div className=" border rounded text-gray-500">
        <div className=" bg-slate-50 border border-purple-200 p-2 my-1">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full mr-3"
              src="https://loremflickr.com/320/320/girl"
              alt="jane"
            />
            <div className="text-sm">
              <a
                href="#"
                className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
              >
                Jane doe
              </a>
              <p>Blogger &amp; Youtuber</p>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-900">
            Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus
            quia Maiores et perferendis eaque
          </p>
        </div>
        <div className=" bg-slate-50 border border-purple-200 p-2">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full mr-3"
              src="https://loremflickr.com/320/320/girl"
              alt="jane"
            />
            <div className="text-sm">
              <a
                href="#"
                className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out"
              >
                Jane doe
              </a>
              <p>Blogger &amp; Youtuber</p>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-900">
            Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus
            quia Maiores et perferendis eaque
          </p>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
