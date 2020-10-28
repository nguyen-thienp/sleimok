const args = process.argv.splice(2)
const fDupFiles = require("./findDuplicateFiles").findDuplicateFiles

console.time("Test run time")
fDupFiles(args)
console.timeEnd("Test run time")
