import React, { useEffect, useState } from "react";
import NavBarProject from "./components/NavBarProject";
import NavBar from "./components/NavBar";
import MainContainer from "./components/MainContainer";
import ReactDOM from "react-dom/client";
import "./style.css";
import axios from "axios";
import RequerimentBox from "./components/RequerimentBox";

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

const Requeriments = () => {
    const [isFunctional, setIsFunctional] = useState(false);
    const [project, setProject] = useState({});
    const [id, setId] = useState(findProjectId());
    const getRequest = "/projects/request/";
    const [counter, setCounter] = useState(1);
    const [rfs, setRfs] = useState([]);
    const [rnfs, setRnfs] = useState([]);
    const getRfnsRequest = window.location.href + "/f/get";
    const getRnfnsRequest = window.location.href + "/nf/get";


    const getRequeriments = (httpRequest, isRf) => {
        axios
            .get(httpRequest)
            .then((response) => {
                if (isRf) {
                    setRfs([...response.data.data]);
                } else {
                    setRnfs([...response.data.data]);
                }
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
        getRequeriments(getRfnsRequest, true);
        getRequeriments(getRnfnsRequest, false);
        console.log(rfs);
        console.log(rnfs);
    }, []);

    useEffect(() => {
        componentDidMount(getRequest);
        getRequeriments(getRfnsRequest + "/?page=" + counter, true);
        getRequeriments(getRnfnsRequest + "/?page=" + counter, false);
        console.log(getRequest + "/?page=" + counter);
    }, [counter]);

    const setNonFunctional = () => {
        setIsFunctional(true);
        console.log(isFunctional);
    };

    const setFunctional = () => {
        setIsFunctional(false);
        console.log(isFunctional);
    };

    const toCreateRequeriments = () => {
        window.location.href = window.location.href + "/create";
    };

    return (
        <>
            <NavBarProject idEnabled={1} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    <h1>Requeriments</h1>
                    <div>
                        <button className="button green large" onClick={toCreateRequeriments}>
                            Create Requeriment
                        </button>
                        <div className="projectBoxHeader">
                            <button
                                className={
                                    isFunctional
                                        ? "button orange large"
                                        : "button orange large active"
                                }
                                onClick={setFunctional}
                            >
                                Functional
                            </button>
                            <button
                                className={
                                    !isFunctional
                                        ? "button orange large"
                                        : "button orange large active"
                                }
                                onClick={setNonFunctional}
                            >
                                Non Functional
                            </button>
                        </div>
                    </div>
                    {
                        !isFunctional 
                        ? 
                        <div>
                            {
                                rfs.map((item) => {
                                    return <RequerimentBox requeriment={item} key={item.id} urlToDelete={"/requeriments/f/"} isFunctional={true}></RequerimentBox>
                                })
                            }
                        </div>
                        :
                        <div>
                            {
                                rnfs.map((item) => {
                                    return <RequerimentBox requeriment={item} key={item.id} urlToDelete={"/requeriments/nf/"} isFunctional={false}></RequerimentBox>
                                })
                            }
                        </div>
                    }
                    
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

export default Requeriments;
ReactDOM.createRoot(document.getElementById("app")).render(<Requeriments />);
