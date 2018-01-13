let request = require('request');
let api_token;
let base_url = 'https://api.paradox.ai/api/v1/public';

var actions = {
	auth: { endpoint: '/auth', method: 'POST' },
	get_conversations: { endpoint: '/company/conversations', method: 'GET' },
	get_locations: { endpoint: '/company/locations', method: 'GET' },
	create_candidate: { endpoint: '/candidates', method: 'POST' },
	get_candidates: { endpoint: '/candidates', method: 'GET' }
}

function make_request(action, data, callback) {
	let method = actions[action].method;
	let options;
	if (method == 'POST' || method == 'PUT') {
		options = { 
	        method: actions[action].method,
	        url: base_url + actions[action].endpoint,
	        json: true,
	        body: data
    	};
	} else if (method == 'GET') {
		options = { 
	        method: actions[action].method,
	        headers: { "authorization" : "token " + api_token},
	        url: base_url + actions[action].endpoint,
	        qs: data
    	};
	}
	else return callback(new Error("Currently api supports only GET, POST & PUT"));
	// console.log(options);
    request(options, callback);
}
module.exports = { 
    
    get_candidates: function(data, callback) {
    	var def = {
    		status: 1,
    		source: 1
    	};

    	if (!api_token) {
    		return callback(new Error("Token not set"));
    	}
    	let qs = Object.assign(def, data);
    	make_request('get_candidates', qs, function(err, resp, body) {
    		callback(err, body);
    	})

    },

   	getToken: function(keys, callback) {
   		let account_id = keys['account_id'];
   		let secret_key = keys['secret_key'];
   		let data = {
   			account_id: account_id,
   			secret_key: secret_key
   		}
   		make_request('auth', keys, function(err, resp, body) {
   			callback(err, body['token']);
   		})

   	},

    setToken: function(token) {
    	console.log("completed");
        api_token=token;
    }

};


