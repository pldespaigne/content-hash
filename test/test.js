
const should = require('chai').should()
const expect = require('chai').expect
const contentHash = require('../index.js')

describe('content-hash', () => 
	{
		it('should decode a content hash', () => {
			const expected_0 = 'QmRcDsEJUdpg6EDaVeZGFJHU1WYCKHXaUXBCzHHuCZLNXw'
			const expected_1 = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const value_2 = 'ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

			const actual_0 = contentHash.decode(value_0)
			const actual_1 = contentHash.decode(value_1)
			const actual_2 = contentHash.decode(value_2)

			actual_0.should.be.equal(expected_0)
			actual_1.should.be.equal(expected_1)
			actual_2.should.be.equal(expected_1)
		})
		it('should encode an ipfs address', () => {
			const expected = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'

			const value = 'QmRcDsEJUdpg6EDaVeZGFJHU1WYCKHXaUXBCzHHuCZLNXw'
			
			const actual = contentHash.fromIpfs(value)
			actual.should.be.equal(expected)
		})
		it('should encode a swarm address', () => {
			const expected = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

			const value = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			
			const actual = contentHash.fromSwarm(value)
			actual.should.be.equal(expected)
		})
		it('should encode a buffer with a defined codec', () => {
			const expected = 'ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

			const value_0 = 'ff'
			const value_1 = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			
			const actual = contentHash.fromBuffer(value_0, value_1)
			actual.should.be.equal(expected)
		})
		it('should get a codec type from a content hash (NEW)', () => { // TODO : remove '(NEW)' in the next version
			const expected_0 = '01'
			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const actual_0 = contentHash.getCodecType(value_0)

			const expected_1 = '00'
			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_1 = contentHash.getCodecType(value_1)

			actual_0.should.be.equal(expected_0)
			actual_1.should.be.equal(expected_1)
		})
		it('should check if a hash is of a certain type (NEW)', () => { // TODO : remove '(NEW)' in the next version
			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const value_2 = 'ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

			expect(contentHash.isHashOfType(value_0, contentHash.Types.ipfs)).to.be.true
			expect(contentHash.isHashOfType(value_0, contentHash.Types.swarm)).to.be.false
			expect(contentHash.isHashOfType(value_1, contentHash.Types.ipfs)).to.be.false
			expect(contentHash.isHashOfType(value_1, contentHash.Types.swarm)).to.be.true
			expect(contentHash.isHashOfType(value_2, contentHash.Types.ipfs)).to.be.false
			expect(contentHash.isHashOfType(value_2, contentHash.Types.swarm)).to.be.false
		})

		// ! DEPRECATED
		// TODO : delete deprecated functions in the next version
		it('should get a codec type from a content hash (DEPRECATED)', () => {
			const expected_0 = 'ipfs'
			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const actual_0 = contentHash.getCodec(value_0)

			const expected_1 = 'swarm'
			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_1 = contentHash.getCodec(value_1)

			actual_0.should.be.equal(expected_0)
			actual_1.should.be.equal(expected_1)
			expect(() => contentHash.getCodec('ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162')).to.throw('codec')
		})
		it('should check if a content hash is an ipfs address (DEPRECATED)', () => {
			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const actual_0 = contentHash.isIpfs(value_0)

			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_1 = contentHash.isIpfs(value_1)

			const value_2 = 'ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_2 = contentHash.isIpfs(value_2)

			actual_0.should.be.true
			actual_1.should.be.false
			actual_2.should.be.false
		})
		it('should check if a content hash is a swarm address (DEPRECATED)', () => {
			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const actual_0 = contentHash.isSwarm(value_0)

			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_1 = contentHash.isSwarm(value_1)

			const value_2 = 'ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_2 = contentHash.isSwarm(value_2)

			actual_0.should.be.false
			actual_1.should.be.true
			actual_2.should.be.false
		})
		it('should check if a content has an unknown codec (DEPRECATED)', () => {
			const value_0 = '011220309043953cfc191544b97f488854ae83c7af41200b91d940b8fd8fd29c56dece'
			const actual_0 = contentHash.isUnknown(value_0)

			const value_1 = '00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_1 = contentHash.isUnknown(value_1)

			const value_2 = 'ffd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
			const actual_2 = contentHash.isUnknown(value_2)

			actual_0.should.be.false
			actual_1.should.be.false
			actual_2.should.be.true
		})
	}
)