import React from "react";
import MainContainer from "./MainContainer";
import ReactDOM from "react-dom/client";
import "../style.css";
import NavBar from "./NavBar";

const CreateProject = () => {

    const toProjects = () => {
        window.location.href = "/projects";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const date = new Date();
        const dateFormatted = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const datos = {
            name: e.target.name.value,
            description: e.target.description.value,
            dateCreated: dateFormatted,
        };
        console.log(datos);
        fetch("/projects/store", {
            method: "POST",
            headers: {'X-CSRF-TOKEN': token},
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(toProjects());
    };

    return (
        <>
            <NavBar idEnabled={1}></NavBar>
            <div className="mainC">
                <MainContainer>
                    <h1>Create Project</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name"></input>
                        <br></br>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="description"></input>
                        <br></br>
                        <input
                            type="submit"
                            value="Create Project"
                            className="button green"
                        ></input>
                    </form>
                </MainContainer>
            </div>
        </>
    );
};

export default CreateProject;
ReactDOM.createRoot(document.getElementById("app")).render(<CreateProject />);
