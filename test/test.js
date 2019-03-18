
const should = require('chai').should()
const expect = require('chai').expect
const contentHash = require('../index.js')

const ipfs = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'
const ipfs_contentHash = 'e3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f'
const swarm = '74f5b67c088a34a7b51612671300c9f040f4b8b322fa234d26069c17eb00428a'
const swarm_contentHash = 'e40101701b2074f5b67c088a34a7b51612671300c9f040f4b8b322fa234d26069c17eb00428a'

describe('content-hash', () => 
	{
		it('should decode a content hash', () => {
			
			const actual_0 = contentHash.decode(ipfs_contentHash)
			const actual_1 = contentHash.decode(swarm_contentHash)

			actual_0.should.be.equal(ipfs)
			actual_1.should.be.equal(swarm)
		})
		it('should encode an ipfs address', () => {
			
			const actual = contentHash.fromIpfs(ipfs)
			actual.should.be.equal(ipfs_contentHash)
		})
		it('should encode a swarm address', () => {
			
			const actual = contentHash.fromSwarm(swarm)
			actual.should.be.equal(swarm_contentHash)
		})
		it('should get a codec from a content hash', () => {
			
			const actual_0 = contentHash.getCodec(ipfs_contentHash)
			const actual_1 = contentHash.getCodec(swarm_contentHash)

			actual_0.should.be.equal('ipfs-ns')
			actual_1.should.be.equal('swarm-ns')
		})
	}
)
