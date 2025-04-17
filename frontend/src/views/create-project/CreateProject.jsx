import React, { useState } from 'react';
import './createProject.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    axios.post('https://ai-code-review-app-backend.onrender.com', {
      projectName,
      description: projectDescription
    })
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        console.error("Error creating project:", err);
        setError("Failed to create project. Please try again.");
        setIsLoading(false);
      });
  };

  return (
    <main className="create-project">
      <section className='create-project-section'>
        <div className="form-container">
          <div className="form-header">
            <h1>Create New Project</h1>
            <p>Start a new collaborative coding project</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                id="projectName"
                onChange={(e) => { setProjectName(e.target.value) }}
                type="text"
                name="ProjectName"
                placeholder='Enter project name'
                value={projectName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectDescription">Description (Optional)</label>
              <textarea
                id="projectDescription"
                onChange={(e) => { setProjectDescription(e.target.value) }}
                name="ProjectDescription"
                placeholder='Briefly describe your project'
                value={projectDescription}
                rows={4}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading || !projectName.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateProject;
