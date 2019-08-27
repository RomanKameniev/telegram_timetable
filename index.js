import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
import Parser from './parser.js';


const STUDENT = 'I am student';
const TEACHER = 'I am teacher';


let P = new Parser();
const TOKEN = config.get('token');

//const DEPARTMENT = 
const BOT = new TelegramBot(TOKEN, {polling: true});

/*BOT.onText(/\/parse/, async (msg, [source, match]) => {
	console.log('parsing => ', msg);
	const {chat:{id}} = msg;
	let t = await P._start_parsing()
	console.log('t => ', t)
	BOT.sendMessage(id, t)
})*/

BOT.onText(/\/parse/, (msg) => {
	try{
		const {chat:{id}, text} = msg;
		BOT.sendMessage(id, 'Are you student or teacher?', {
			reply_markup: {
				keyboard: [[STUDENT], [TEACHER]]
			}
		});
	}catch(e){
		console.log('error=>', e)
	}
});

BOT.on('message', msg => {
	//console.log('in message', msg)
	const {chat:{id}, text} = msg;
	if (text === STUDENT) {
		BOT.sendMessage(id, "select your course",{
			reply_markup: {
				keyboard: [['1'], ['2'],['3'],['4'],['5'],['6']],
			}
		});
	}
	if (text.match(/[0-6]/) || text === TEACHER){
		console.log('matched course', text)
		BOT.sendMessage(id, "select your department", {
			
		});
	}

	if (text.match(/цем/)){
		console.log('котя написала', text)
		BOT.sendMessage(id, "Приветик котик) я тебя люблю))")
	}
	if (text.match(/кусь/)){
		console.log('котя написала кусь', text)
		BOT.sendMessage(id, "кусь-кусь за бочек)")
	}
	if (text.match(/собака/)){
		console.log('котя написала собака', text)
		BOT.sendMessage(id, "ты шо, собака, кусь хош?)))")
	}


}) 

