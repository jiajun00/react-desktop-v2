import { customAlphabet } from 'nanoid'

const getId = (size = 32) => {
  const dictionary =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return customAlphabet(dictionary, size)
}

export default getId()
