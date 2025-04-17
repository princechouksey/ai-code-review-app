import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function navigateToProject(projectID) {
    navigate(`/project/${projectID}`);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://ai-code-review-app-backend.onrender.com")
      .then((response) => {
        setProjects(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="home">
      <section className="home-section">
        <div className="header">
          <h1>Your Projects</h1>
          <button
            className="create-button"
            onClick={() => {
              navigate("/create-post");
            }}
          >
            <span className="plus-icon">+</span>
            <span>New Project</span>
          </button>
        </div>

        <div className="projects-container">
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="no-projects">
              <div className="empty-state-icon">📂</div>
              <p>No projects created yet</p>
              <button
                className="create-first-button"
                onClick={() => navigate("/create-post")}
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="projects">
              {projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => {
                    navigateToProject(project._id);
                  }}
                  className="project"
                >
                  <div className="project-icon">📄</div>
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-hover">
                    <span>View Project</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
