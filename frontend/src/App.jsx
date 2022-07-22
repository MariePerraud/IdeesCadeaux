/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import IdeaContext from "./contexts/IdeaContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Proches from "./pages/Proches";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [ideaname, setIdeaname] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);

  return (
    <>
      <div className="App">
        <NavBar />
      </div>

      <IdeaContext.Provider
        value={{
          username,
          setUsername,
          ideaname,
          setIdeaname,
          selectedUser,
          setSelectedUser,
          data,
          setData,
          users,
          setUsers,
          ideas,
          setIdeas,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/Proches" element={<Proches />} />
        </Routes>
      </IdeaContext.Provider>
    </>
  );
}
