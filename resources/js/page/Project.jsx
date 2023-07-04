import React from 'react'
import NavBar from './components/NavBar'
import ReactDOM from 'react-dom/client'; 
import './style.css';
import ProjectCont from './components/ProjectCont';



const Project = () => {
  return (
    <>
        <NavBar idEnabled={1}></NavBar>
        <div className='mainC'>
            <ProjectCont></ProjectCont>
        </div>
        
    </>
  )
}

export default Project;

ReactDOM.createRoot(document.getElementById('app')).render(     
  <Project />        
);