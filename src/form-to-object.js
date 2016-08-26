export default (form) => {
  const data = new FormData(form)
  return Array.from(data).reduce((result, [key, value]) => {
    result[key] = value
    return result
  }, {})
}
