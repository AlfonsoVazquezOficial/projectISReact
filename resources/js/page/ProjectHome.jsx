import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import NavBarProject from "./components/NavBarProject";
import MainContainer from "./components/MainContainer";
import axios from "axios";
import ProjectBox from "./components/ProjectBox";

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

const ProjectHome = () => {
    const [project, setProject] = useState({});
    const [id, setId] = useState(findProjectId());
    const getRequest = "/projects/request/";
    const [isEditable, setIsEditable] = useState(false);

    const componentDidMount = (httpRequest) => {
        axios
            .get(httpRequest + id)
            .then((response) => {
                setProject({ ...response.data });
                console.log(project);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useState(() => {
        componentDidMount(getRequest);
    }, []);

    const saveEdit = () => {
        setIsEditable(false);
        console.log(isEditable);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let datos = {
            ...project
        };
        datos.name = e.target.name.value;
        datos.description = e.target.description.value;
        setProject(datos);
        console.log(datos);
        fetch("/projects/edit/"+id, {
            method: "POST",
            headers: {'X-CSRF-TOKEN': token},
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(setIsEditable(false));
    };

    return (
        <>
            <NavBarProject idEnabled={0} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    {!isEditable ? (
                        <div>
                            <h1>Welcome</h1>
                            <div className="projectBoxHeader">
                                <div>
                                    <h3>{project.name}</h3>
                                </div>
                                <div>{project.dateCreated}</div>
                            </div>
                            <p>{project.description}</p>
                            <button
                                className="button large orange"
                                onClick={() => setIsEditable(true)}
                            >
                                Edit
                            </button>
                        </div>
                    ) : (
                        <div>
                            <form className="" onSubmit={handleSubmit}>
                                <label htmlFor="name">Name: </label>
                                <input type="text" id="name" defaultValue={project.name}></input>
                                <br></br>
                                <label htmlFor="description">
                                    Description:{" "}
                                </label>
                                <input type="text" id="description" defaultValue={project.description}></input>
                                <br></br>
                                <input
                                    type="submit"
                                    value="Save"
                                    className="button large orange"
                                ></input>
                            </form>
                        </div>
                    )}
                </MainContainer>
            </div>
        </>
    );
};

export default ProjectHome;
ReactDOM.createRoot(document.getElementById("app")).render(<ProjectHome />);
