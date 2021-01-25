const fs = require("fs")

module.exports = {
	loadFileList: function (dupFilePath) {
		let dupFileList
		try {
			dupFileList = JSON.parse(fs.readFileSync(dupFilePath))
			console.log(`Loaded report ${dupFilePath}\n`)
		} catch {
			throw new Error(
				`Error loading/reading report ${dupFilePath}\nCheck if file exists`
			)
		}
		return dupFileList
	},

	printReport: function (dupFileList) {
		let report = ""
		dupFileList.forEach(
			(file) =>
				(report += `${file.name}\t ${file.ext} in\t ${file.path},\t size: ${file.size}mb,\t md5: ${file.md5}\n`)
		)
		report += `
        Unique file count\t: ${
					[...new Set(dupFileList.map((file) => file.md5))].length
				}
        Duplicate file count\t: ${dupFileList.length}
        Total file size\t: ${getSumFileSize(dupFileList)}mb
        `
		console.log(report)
	},

	saveFileList: function (dupFileList) {
		const date = new Date()
		const year = date.getFullYear()
		const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
		const day = date.getDate()
		const filePath = `./${year}${month}${day} duplicateFiles.json`

		fs.writeFileSync(filePath, JSON.stringify(dupFileList))
		console.log(`Saved file list as ${filePath}\n`)
	},
}

function getSumFileSize(dupFileList) {
	let sumFileSize = 0
	dupFileList.forEach((file) => (sumFileSize += file.size))

	return sumFileSize
}
