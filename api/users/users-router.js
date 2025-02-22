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
  .then(()=> {
    return User.getById(req.params.id)
    })
  .then(user=>{
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id',validateUserId, async (req, res, next) => {
  try{
    await User.remove(req.params.id)
    res.json(req.user)
  }
  catch (err){
    next(err)
  }
});

router.get('/:id/posts',validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
  .then((userPosts)=>{
    res.json(userPosts)
  })
  .catch(next)
});

router.post('/:id/posts',
validateUserId,
validatePost,
async (req, res, next) => {
  try{
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  }
  catch(err){
    next(err)
  }
});

router.use((err, req, res)=>{
  res.status(err.status || 500)
})
// do not forget to export the router
module.exports=router;
