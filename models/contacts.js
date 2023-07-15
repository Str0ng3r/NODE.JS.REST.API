import fs from 'fs/promises'
import path from 'path'

const contactsPath = path.resolve('models','contacts.json');

 export const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
   return(JSON.parse(data))
}

export const getContactById = async (contactId) => {
    const data = await listContacts()
    const contact = data.find((el) => el.id === contactId);
    return contact || null
};

export const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath)
  const text = JSON.parse(data)
  const deletCont = text.find(el => el.id === contactId)
  const sort = text.filter(el => el.id !== contactId)
const sortJS = JSON.stringify(sort)
  const result = await fs.writeFile(contactsPath,sortJS)
return(deletCont)
}

export  const addContact = async (body) => {
  const data = await fs.readFile(contactsPath)
  const text = JSON.parse(data)
  console.log(body)
  text.push(body)
  const massJS = await JSON.stringify(text)
  const result = await fs.writeFile(contactsPath,massJS)
  return(body)
}

const updateContact = async (contactId, body) => {}
