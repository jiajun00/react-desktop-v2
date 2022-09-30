import { customAlphabet } from 'nanoid'

const getId = () => {
  const dictionary =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const nanoid = customAlphabet(dictionary)
  return nanoid()
}

export default getId()
