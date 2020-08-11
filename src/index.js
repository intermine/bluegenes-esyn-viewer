const queryData = require('./query');

function main(el, service, imEntity, state, config) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}

	let organismID = '',
		symbol = '';
	const loading = document.createElement('h1');
	loading.className = 'rootContainer';
	loading.innerText = 'Loading...';
	document.getElementById('yourDiv').appendChild(loading);
	queryData(imEntity.Gene.value, service.root)
		.then(data => {
			const main = document.getElementById('yourDiv');
			main.removeChild(loading);
			if (data.length) organismID = data[0].organism.taxonId;
			symbol = data.reduce(
				(prevVal, currVal, idx) =>
					idx == 0 ? currVal.symbol : prevVal + '|' + currVal.symbol,
				''
			);
		})
		.then(() => {
			const iframeSrc = `http://www.esyn.org/app.php?embedded=true&query=${symbol}&organism=${organismID}&includeInteractors=false&source=biogrid`;
			const rootDiv = document.createElement('div');
			rootDiv.className = 'rootContainer';
			const title = document.createElement('h2');
			title.style.textAlign = 'center';
			title.innerText = 'ESYN VIEWER';
			rootDiv.appendChild(title);
			const iframe = document.createElement('iframe');
			iframe.id = 'frame';
			iframe.className = 'seamless';
			iframe.scrolling = 'no';
			iframe.style.width = '100%';
			iframe.style.height = '92%';
			iframe.src = iframeSrc;
			rootDiv.appendChild(iframe);
			document.getElementById('yourDiv').appendChild(rootDiv);
		})
		.catch(() => {
			const main = document.getElementById('yourDiv');
			main.removeChild(loading);
			const rootDiv = document.createElement('h1');
			rootDiv.className = 'rootContainer';
			rootDiv.innerText = 'Something went wrong!';
			document.getElementById('yourDiv').appendChild(rootDiv);
		});
}

module.exports = { main };
