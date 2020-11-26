import * as shortid from 'shortid';
import { postCollection, queryCollection } from '../../../helpers/dbhelpers';
import { Vehicle } from '../../../helpers/schemas';

export const get = async (req,res) => {
	let new_vehicle_id = shortid.generate();

	let vehicleDocument = await postCollection(Vehicle, {
		vehicle_id: new_vehicle_id
	});

	console.log(vehicleDocument);
	res.json(vehicleDocument);
}

export const post  = async (req,res) => {
	let { vehicle_id } = req.body;
	let vehicle = await queryCollection(Vehicle, {vehicle_id:vehicle_id})
	console.log(vehicle.length);
	// return a new vehicle id if the query fails (i.e.length == 0)
	if (vehicle.length == 0) {
		let new_vehicle_id = shortid.generate();
		let new_vehicle = await postCollection(Vehicle, {
			vehicle_id: new_vehicle_id
		});
		res.json({
			success: vehicle.length != 0,
			payload: new_vehicle
		})
	} else {
		res.json({
			success: vehicle.length != 0,
			payload: vehicle[0],
		})
	}


}
