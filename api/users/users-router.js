const express = require('express');
const {
  validateUser,
  validateUserId,
  validatePost,
}=require('../middleware/middleware');
const User = require('./users-model');
const Post = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users=>{
    res.json(users)
  })
  .catch(next)
});

router.get('/:id',validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/',validateUser, (req, res, next) => {

  User.insert({ name: req.name })
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id',validateUserId,validateUser, (req, res, next) => {
  User.update(req.params.id, {name: req.name})
  .then(() => {
    res.json(User.getById(req.params.id))
    })
  .then(user=>{
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id',validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
    customMessage: "Something tragic insides posts rotuer happened"
  })
})
// do not forget to export the router
module.exports=router;
