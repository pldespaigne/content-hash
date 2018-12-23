

# content-hash

![npm package](https://badge.fury.io/js/content-hash.svg)

>This is a simple package made for encoding and decoding content hashes has specified in the [EIP 1577](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1577.md).
This package will be useful for every [Ethereum](https://www.ethereum.org/) developer wanting to interact with [EIP 1577](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1577.md) compliant [ENS resolvers](http://docs.ens.domains/en/latest/introduction.html).

Here you can find a [live demo](https://content-hash.surge.sh/) of this package.

## 📥 Install
* via **npm** :
	```bash
	$> npm install content-hash
	```
* via **Github** : Download or clone this repo, then install the dependencies.
	```bash
	$> git clone https://github.com/pldespaigne/content-hash.git
	$> cd content-hash
	$> npm install
	```
> For browser only usage, installation is not required.

## 🛠 Usage
Import the module in order to use it :
* **NodeJS** :
```javascript
const contentHash = require('content-hash')
```
* **Browser** :
```html
<!--From CDN-->
<script type="text/javascript" src="https://unpkg.com/content-hash/dist/index.js"></script>

<!--From local module-->
<script type="text/javascript" src="path/to/dist/index.js"></script>
```
> To rebuild the browser version of the package run `npm run build` into the root folder.

## 📕 API
### contentHash.hexStringToBuffer( hexString )
This function takes an hex **string** and convert it into a **Buffer**. This is a simple way to create a new buffer that works both with NodeJs and inside a browser.
```javascript
const encoded = contentHash.hexStringToBuffer('01122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f')
// <Buffer(Uint8Array) 01122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f>
```

### contentHash.decode( contentHash )
This function takes a content hash **Buffer** and returns the decoded content as a **string**.
```javascript
const encoded = contentHash.hexStringToBuffer('01122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f')

const content = contentHash.decode(encoded)
// 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'
```

### contentHash.fromIpfs( ipfsHash )
This function takes an IPFS address **string** and returns the encoded content hash **Buffer**.
```javascript
const ipfsHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'

const contentH = contentHash.fromIpfs(ipfsHash)
// <Buffer(Uint8Array) 01122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f>
```
### contentHash.fromSwarm( swarmHash )
This function takes a Swarm address **string** and returns the encoded content hash **Buffer**.
```javascript
const swarmHash = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

const contentH = contentHash.fromSwarm(swarmHash)
// <Buffer(Uint8Array) 00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162>
```
### contentHash. fromBuffer( codec, buffer )
This function takes a codec **Buffer** and a value **Buffer** and returns the encoded content hash **Buffer**.
The list of supported codecs can be found [here](https://github.com/ensdomains/multicodec/blob/master/table.csv), the module also defines `SWARM_CODEC` and `IPFS_CODEC` Buffer constant for convenience.
```javascript
const value = contentHash.hexStringToBuffer('d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162')

const contentH = contentHash.fromBuffer(SWARM_CODEC, value)
// <Buffer(Uint8Array) 00d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162>
```
## 👨‍💻 Maintainer
*  pldespaigne : [github](https://github.com/pldespaigne), [twitter](https://twitter.com/pldespaigne)

## 🙌 Contributing
For any questions, discussions, bug report, or whatever I will be happy to answer through the [issues](https://github.com/pldespaigne/content-hash/issues) or on my [twitter](https://twitter.com/pldespaigne) 😁.

## 📝 License
This project is licensed under the **ISC License**, you can find it [here](https://github.com/pldespaigne/content-hash/blob/master/LICENSE).
> Note that the dependencies may have a different License

