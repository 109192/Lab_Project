// should contain each resource in project 

const express=require('express')
const router=express.Router()
// connect controller with routs نجيب كل الميثود من ملف الكنترول 
const {getProject,creatProject,updateProject,deleteProject}=require('../controller/projectsController')

// اختصار لمسار الصفحات المتشابهه 
//GET with POST have same path 
router.route('/').get(getProject).post(creatProject)

//PUT with DELETE have same path 
router.route('/:id').put(updateProject).delete(deleteProject)



// Gate for use any function here
module.exports=router