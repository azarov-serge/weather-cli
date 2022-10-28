export const getArgs = (args) => {
	const res = {};
	for (let index = 2; index < args.length; index++) {
		const value = args[index];

		if (value.charAt(0) === '-') {
			if (index === args.length - 1) {
				res[value.substring(1)] = true;
			} else if (args[index + 1].charAt(0) !== '-') {
				res[value.substring(1)] = args[index + 1];
			} else [(res[value.substring(1)] = true)];
		}
	}

	return res;
};
