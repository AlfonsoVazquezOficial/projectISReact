import React from 'react'
import ProjectCont from './components/ProjectCont';
import NavBar from './components/NavBar';
import ReactDOM from 'react-dom/client';
import './style.css';
import MainContainer from './components/MainContainer';

const Info = () => {
    const info = [
        {
            name: 'Miguel Ángel',
            img: 'https://i.ibb.co/F3Y9VQB/profile-pic-37.png',
            description: 'Hola'
        }, 
        {
            name: 'David Antonio',
            img: 'https://i.ibb.co/hK8rFwX/325346094-205659488643274-5207478582842520064-n.jpg',
            description: 'Hola'
        }, 
        {
            name: 'Alfonso Vázquez',
            img: 'https://i.ibb.co/S6X6p7M/profile-pic-4.png',
            description: 'Hola'
        }, 
    ];
  return (
    <>
        <NavBar idEnabled={2}></NavBar>
        <div className='mainC'>
            <MainContainer>
                <h1 className='textCenter'>Developers</h1>
                <div className='devsInfo'>
                    {
                        info.map((element) => {
                            return (
                                <div className='devContainer'>
                                    <div className='devContainerHeader'>
                                        <h3>{element.name}</h3>
                                    </div>
                                    <div className='devContainerInfo'>
                                        <p>{element.description}</p>
                                        <img src={element.img} className='imgDev'></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
            </MainContainer>
        </div>
    </>
  )
}

export default Info;

ReactDOM.createRoot(document.getElementById('app')).render(     
    <Info />        
  );