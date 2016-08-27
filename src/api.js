import request from 'superagent';
import Config from './config';

export default {
	getEvents(year, callback) {
		let path = `${Config.ApiUrl}/events`;
		if (year != null) {
			path += `/years/${year}`;
		}

		const endHandler = (err, res) => {
			if (err || !res.ok) {
				console.error(`getEvents error ${err}`);
			} else if (typeof callback === 'function') {
				const returnObj = JSON.parse(res.text);
				callback(returnObj.payload);
			}
		};

		return () => {
			request
				.get(path)
				/*
				.send({
					name: 'Manny',
					species: 'cat'
				})
				.set('X-API-Key', 'foobar')
				*/
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.end(endHandler);
		};
	},

	getTags(callback) {
		const path = `${Config.ApiUrl}/events/tags`;

		const endHandler = (err, res) => {
			if (err || !res.ok) {
				console.error(`getTags error ${err}`);
			} else if (typeof callback === 'function') {
				const returnObj = JSON.parse(res.text);
				callback(returnObj.payload);
			}
		};
		return () => {
			request
				.get(path)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.end(endHandler);
		};
	},

	getEvent(id, callback) {
		const path = `${Config.ApiUrl}/events/${id}`;

		const endHandler = (err, res) => {
			if (err || !res.ok) {
				console.error(`getEvent error ${err}`);
			} else if (typeof callback === 'function') {
				const returnItem = JSON.parse(res.text);
				callback(returnItem);
			}
		};
		return () => {
			request
				.get(path)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.end(endHandler);
		};
	},

	createEvent(item, callback) {
		const path = `${Config.ApiUrl}/events`;

		const endHandler = (err, res) => {
			if (err || !res.ok) {
				console.error(`createEvent error ${err}`);
			} else if (typeof callback === 'function') {
				const returnItem = JSON.parse(res.text);
				callback(returnItem);
			}
		};
		return () => {
			request
				.post(path)
				.send(item)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.end(endHandler);
		};
	},

	updateEvent(item, callback) {
		const path = `${Config.ApiUrl}/events/${item.id}`;

		const endHandler = (err, res) => {
			if (err || !res.ok) {
				console.error(`updateEvent error ${err}`);
			} else if (typeof callback === 'function') {
				const returnItem = JSON.parse(res.text);
				callback(returnItem);
			}
		};
		return () => {
			request
				.put(path)
				.send(item)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.end(endHandler);
		};
	},

	deleteEvent(id, callback) {
		const path = `${Config.ApiUrl}/events/${id}`;

		const endHandler = (err, res) => {
			if (err || !res.ok) {
				console.error(`deleteEvent error ${err}`);
			} else if (typeof callback === 'function') {
				callback(res);
			}
		};
		return () => {
			request
				.delete(path)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.end(endHandler);
		};
	}
};
