function checkUser(email, password) {
  // define things user might want
  const users = [
    {
      firstName: 'Tony',
      email: 'tony@stark.com',
      password: 'iamironman'
    },
    {
      firstName: 'Steve',
      email: 'captain@hotmail.com',
      password: 'icandothisallday'
    },
    {
      firstName: 'Peter',
      email: 'peter@parker.com',
      password: 'enajyram'
    },
    {
      firstName: 'Natasha',
      email: 'natasha@gamil.com',
      password: '*parol#@$!'
    },
    {
      firstName: 'Nick',
      email: 'nick@shield.com',
      password: 'password'
    }
  ]

  let loginStatus = ''
  let userName = ''

  for (let i = 0; i < users.length; i++) {
    if (email === users[i].email && password === users[i].password) {
      loginStatus = 'Success'
      userName = users[i].firstName
      return { loginStatus, userName }
    } else {
      loginStatus = 'Fail'
    }
  }
  return { loginStatus, userName }
}

module.exports = checkUser
