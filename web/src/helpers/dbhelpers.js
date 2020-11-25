import * as mongoose from 'mongoose';

const { NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

mongoose.connect(`mongodb://${process.env.MONGODB}/test`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if(err){
		throw err;
	} else {
		console.log('successful db connection');
	}
});

// DATABASE INTERFACE FUNCIONS
export const queryCollection = async (schema, query) => {
	// Queries the schema and finds the data
	return await schema.find(query);
};

export const postCollection = async (schema, body) => {
	// posts a new document
	if(body.length == undefined) return await schema.create(body);
	if(body.length > 1) return await schema.insertMany(body);
};

export const deleteCollection = async (schema, query) => {
	// finds and deletes based on a query
	return await schema.find(query).remove();
};

export const editCollection = async (schema, query, delta) => {
	// finds and edits based on a query
	return await schema.find(query).updateMany({
		$set: {
			...delta
		}
	});
};