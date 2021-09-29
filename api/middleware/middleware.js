const User=require('../users/users-model')


function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`logger middleware has been called since there was a ${method} api call at ${timeStamp} with the url: ${url}`)

  next()
}

async function validateUserId(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
    if(!user){
      res.status(404).json({
        message: "Not found"
      })
    }
    else{
      req.user = user//this saves another trip to the database by tacking on the user to the request object for the next middleware function
      next()
    }
  }
  catch(err){
    res.status(55).json({
      message: "Having trouble accessing the database"
    })
  }
}

function validateUser(req, res, next) {

  const { name } = req.body;

  if(!name || !name.trim()){
    res.status(400).json({
      message: "Missing required name field"
    })
  }
  else{
    req.name=name.trim();
    next()
  }
}

function validatePost(req, res, next) {

  const text = req.body;
  
  if(!text || !text.trim()){
    res.status(400).json({
      message: "Missing required name field"
    })
  }
  else{
    req.text=text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
