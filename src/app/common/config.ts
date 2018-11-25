export class Environment {

	static getUrl() {
		let environment = 'production';
		let baseUrl     = '';

		if (environment == 'production'){
			baseUrl = 'http://ricardowebdev.net/api/';
		} else  {
			baseUrl = 'localhost:3000/api/';
		}
		return baseUrl;
	}
}

