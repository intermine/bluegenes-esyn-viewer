const query = geneIds => ({
	from: 'Gene',
	select: ['symbol', 'organism.taxonId'],
	where: [
		{
			path: 'Gene.id',
			op: 'ONE OF',
			values: geneIds
		}
	]
});

function queryData(geneIds, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(query(geneIds))
			.then(data => {
				if (data.length) resolve(data);
				else reject('No data found!');
			})
			.catch(reject);
	});
}

module.exports = queryData;
