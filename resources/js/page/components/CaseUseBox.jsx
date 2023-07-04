import axios from "axios";
import React, { useEffect, useState } from "react";

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

const CaseUseBox = ({ caseUse }) => {
    const [rfsSelected, setRfsSelected] = useState([]);
    const rfsSelectedUrlPost = "/requeriments/get/f/";
    const urlEditRequerimentF = "/requeriments/edit/f/";
    const [id, setId] = useState(findProjectId());
    const urlToEditUseCase = "/projects/"+ id +"/usecases/edit/";

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

    const getRfs = (httpRequest) => {
        console.log(httpRequest);
        axios
            .get(httpRequest)
            .then((response) => {
                setRfsSelected([...response.data]);
                console.log(rfsSelected);
            })
            .catch((error) => {
                console.log(error);
            });
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

    useEffect(() => {
        getRfs(rfsSelectedUrlPost + caseUse.id);
    }, [])

    const toEditUseCase = (idCaseUse) => {
        window.location.href = urlToEditUseCase + idCaseUse;
    }
    return (
        <>
        
            <div className="projectBox">
                <div className="projectBoxHeader">
                    <h3>{caseUse.name}</h3>
                    <h4>CU-{caseUse.id}</h4>
                </div>
                <div>
                    <p>{caseUse.description}</p>
                    <h5>Actor: A-{caseUse.actor_id}</h5>
                </div>
                <div className="projectBoxHeader">
                    <button className="button orange" onClick={(e) => toEditUseCase(caseUse.id)}>Show</button>
                    <button
                        className="button red"
                        onClick={(e) => deleteCaseUse(caseUse.id)}
                    >
                        Delete
                    </button>
                </div>
                <div>
                    {rfsSelected.map((item) => (
                        <div key={item.label}>{item.label}</div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CaseUseBox;
