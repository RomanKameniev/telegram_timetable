const request = require('request'),
	http = require('http'),
	url = require('url'),
	iconv  = require('iconv-lite'),
	config = require('config'),
	UserAgent = require('user-agents'),
	html2json = require('html2json').html2json;
require('events').EventEmitter.defaultMaxListeners = 15;


export default class Parser {
	constructor(){
		console.log('you are in parser')
	}

	async _parse(link) {
		console.log('*** start parsing ***\n')
		if(!link) link = config.get('host');

		const userAgent = new UserAgent();
		let options = {
			uri: url.parse(link), 
			port : 80,
			headers : {
				'User-Agent': userAgent.toString(),
				//	'Accept-Charset': "WINDOWS-1251",
				//	'Content-Type': 'application/html; charset=windows-1251',
			},
			encoding: null,
			jar: true
		}
		console.log('options=>', options)	
		// Make a request
		let data = []
		let buffer = await new Promise(resolve => {
			request(options, function(error, response, body) {
				resolve(body)
			});
		})
		var utf8Data = iconv.decode(new Buffer(buffer), "windows-1251");
		console.log('taked data again=>', utf8Data);
		let json = html2json(utf8Data)
	//	let test = JSON.parse(json)
		console.log('json', json)
		return json;
	}

	async _parse_department() {
		console.log('*** parsing departments *** \n')
		let body = await this._parse();
		//console.log('body=>', body)
		//body = body.split(/\<\/.+\>/);
		//console.log('new body =>', body)
		/*let department = body.filter( i => i.match(/(valign="bottom")/))
		//console.log('code of \n', ">".charCodeAt(0))
		//department.map( i =>)
		console.log('department', department)
		console.log("after", this._get_rus(department))
		//		return req;
*/
	}

	_get_rus(data){
		return data.map(d => d.split("").filter( i =>{
			console.log('i chatcode', i.charCodeAt(0));
			return i.charCodeAt(0) >= 1140 && i.charCodeAt(0)<= 1111 }
		).join(""))
	}

}
let P = new Parser();
P._parse_department()

//_start_parsing()
