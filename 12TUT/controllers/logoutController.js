const userDB = {
    users : require('../model/users.json'),
    setUser: function (data) {this.users = data}
}
const fsPromises = require('fs').promises
const path = require('path')

const handleLogout = async (req, res) => {
    // On client also delete the accessToken
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    // Is refreshToken in DB
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly : true, sameSite : 'None', secure : true,  maxAge : 24 * 60 * 60 * 1000})
        return res.sendStatus(204)
    }

    // Delete refreshToken in DB
    const otherUser = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = {...foundUser, refreshToken : ' '}
    userDB.setUser([...otherUser, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(userDB.users)
    )
    res.clearCookie('jwt', {httpOnly : true, sameSite : 'None', secure : true, maxAge : 24 * 60 * 60 * 1000})
    res.sendStatus(204)
}

module.exports = {handleLogout}