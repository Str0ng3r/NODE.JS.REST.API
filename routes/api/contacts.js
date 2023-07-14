import express from 'express'
import { listContacts } from '../../models/contacts.js'
import { getContactById } from '../../models/contacts.js'
import { removeContact } from '../../models/contacts.js'
import { addContact } from '../../models/contacts.js'
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params
  res.json(getContactById(id))
})

router.post('/', async (req, res, next) => {
  const id = req.params
  res.json(addContact(id))
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params
  res.json(removeContact(id))
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router
