const fs = require('fs');
function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                console.log(`Error reading file ${err.code} - ${err.message}`);
                console.log(" ");
            } else {
                console.log(`Error reading file ${err.message}`);
                console.log(" ");
            }
        } else {
            console.log("File content: ")
            console.log(data)
            console.log(" ");
        }
    })
}
readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');