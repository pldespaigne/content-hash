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

const multiC = require('multicodec');

const packageJson = require('../package.json');
const { hexStringToBuffer, profiles } = require('./profiles');

/**
 * Increment version number by one depending type of update (major, minor, patch)
 * @example 1.2.3 + patch = 1.2.4,	4.5.6 + minor = 4.6.6
 * @return {string} the good version number
 */
function getVersion() {
	const version = packageJson.version.split('.');
	const major = parseInt(version[0], 10) + (packageJson['next-release'] === 'major' ? 1 : 0);
	const minor = parseInt(version[1], 10) + (packageJson['next-release'] === 'minor' ? 1 : 0);
	const patch = parseInt(version[2], 10) + (packageJson['next-release'] === 'patch' ? 1 : 0);
	const res = `${major}.${minor}.${patch}`;
	return res;
}

module.exports = {
	// we use this function because we need to pre increment the version,
	// otherwise there will be a shift between "js version" and npm version (because build is done before publish)
	version: getVersion(),

	/**
	* Decode a Content Hash.
	* @param {string} hash an hex string containing a content hash
	* @return {string} the decoded content
	*/
	decode: function (contentHash) {
		const buffer = hexStringToBuffer(contentHash);
		const codec = multiC.getCodec(buffer);
		const value = multiC.rmPrefix(buffer);
		let profile = profiles[codec];
		if (!profile) profile = profiles['default'];
		return profile.decode(value);
	},

	/**
	* Encode an IPFS address into a content hash
	* @param {string} ipfsHash string containing an IPFS address
	* @return {string} the resulting content hash
	*/
	fromIpfs: function (ipfsHash) {
		return this.encode('ipfs-ns', ipfsHash);
	},

	/**
	* Encode a Swarm address into a content hash
	* @param {string} swarmHash string containing a Swarm address
	* @return {string} the resulting content hash
	*/
	fromSwarm: function (swarmHash) {
		return this.encode('swarm-ns', swarmHash);
	},

	/**
	* General purpose encoding function
  * @param {string} codec 
  * @param {string} value 
  */
	encode: function (codec, value) {
		let profile = profiles[codec];
		if (!profile) profile = profiles['default'];
		const encodedValue = profile.encode(value);
		return multiC.addPrefix(codec, encodedValue).toString('hex');
	},
	/**
	* Extract the codec of a content hash
	* @param {string} hash hex string containing a content hash
	* @return {string} the extracted codec
	*/
	getCodec: function (hash) {
		let buffer = hexStringToBuffer(hash);
		return multiC.getCodec(buffer);
	},
}
