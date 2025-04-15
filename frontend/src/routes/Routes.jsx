import React from 'react'
import {BrowserRouter as AppRouter, Route , Routes as AppRoute} from 'react-router-dom'
import Home from '../views/home/Home'
import CreateProject from '../views/create-project/CreateProject'
import Project from '../views/projects/Project'

const Routes = () => {
  return (
   <AppRouter>
           <AppRoute>
            <Route path="/" element={<Home/>} />
            <Route path="/create-post" element={<CreateProject/>} />
            <Route path='/project/:id' element = {<Project />} />
           </AppRoute>
   </AppRouter>
  )
}

export default Routes
