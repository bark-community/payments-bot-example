const axios = require('axios');
const config = require('./config');
const logger = require('./logger');

async function fetchBarkTokenPrice() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bark-token', // Replace with the actual ID of the BARK Token on CoinGecko
                vs_currencies: 'usd'
            }
        });
        const price = response.data['bark-token'].usd;
        return price;
    } catch (error) {
        logger.error('Error fetching BARK Token price:', error);
        return null;
    }
}

function handleStartCommand(bot, chatId) {
    bot.sendMessage(chatId, 'Welcome to BARK Token PingBot! Type /help to see available commands.');
}

function handleHelpCommand(bot, chatId) {
    const helpMessage = `
Available commands:
- /setpricealert [PRICE] - Set price alert for BARK Token
- /setvolumealert [VOLUME] - Set volume alert for BARK Token
- /deletealert - Delete all alerts
- /help - Show this help message`;
    bot.sendMessage(chatId, helpMessage);
}

function handleSetPriceAlertCommand(bot, chatId, price) {
    // Implement your logic to save the price alert
    bot.sendMessage(chatId, `Price alert set for BARK Token at ${price}`);
}

function handleSetVolumeAlertCommand(bot, chatId, volume) {
    // Implement your logic to save the volume alert
    bot.sendMessage(chatId, `Volume alert set for BARK Token at ${volume}`);
}

function handleDeleteAlertCommand(bot, chatId) {
    // Implement your logic to delete the alerts
    bot.sendMessage(chatId, 'All alerts for BARK Token deleted');
}

module.exports = {
    fetchBarkTokenPrice,
    handleStartCommand,
    handleHelpCommand,
    handleSetPriceAlertCommand,
    handleSetVolumeAlertCommand,
    handleDeleteAlertCommand
};
