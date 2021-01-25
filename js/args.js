const yargs = require("yargs")

module.exports = function processArgs(args) {
	let argsArr = { op: undefined, path: undefined}
	const argv = yargs
		.check(function (argv) {
			if(!argv.path) throw new Error("Error: pass --path option")
			if ((argv.load && !argv.scan) || (!argv.load && argv.scan))	return true
			else if (argv.load && argv.scan) throw new Error("Error: pass either --load or --scan option")
			else throw new Error("Error: pass either --load or --scan option")
		})
		.usage(//neuuuuu
			"\nFinds duplicate files by recursively walking through directories, MD5 hashing files and comparing the hashes\nLogs found files in a .json list, prints it and gives a (very) brief report\nAsks for delete confirmation independent of passed option"
		)
		.option("path", {
			alias: "p",
			description: "Path of directory to be scanned or previously saved .json list",
			type: "string",
		})
		.option("load", {
			alias: "l",
			description: "Loads a previously saved .json list passed via --path and prints a brief report",
			type: "boolean",
		})
		.option("scan", {
			alias: "s",
			description: "Scans passed directory, prints a brief report and logs files as .json file in current working directory",
			type: "boolean",
		})
		.help()
		.alias("help", "h").argv

	argsArr.path = argv.path
	
	if (argv.load) {
		argsArr.op = "load"
	}

	if (argv.scan) {
		argsArr.op = "scan"
	}

	return argsArr
}


