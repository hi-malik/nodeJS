const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.data = this.users}
}
const bcrypt = require('bcrypt')

const handleLogin = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd) {
        return res.status(400).json({'message' : 'Username and password is required'})
    }
    const foundUser = userDB.users.find(person => person.username === user)
    if(!foundUser){
        return res.sendStatus(401) // unauthorized
    }
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
        res.json({'success' : `User ${user} is logged in`})
    }
    else{
        res.sendStatus(401)
    }
}

module.exports = {handleLogin}