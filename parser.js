const http = require('http'),
	  https = require('https'),
	  request = require('request'),
	  url = require('url'),
	  config = require('config'),
	  UserAgent = require('user-agents');
	  require('events').EventEmitter.defaultMaxListeners = 15;


export default class Parser {
	constructor(){
		console.log('you are in parser')
	}

	async _parse(link) {
		console.log('*** start parsing ***\n')
		if(!link) link = config.get('host');
		
		const userAgent = new UserAgent();
		let options = url.parse(link)
			options.uri = link 
			options.headers = {'User-Agent': userAgent.toString()} 
		
		// Make a request
		const req = await new Promise((resolve, reject) => {
			request.get(options,{jar:true}, (err, res, body) => {
				resolve(body)
			});
		})
		return req;
	}

	async _parse_department() {
		console.log('*** parsing departments *** \n')
		let body = await this._parse();
		console.log('body=>', body)
		body = body.split(/\<\/.+\>/);
		console.log('new body =>', body)
//		return req;
		
	
	}
}
let P = new Parser();
P._parse_department()

//_start_parsing()
