const projectModel = require('../models/project.model');
const {CreateProject, getAllProjects} = require('../services/project.service')
 module.exports.createProjectController = async (req, res) => {
  const {projectName} = req.body;
  // console.log(projectName)
    if (!projectName) return res.status(400).json({message: 'Project name is required'});
    const newProject = await CreateProject(projectName);
    return res.status(201).json({
        status:"success",
        data:newProject
    })
 }
 module.exports.getAllProjectsController = async  (req,res)=>{
   const projects = await getAllProjects()
   return  res.status(200).json({
    status:"success",
    data : projects,
   })
 }
  
 