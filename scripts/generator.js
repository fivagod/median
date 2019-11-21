const amount = parseInt(process.argv.pop()) || 100
let counter = amount
function newLine () {
  let str = Math.floor(Math.random() * amount)
  console.log(str)
}
console.error('Will generated aray with length = ' + amount)
while (counter > 0) {
  // We've got memory leak if did not wait "write successful" events, it's a bit slowly but can handle more data
  // also we have memory leak if we use fs.createWriteStream, so we use console + pipe to avoid this
  process.nextTick(newLine);
  counter--
}
