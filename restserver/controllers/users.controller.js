const User = require('../models/users')
const bcrypt = require('../helpers/bcrypt')
const to = require('../helpers/to')

const userGet = async (req, res) => {

  const { limit = 5, from = 0 } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(+from)
      .limit(+limit)
  ])

  res.status(200).json({
    total,
    users
  })
}

const userPost = async (req, res, next) => {
  const { name, email, password, role } = req.body

  const user = new User({
    name, email, password, role
  })

  user.password = bcrypt(password)

  const [ error, newUser ] = await to(user.save())
  if(error) return next(error)

  res.status(201).json(newUser)  
}

const userPut = async (req, res, next) => {

  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  if( password ) {
    rest.password = bcrypt(password)
  }
  const [ error, user ] = await to(User.findByIdAndUpdate( id, rest, { new: true } ))
  if(error) return next(error)

  res.status(200).json({ 
    msg: "Updated user data",
    user 
  })
}

const userDelete = async (req, res) => {

  const { id } = req.params
  const { db = false } = req.query
  const authenticatedUser = req.user

  const [ error, deletedUser ] = Boolean(db) 
    ? await to(User.findByIdAndDelete( id ))
    : await to(User.findByIdAndUpdate( id, { status: false }, { new: true } ))
  if(error) return next(error)

  res.status(200).json({
    msg: 'User Deleted',
    deletedUser,
    authenticatedUser
  })
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete
}