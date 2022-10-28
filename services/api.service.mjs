import axios from 'axios';
// import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.mjs';

export const getWeather = async (city) => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Token not found');
	}

	const { data } = await axios.get(
		'https://api.openweathermap.org/data/2.5/weather',
		{
			params: {
				q: city,
				units: 'metric',
				appid: token,
			},
		}
	);

	return data;

};

//#region example with https
// import https from 'https';
// import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.mjs';

// export const getWeather = async (city) => {
// 	const token = await getKeyValue(TOKEN_DICTIONARY.token);
// 	if (!token) {
// 		throw new Error('Token not found');
// 	}

// 	const url = new URL('https://api.openweathermap.org/data/2.5/weather');
// 	url.searchParams.append('q', city);
// 	url.searchParams.append('units', 'metric');
// 	url.searchParams.append('appid', token);

// 	https.get(url, (response) => {
// 		let res = '';

// 		response.on('data', (chunk) => {
// 			res += chunk;
// 		});

// 	    response.on('end', (chunk) => {
// 			console.log(res);
// 		});
// 	});
// };
//#enregion