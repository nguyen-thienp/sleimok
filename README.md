# sleimok

 Finds duplicate files by recursively walking through directories, hashing files and comparing the MD5 sums. <br/> Then logs results in a .json file.

Usage: findDuplicateFiles [options] [path]

Options:                  
-h || -help &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Display help.<br/>
-l || -load &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									Loads a .json log file and deletes its given duplicate files.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									[path] must be a previously saved file list.<br/>
-r || -remove &nbsp;&nbsp;&nbsp;&nbsp; 
									Removes all duplicate files found immidiately without saving a duplicate file list.<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  [path] must be a valid directory.<br/>&nbsp;&nbsp;
