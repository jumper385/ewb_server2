import * as mongoose from 'mongoose';

export const Datapoint = mongoose.model('datapoint', {
    'vehicle_id': {type: String, required: true},
    'datapoint_id': {type: String, required: true},
    'timestamp': {type: Date, required: true},
    'data_type': {type: String, required: true},
    'content': {type: String, requried: true},
    'timezone':{type: String, required: true},
    'filename':{type: String}
})

export const Vehicle = mongoose.model('vehicle', {
    'vehicle_id': {type: String, required: true}, 
    'dateCreated':{type: Date, required: true, default: new Date()}
})