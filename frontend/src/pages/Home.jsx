/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
// import Swal from "sweetalert";
import { FaSearch } from "react-icons/fa";
import { ImBin, ImCross } from "react-icons/im";
import "./Home.css";
import IdeaContext from "../contexts/IdeaContext";

export default function Home() {
  const [display, setDisplay] = useState(false);
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
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/proches`).then(
      (response) => {
        setUsers(response.data);
      }
    );
  }, []);

  const handleGetIdeas = () => {
    setDisplay(true);
    const id = selectedUser.userID;
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/cadeaux/proches/${id}`).then(
      (resp) => {
        setIdeas(resp.data);
      }
    );
  };

  const handleClear = () => {
    setUsername("");
    setDisplay(false);
  };

  // const handleDelete = () => {
  //   Axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cadeaux/${id}`)
  //     .then((res) => {
  //       if (res.data) {
  //         // Swal({
  //         //   title: "Idée supprimée avec succès.",
  //         //   icon: "success",
  //         //   confirmButtonText: "Ok",
  //         // });
  //         setUsername("");
  //       }
  //       // Axios.get(
  //       //   `${import.meta.env.VITE_BACKEND_URL}/proches/cadeaux/${id}`
  //       // ).then((resp) => {
  //       //   setIdeas(resp.data);
  //       // });
  //       return res.data;
  //     })
  //     .catch(() => {
  //       // Swal({
  //       //   title: "La suppression a échoué.",
  //       //   icon: "error",
  //       //   confirmButtonText: "Ok",
  //       // });
  //       setUsername("");
  //     });
  // };

  return (
    <>
      <div className="SearchContainer">
        <div className="search">
          <h2 style={{ textAlign: "center", color: "var(--red-color)" }}>
            QUÉSAKO ?
          </h2>
          <p>
            <em>
              Cette application te permet de garder la trace de toutes les idées
              de cadeaux que tu souhaites offrir à tes proches.
            </em>
          </p>
          <label htmlFor="searchBar">Rechercher un proche :</label>
          <div className="searchInput">
            <input
              name="searchBar"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {display ? (
              <ImCross className="svgIcons" onClick={handleClear} />
            ) : (
              <FaSearch className="svgIcons" onClick={handleGetIdeas} />
            )}
          </div>
        </div>

        <div className="dataResult">
          {users
            .filter((item) => {
              const searchTerm = username.toLowerCase();
              const result = item.userName.toLowerCase();
              return (
                searchTerm &&
                result.includes(searchTerm) &&
                result !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <option
                className="dataItem"
                onClick={() => {
                  setUsername(item.userName);
                  setSelectedUser(item.userID);
                }}
              >
                {item.userName}
              </option>
            ))}
        </div>
      </div>

      <div>
        {!display ? null : (
          <div className="ideasContainer">
            <div className="cardHeader">
              <h3>{username}</h3>
            </div>
            <div className="cardIdeas">
              {ideas.map((item) => (
                <div className="idea">
                  {/* ajouter onClick={handleDelete} sur ImBin */}
                  <ImBin className="svgIcons" />
                  <li>{item.ideaName}</li>
                </div>
              ))}
            </div>

            <Link to="/Form">
              <button className="FormButton" type="button">
                Ajouter une idée
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
