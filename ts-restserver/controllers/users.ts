import { Request, Response } from 'express'
import User from '../models/user'

export const getUsers = async (req:Request, res:Response) => {

  const { from = 0, limit = 5 } = req.query

  const query = {
    offset: +from,
    limit: +limit,
    where: { status: true }
  }

  const users = await User.findAndCountAll( query )
  
  res.json( users )
}

export const getUser = async (req:Request, res:Response) => {
  
  const { id } = req.params

  const user = await User.findByPk( id )
    
  if(!user) {
    res.status(404).json('')
    return
  }

  res.json(user)
}


export const createUser = async (req:Request, res:Response) => {
  
  const { name, email } = req.body

  try {

    const user = await User.create({
      name, email
    })
    await user.save()
  
    res.json(user)

  }catch(error) {
    console.error(error)
    
    res.status(500).json({
      msg: 'Error creating user'
    })
  }
  
}

export const updateUser = async (req:Request, res:Response) => {
  
  const { id } = req.params
  const { name, email } = req.body

  try {

    const user = await User.findByPk(id)
    if(!user) {
      res.status(400).json({ msg: `There is no user with this id ${id}` })
      return
    }
  
    await user.update({
      name, email
    })

    res.json(user)

  }catch(error) {
    console.error(error)
    
    res.status(500).json({
      msg: 'Error update user'
    })
  }
  
}


export const deleteUser = async (req:Request, res:Response) => {
  
  const { id } = req.params
  const { db = false } = req.query

  const user = await User.findByPk(id)
  if(!user) {
    res.status(400).json({ msg: `There is no user with this id ${id}` })
    return
  }

  if(db) {
    await user.destroy()
  } else {
    await user.update({ status: false })
  }

  res.json(user)
  
}
 