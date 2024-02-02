const fs = require('fs');
function writeToFile(filePath, content) {
    fs.writeFile(filePath, content,'utf8', (err) => {
        if (err) {
            console.log(`Error writing file ${err.message}`);
            console.log(" ");
        } else {
            console.log("Content written in file: ")
            console.log(content)
            console.log(" ");
        }
    })
}
writeToFile('test-files/output1.txt', 'Sample content.');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');