module.exports = {

    subscribers: {
    'search ids': [], // event type: 'search ids'
    'user': []
    },

    subscribe: function (type, fn) {
      type = type || 'search ids';
      if (typeof this.subscribers[type] === 'undefined') {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push(fn);
        console.log('subscribe')
    },

     unsubscribe: function (type, fn) {
     this.visitSubscribers('unsubscribe', type, fn);
     },

    publish: function(type, jsonArrayOfCarObjects){
        console.log('publish')
      this.visitSubscribers('publish', type, jsonArrayOfCarObjects);
    },
    visitSubscribers: function (action, type, arg) {
     var pubtype = type || 'search ids',
         subscribers = this.subscribers[pubtype],
         i,
         max = subscribers.length;
     for (i = 0; i < max; i += 1) {
       if (action === 'publish') {
        subscribers[i](arg);
       } else if (subscribers[i] === arg) {
        subscribers.splice(i, 1);
       }
     }
   }

};