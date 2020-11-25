import * as shortid from 'shortid';
import { postCollection } from '../../../helpers/dbhelpers';
import { Vehicle } from '../../../helpers/schemas';

export const get = async (req,res) => {
    let new_vehicle_id = shortid.generate();

    let vehicleDocument = await postCollection(Vehicle, {
        vehicle_id: new_vehicle_id
    });

    return vehicleDocument;
}