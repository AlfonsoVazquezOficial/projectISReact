import React, { useEffect, useState } from "react";
import CreateRequeriment from "./CreateRequeriment";
import ReactDOM from "react-dom/client";
import "../style.css";
import axios from "axios";
import NavBarProject from "./NavBarProject";
import MainContainer from "./MainContainer";

const CreateActor = () => {
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
    const getRequest = "/projects/request/";
    const [id, setId] = useState(findProjectId());
    const [project, setProject] = useState({});
    const actorsStoreUrl = "/projects/"+id+"/actors/store";


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

    useEffect(() => {
        componentDidMount(getRequest);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const datos = {
            name: e.target.name.value,
            description: e.target.description.value,
            project_id: id
        };
        fetch(actorsStoreUrl, {
            method: "POST",
            headers: {'X-CSRF-TOKEN': token},
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(toActors());
    }

    const toActors = () => {
        let url = window.location.href;
        url = url.substring(0, 40);
        window.location.href = url;
    }
    return (
        <>
            <NavBarProject idEnabled={2} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    <h1>Create Actor</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name"></input>
                        <br></br>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="description"></input>
                        <br></br>
                        <input
                            type="submit"
                            value="Create Actor"
                            className="button green"
                        ></input>
                    </form>
                </MainContainer>
            </div>
        </>
    );
};

export default CreateActor;
ReactDOM.createRoot(document.getElementById("app")).render(<CreateActor />);
