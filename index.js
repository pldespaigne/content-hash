/*
	ISC License

	Copyright (c) 2019, Pierre-Louis Despaigne

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

const varint = require('varint')
const multiC = require('multicodec')
const multiH = require('multihashes')

/**
 * Unknown Codec Error can be thrown by 'contentHash.getCodec()'
 * @param {string} message the error message
 */
function UnknownCodec(message) { // ? Do we need this anymore since 'contentHash.getCodec()' has been deprecated ?
	this.message = message
	this.name = 'Unknown Codec'
}

/**
 * Convert an hexadecimal string to a Buffer, the string can start with or without '0x'
 * @param {string} hex an hexadecimal value
 * @return {Buffer} the resulting Buffer
 */
function hexString(hex) {
	let prefix = hex.slice(0, 2)
	let value = hex.slice(2)
	let res = ''
	if (prefix === '0x') res = value
	else res = hex
	return multiH.fromHexString(res)
}

module.exports = {

	Types: { // TODO remove this when multicodec will be updated
		// Codec constant defined in https://github.com/ensdomains/multicodec/blob/master/table.csv
		ipfs	: Buffer.from('e3', 'hex'),
		swarm	: Buffer.from('e4', 'hex'),
	},

	/**
	* Decode a Content Hash.
	* @param {string} hash an hex string containing a content hash
	* @return {string} the decoded content
	*/
	decode: function (hash) {

		let buffer = hexString(hash)
		
		const codec = Buffer.from(varint.decode(buffer).toString(16), 'hex') // get decoded varint codec
		const value = buffer.slice(varint.decode.bytes + 1 + 1) // remove the codec bytes plus de cid version byte plus merkle dag codec // TODO use js-cid instead of +1 +1

		// const codec = buffer.slice(0, 1)
		// const value = buffer.slice(4)
		let res = value.toString('hex')

		if (codec.compare(this.Types.swarm) === 0){// TODO change that for "multiC.getCodec(res) === 'swarm-ns'" when multicodec will be updated
			res = multiH.decode(value).digest.toString('hex')
		} else if (codec.compare(this.Types.ipfs) === 0){// TODO change that for "multiC.getCodec(res) === 'ipfs-ns'" when multicodec will be updated
			res = multiH.toB58String(value)

		} else {
			console.warn('⚠️ WARNING ⚠️ : unknown codec ' + codec.toString('hex') + ' for content-hash ' + res)
		}
		return res
	},

	/**
	* Encode an IPFS address into a content hash
	* @param {string} ipfsHash string containing an IPFS address
	* @return {string} the resulting content hash
	*/
	fromIpfs: function (ipfsHash) {
		const multihash = multiH.fromB58String(ipfsHash) // get Multihash buffer
		let res = multiC.addPrefix('dag-pb', multihash) // adding MerkleDAG codec : 0x70
		res = hexString('01' + res.toString('hex')) // adding CID v1 : 0x01

		// res = hexString('01' + res.toString('hex')) // adding uvarint // ! USE A LIB, DO NOT HARDCODE ! (see https://github.com/multiformats/unsigned-varint)
		// res = Buffer.concat([this.Types.ipfs, res]) // adding IPFS code : 0xef // TODO change that for 'multiC.addPrefix('ipfs-ns', res)' when multicodec will be updated
		
		let codec = Buffer.from(varint.encode(parseInt(this.Types.ipfs.toString('hex'), 16))) // TODO remove that when multicodec will be updated
		// let codec = Buffer.from(varint.encode(parseInt(multiC.getCodeVarint('ipfs-ns'), 16))) // TODO use that when multicodec will be updated
		res = Buffer.concat([codec, res])
		
		return res.toString('hex')
	},

	/**
	* Encode a Swarm address into a content hash
	* @param {string} swarmHash string containing a Swarm address
	* @return {string} the resulting content hash
	*/
	fromSwarm: function (swarmHash) {
		swarmHash = hexString(swarmHash)
		let multihash = multiH.encode(swarmHash, 'keccak-256') // get Multihash buffer
		let res = multiC.addPrefix('dag-pb', multihash) // adding MerkleDAG codec : 0x70
		res = hexString('01' + res.toString('hex')) // adding CID v1 : 0x01

		// res = hexString('01' + res.toString('hex')) // adding uvarint // ! USE A LIB, DO NOT HARDCODE ! (see https://github.com/multiformats/unsigned-varint)
		// res = Buffer.concat([this.Types.swarm, res]) // adding IPFS code : 0xef // TODO change that for 'multiC.addPrefix('swarm-ns', res)' when multicodec will be updated
		
		let codec = Buffer.from(varint.encode(parseInt(this.Types.swarm.toString('hex'), 16))) // TODO remove that when multicodec will be updated
		// let codec = Buffer.from(varint.encode(parseInt(multiC.getCodeVarint('ipfs-ns'), 16))) // TODO use that when multicodec will be updated
		res = Buffer.concat([codec, res])

		return res.toString('hex')
	},

	

	/**
	* Extract the codec of a content hash
	* @param {string} hash hex string containing a content hash
	* @return {string} the extracted codec
	*/
	getCodecType: function (hash) {// TODO deprecate this function for multicodec.getCodec(data: Buffer) when multicodec will be updated
		let buffer = hexString(hash)
		const codec = buffer.slice(0, 1)
		return codec.toString('hex')
	},

	/**
	 * Check if a content hash is of a certain type (defined in the Types object)
	 * @param {string} hash hex string containing a content hash 
	 * @param {Buffer} type a codec define in the Types object
	 */
	isHashOfType: function (hash, type) {// TODO deprecate this function for multicodec.getCodec(data: Buffer) when multicodec will be updated
		let codec = this.getCodecType(hash)
		let codecBuffer = hexString(codec)
		let eq = codecBuffer.compare(type)
		return eq === 0
	},

	// !-----------------------------------------------------------------------------------------------
	// !										DEPRECATED
	// !-----------------------------------------------------------------------------------------------
	// ! All the functions below are now DEPRECATED and will be remove soon, (also they are not covered by tests anymore)
	// TODO : delete deprecated functions in the next version

	/**
	* Generic function to encode a buffer into a content hash
	* @param {string} codec hex string containing a content hash codec constant
	* @param {string} buffer hex string containing the value of the content hash
	* @return {string} the resulting content hash
	* @deprecated this function is DEPRECATED and it will be remove soon ! Use addPrefix() from the multicodec lib.
	*/
	fromBuffer: function (codec, buffer) {
		console.error('⚠️ DEPRECATED ⚠️ : \'fromBuffer(codec, buffer)\' will be remove soon, please use \'addPrefix()\' from the \'multicodec\' lib ! https://github.com/multiformats/js-multicodec')

		codec = hexString(codec)
		buffer = hexString(buffer)
		return Buffer.concat([codec, buffer]).toString('hex')
	},
}