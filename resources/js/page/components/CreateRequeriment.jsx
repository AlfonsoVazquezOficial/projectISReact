import React, { useEffect, useState } from "react";
import NavBarProject from "./NavBarProject";
import ReactDOM from "react-dom/client";
import "../style.css";
import MainContainer from "./MainContainer";
import NavBar from "./NavBar";
import axios from "axios";

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

const CreateRequeriment = () => {
    const getRequest = "/projects/request/";
    const [id, setId] = useState(findProjectId());
    const [project, setProject] = useState({});
    const functionalStoreUrl = "/projects/"+id+"/requeriments/store/f";
    const unfunctionalStoreUrl = "/projects/"+id+"/requeriments/store/nf";


    const handleSubmit = (e) => {
        e.preventDefault();
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const datos = {
            name: e.target.name.value,
            description: e.target.description.value,
            label: "",
            project_id: id
        };
        console.log(datos);
        let urlPost = "";
        if(e.target.isFunctional.checked) {
            urlPost = functionalStoreUrl;
        } else {
            urlPost = unfunctionalStoreUrl;
        }
        fetch(urlPost, {
            method: "POST",
            headers: {'X-CSRF-TOKEN': token},
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(toRequeriments());
    }

    const toRequeriments = () => {
        let url = window.location.href;
        url = url.substring(0, 45);
        window.location.href = url;
    }

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

    return (
        <>
            <NavBarProject idEnabled={1} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    <h1>Create Requeriment</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name"></input>
                        <br></br>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="description"></input>
                        <br></br>
                        <label htmlFor="isFunctional">Is Functional?</label>
                        <input type="checkbox" id="isFunctional"></input>
                        <br></br>
                        <input
                            type="submit"
                            value="Create Requeriment"
                            className="button green"
                        ></input>
                    </form>
                </MainContainer>
            </div>
        </>
    );
};

export default CreateRequeriment;
ReactDOM.createRoot(document.getElementById("app")).render(<CreateRequeriment />);
