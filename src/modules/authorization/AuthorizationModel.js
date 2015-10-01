module.exports = function(ajax){

    function User(){
        return this;
    }

    User.prototype.checkAndGetUser = function (user) {
        var url = '/db/user/' + user._id;
        console.log('url', url);

        return ajax
            .getPromise(url);
    };

    User.prototype.checkAndPostUser = function (user) {
        var url = '/db/user/';
        return ajax.getPromisePost(url, user);
    };



    //var schema = new mongoose.Schema({
    //    _id: { type: String, lowercase: true, trim: true},
    //    name: { first: String, last: String },
    //    password: { type: String, required: true },
    //    created: { type: Date, default: Date.now }
    //});

    //, salt: { type: String, required: true }
    //, hash: { type: String, required: true }

    return User;

};