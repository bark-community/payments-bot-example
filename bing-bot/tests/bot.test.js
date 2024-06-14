const {
    fetchBarkTokenPrice,
    handleStartCommand,
    handleHelpCommand,
    handleSetPriceAlertCommand,
    handleSetVolumeAlertCommand,
    handleDeleteAlertCommand
} = require('../commands');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const logger = require('../logger');

jest.mock('node-telegram-bot-api');
jest.mock('axios');
jest.mock('../logger');

describe('Telegram Bot Handlers', () => {
    let bot;
    const chatId = 12345;

    beforeEach(() => {
        bot = new TelegramBot();
        bot.sendMessage = jest.fn();
    });

    test('handleStartCommand should send welcome message', () => {
        handleStartCommand(bot, chatId);
        expect(bot.sendMessage).toHaveBeenCalledWith(chatId, 'Welcome to BARK Token PingBot! Type /help to see available commands.');
    });

    test('handleHelpCommand should send help message', () => {
        handleHelpCommand(bot, chatId);
        const helpMessage = `
Available commands:
- /setpricealert [PRICE] - Set price alert for BARK Token
- /setvolumealert [VOLUME] - Set volume alert for BARK Token
- /deletealert - Delete all alerts
- /help - Show this help message`;
        expect(bot.sendMessage).toHaveBeenCalledWith(chatId, helpMessage);
    });

    test('handleSetPriceAlertCommand should send price alert confirmation', () => {
        handleSetPriceAlertCommand(bot, chatId, '0.0005');
        expect(bot.sendMessage).toHaveBeenCalledWith(chatId, 'Price alert set for BARK Token at 0.0005');
    });

    test('handleSetVolumeAlertCommand should send volume alert confirmation', () => {
        handleSetVolumeAlertCommand(bot, chatId, '1000');
        expect(bot.sendMessage).toHaveBeenCalledWith(chatId, 'Volume alert set for BARK Token at 1000');
    });

    test('handleDeleteAlertCommand should send delete alert confirmation', () => {
        handleDeleteAlertCommand(bot, chatId);
        expect(bot.sendMessage).toHaveBeenCalledWith(chatId, 'All alerts for BARK Token deleted');
    });

    test('fetchBarkTokenPrice should fetch the token price', async () => {
        axios.get.mockResolvedValue({ data: { 'bark-token': { usd: 0.0002 } } });
        const price = await fetchBarkTokenPrice();
        expect(price).toBe(0.0002);
    });

    test('fetchBarkTokenPrice should log error on failure', async () => {
        axios.get.mockRejectedValue(new Error('Test error'));
        const price = await fetchBarkTokenPrice();
        expect(price).toBeNull();
        expect(logger.error).toHaveBeenCalledWith('Error fetching BARK Token price:', expect.any(Error));
    });
});
