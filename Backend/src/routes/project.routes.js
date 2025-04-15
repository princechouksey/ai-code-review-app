const {Router} = require('express');
const router = Router();
const projectController = require('../controllers/project.controller')

router.post('/create', projectController.createProjectController)
router.get('/get-all',projectController.getAllProjectsController )


module.exports = router;