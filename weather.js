#!/usr/bin/env node
import { getArgs } from './helpers/args.helper.mjs';
import {
	printError,
	printHelp,
	printSuccess,
} from './services/log.service.mjs';
import { saveKeyValue } from './services/storage.service.mjs';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан токен');
	}
	try {
		await saveKeyValue('token', token);
		printSuccess('Токен сохранен');
	} catch (error) {
		printError(error.message);
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		printHelp();
	}

	if (args.t) {
		saveToken(args.t);
	}

	console.log(args);
};

initCLI();
