
window.onload = () => {
	console.log('contentHash ✅')

	const ipfsInputElem = document.getElementById('ipfs-input')
	const ipfsButtonElem = document.getElementById('ipfs-encode')
	const ipfsResultElem = document.getElementById('ipfs-result')
	ipfsButtonElem.addEventListener('click', () => {
		ipfsResultElem.innerHTML = contentHash.fromIpfs(ipfsInputElem.value)
	})

	const swarmInputElem = document.getElementById('swarm-input')
	const swarmButtonElem = document.getElementById('swarm-encode')
	const swarmResultElem = document.getElementById('swarm-result')
	swarmButtonElem.addEventListener('click', () => {
		swarmResultElem.innerHTML = contentHash.fromSwarm(swarmInputElem.value)
	})

	const contentInputElem = document.getElementById('content-input')
	const contentButtonElem = document.getElementById('content-decode')
	const contentResultElem = document.getElementById('content-result')
	const codecResultElem = document.getElementById('codec-result')
	contentButtonElem.addEventListener('click', () => {
		let cth = contentHash.decode(contentInputElem.value)
		
		let codec = contentHash.getCodec(contentInputElem.value)
		let displayed = codec + ' (utf-8)'

		if(codec === 'ipfs-ns')displayed = 'ipfs'
		else if(codec === 'swarm-ns')displayed = 'swarm'

		if(codec === 'ipfs-ns') url = 'https://gateway.ipfs.io/ipfs/' + cth + '/'
		else if(codec === 'swarm-ns') url = 'https://swarm-gateways.net/bzz:/' + cth + '/'
		else if(codec === 'onion') url = 'http://' + cth + '.onion/'
		else if(codec === 'onion3') url = 'http://' + cth + '.onion/'
		else if(codec === 'zeronet') url = 'http://127.0.0.1:43110/' + cth + '/'
		else url = '#'

		codecResultElem.innerHTML = 'codec : ' + displayed
		contentResultElem.innerHTML = cth
		contentResultElem.href = url
	})
}