const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64')

const duma = 'strnentekst'
const message = new Date()
function hasan(input, message){
    const output = sha256(input + message)
    const finalOutput = Base64.stringify(output)
    return finalOutput
}
console.log(hasan(duma, message))

