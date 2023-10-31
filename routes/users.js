const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')

/*
? ':id' is a placeholder for any variables passed via http methods through the URL
? (GET,POST,PUT,DELETE,PATCH...) from client side 
*/

// Route for getting all users
router.get('/', async (req,res)=>{

    //res.send('Getting all users')
    try {
        const allUsers = await UserModel.find()
        res.json(allUsers)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

// Route for getting one user
router.get('/:id',getUser, (req,res)=>{
    // res.send('Getting one User')
    // res.send(req.params.id)
    res.json(res.user)
})

// Route for creating one user
router.post('/', async(req,res)=>{
    // res.send('Creating one user')
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address:req.body.address,
        type: req.body.type,
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

// Route for updating one user's details
router.patch('/:id', getUser, async(req,res)=>{
    
    // Validating each field in the incoming update request
    if(req.params.id!=null){
        res.user.name = req.body.name
    }
    if(req.body.email!=null){
        res.user.email = req.body.email
    }
    if(req.body.phone!=null){
        res.user.phone = req.body.phone
    }
    if(req.body.address!=null){
        res.user.address = req.body.address
    }
    if(req.body.type!=null){
        res.user.type = req.body.type
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,req.body, {new:true})
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})


// Route for deleting one user
router.delete('/:id',getUser, async(req,res)=>{
    // res.send('Deleting one User')
    try {
        await res.foundUser.remove()
        res.json({message:'Deleted this User!'})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

// Setting middleware for fetching one user
// The getUser() function is used many times in other routes 
async function getUser(req,res,next){
    try {
        foundUser = await UserModel.findById(req.params.id)
        if(foundUser==null) return res.status(404).send({message:'User does not exist'})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
    res.user = foundUser
    next()
}

// Exporting this module as a router
module.exports = router