import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBarProject from "./components/NavBarProject";
import MainContainer from "./components/MainContainer";
import ReactDOM from "react-dom/client";
import "./style.css";
import ActorBox from "./components/ActorBox";

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

const ActorsHome = () => {
    const [project, setProject] = useState({});
    const getRequest = "/projects/request/";
    const [id, setId] = useState(findProjectId());
    const [actors, setActors] = useState([]);
    const getActorsRequest = "/projects/actors/get/" + id;
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        componentDidMount(getRequest);
        getActors(getActorsRequest + "/?page=" + counter);
    }, [counter]);


    const getActors = (httpRequest) => {
        axios
            .get(httpRequest)
            .then((response) => {
                setActors([...response.data.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
        getActors(getActorsRequest);
        console.log(actors);
    }, []);

    const toCreateActors = () => {
        window.location.href = window.location.href + "/create";
    };
    return (
        <>
            <NavBarProject idEnabled={2} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    <h1>Actors</h1>
                    <div>
                        <button
                            className="button green large"
                            onClick={toCreateActors}
                        >
                            Create actors
                        </button>
                    </div>
                    <div>
                    {
                        actors.map((item) => <ActorBox actor={item} key={item.id}></ActorBox>)
                    }
                    </div>
                    
                    <div className="projectBoxHeader">
                        <button
                            className="button"
                            onClick={() => setCounter(counter - 1)}
                        >
                            Back
                        </button>
                        <button
                            className="button"
                            onClick={() => setCounter(counter + 1)}
                        >
                            Next
                        </button>
                    </div>
                </MainContainer>
            </div>
        </>
    );
};

export default ActorsHome;
ReactDOM.createRoot(document.getElementById("app")).render(<ActorsHome />);
