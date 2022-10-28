import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (error) => {
	console.log(`${chalk.bgRed('ERROR')} ${error}`);
};

export const printSuccess = (message) => {
	console.log(`${chalk.bgGreen('SUCCESS')} ${message}`);
};

export const printHelp = () => {
	console.log(
		dedent`
            ${chalk.bgCyan('HELP')}
            No parameters - weather output
            -s [CITY]       Set the city
            -h              Show this message
            -t [API_KEY]    Save tocken
    `);
};

export const printWeather = (res, icon) => {
    console.log(
		dedent`
            ${icon}  ${res.weather[0].description}
            City: ${res.name}
            Temp: ${res.main.temp}°
            Feels like: ${res.main.feels_like}°
            Humidity: ${res.main.humidity}%
            Wind speed: ${res.wind.speed}m/s
    `); 
}