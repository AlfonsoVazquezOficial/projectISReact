import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({idEnabled = 0}) => {
    const options = [
        {
            id: 0,
            name: 'Home',
            route: '/'
        }, 
        {
            id: 1,
            name: 'Projects',
            route: '/projects'
        }, 
        {
            id: 2,
            name: 'Info',
            route: '/info'
        }, 
    ];

    return (
        <>
            <nav className="navBar">
                
                {
                    options.map((element) => {
                        return (
                        idEnabled === element.id 
                        ? 
                            <div className="navElement active" key={element.id}>
                                <a className="navBarA" href={element.route}>{element.name}</a>
                            </div>
                        :
                            <div className="navElement" key={element.id}>
                                <a className="navBarA" href={element.route}>{element.name}</a>
                            </div>
                        )
                    })
                    
                }

                
            </nav>
        </>
    );
};

export default NavBar;
