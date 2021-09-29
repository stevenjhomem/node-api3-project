const User=require('../users/users-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
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
        message: "No such user exists in the database"
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
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost,
}
