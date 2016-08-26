export default (html) => {
  const node = document.createElement('div')
  node.innerHTML = html
  return node.firstChild
}
