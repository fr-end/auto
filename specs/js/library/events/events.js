module.exports = (function(){
  /*
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      if(!hOP.call(topics, topic)) {
        topics[topic] = [];
      }

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) {
        return;
      }

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
      		item(info !== undefined ? info : {});
      });
    }
  };
  */

    /*
  return {

    subscribers: {
    'search ids': [] // event type: 'search ids'
    },

    subscribe: function (type, fn) {
      type = type || 'search ids';
      if (typeof this.subscribers[type] === "undefined") {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push(fn);
    },

     unsubscribe: function (type, fn) {
     this.visitSubscribers('unsubscribe', type, fn);
     },

    publish: function(type, jsonArrayOfCarObjects){
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

  }
*/
})();