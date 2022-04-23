// add async to intract each function with DB
const asyncHandler = require('express-async-handler')

// project on DB
const Projects=require('../model/projectModel')

// control the GET method - routes - access privatly >> GET /api/projects
const getProject = asyncHandler(async (req,res)=>{
    const projects=await Projects.find()
    if(!projects){
        return res.status(404).send("No Project Found")
    }
    res.status(200).json({projects})
})

// control the POST method for create - routes - access privatly >> POST /api/projects 
const creatProject = asyncHandler(async (req,res)=>{
    
        const {title,auther,description,id} = req.body;
        let project=new Projects({
            title,
            auther,
            description,

        })
        await project.save();
        // to send data in body and check
    if(!project)// text is name of field 
    {
        res.status(400)
        throw new Error('There is No Project , Please Add one')// handel error
    }
    res.status(200).json({project});
})

// control the PUT method for update - routes - access privatly >> PUT /api/projects/:id
const updateProject = asyncHandler(async (req,res)=>{
    // Extract Id 
    const id=req.params.id;
    const {title,auther,description}=req.body;
    // search for project
    const updatedProject = await Projects.findByIdAndUpdate(id,{
        title,
        auther,
        description
    });
     // if not there 
    if (!updatedProject){
        res.status(400)
        throw new Error('Project Not Found')
    }
    // or if there 
    res.status(200).send("Project Updated")
})

// control the DELETE method for delete - routes - access privatly >> DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req,res)=>{
    const projects =await Projects.findByIdAndRemove(req.params.id)
    if (!projects){
        res.status(400)
        throw new Error('Project Not Found')
    }
    res.status(200).json('Project is deleted')
})



module.exports={
    getProject,
    creatProject,
    updateProject,
    deleteProject,
}