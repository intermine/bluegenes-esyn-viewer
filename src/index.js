// add any imports if needed, or write your script directly in this file.
// const SomePackage = require('PackageName');

// make sure to export main, with the signature
function main(el, service, imEntity, state, config) {
	if (!state) state = {};
	if (!el || !service || !imEntity || !state || !config) {
		throw new Error('Call main with correct signature');
	}
	// sample code here to convert the provided intermine object (e.g. perhaps
	// an id) into an identifier the tool expects. e.g.:
	// of course if your tool was built for intermine it might understand
	// intermine ids already, but many others tools expect a gene symbol or
	// protein accession, etc...
	/**
   * Example - you can delete this and replace with your own code *******

    // protVista expects an accession, so convert intermine id to accession

    var entity = imEntity.Protein;

    var columnToConvert = config.columnMapping[entity.class][entity.format];
    var accession = new imjs.Service(service)
        .findById(entity.class, entity.value)
        .then(function(response) {
        //put some code here to initialise your tool.
    });

  */
	var graphType = 'Graph';
	var iframeSrc =
		'http://www.esyn.org/app.php?embedded=true&publishedid=249&type=';
	var rootDiv = document.createElement('div');
	rootDiv.className = 'rootContainer';

	var iframe = document.createElement('iframe');
	iframe.id = 'frame';
	iframe.className = 'seamless';
	iframe.scrolling = 'no';
	iframe.style.width = '100%';
	iframe.style.height = '97%';
	iframe.src = iframeSrc + graphType;
	rootDiv.appendChild(iframe);

	document.getElementById('yourDiv').appendChild(rootDiv);
}

module.exports = { main };
