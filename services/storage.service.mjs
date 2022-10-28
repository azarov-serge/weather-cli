import { homedir } from 'os';
import { join, basename } from 'path';
import { promises, writeFile } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (error) {
		return false;
	}
};

export const saveKeyValue = async (key, value) => {
	let data = {};

	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);

		data = JSON.parse(file);
	}

	data[key] = value;

	await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyvalue = async (key) => {
    if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);

		return JSON.parse(file);
	}

    return undefined;
}