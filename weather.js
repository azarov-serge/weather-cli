#!/usr/bin/env node
import { getArgs } from './helpers/args.helper.mjs';
import { getWeather, getIcon } from './services/api.service.mjs';
import {
	printError,
	printHelp,
	printSuccess,
	printWeather,
} from './services/log.service.mjs';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.mjs';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Token not found');
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token was saved');
	} catch (error) {
		printError(error.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('City not exist');
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City was saved');
	} catch (error) {
		printError(error.message);
	}
};

const getForcast = async () => {
	const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
	try {
		const data = await getWeather(city);

		printWeather(data, getIcon(data.weather[0].icon));
	} catch (error) {
		const { status } = error.response || {};

		switch (status) {
			case 401: {
				printError('Invalid token');
				break;
			}

			case 404: {
				printError('Wrong city');
				break;
			}

			default: {
				printError(error.message);
				break;
			}
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.c) {
		return saveCity(args.c);
	}

	if (args.t) {
		return saveToken(args.t);
	}

	getForcast();
};

initCLI();
