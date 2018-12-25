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

const bs58 = require('bs58')
const multiH = require('multihashes')
const Buffer = require('buffer/').Buffer

module.exports = {

	// export multihash lib under the contentHash.multihash object
	multihash: multiH,

	// Codec constant defined in https://github.com/ensdomains/multicodec/blob/master/table.csv
	SWARM_CODEC	: Buffer.from('00', 'hex'),
	IPFS_CODEC	: Buffer.from('01', 'hex'),

	/**
	* Convert a hex string into a Buffer
	* @param {hexString} a string containing hex values
	* @return {Buffer} the string converted into a Buffer
	*/
	hexStringToBuffer: hexString =>	Buffer.from(hexString, 'hex'),

	/**
	* Decode a Content Hash buffer.
	* @param {contentHash} a Buffer containing a content hash
	* @return {string} the decoded content
	*/
	decode: function (contentHash) {
		const codec = contentHash.slice(0, 1)
		const value = contentHash.slice(1)

		if (Buffer(codec).compare(this.SWARM_CODEC) === 0) return value.toString('hex')
		else if (Buffer(codec).compare(this.IPFS_CODEC) === 0) return bs58.encode(value) // replace bs58 w/ multihash
		else console.error('Unknown Codec : ', codec.toString('hex'))
	},

	/**
	* Encode an IPFS address into a content hash
	* @param {ipfsHash} a string containing an IPFS address
	* @return {Buffer} the resulting content hash
	*/
	fromIpfs: function (ipfsHash) {
		const multihash = bs58.decode(ipfsHash) // replace bs58 w/ multihash
		return this.fromBuffer(this.IPFS_CODEC, multihash)
	},

	/**
	* Encode a Swarm address into a content hash
	* @param {swarmHash} a string containing a Swarm address
	* @return {Buffer} the resulting content hash
	*/
	fromSwarm: function (swarmHash) {
		return this.fromBuffer(this.SWARM_CODEC, Buffer.from(swarmHash, 'hex'))
	},

	/**
	* Generic function to encode a buffer into a content hash
	* @param {code} a Buffer containing a content hash codec constant
	* @param {buffer} a Buffer containing the value of the content hash
	* @return {Buffer} the resulting content hash
	*/
	fromBuffer: function (codec, buffer) {
		return Buffer.concat([codec, buffer])
	},

	/**
	* Extract the type of a content hash [ swarm | ipfs | unknown ]
	* @param {buffer} a content hash Buffer
	* @return {strign} the extracted codec
	*/
	getCodec: function (buffer) {
		res = 'unknown'
		const codec = buffer.slice(0, 1)
		if (Buffer(codec).compare(this.SWARM_CODEC) === 0) res = 'swarm'
		else if (Buffer(codec).compare(this.IPFS_CODEC) === 0) res = 'ipfs'
		else console.error('Unknown Codec : ', codec.toString('hex'))
		return res
	}
}