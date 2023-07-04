import axios from "axios";
import React, { useState } from "react";

const findProjectId = () => {
    const currentUrl = window.location.href.split("");

    let counter = 0;
    let result = "";

    currentUrl.forEach((char) => {
        if (char === "/") {
            counter++;
        } else {
            if (counter === 4) {
                result += char;
            }
        }
    });
    return Number(result);
};

const RequerimentBox = ({ requeriment, urlToDelete , isFunctional}) => {
    const [isEditable, setIsEditable] = useState(false);
    const urlEditRequerimentF = "/requeriments/edit/f/";
    const urlEditRequerimentNF = "/requeriments/edit/nf/";
    const [id, setId] = useState(findProjectId());


    const deleteRequeriment = (requerimentId) => {
        axios
            .delete(urlToDelete + requerimentId)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let datos = {
            ...requeriment
        };
        datos.name = e.target.name.value;
        datos.description = e.target.description.value;

        let url = "";

        if(isFunctional) {
            url = urlEditRequerimentF;
        } else {
            url = urlEditRequerimentNF;
        }

        fetch(url+datos.id, {
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
                        <div>
                            <h3>{requeriment.label}</h3>
                        </div>
                        <div>
                            <h4>{requeriment.name}</h4>
                        </div>
                    </div>
                    <div>{requeriment.description}</div>
                    <div className="projectBoxHeader">
                        <button
                            className="button orange"
                            onClick={(e) => setIsEditable(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="button red"
                            onClick={(e) => deleteRequeriment(requeriment.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div className="projectBox">
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" defaultValue={requeriment.name}></input>
                        <br></br>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="description" defaultValue={requeriment.description}></input>
                        <br></br>
                        <input
                            type="submit"
                            value="Edit Requeriment"
                            className="button green"
                        ></input>
                    </form>
                </div>
            )}
        </>
    );
};

export default RequerimentBox;
