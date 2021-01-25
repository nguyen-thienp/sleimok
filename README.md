## Sleimok
### What
Finds duplicate files by recursively walking through directories, MD5 hashing files and comparing the hashes Logs found files in a .json list, 
prints it and gives a (very) brief report<br>
Asks for delete confirmation independent of passed option

### Setup
Downlad repository and unpack it<br>
`npm install` in root directory<br>

### Usage
Options:	
  
        --version  Show version number                                    [boolean]
    -p, --path     Path of directory to be scanned or previously saved .json list
                                                                           [string]  
    -l, --load     Loads a previously saved .json list passed via --path and
                   prints a brief report                                  [boolean]
    -s, --scan     Scans passed directory, prints a brief report and logs files as
	               .json file in current working directory                [boolean]
    -h, --help     Show help                                              [boolean]

### NPM dependencies
`md5-file`<br>
`walkdir`<br>
`yargs`<br>

### Future updates
More options<br>
GUI(probably never)<br>
Option to choose individual files to keep/delete<br>
Better (actual) stats<br>
- overhaul report<br>


