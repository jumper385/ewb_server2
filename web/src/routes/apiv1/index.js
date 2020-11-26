import { queryCollection, postCollection } from "../../helpers/dbhelpers"
import { Datapoint } from "../../helpers/schemas"
import * as chalk from 'chalk';

export const get = async (req, res) => {
	let { query } = req.params;
	res.json({
		payload: await queryCollection(Datapoint, query)
	});
}

export const post = async (req, res) => {
	try {
		let { payload, filename } = req.body;
		let rows = payload
			.split('||')
			.filter(x => x != undefined && x != '')
			.map(x => x.split(','))
			.filter(x => {
				return x[2] != undefined && x[3] != undefined && x[4] != undefined
			})
			.map(x => {
				return {
					vehicle_id: x[0],
					datapoint_id: x[1],
					timestamp: x[2],
					timezone: x[3],
					data_type: x[4],
					content: x.slice(5).join(','),
					uploadFileName: filename,
				}
			})
		console.log(`${chalk.bgYellow.underline(filename)} upload by ${chalk.bgCyan(rows[0].vehicle_id)}`);

		if (rows.length > 0) {
			let collections = await postCollection(Datapoint, rows);
			collections && console.log(`${chalk.bgGreen.underline('Saved')} Upload from ${chalk.bgGreen.underline(filename)} at ${(new Date()).toLocaleTimeString()}`);
		}
		res.json('success');
	} catch (e) {
		console.log(e)
	}
}
