import React from 'react'

const ShowProject = ({project}) => {
  return (
    <>
        <div className='projectBox'>
            <div className='projectBoxHeader'>
                <h3>{project.name}</h3>
                <h4>{project.createdDate}</h4>
            </div>
            <div>
                <p>{project.description}</p>
            </div>
            <div className='projectBoxHeader'>
                <button className='button orange '>Show</button>
                <button className='button red'>Delete</button>
            </div>
            
        </div>
    </>
  )
}

export default ShowProject