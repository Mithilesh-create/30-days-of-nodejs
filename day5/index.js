const path = require("path");
function checkFileExtension(filePath, expectedExtension) {
    const actualExt = path.extname(filePath);
    if (actualExt === expectedExtension) {
        console.log('File has the expected extension ', expectedExtension);
    } else {
        console.log(`File does not have the expected extension \n Expected :${expectedExtension} \n Actual :${actualExt}`);
    }
}
checkFileExtension('test.txt', '.txt')
checkFileExtension('img.png', '.png')