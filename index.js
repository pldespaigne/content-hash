/*
	ISC License

	Copyright (c) 2018, Pierre-Louis Despaigne

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted, provided that the above
	copyright notice and this permission notice appear in all copies.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
	WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
	MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
	ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
	WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
	ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
	OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

const multiH = require('multihashes')

const utils = {

	// Codec constant defined in https://github.com/ensdomains/multicodec/blob/master/table.csv
	SWARM_CODEC	: Buffer.from('00', 'hex'),
	IPFS_CODEC	: Buffer.from('01', 'hex'),

	/**
	 * Convert an hexadecimal string to a Buffer, the string can start with or without '0x'
	 * @param {string} hex an hexadecimal value
	 * @return {Buffer} the resulting Buffer
	 */
	hexString: function(hex) {
		let prefix = hex.slice(0, 2)
		let value = hex.slice(2)
		let res = ''
		if (prefix === '0x') res = value
		else res = hex
		return multiH.fromHexString(res)
	}
}

/**
 * Unknown Codec Error can be thrown by 'contentHash.getCodec()'
 * @param {string} message the error message
 */
function UnknownCodec(message) {
	this.message = message
	this.name = 'Unknown Codec'
}

module.exports = {

	/**
	* Decode a Content Hash.
	* @param {string} buffer an hex string containing a content hash
	* @return {string} the decoded content
	*/
	decode: function (buffer) {

		buffer = utils.hexString(buffer)

		const codec = buffer.slice(0, 1)
		const value = buffer.slice(1)

		if (codec.compare(utils.SWARM_CODEC) === 0) return value.toString('hex')
		else if (codec.compare(utils.IPFS_CODEC) === 0) return multiH.toB58String(value)
		else {
			console.error('⚠️ WARNING ⚠️ : unknown codec ' + codec.toString('hex') + ' for content-hash ' + value.toString('hex'))
			return value.toString('hex')
		}
	},

	/**
	* Encode an IPFS address into a content hash
	* @param {string} ipfsHash string containing an IPFS address
	* @return {string} the resulting content hash
	*/
	fromIpfs: function (ipfsHash) {
		const multihash = multiH.fromB58String(ipfsHash)
		return this.fromBuffer(utils.IPFS_CODEC, multihash)
	},

	/**
	* Encode a Swarm address into a content hash
	* @param {string} swarmHash string containing a Swarm address
	* @return {string} the resulting content hash
	*/
	fromSwarm: function (swarmHash) {
		return this.fromBuffer(utils.SWARM_CODEC, Buffer.from(swarmHash, 'hex'))
	},

	/**
	* Generic function to encode a buffer into a content hash
	* @param {string} codec hex string containing a content hash codec constant
	* @param {string} buffer hex string containing the value of the content hash
	* @return {string} the resulting content hash
	*/
	fromBuffer: function (codec, buffer) {
		codec = utils.hexString(codec)
		buffer = utils.hexString(buffer)
		return Buffer.concat([codec, buffer]).toString('hex')
	},

	/**
	* Extract the type of a content hash [ 'swarm' | 'ipfs' | 'unknown' ]
	* @param {string} buffer hex string containing a content hash
	* @return {string} the extracted codec
	* @throws {UnknownCodec} if the codec is unknown
	*/
	getCodec: function (buffer) {
		buffer = utils.hexString(buffer)
		res = 'unknown'
		const codec = buffer.slice(0, 1)
		if (codec.compare(utils.SWARM_CODEC) === 0) res = 'swarm'
		else if (codec.compare(utils.IPFS_CODEC) === 0) res = 'ipfs'
		else throw new UnknownCodec('codec : ' + codec.toString('hex') + ', content-hash : ' + buffer.toString('hex'))
		return res
	},

	/**
	* Check if a content hash is an ipfs address
	* @param {string} buffer hex string containing a content hash
	* @return {boolean} wether or not if it's an ipfs address
	*/
	isIpfs: function (buffer) {
		let codec = ''
		
		try {
			codec = this.getCodec(buffer)
		} catch (err) {
			if (err.name === 'Unknown Codec') return false
		}
		return codec === 'ipfs'
	},

	/**
	* Check if a content hash is a swarm address
	* @param {string} buffer hex string containing a content hash
	* @return {boolean} wether or not if it's a swarm address
	*/
	isSwarm: function (buffer) {
		let codec = ''
		
		try {
			codec = this.getCodec(buffer)
		} catch (err) {
			if (err.name === 'Unknown Codec') return false
		}
		return codec === 'swarm'
	},

	/**
	* Check if a content hash has an unknown codec
	* @param {string} buffer hex string containing a content hash
	* @return {boolean} wether or not if the content hash has an unknown codec
	*/
	isUnknown: function (buffer) {
		let codec = ''
		
		try {
			codec = this.getCodec(buffer)
		} catch (err) {
			if (err.name === 'Unknown Codec') return true
		}
		return false
	},
}