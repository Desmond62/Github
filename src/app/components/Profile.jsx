"use client";

import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";

function fetchRepos() {
  return fetch("https://api.github.com/users/bradtraversy/repos")
    .then((response) => response.json())
    .then((repos) => repos || []);
}

const ReposPage = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetchRepos()
      .then((data) => setRepos(data))
      .catch((error) => {
        console.error("Error fetching repositories:", error);
      });
  }, []);

  return (
    <div className="repos-container">
      <h2>Repositories</h2>

      <div className="w-[90%] m-auto py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="hover:bg-gray-100 p-5 rounded-lg border-gray-200 border-[1px] ease-in-out	duration-150 transition-all"
            >
              <Link href={`/code/repos/${repo.name}`} className="space-y-4">
                <h3 className="text-xl font-semibold tracking-wide">
                  {repo.name}
                </h3>
                <p className="text-sm text-gray-700 tracking-wide">
                  {repo.description}
                </p>
                <div className="flex space-x-4">
                  <span className="flex space-x-2 items-center">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="flex space-x-2 items-center ">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <span className="flex space-x-2 items-center">
                    <FaEye /> {repo.watchers_count}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReposPage;
