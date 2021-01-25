const readline = require("readline")
const fs = require("fs")

module.exports = {
	confirmDelete: function (dupFileList) {
		const reader = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})
		return new Promise((res) =>
			reader.question("Delete duplicate files? (y/n): ", (input) => {
				reader.close()
				if (input === "y") deleteDuplicates(dupFileList)
				else if (input === "n") return false
				else module.exports.confirmDelete(dupFileList)
			})
		)

		function deleteDuplicates(dupFileList) {
			console.log("Deleting files...\n")

			for (let i = 0; i < dupFileList.length; i++) {
				dupFile = `${dupFileList[i].path}/${dupFileList[i].name}${dupFileList[i].ext}`
				fs.unlinkSync(dupFile)
				console.log("Deleted file: " + dupFile)
			}
			console.log("\n...done\n")
		}
	},
}
