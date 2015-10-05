module.exports = function(ajax){

    function User(){
        return this;
    }

    User.prototype.getUser = function (user) {
        var url = '/db/user/check_user/';
        return ajax.getPromisePost(url, user);
    };

    User.prototype.postUser = function (user) {
        var url = '/db/user/';
        return ajax.getPromisePost(url, user);
    };

    User.prototype.logout = function(user){
        var url = '/db/user/logout/';
        return ajax.getPromisePost(url, user);
    };

    User.prototype.checkSession = function(){
        var url = '/db/session/check_user';
        return ajax.getPromise(url);
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