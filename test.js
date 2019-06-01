var namehash = require('eth-ens-namehash')
var multihash = require('multihashes')
var contenthash = require('./index')


//console.log(namehash.hash('frittura.eth'))
//pub resolver ropsten 0xde469c7106a9FBC3fb98912bB00be983a89bDDca

let onionAddr = 'tnsksqdywtzhe5yrel5b5apizwhfbiqrhhmjmg66vtojkdmiascrlpyd'
//let onionAddr = '3g2upl4pq6kufc4m'
let ipfsAddr = 'Qmcpo2iLBikrdf1d6QU6vXuNb6P7hwrbNPW9kLAH8eG67z'

let enc = '0x' + contenthash.fromOnion(onionAddr)

console.log(enc)
console.log(contenthash.decode(enc))

enc = '0x' + contenthash.fromIpfs(ipfsAddr)

console.log(enc)
console.log(contenthash.decode(enc))
// let buffer = Buffer.from(onionAddr)
// if (onionAddr.length==56) {
// 	code = 'onion3'
// } else if (onionAddr.length==16) {
// 	code = 'onion'
// } else {
// 	console.log("Invalid onion address")
// }
// let encoded = multihash.encode(buffer, code)
// console.log('0x' + encoded.toString('hex'), encoded.toString('hex').length, encoded.length)
// let decoded = multihash.decode(encoded)
// console.log(decoded.name, decoded.length, decoded.digest.toString())


//src/api/util/records.js, contents.js,  multihashes/constants.js,   content-hash/index.js