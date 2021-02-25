const queryData = require('./query');

function main(el, service, imEntity, state, config) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}

	let organismID = '';
	let symbol = '';

	const loading = document.createElement('h4');
	loading.innerText = 'Loading...';
	el.appendChild(loading);

	queryData(imEntity.Gene.value, service.root)
		.then(data => {
			el.removeChild(loading);
			if (data.length) organismID = data[0].organism.taxonId;
			symbol = data.reduce(
				(prevVal, currVal, idx) =>
					idx == 0 ? currVal.symbol : prevVal + '|' + currVal.symbol,
				''
			);
			const domain =
				window.location.protocol === 'https:'
					? 'https://esyn.rosalind.kcl.ac.uk'
					: 'http://www.esyn.org';
			const iframeSrc = `${domain}/app.php?embedded=true&query=${symbol}&organism=${organismID}&includeInteractors=false&source=biogrid`;
			const rootDiv = document.createElement('div');
			rootDiv.className = 'rootContainer';
			const iframe = document.createElement('iframe');
			iframe.className = 'seamless';
			iframe.scrolling = 'no';
			iframe.frameBorder = 0;
			iframe.width = '100%';
			iframe.height = '100%';
			iframe.src = iframeSrc;
			rootDiv.appendChild(iframe);
			el.appendChild(rootDiv);
		})
		.catch(() => {
			el.removeChild(loading);
			const error = document.createElement('h4');
			error.innerText = 'Failed to load esyN';
			el.appendChild(error);
		});
}

module.exports = { main };
