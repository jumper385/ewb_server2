import { queryCollection, postCollection } from "../../helpers/dbhelpers"
import { Datapoint } from "../../helpers/schemas"

export const get = async (req,res) => {
    let {query} = req.body;
    res.json({
        payload:await queryCollection(Datapoint, query)
    });
}

export const post = async (req,res) => {
    try {
        let { payload, filename } = req.body;
        let rows = payload
            .split('||')
            .filter(x => x != '')
            .map(x => x.split(',')
            .filter(x => x.length > 1 ))
            .map(x => {
                console.log(x.length);
                return {
                    vehicle_id: x[0],
                    datapoint_id: x[1],
                    timestamp: x[2],
                    timezone: x[3],
                    data_type: x[4],
                    content: x.slice(5).join(','),
                    uploadFileName: filename,
                }
            });

        let collections = postCollection(Datapoint, rows);
        console.log(`Saved Upload from ${filename}`);

        res.json('success');
    } catch (e) {
        console.log(e)
    }
}