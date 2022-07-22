/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
// import Swal from "sweetalert";
import { ImBin } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import "./Proches.css";
import IdeaContext from "../contexts/IdeaContext";

export default function Proches() {
  const [dataUser, setDataUser] = useState([]);
  const {
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
  } = useContext(IdeaContext);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/proches`).then((resp) =>
      setDataUser(resp.data)
    );
  }, []);

  const handleAdd = () => {
    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/proches`, {
      userName: username,
    })
      .then((response) => {
        if (response.data) {
          // Swal({
          //   title: "Proche ajouté avec succès.",
          //   icon: "success",
          //   confirmButtonText: "Ok",
          // });
          setUsername("");
        }
        Axios.get(`${import.meta.env.VITE_BACKEND_URL}/proches`).then((resp) =>
          setDataUser(resp.data)
        );
        return response.data;
      })
      .catch(() => {
        // Swal({
        //   title: "L'enregistrement a échoué.",
        //   icon: "error",
        //   confirmButtonText: "Ok",
        // });
        setUsername("");
      });
  };

  const handleDelete = (id) => {
    Axios.delete(`${import.meta.env.VITE_BACKEND_URL}/proches/${id}`).then(
      (response) => {
        // if (response.data) {
        //   Swal({
        //     title: "Proche supprimé avec succès.",
        //     icon: "success",
        //     confirmButtonText: "Ok",
        //   });
        // }
        return response.data;
      }
    );
    // .catch(() => {
    //   Swal({
    //     title: "La suppression a échoué.",
    //     icon: "error",
    //     confirmButtonText: "Ok",
    //   });
    // });
  };

  return (
    <>
      <div className="prochesContainer">
        <h2 style={{ textAlign: "center", color: "var(--red-color)" }}>
          MES PROCHES
        </h2>

        <div className="add">
          <label htmlFor="addBar">Ajouter un proche :</label>
          <div className="addInput">
            <input
              name="addBar"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaPlus className="svgIcons" onClick={handleAdd} />
          </div>
        </div>
      </div>

      <div className="Cards">
        {dataUser.map((item) => (
          <div className="cardProches">
            <li key={item.userID}>
              <ImBin className="svgIcons" onClick={handleDelete} />
              &nbsp;{item.userName}
            </li>
          </div>
        ))}
      </div>
    </>
  );
}
