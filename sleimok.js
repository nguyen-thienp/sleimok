let args = process.argv.slice(2)
const processArgs = require("./js/args.js")
const getDuplicateList = require("./js/dupFileFinder.js")
const {loadFileList, saveFileList, printReport} = require("./js/reportHandler.js")
const {confirmDelete} = require("./js/fileDeleter.js")

args = processArgs(args)
const load = args.op.includes("load") ? true : false
console.log(args)

const dupFileList = load ? loadFileList(args.path) : getDuplicateList(args.path)
printReport(dupFileList)
if (!load) saveFileList(dupFileList)

confirmDelete(dupFileList)
