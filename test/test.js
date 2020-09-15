
const should = require('chai').should()
const expect = require('chai').expect
const contentHash = require('../src/index.js')

const ipfs = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'
const ipfs_contentHash = 'e3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f'
const ipns_contentHash = 'e5010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f'
const swarm = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
const swarm_contentHash = 'e40101fa011b20d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
const onion = 'zqktlwi4fecvo6ri'
const onion_contentHash = 'bc037a716b746c776934666563766f367269';
const onion3 = 'p53lf57qovyuvwsc6xnrppyply3vtqm7l6pcobkmyqsiofyeznfu5uqd';
const onion3_contentHash = 'bd037035336c663537716f7679757677736336786e72707079706c79337674716d376c3670636f626b6d797173696f6679657a6e667535757164';
const ipfsBase32DagPb = 'bafybeibj6lixxzqtsb45ysdjnupvqkufgdvzqbnvmhw2kf7cfkesy7r7d4';
const ipfsBase32Libp2pKey = 'bafzbeie5745rpv2m6tjyuugywy4d5ewrqgqqhfnf445he3omzpjbx5xqxe';

describe('content-hash (legacy tests)', () =>
	{
		it('should decode a content hash', () => {
			const actual_0 = contentHash.decode(ipfs_contentHash);
			const actual_1 = contentHash.decode(swarm_contentHash);
			let actual_2 = contentHash.decode(onion_contentHash);

			actual_0.should.be.equal(ipfs);
			actual_1.should.be.equal(swarm);
			actual_2.should.be.equal(onion);
		});
		it('should encode an ipfs address', () => {
			const actual = contentHash.fromIpfs(ipfs);
			actual.should.be.equal(ipfs_contentHash);
		});
		it('should encode a swarm address', () => {
			const actual = contentHash.fromSwarm(swarm);
			actual.should.be.equal(swarm_contentHash);
		});
		it('should encode an onion address', () => {
			const actual = contentHash.encode('onion', onion);
			actual.should.be.equal(onion_contentHash);
		});
		it('should get a codec from a content hash', () => {
			const actual_0 = contentHash.getCodec(ipfs_contentHash);
			const actual_1 = contentHash.getCodec(swarm_contentHash);
			const actual_2 = contentHash.getCodec(onion_contentHash);

			actual_0.should.be.equal('ipfs-ns');
			actual_1.should.be.equal('swarm-ns');
			actual_2.should.be.equal('onion');
		});
	}
);

describe('content-hash', () => {
	describe('swarm', () => {
		it('should encode', () => {
			const actual = contentHash.encode('swarm-ns', swarm);
			actual.should.be.equal(swarm_contentHash);
		});
		it('should getCodec', () => {
			const actual = contentHash.getCodec(swarm_contentHash);
			actual.should.be.equal('swarm-ns');
		});
		it('should decode', () => {
			const actual = contentHash.decode(swarm_contentHash);
			actual.should.be.equal(swarm);
		});
	});
	describe('ipfs', () => {
		it('should encode', () => {
			const actual = contentHash.encode('ipfs-ns', ipfs);
			actual.should.be.equal(ipfs_contentHash);
		});
		it('should getCodec', () => {
			const actual = contentHash.getCodec(ipfs_contentHash);
			actual.should.be.equal('ipfs-ns');
		});
		it('should decode', () => {
			const actual = contentHash.decode(ipfs_contentHash);
			actual.should.be.equal(ipfs);
		});
	});
	describe('ipns', () => {
		it('should encode', () => {
			const actual = contentHash.encode('ipns-ns', ipfs); // ipns & ipfs are the same hash and same encoding, only codec differ
			actual.should.be.equal(ipns_contentHash);
		});
		it('should getCodec', () => {
			const actual = contentHash.getCodec(ipns_contentHash);
			actual.should.be.equal('ipns-ns');
		});
		it('should decode', () => {
			const actual = contentHash.decode(ipns_contentHash);
			actual.should.be.equal(ipfs); // ipns & ipfs are the same hash and same encoding, only codec differ
		});
	});
	describe('onion', () => {
		it('should encode', () => {
			const actual = contentHash.encode('onion', onion);
			actual.should.be.equal(onion_contentHash);
		});
		it('should getCodec', () => {
			const actual = contentHash.getCodec(onion_contentHash);
			actual.should.be.equal('onion');
		});
		it('should decode', () => {
			const actual = contentHash.decode(onion_contentHash);
			actual.should.be.equal(onion);
		});
	});
	describe('onion3', () => {
		it('should encode', () => {
			const actual = contentHash.encode('onion3', onion3);
			actual.should.be.equal(onion3_contentHash);
		});
		it('should getCodec', () => {
			const actual = contentHash.getCodec(onion3_contentHash);
			actual.should.be.equal('onion3');
		});
		it('should decode', () => {
			const actual = contentHash.decode(onion3_contentHash);
			actual.should.be.equal(onion3);
		});
	});
	describe('helpers.cidV0ToV1Base32', () => {
		const { cidV0ToV1Base32 } = contentHash.helpers;
		it('should convert CID v0 into v1', () => {
			const actual = cidV0ToV1Base32(ipfs);
			actual.should.be.equal(ipfsBase32DagPb);
		});
		it('should keep CID v1 Base32 as-is', () => {
			const dagPbCid = cidV0ToV1Base32(ipfsBase32DagPb);
			dagPbCid.should.be.equal(ipfsBase32DagPb);
			const libp2pKeyCid = contentHash.helpers.cidV0ToV1Base32(ipfsBase32Libp2pKey);
			libp2pKeyCid.should.be.equal(ipfsBase32Libp2pKey);
		});
	});
	describe('helpers.cidForWeb', () => {
		const { cidForWeb } = contentHash.helpers;
		it('should convert CID into case-insenitive base', () => {
			const actual = cidForWeb(ipfs);
			actual.should.be.equal(ipfsBase32DagPb);
		});
		it('should keep CID v1 Base32 if under DNS limit', () => {
			const b32_59chars = 'bafybeibj6lixxzqtsb45ysdjnupvqkufgdvzqbnvmhw2kf7cfkesy7r7d4';
			const webCid = cidForWeb(b32_59chars);
			webCid.should.be.equal(b32_59chars);
		});
		it('should convert to Base36 if it helps with DNS limit', () => {
			const b32_65chars = 'bafzaajaiaejca4syrpdu6gdx4wsdnokxkprgzxf4wrstuc34gxw5k5jrag2so5gk';
			const b36_62chars = 'k51qzi5uqu5dj16qyiq0tajolkojyl9qdkr254920wxv7ghtuwcz593tp69z9m';
			const webCid = cidForWeb(b32_65chars);
			webCid.should.be.equal(b36_62chars);
		});
		it('should throw if CID is over DNS limit', () => {
			const b32_sha512_110chars = 'bafkrgqhhyivzstcz3hhswshfjgy6ertgmnqeleynhwt4dlfsthi4hn7zgh4uvlsb5xncykzapi3ocd4lzogukir6ksdy6wzrnz6ohnv4aglcs';
			expect(() => cidForWeb(b32_sha512_110chars)).to.throw(TypeError, 'CID is longer than DNS limit of 63 characters and is not compatible with public gateways');
		});
	});
});
