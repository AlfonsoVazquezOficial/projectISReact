import React from "react";
import axios from "axios";

const ProjectBox = ({ project }) => {
    const deleteProject = (projectId) => {
        axios
            .delete(`/projects/${projectId}`)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const showProject = (projectId) => {
        window.location.href = `/projects/${projectId}`;
    };
    return (
        <>
            <div className="projectBox">
                <div className="projectBoxHeader">
                    <h3>{project.name}</h3>
                    <h4>{project.createdDate}</h4>
                </div>
                <div>
                    <p>{project.description}</p>
                </div>
                <div className="projectBoxHeader">
                    <button className="button orange" onClick={(e) => showProject(project.id)}>Open</button>
                    <button
                        className="button red"
                        onClick={(e) => deleteProject(project.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProjectBox;
