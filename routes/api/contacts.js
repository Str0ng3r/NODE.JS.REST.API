import express from 'express'
import { listContacts } from '../../models/contacts.js'
import { getContactById } from '../../models/contacts.js'
import { removeContact } from '../../models/contacts.js'
import { addContact } from '../../models/contacts.js'
const contactsRouter = express.Router()

contactsRouter.get('/', async (req, res, next) => {
  const data = listContacts()
  res.send(data)
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  const id = req.params
  res.json(getContactById(id))
})

contactsRouter.post('/', async (req, res, next) => {
  const body = req.body
  res.json(addContact(body))
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  const id = req.params
  res.json(removeContact(id))
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter
