const amount = parseInt(process.argv.pop()) || 100
let counter = amount

console.log('Will generated aray with length = ' + amount)

const file = require("fs").createWriteStream(__dirname + "/../src/assets/array.txt");

(async() => {

    while (counter > 0)  {
        if(!file.write(Math.floor(Math.random() * amount) + '\r\n')) {
            // Will pause every 16384 iterations until `drain` is emitted
            // avoid memory leak with buffer
            await new Promise(resolve => file.once('drain', resolve));
        }
        counter--
    }
})();

