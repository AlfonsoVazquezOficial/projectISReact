import React, { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import ProjectBox from "./ProjectBox";
import axios from "axios";

const ProjectCont = () => {
    const [projects, setProjects] = useState([]);
    const getRequest = "/projects/request";
    const [counter, setCounter] = useState(1);

    const componentDidMount = (httpRequest) => {
      axios
      .get(httpRequest)
      .then((response) => {
          setProjects([...response.data.data]);
      })
      .catch((error) => {
          console.log(error);
      });
    };
    const toCreateProject = () => {
        window.location.href = "/projects/create";
    };

    useEffect(()=> {
      componentDidMount(getRequest);
      console.log(projects);
    }, []);

    useEffect(()=> {
        componentDidMount(getRequest + "/?page=" + counter);
        console.log(getRequest + "/?page=" + counter);
    }, [counter]);
    return (
        <>
            <MainContainer>
                <button
                    className="button green large largeFont"
                    onClick={toCreateProject}
                >
                    Create Project
                </button>
                <h3>Page {counter}</h3>
                <div className="justify-text">
                    {projects.map((project) => (
                        <ProjectBox
                            project={project}
                            key={project.name}
                        ></ProjectBox>
                    ))}
                </div>
                <div className="projectBoxHeader">
                    <button className="button" onClick={() => setCounter(counter - 1)}>Back</button>
                    <button className="button" onClick={() => setCounter(counter + 1)}>Next</button>
                </div>
            </MainContainer>
        </>
    );
};

export default ProjectCont;
