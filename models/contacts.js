// import fs from 'fs/promises'
// import path from 'path'

// const contactsPath = path.resolve('models','contacts.json');

//  export const listContacts = async () => {
//   const data = await fs.readFile(contactsPath)
//    return(JSON.parse(data))
// }

// export const getContactById = async (contactId) => {
//     const data = await listContacts()
//     const contact = data.find((el) => el.id === contactId);
//     return contact || null
// };

// export const removeContact = async (contactId) => {
//   const data = await fs.readFile(contactsPath)
//   const text = JSON.parse(data)
//   const deletCont = text.find(el => el.id === contactId)
//   const sort = text.filter(el => el.id !== contactId)
// const sortJS = JSON.stringify(sort)
//   const result = await fs.writeFile(contactsPath,sortJS)
// return(deletCont)
// }



// export  const addContact = async (body) => {
//   const data = await fs.readFile(contactsPath)
//   const text = JSON.parse(data)
//   text.push(body)
//   const massJS = await JSON.stringify(text)
//   const result = await fs.writeFile(contactsPath,massJS)
//   return(body)
// }

// export const updateContact = async (contactId, body) => {
//   const data = await fs.readFile(contactsPath)
//   const text = JSON.parse(data)
//   const updateContact =  text.filter(el => el.id !== contactId)
//   updateContact.push(body)
//   const massUpdateContact = await JSON.stringify(updateContact)
//   const result =  await fs.writeFile(contactsPath,massUpdateContact)
//   return (body)
// }
