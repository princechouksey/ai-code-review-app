import React, { useState } from 'react'
import './createProject.css'
import axios from "axios"
import {useNavigate}  from "react-router-dom"


const CreateProject = () => {
  const [projectName, setprojectName] = useState("")
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault();
 axios.post('http://localhost:3000/projects/create',{
      projectName
    }).then(()=>{
      navigate('/')
    })
  }
  return (
   <main className = "create-project"> 
   <section className='project-section'>
    <form action="" onSubmit={handleSubmit}>
      <input 
      onChange={(e)=>{setprojectName(e.target.value)}} 
      type="text"
      
      name="ProjectName"
      placeholder=' Project Name'
      required />

      <input type="submit" />
    </form>
   </section>
   </main>
  )
}

export default CreateProject
