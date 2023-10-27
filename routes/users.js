const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')


//? ':id' is a placeholder for any variables passed via http methods (GET,POST,PUT,DELETE,PATCH...) from client side


// Route for getting all users
router.get('/', async (req,res)=>{

    //res.send('Getting all users')
    try {
        const allUsers = await User.find()
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
    const user = new User({
        name: req.body.name,
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
    // res.send('Updating one user')
    if(req.params.id!=null){
        res.user.name = req.body.name
    }
    if(req.body.type!=null){
        res.user.type = req.body.type
    }
    try {
        const updatedUser = await res.user.save()
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




//? Setting middleware for each
async function getUser(req,res,next){
    try {
        foundUser = await User.findById(req.params.id)
        if(foundUser==null) return res.status(404).send({message:'User does not exist'})
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
    res.user = foundUser
    next()
}


//? Exporting this module as a router
module.exports = router