import axios from 'axios';
// import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.mjs';

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

export const getWeather = async (city) => {
	const token =
		process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
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
