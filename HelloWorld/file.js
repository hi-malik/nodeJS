const fs = require("fs")
const os = require("os")

console.log(os.cpus().length)

// Blocking, synchronous way
// console.log("1");
// const result = fs.readFileSync("contact.txt", "utf-8");
// console.log(result);
// console.log("2");

// Non-blocking, asynchronous way
// console.log("3");
// fs.readFile("contact.txt", "utf-8", (err, result) => {
//     if(err) console.log(err);
//     console.log(result);
// })
// console.log("4");