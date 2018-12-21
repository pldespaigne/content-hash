
const should = require('chai').should()
const contentHash = require('../index.js')

describe('content-hash', () => 
	{
		it('should convert hex string to a Buffer', () => {
			const str = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const buf = contentHash.hexStringToBuffer(str)
			const res = Buffer.from('011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece', 'hex')
			const test = buf.compare(res)
			test.should.be.equal(0)
		})
		it('should decode a content hash', () => {
			const res = 'QmRcDsEJUdpg6EDaVeZGFJHU1WYCKHXaUXBCzHHuCZLNXw'
			const cth = Buffer.from('011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece', 'hex')
			const test = contentHash.decode(cth)
			test.should.be.equal(res)
		})
		it('should encode an ipfs address', () => {
			const ipfs = 'QmRcDsEJUdpg6EDaVeZGFJHU1WYCKHXaUXBCzHHuCZLNXw'
			const res = Buffer.from('011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece', 'hex')
			const buf = contentHash.fromIpfs(ipfs)
			const test = buf.compare(res)
			test.should.be.equal(0)
		})
		it('should encode a swarm address', () => {
			const swarm = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const res = Buffer.from('00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162', 'hex')
			const buf = contentHash.fromSwarm(swarm)
			const test = buf.compare(res)
			test.should.be.equal(0)
		})
		it('should encode a buffer with a defined codec', () => {
			const swarm = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const res = Buffer.from('ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162', 'hex')
			const buf = contentHash.fromBuffer(Buffer.from('ff', 'hex'), Buffer.from(swarm, 'hex'))
			const test = buf.compare(res)
			test.should.be.equal(0)
		})
	}
)