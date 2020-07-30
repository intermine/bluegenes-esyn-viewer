const queryData = require('./query');

function main(el, service, imEntity, state, config) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}

	let organismID = '',
		symbol = '';
	queryData(imEntity.Gene.value, service.root)
		.then(data => {
			if (data.length) organismID = data[0].organism.taxonId;
			symbol = data.reduce(
				(prevVal, currVal, idx) =>
					idx == 0 ? currVal.symbol : prevVal + '|' + currVal.symbol,
				''
			);
		})
		.then(() => {
			let graphType = 'Graph';
			const iframeSrc = `http://www.esyn.org/app.php?embedded=true&query=${symbol}&organism=${organismID}&includeInteractors=false&source=biogrid&type=`;
			const rootDiv = document.createElement('div');
			rootDiv.className = 'rootContainer';

			const iframe = document.createElement('iframe');
			iframe.id = 'frame';
			iframe.className = 'seamless';
			iframe.scrolling = 'no';
			iframe.style.width = '100%';
			iframe.style.height = '97%';
			iframe.src = iframeSrc + graphType;
			rootDiv.appendChild(iframe);

			const button = document.createElement('button');
			button.innerHTML = 'Change Graph Type';

			rootDiv.appendChild(button);

			button.addEventListener('click', function() {
				graphType = graphType == 'Graph' ? 'PetriNet' : 'Graph';
				document.getElementById('frame').src = iframeSrc + graphType;
			});
			document.getElementById('yourDiv').appendChild(rootDiv);
		})
		.catch(() => {
			const rootDiv = document.createElement('h1');
			rootDiv.className = 'rootContainer';
			rootDiv.innerText = 'Something went wrong!';
			document.getElementById('yourDiv').appendChild(rootDiv);
		});
}

module.exports = { main };
