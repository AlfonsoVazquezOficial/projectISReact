import axios from "axios";
import React, { useEffect, useState } from "react";

const NavBarProject = ({ idEnabled = 0, project }) => {


    const getRootPath = () => {
        let url = window.location.href;
        let key = "http://127.0.0.1:8000/projects/";
        let patron = new RegExp(key + "\\d+");
        let result = url.match(patron);
        return result[0];
    }

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
    const route = "/projects/" + findProjectId();

    const options = [
        {
            id: 0,
            name: project.name,
            route: route,
        },
        {
            id: 1,
            name: "Requeriments",
            route: getRootPath() + "/requeriments",
        },
        {
            id: 2,
            name: "Actors",
            route: getRootPath() + "/actors",
        }, 
        {
            id: 3,
            name: "Use Cases",
            route: getRootPath() + "/usecases",
        }, 
    ];

    return (
        <>
            <nav className="navBar">
                {options.map((element) => {
                    return idEnabled === element.id ? (
                        <div className="navElement active" key={element.id}>
                            <a className="navBarA" href={element.route}>
                                {element.name}
                            </a>
                        </div>
                    ) : (
                        <div className="navElement" key={element.id}>
                            <a className="navBarA" href={element.route}>
                                {element.name}
                            </a>
                        </div>
                    );
                })}
                <div className="navElement navElementRight" key="return">
                    <a className="navBarA" href="/projects">
                        Projects
                    </a>
                </div>
            </nav>
        </>
    );
};

export default NavBarProject;
