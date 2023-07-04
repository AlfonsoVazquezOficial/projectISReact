import React from 'react'
import NavBar from './components/NavBar'
import './style.css';
import MainContainer from './components/MainContainer';
import CreateProject from './components/ProjectCont';
import CreateProjectCont from './components/ProjectCont';

const Home = () => {
  return (
    <>
        <NavBar idEnabled={0}></NavBar>
        <div className='mainC'>
            <MainContainer>
              <h1>Welcome</h1>
              <h2>This is a software engineer tool</h2>
              <h3>You can manage: </h3>
              <div>---- Projects</div>
              <div>-------- Requeriments</div>
              <div>------------ Functional</div>
              <div>------------ NonFunctional</div>
              <div>-------- Actors</div>
              <div>-------- Use Cases</div>

            </MainContainer>
        </div>
        
    </>
  )
}

export default Home