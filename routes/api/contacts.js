import express from 'express'
import { listContacts } from '../../models/contacts.js'
import { getContactById } from '../../models/contacts.js'
import { removeContact } from '../../models/contacts.js'
import { addContact } from '../../models/contacts.js'
const contactsRouter = express.Router()

contactsRouter.get('/', async (req, res, next) => {
  try{
    const data = await listContacts()
    res.json(data)
  }catch(error) {
res.status(500).json({message:'server ERROR' })
  }

})

contactsRouter.get('/:contactId', async (req, res, next) => {
  try{
    const {id} =req.params
    const result = await getContactById(id)
    res.json(result)
  }catch (error){
    res.status(500).json({message:'server ERROR' })
  }

})

contactsRouter.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    const result = await addContact(body);
    console.log(body)
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact' });
  }
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  const id = req.params
  res.json(removeContact(id))
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default contactsRouter
