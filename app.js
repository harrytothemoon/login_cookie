const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const checkUser = require('./checkUser')
// const routerCookie = requrire('./routes/loginAPI')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('Harry'))

app.get('/', (req, res) => {
  if (req.signedCookies.user) {
    res.redirect('/success')
    console.log(req.signedCookies.user)
  } else {
    res.render('index')
  }
})

app.get('/success', (req, res) => {
  if (req.signedCookies.user) {
    let cookieUserName = req.signedCookies.user
    res.render('successPage', { cookieUserName })
  } else {
    res.redirect('/')
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('user', { path: '/' })
  res.redirect('/')
})

app.post('/', (req, res) => {
  console.log('req.body', req.body)
  let email = req.body.email
  let password = req.body.password
  let results = checkUser(email, password)
  let loginStatus = results.loginStatus
  let userName = results.userName

  if (loginStatus === 'Success') {
    res.cookie('user', userName, { path: '/', signed: true, httpOnly: true })
    res.redirect('success')
  } else {
    const error = 'Sorry, the username or password is incorrect!'
    res.render('index', { error })
  }
})

app.listen(port, () => {
  console.log(`The Express server is listen on http://localhost:${port}`)
})

