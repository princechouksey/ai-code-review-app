const projectModel = require('../models/project.model');

module.exports.CreateProject = async (projectName) => {
    const project = await projectModel.create({
        name: projectName,
    });
    return project;
};

module.exports.getAllProjects = async (req,res)=>{
    const projects = await projectModel.find();
    return projects;


}