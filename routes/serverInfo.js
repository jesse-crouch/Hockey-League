var fs = require('fs');

function getServerURL() {
    fs.readFile('./serverURL.txt', 'utf8', (err, data) => {
        if (err) return err;
        return data;
    });
}
exports.getServerURL = getServerURL;