import React, { useEffect, useRef, useState } from "react";
import NavBarProject from "./NavBarProject";
import MainContainer from "./MainContainer";
import ReactDOM from "react-dom/client";
import "../style.css";
import axios from "axios";

const CreateUseCase = () => {
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
    const [rfs, setRfs] = useState([]);
    const [actors, setActors] = useState([]);
    const [rfsSelected, setRfsSelected] = useState([]);
    const selectRfsRef = useRef(null);
    const selectActorsRef = useRef(null);

    const getRfnsRequest =
        "/projects/"+id+"/requeriments/f/get/all";
    const getRfByIdRequest = "/requeriments/get/f/";

    const urlEditRequerimentF = "/requeriments/edit/f/";
    const urlActorsRequest = "/actors/" + id;
    const urlPost = "/projects/" + id + "/usecases/store";

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
    const toCaseUse = () => {
        window.location.href =
            "http://127.0.0.1:8000/projects/" + id + "/usecases";
    };

    const getRequerimentById = (httpRequest) => {
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

    const setRequerimentsAsUsed = (requeriment, idUseCase) => {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        let datos = {
            ...requeriment,
        };
        datos.caseUse_id = idUseCase;

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
            label: "",
            project_id: id,
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
                let idUseCase = data.id;
                rfsSelected.map((item) => {
                    setRequerimentsAsUsed(item, idUseCase);
                });
            })
            .then(toCaseUse);
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
        getRequeriments(getRfnsRequest);
        getActors(urlActorsRequest);
    }, []);
    return (
        <>
            <NavBarProject idEnabled={3} project={project}></NavBarProject>
            <div className="mainC">
                <MainContainer>
                    <h1>Create Use Case</h1>
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name"></input>
                        <br></br>
                        <label htmlFor="description">Description: </label>
                        <input type="text" id="description"></input>
                        <br></br>
                        <label htmlFor="actorsSelect">Actor</label>
                        <select
                            ref={selectActorsRef}
                            id="actorsSelect"
                            className="custom-select"
                        >
                            {
                                actors.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        A-{item.id} / {item.name}
                                    </option>
                                ))
                            }
                        </select>
                        <br></br>
                        <label htmlFor="rfSelect">Functional Requeriment</label>
                        
                        <select
                            ref={selectRfsRef}
                            id="rfSelect"
                            className="custom-select"
                        >
                            {rfs
                                .filter((item) => item.caseUse_id === -1)
                                .map((item) => (
                                    <option value={item.id} key={item.id}>
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
                            value="Create Use Case"
                            className="button green large"
                        ></input>
                    </form>
                </MainContainer>
            </div>
        </>
    );
};

export default CreateUseCase;
ReactDOM.createRoot(document.getElementById("app")).render(<CreateUseCase />);
