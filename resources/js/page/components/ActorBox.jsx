import axios from "axios";
import React, { useState } from "react";

const ActorBox = ({ actor }) => {
    const deleteActor = (actorId) => {
        axios
            .delete(`/actors/${actorId}`)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const urlEditActor = "/actors/edit/";
    const [isEditable, setIsEditable] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let datos = {
            ...actor
        };
        datos.name = e.target.name.value;
        datos.description = e.target.description.value;

        fetch(urlEditActor+datos.id, {
            method: "POST",
            headers: {'X-CSRF-TOKEN': token},
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(setIsEditable(false))
            .then(window.location.reload());
    }

    return (
        <>
            {!isEditable ? (
                <div className="projectBox">
                    <div className="projectBoxHeader">
                        <h3>{actor.name}</h3>
                        <h4>A-{actor.id}</h4>
                    </div>
                    <div>
                        <p>{actor.description}</p>
                    </div>
                    <div className="projectBoxHeader">
                        <button
                            className="button orange"
                            onClick={(e) => setIsEditable(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="button red"
                            onClick={(e) => deleteActor(actor.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div className="projectBox">
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" defaultValue={actor.name}></input>
                        <br></br>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="description" defaultValue={actor.description}></input>
                        <br></br>
                        <input
                            type="submit"
                            value="Edit Actor"
                            className="button green"
                        ></input>
                    </form>
                </div>
            )}
        </>
    );
};

export default ActorBox;
