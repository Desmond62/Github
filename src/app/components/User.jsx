"use client";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import Image from "next/image";

import { useState, useEffect } from "react";

function fetchUserDetails() {
  return fetch("https://api.github.com/users/bradtraversy")
    .then((response) => response.json())
    .then((user) => user || {});
}

const User = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserDetails()
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  return (
    <div className="user-details-container py-8">
      <div className="w-[50%] mx-auto">
        <div className="flex justify-center space-x-10">
          <div className="">
            <Image src={user.avatar_url} alt="user" width={50} height={50} />
          </div>

          <div className="px-10">
            <h3 className="text-xl font-semibold tracking-wide">
              {user.login}
            </h3>
            <p className="text-sm text-gray-700 tracking-wide">{user.bio}</p>
            <div className="flex space-x-4">
              <span className="flex space-x-2 items-center">
                <FaStar /> {user.followers} followers
              </span>
              <span className="flex space-x-2 items-center ">
                <FaCodeBranch /> {user.following} following
              </span>
              {/* Add more user details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
