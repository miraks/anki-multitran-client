import check from './check'
import add from './add'
import formToObject from './form-to-object'
import select from './select'
import htmlToNode from './html-to-node'

const rootNode = htmlToNode('<div id="am-root"></div>')
document.body.appendChild(rootNode)

const addCheckboxes = () => {
  const links = select('a[href^="m.exe?t="]')
  links.forEach((link) => {
    const translation = link.innerHTML.trim()
    const checkbox = htmlToNode(`<input type="checkbox" class="am-js-checkbox" data-translation="${translation}"/>`)
    link.parentNode.insertBefore(checkbox, link)
  })
}

const removeCheckboxes = () => {
  select('.am-js-checkbox').forEach((checkbox) => {
    checkbox.remove()
  })
}

const getSelectedTranslations = () =>
  select('.am-js-checkbox:checked').map((checkbox) => checkbox.dataset.translation)

const showAddPopup = (word, translations) => {
  const popup = htmlToNode(`<div class="am-add-popup">
    <form class="am-add-popup-form am-js-form">
      <input type="text" name="front" class="am-add-popup-field" value="${word}"/>
      <input type="text" name="back" class="am-add-popup-field" value="${translations.join(', ')}"/>
      <textarea name="sentence" class="am-add-popup-field"></textarea>
      <input type="submit" value="Save">
    </form>
  </div>`)

  rootNode.appendChild(popup)

  const form = popup.querySelector('.am-js-form')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = formToObject(form)
    await add(data)
    popup.remove()
    alert('Saved!')
  })
}

export default async () => {
  const match = location.search.match(/(?:\?|&)s=([^&]+)/)

  if (!match) return

  const word = decodeURIComponent(match[1]).replace(/\+/g, ' ')
  const present = await check(word)

  if (present) {
    const alreadyAdded = htmlToNode('<div class="am-already-added">Already added</div>')
    rootNode.appendChild(alreadyAdded)
    return
  }

  const addButton = htmlToNode('<div class="am-add-button">Add</div>')
  rootNode.appendChild(addButton)

  let checkboxesAdded = false

  addButton.addEventListener('click', () => {
    if (!checkboxesAdded) {
      checkboxesAdded = true
      addCheckboxes()
      addButton.innerHTML = 'Ready'
      return
    }

    const translations = getSelectedTranslations()
    removeCheckboxes()
    addButton.remove()
    showAddPopup(word, translations)
  })
}
