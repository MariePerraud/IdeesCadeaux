/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
import React, { useEffect, useContext } from "react";
import Axios from "axios";
// import Swal from "sweetalert";
import "./Form.css";
import IdeaContext from "../contexts/IdeaContext";

export default function Form() {
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
      setUsers(resp.data)
    );
  }, []);

  const handleClick = () => {
    Axios.post(`${import.meta.env.VITE_BACKEND_URL}/cadeaux`, {
      ideaName: ideaname,
      user_id: selectedUser.userID,
    })
      .then((response) => {
        if (response.data) {
          // Swal({
          //   title: "Idée ajoutée avec succès.",
          //   icon: "success",
          //   confirmButtonText: "Ok",
          // });
          setUsername("");
        }
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

  return (
    <div>
      <form className="FormContainer">
        <div className="FormLabel">
          <h2 style={{ textAlign: "center", color: "var(--red-color)" }}>
            UNE IDÉE ?
          </h2>
          <p>
            <em>
              Entre le nom de ton proche et l'idée cadeau, puis le tour est joué
              !
            </em>
          </p>
          <label htmlFor="name">Pour qui ?</label>
          <input
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
                  setSelectedUser(item.id);
                }}
              >
                {item.userName}
              </option>
            ))}
        </div>

        <div className="FormLabel">
          <label htmlFor="idea">Quoi ?</label>
          <input
            name="idea"
            value={ideaname}
            onChange={(e) => setIdeaname(e.target.value)}
          />
        </div>

        <button className="FormButton" type="submit" onClick={handleClick}>
          Ajouter
        </button>
      </form>
    </div>
  );
}
