#!/usr/bin/env node
import { getArgs } from './helpers/args.helper.mjs';
import { getWeather } from './services/api.service.mjs';
import {
	printError,
	printHelp,
	printSuccess,
} from './services/log.service.mjs';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.mjs';

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

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.t) {
		return saveToken(args.t);
	}

	getWeather('Moscow');
};

initCLI();
