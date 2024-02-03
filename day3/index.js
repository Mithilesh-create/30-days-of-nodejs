
const { exec } = require('child_process');
function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: $(error.message)`);
            return;
        }
        if (stderr) {
            console.error(`Command failed: ${stderr}`);
            return;
        }
        console.log(`Command Output: \n${stdout}`);
    });
}
executeCommand('ls -la');
// Expected Output: (output of ls -la)

executeCommand('echo "Hello, Node.js!"');
// Expected Output: Hello, Node.js!
