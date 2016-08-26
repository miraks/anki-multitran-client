const fs = require('fs')

const userJsPath = fs.readFileSync('user-js-path.txt').toString().trim()

fs.watch('build/app.js', () => {
  const js = fs.readFileSync('build/app.js')
  fs.writeFileSync(userJsPath, js)
})
