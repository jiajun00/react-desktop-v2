//判断是否包含字符串
export function str_val(str: any, char: string) {
  if (typeof str !== 'string') {
    console.log('错误：这不是一个字符串')
    return false
  }
  if (str.indexOf(char) >= 0) {
    return true
  } else {
    return false
  }
}
