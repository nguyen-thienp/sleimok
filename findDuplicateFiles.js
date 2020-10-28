const fs = require("fs")
const walk = require("walkdir")
const md5File = require('md5-file')
const args = process.argv.splice(2)

module.exports.findDuplicateFiles = findDuplicateFiles

function findDuplicateFiles(args) {
    const path = args[args.length - 1]
    console.log("\nArguments: " + args)
    let removeFiles;
    let loadLog;
    checkArguments(args)
    let dupList;
    if (loadLog) {
        dupList = loadListFile(path)
        deleteDuplicates(dupList)
        return
    }
    const totalFileCount = getFileCount(path)
    console.log("Files found: " + totalFileCount + "\n")
    const files = getFiles(path)
    dupList = getDuplicateList(files)

    if (removeFiles) {
        deleteDuplicates(dupList)
    } else {
        saveFileList(path, dupList)
    }

    function getFiles(path) {
        const fileList = [];

        console.log("Processing files...")
        walk.sync(path, function (path, stat) {
            //skip type folder
            if (!fs.lstatSync(path).isDirectory()) {
                console.log("Hashing file " + (fileList.length + 1) + " / " + totalFileCount + ", " + path)
                const hash = md5File.sync(path)
                fileList.push({ "path": path, "md5": hash })
            }
        })
        console.log("...done\n")
        return fileList;
    }

    function helpCommand() {
        console.log("\nFinds duplicate files by recursively walking through directories, hashing files and comparing the MD5 sums.") 
        console.log("Then logs results in a .json file.")
        console.log("Usage: findDuplicateFiles [options] [path]\n")
        console.log("Options: ")
        console.log("   -h || -help         Display help.")
        console.log("   -l || -load         Loads a .json log file and deletes its given duplicate files.")
        console.log("                       [path] must be a previously saved file list.")
        console.log("   -r || -remove       Removes all duplicate files found immidiately without saving a duplicate file list.")
        console.log("                       [path] must be a valid directory.")
        process.exit()
    }

    function argumentError() {
        console.log("Error: Path/argument missing or incorrect. Use -h or -help for help.")
        process.exit();
    }

    function loadListFile(filePath) {
        let duplicateFiles = []
        try {
            duplicateFiles = JSON.parse(fs.readFileSync(filePath))
            console.log("Loaded file list: " + filePath + "\n")
        } catch {
            console.log("Error loading file list: " + filePath + "\n")
        }
        return duplicateFiles
    }

    function getFileCount(path) {
        console.log("Path: " + path + "\n")
        console.log("Counting files...")
        let fileCount = 0;
        walk.sync(path, function (path, stat) {
            if (!fs.lstatSync(path).isDirectory()) {
                fileCount++;
            }
        })
        return fileCount
    }
    
    function getDuplicateList(fileList) {
        let duplicateFiles = []
        console.log("Comparing files...")
        //compare each file to remaining files
        fileList.forEach(file => {
            let fileIndex = fileList.indexOf(file)
            for (let i = fileIndex + 1; i < fileList.length; i++) {
                if (fileList[fileIndex].md5 === fileList[i].md5) {
                    duplicateFiles.push(fileList[fileIndex])
                    console.log("Duplicate file(s) found: " + duplicateFiles.length + ", " + fileList[fileIndex].path)
                    break; //critical
                }
            }
        })
        console.log("...done\n")
        console.log("Found " + duplicateFiles.length + " duplicate files in ")
        // console.log("ComparisonDuplicate file(s) found: " + duplicateFiles.length + "\n");
        return duplicateFiles;
    }

    function saveFileList(path, fileList) {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() < 10? "0" + date.getMonth() : date.getMonth()
        const day = date.getDate()
        const filePath = `${path}/${year}${month}${day} - duplicateList.json`
        //Desktop
        // const desktopPath = require("os").userInfo().homedir + "/Desktop";
        // fs.writeFileSync(desktopPath + "/duplicateList.txt" , JSON.stringify(fileList))
        fs.writeFileSync(filePath, JSON.stringify(fileList))
        console.log("File list saved as " + filePath)
    }

    function deleteDuplicates(fileList) {
        const duplicateList = fileList
        console.log("Deleting files...")
        console.log(duplicateList)
        for (let i = 0; i < duplicateList.length; i++) {
            let filePath = duplicateList[i].path;
            fs.unlinkSync(filePath);
            console.log("Deleted file: " + filePath)
        }
        console.log("...done\n")
    }

    function checkArguments(args) {
        if (args[0] === "-h" || args[0] === "-help") {
            helpCommand()
        }
        if (!path || !fs.existsSync(path)) {
            console.log(args)
            console.log("!path||!fs.existsSync")
            return argumentError()
        } else {
            switch (args.length) {
                case 2:
                    switch (args[0]) {
                        case "-l":
                        case "-load":
                            if (fs.lstatSync(path).isFile()) {
                                loadLog = true
                                break
                            } else {
                                argumentError()
                            }
                        case "-r":
                        case "-remove":
                            if (fs.lstatSync(path).isDirectory()) {
                                removeFiles = true
                                break
                            } else {
                                argumentError()
                            }
                        default:
                            console.log("switch(args[0], default: ")
                            return argumentError()
                    }
                case 1:
                    if (fs.existsSync(path)) {
                        return
                    }
                    else {
                        console.log()
                        return argumentError()
                    }
                default:
                    return argumentError()
            }
        }
    }
}
