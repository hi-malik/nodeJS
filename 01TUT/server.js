console.log("Node is running...")

// console.log(global) // global object

const os = require('os') // os module
const path = require('path') // path module
const math = require('./math') // math module
// we can mport math module in this way too
const { add, subtract, divide, multiply} = require('./math')

console.log(os.type()) // os type
console.log(os.version()) // os version
console.log(os.homedir()) // home directory

console.log(__dirname) // directory name
console.log(__filename) // full path

console.log(path.dirname(__filename)) // directory name
console.log(path.basename(__filename)) // file name
console.log(path.extname(__filename)) // file extension

console.log(path.parse(__filename)) // parse path

console.log(math.add(1,2)) // add

console.log(subtract(1,2)) // subtract
console.log(multiply(1,2)) // multiply
console.log(divide(1,2)) // divide