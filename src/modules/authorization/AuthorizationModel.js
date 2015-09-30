module.exports = function(mongoose){

    var schema = new mongoose.Schema({
        _id: { type: String, lowercase: true, trim: true},
        name: { first: String, last: String },
        password: { type: String, required: true },
        created: { type: Date, default: Date.now }
    });

    //, salt: { type: String, required: true }
    //, hash: { type: String, required: true }

    return schema

};