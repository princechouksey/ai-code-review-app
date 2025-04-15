import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const navigate = useNavigate();
  const [projects, setprojects] = useState([]);

  useEffect(()=>{
          axios.get('http://localhost:3000/projects/get-all').then(response =>{
           setprojects(response.data.data)
          })
  },[])

  return (
    <main className="home">
      <section className="home-section">
        <button
          onClick={() => {
            navigate("/create-post");
          }}
        >
          New Project
        </button>

        <div className="projects">
          { projects.length ==0 ? <div> <p> No projects Created</p> </div> : projects.map((project) => {
            return <div className="project">{project.name}</div>;
          })}
        </div>
      </section>
    </main>
  );
};

export default Home;
