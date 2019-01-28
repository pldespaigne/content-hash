

# content-hash

![npm package](https://badge.fury.io/js/content-hash.svg)

>This is a simple package made for encoding and decoding content hashes has specified in the [EIP 1577](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1577.md).
This package will be useful for every [Ethereum](https://www.ethereum.org/) developer wanting to interact with [EIP 1577](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1577.md) compliant [ENS resolvers](http://docs.ens.domains/en/latest/introduction.html).

⚠️ The EIP 1577 spec can change rapidlly, expect this lib to do the same !

Here you can find a [live demo](https://content-hash.surge.sh/) of this package.
* link to [npm](https://www.npmjs.com/package/content-hash)
* link to [Github](https://github.com/pldespaigne/content-hash)

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

> All hex string **inputs** can be prefixed with `0x`, but it's **not mandatory**.

> All **outputs** are **NOT** prefixed with `0x`

### contentHash.decode( string ) -> string
This function takes a content hash as a hex **string** and returns the decoded content as a **string**.
```javascript
const encoded = 'e3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f'

const content = contentHash.decode(encoded)
// 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'
```

### contentHash.fromIpfs( string ) -> string
This function takes an IPFS address as a base58 encoded **string** and returns the encoded content hash as a hex **string**.
```javascript
const ipfsHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'

const contentH = contentHash.fromIpfs(ipfsHash)
// 'e3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f'
```

### contentHash.fromSwarm( swarmHash ) -> string
This function takes a Swarm address as a hex **string** and returns the encoded content hash as a hex **string**.
```javascript
const swarmHash = 'd1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

const contentH = contentHash.fromSwarm(swarmHash)
// 'e40101701b20d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'
```

### contentHash.getCodec( contentHash ) -> string
This function takes a content hash as a hex **string** and returns the codec as a hex **string**.
```javascript
const encoded = 'e40101701b20d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

const codec = contentHash.getCodecType(encoded) // 'swarm-ns'
codec === 'ipfs-ns' // false
```

## 👨‍💻 Maintainer
*  pldespaigne : [github](https://github.com/pldespaigne), [twitter](https://twitter.com/pldespaigne)

## 🙌 Contributing
For any questions, discussions, bug report, or whatever I will be happy to answer through the [issues](https://github.com/pldespaigne/content-hash/issues) or on my [twitter](https://twitter.com/pldespaigne) 😁. PR are also welcome !

## 📝 License
This project is licensed under the **ISC License**, you can find it [here](https://github.com/pldespaigne/content-hash/blob/master/LICENSE).
> Note that the dependencies may have a different License


