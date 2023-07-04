import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import NavBarProject from "./components/NavBarProject";
import MainContainer from "./components/MainContainer";
import axios from "axios";
import CaseUseBox from "./components/CaseUseBox";

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

const UseCaseHome = () => {
    const [project, setProject] = useState({});
    const getRequest = "/projects/request/";
    const [id, setId] = useState(findProjectId());
    const [counter, setCounter] = useState(1);
    const [useCases, setUseCases] = useState([]);
    const getUseCasesRequest = "/projects/"+id+"/usecases/get";
    

    const getUseCases = (httpRequest) => {
        axios
            .get(httpRequest)
            .then((response) => {
                setUseCases([...response.data.data]);
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
        getUseCases(getUseCasesRequest);
    }, []);

    useEffect(() => {
        componentDidMount(getRequest);
        getUseCases(getUseCasesRequest + "/?page=" + counter);
    }, [counter]);

    const toCreateUseCase = () => {
        window.location.href = window.location.href + "/create";
    };

    return (
        <>
            <NavBarProject idEnabled={3} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    <h1>Use Cases</h1>
                    <div>
                        <button
                            className="button green large"
                            onClick={toCreateUseCase}
                        >
                            Create Use Case
                        </button>
                    </div>
                    <div>
                        {
                            useCases.map((item) => 
                                <CaseUseBox caseUse={item} key={item.id}></CaseUseBox>
                            )
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

export default UseCaseHome;
ReactDOM.createRoot(document.getElementById("app")).render(<UseCaseHome />);
