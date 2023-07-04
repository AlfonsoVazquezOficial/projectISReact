import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "../style.css";
import axios from "axios";
import NavBarProject from "./NavBarProject";
import MainContainer from "./MainContainer";
import CaseUseBox from "./CaseUseBox";

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

const findUseCaseId = () => {
    const currentUrl = window.location.href.split("");

    let counter = 0;
    let result = "";

    currentUrl.forEach((char) => {
        if (char === "/") {
            counter++;
        } else {
            if (counter === 7) {
                result += char;
            }
        }
    });
    return Number(result);
};

const ShowUseCase = () => {
    const getRequest = "/projects/request/";
    const getUseCaseRequest = "/usecases/";
    const [idProject, setId] = useState(findProjectId());
    const [idUseCase, setIdUseCase] = useState(findUseCaseId());
    const [rfsSelected, setRfsSelected] = useState([]);
    const [rfsSelectedDeleted, setRfsSelectedDeleted] = useState([]);
    const rfsSelectedUrlPost = "/requeriments/get/f/";
    const getRfnsRequest =
        "http://127.0.0.1:8000/projects/1/requeriments/f/get/all";
    const selectRfsRef = useRef(null);
    const [rfs, setRfs] = useState([]);
    const urlPost = "/usecases/" + idUseCase + "/update";
    const urlEditRequerimentF = "/requeriments/edit/f/";
    const [actors, setActors] = useState([]);
    const selectActorsRef = useRef(null);
    const urlActorsRequest = "/actors/" + idProject;

    const [project, setProject] = useState({});
    const [useCase, setUseCase] = useState({});

    const [isEditable, setIsEditable] = useState(false);

    const getActors = (httpRequest) => {
        axios
            .get(httpRequest)
            .then((response) => {
                console.log(httpRequest);
                setActors([...response.data]);
                console.log("Actors:");
                console.log(actors);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getRequeriments = (httpRequest) => {
        axios
            .get(httpRequest)
            .then((response) => {
                console.log(httpRequest);
                setRfs([...response.data]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getRfsSelected = (httpRequest) => {
        console.log(httpRequest);
        axios
            .get(httpRequest + idUseCase)
            .then((response) => {
                setRfsSelected([...response.data]);
                console.log(rfsSelected);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const componentDidMount = (httpRequest) => {
        axios
            .get(httpRequest + idProject)
            .then((response) => {
                setProject({ ...response.data });
                console.log(project);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUseCase = (httpRequest) => {
        axios
            .get(httpRequest + idUseCase)
            .then((response) => {
                setUseCase({ ...response.data });
                console.log(useCase);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addRf = (e) => {
        e.preventDefault();
        const selectCurrentValue = Number(selectRfsRef.current.value);
        const valueToAdd = rfs.find((item) => item.id === selectCurrentValue);
        setRfsSelected([...rfsSelected, valueToAdd]);
        setRfs((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === selectCurrentValue) {
                    valueToAdd.caseUse_id = 1;
                    return valueToAdd;
                } else {
                    return item;
                }
            });
        });
        console.log(rfsSelected);
    };

    const deleteRf = (e, id) => {
        e.preventDefault();
        const selectCurrentValue = Number(selectRfsRef.current.value);
        const valueToDelete = rfs.find((item) => item.id === id);

        const filterRfsSelected = rfsSelected.filter((item) => item.id !== id);
        setRfsSelectedDeleted([...rfsSelectedDeleted, valueToDelete]);

        setRfsSelected(filterRfsSelected);
        setRfs((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    valueToDelete.caseUse_id = -1;
                    return valueToDelete;
                } else {
                    return item;
                }
            });
        });
        console.log(rfsSelected);
        console.log(rfsSelected.length);
    };

    const deleteCaseUse = (caseUseId) => {
        getRfs(rfsSelectedUrlPost + caseUseId);
        rfsSelected.map((item) => setRequerimentsAsUnUsed(item));

        axios
            .delete(`/usecases/${caseUseId}`)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const setRequerimentsAsUsed = (requeriment, idUseCase) => {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        let datos = {
            ...requeriment,
        };
        datos.caseUse_id = idUseCase;
        let url = urlEditRequerimentF + datos.id + "/caseuse";
        console.log("URL Used: " + url);

        fetch(url, {
            method: "POST",
            headers: { "X-CSRF-TOKEN": token },
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(console.log("Requeriment modified successfully"))
            .then();
    };

    const setRequerimentsAsUnUsed = (requeriment) => {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        let datos = {
            ...requeriment,
        };
        datos.caseUse_id = -1;
        console.log(datos);

        fetch(urlEditRequerimentF + datos.id + "/caseuse", {
            method: "POST",
            headers: { "X-CSRF-TOKEN": token },
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(console.log("Requeriment modified successfully"))
            .then();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        const selectActorCurrentValue = Number(selectActorsRef.current.value);

        const datos = {
            name: e.target.name.value,
            description: e.target.description.value,
            label: useCase.label,
            project_id: idProject,
            actor_id: selectActorCurrentValue,
        };

        console.log(datos);
        fetch(urlPost, {
            method: "POST",
            headers: { "X-CSRF-TOKEN": token },
            body: JSON.stringify(datos),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                rfsSelectedDeleted.map((item) => {
                    setRequerimentsAsUnUsed(item);
                });
                rfsSelected.map((item) => {
                    setRequerimentsAsUsed(item, idUseCase);
                });
            })
            .then(window.location.reload());
    };

    const findActorById = (idActor) => {
        const value = actors.find((item) => item.id == idActor);
        console.log("Actors");
        console.log(actors);
        console.log("actorId: " + idActor);
        console.log(typeof value);
        console.log("FindActor");
        console.log(value);
        return value;
    };
    const [usedActor, setUsedActor] = useState({});

    useEffect(() => {
        componentDidMount(getRequest);
        getUseCase(getUseCaseRequest);
        getRfsSelected(rfsSelectedUrlPost);
        getRequeriments(getRfnsRequest);
        getActors(urlActorsRequest);
        setUsedActor(findActorById(useCase.actor_id));
    }, []);
    return (
        <>
            <NavBarProject idEnabled={3} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    {!isEditable ? (
                        <div>
                            <h1>Show Use Case</h1>
                            <div></div>
                            <div className="projectBox">
                                <div className="projectBoxHeader">
                                    <h3>{useCase.name}</h3>
                                    <h4>CU-{useCase.id}</h4>
                                </div>
                                <div>
                                    <p>{useCase.description}</p>
                                    <h5>
                                        Actor: A-{useCase.actor_id} / 
                                        {actors.filter((item) => item.id === useCase.actor_id).map((item) => (
                                            <>{item.name}</>
                                        ))}
                                    </h5>
                                </div>
                                <div>
                                    {rfsSelected.map((item) => (
                                        <div key={item.label}>
                                            {item.label} / {item.name}
                                        </div>
                                    ))}
                                    <div className="projectBoxHeader">
                                        <button
                                            className="button orange large"
                                            onClick={(e) => setIsEditable(true)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>Edit Use Case</h1>
                            <form className="" onSubmit={handleSubmit}>
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    id="name"
                                    defaultValue={useCase.name}
                                ></input>
                                <br></br>
                                <label htmlFor="description">
                                    Description:{" "}
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    defaultValue={useCase.description}
                                ></input>
                                <br></br>
                                <label htmlFor="actorsSelect">Actor</label>
                                <select
                                    ref={selectActorsRef}
                                    id="actorsSelect"
                                    className="custom-select"
                                    defaultValue={useCase.actor_id}
                                >
                                    {actors.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            A-{item.id} / {item.name}
                                        </option>
                                    ))}
                                </select>
                                <br></br>
                                <label htmlFor="rfSelect">
                                    Functional Requeriment
                                </label>
                                <select
                                    ref={selectRfsRef}
                                    id="rfSelect"
                                    className="custom-select"
                                >
                                    {rfs
                                        .filter(
                                            (item) => item.caseUse_id === -1
                                        )
                                        .map((item) => (
                                            <option
                                                value={item.id}
                                                key={item.id}
                                            >
                                                {item.label} / {item.name}
                                            </option>
                                        ))}
                                </select>
                                <br></br>
                                <button
                                    className="button green"
                                    onClick={(e) => addRf(e)}
                                >
                                    Add RF
                                </button>
                                <br></br>
                                {rfsSelected.length > 0 ? (
                                    <div>
                                        <h4>Selected RF's</h4>
                                        {rfsSelected.map((item) => (
                                            <div
                                                className="selectedRFBox"
                                                key={item.id}
                                            >
                                                <div>
                                                    <div className="projectBoxHeader">
                                                        <h4>{item.label}</h4>
                                                        <h5>{item.name}</h5>
                                                    </div>

                                                    <br></br>
                                                    <button
                                                        className="button red"
                                                        onClick={(e) =>
                                                            deleteRf(e, item.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>No RF's Selected</div>
                                )}

                                <br></br>
                                <input
                                    type="submit"
                                    value="Save Edit"
                                    className="button green large"
                                ></input>
                            </form>
                        </div>
                    )}
                </MainContainer>
            </div>
        </>
    );
};

export default ShowUseCase;
ReactDOM.createRoot(document.getElementById("app")).render(<ShowUseCase />);
