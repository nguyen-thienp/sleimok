const fs = require("fs")
const path_mod = require("path")
const walk = require("walkdir")
const md5File = require("md5-file")

module.exports = function findDuplicateFiles(path) {
	const fileCount = getFileCount(path)
	console.log(`Files found total: ${fileCount}`)
	const fileList = getFileList(path)

	return getDuplicateList(fileList)

	function getFileCount(path) {
		console.log(`Path: ${path}\n`)
		console.log("Counting files...")
		let fileCount = 0
		walk.sync(path, (filePath) => {if (!fs.lstatSync(filePath).isDirectory()) {fileCount++}})

		return fileCount
	}

	function getFileList(path) {
		const fileList = []
		console.log("\nProcessing files...\n")

		walk.sync(path, (filePath) => {
			//skip type folder
			if (!fs.lstatSync(filePath).isDirectory()) {
				console.log(`Hashing ${fileList.length + 1 <= 10 ? "0" + fileList.length : fileList.length}/${fileCount}, ${filePath}`)
				fileList.push({
					name: path_mod.parse(path_mod.basename(filePath)).name,
					ext: path_mod.parse(path_mod.basename(filePath)).ext,
					path: path_mod.dirname(filePath),
					md5: md5File.sync(filePath),
					size: getFileSize(filePath),
				})
			}
		})
		console.log("\n...done\n")
		reverseFileList(fileList)

		return fileList
	}

	function getFileSize(filePath) {
		return (fileSizeMB = fs.statSync(filePath).size / 1000000.0)
	}

	function reverseFileList(fileList) {
		return (revFileList = fileList.reverse())
	}

	function getDuplicateList(fileList) {
		const dupFileList = []

		console.log("\nComparing files...\n")
		//compare each file to remaining files
		fileList.forEach((file) => {
			let fileIndex = fileList.indexOf(file)
			for (let i = fileIndex + 1; i < fileList.length; i++) {
				if (fileList[fileIndex].md5 === fileList[i].md5) {
					dupFileList.push(fileList[fileIndex])
					console.log(
						`Duplicate file/s found: ${
							dupFileList.length < 10 ? "0" + dupFileList.length : dupFileList.length
						}, ${fileList[fileIndex].path}${fileList[fileIndex].name}${
							fileList[fileIndex].ext
						}`
					)
					break //critical
				}
			}
		})
		console.log("\n...done\n")
		console.log("Found " + dupFileList.length + " duplicate files\n")

		return dupFileList
	}
}
