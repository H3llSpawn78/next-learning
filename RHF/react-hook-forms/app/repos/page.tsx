"use client";

import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";

export default function GitHubRepo() {
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getRepos("H3llSpawn78");
  }, []);

  const getRepos = async (username: string) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await res.json();
    //console.log(data);
    setRepos(data);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedRepo(null);
    getRepos(username);
  };

  const onRepoClick = (id: number) => {
    const selection = repos.find((item) => item.id === id);
    setSelectedRepo(selection);
  };

  return (
    <>
      <Header headingText="GitHub Repos" />
      <div className="container mx-auto max-w-md p-5">
        <form onSubmit={onSubmit}>
          <input
            value={username}
            placeholder="Enter github username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="rounded-sm border border-gray-300 border-width: 2px bg-gray-300 text-black p-2 mb-5 me-2"
          />
          <input
            type="submit"
            className="rounded-sm border-2 border-gray-300 bg-gray-500 text-white p-2 mb-5 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out"
            value="Search"
          />
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <h2>
            Search results for {username}:
            <br />
          </h2>
          {repos.length > 0 ? (
            repos.map((item) => (
              <button key={item.id} onClick={() => onRepoClick(item.id)}>
                {item.name}
              </button>
            ))
          ) : (
            <div>No repos</div>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="mt-5"
        >
          <h2>Details:</h2>
          {selectedRepo && (
            <>
              <h3>Repos Name: {selectedRepo.name}</h3>
              <h3>{`Last Updated: ${new Date(selectedRepo.updated_at).toLocaleDateString()}`}</h3>
              <h3>Repo Url: {selectedRepo.html_url}</h3>
            </>
          )}
        </div>
      </div>
    </>
  );
}
