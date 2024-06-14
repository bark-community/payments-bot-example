const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const { fetchBarkTokenPrice, handleStartCommand, handleHelpCommand, handleSetPriceAlertCommand, handleSetVolumeAlertCommand, handleDeleteAlertCommand } = require('./commands');
const logger = require('./logger');

const bot = new TelegramBot(config.telegramBotToken, { polling: true });

bot.onText(/\/start/, (msg) => handleStartCommand(bot, msg.chat.id));
bot.onText(/\/help/, (msg) => handleHelpCommand(bot, msg.chat.id));
bot.onText(/\/setpricealert (.+)/, (msg, match) => handleSetPriceAlertCommand(bot, msg.chat.id, match[1]));
bot.onText(/\/setvolumealert (.+)/, (msg, match) => handleSetVolumeAlertCommand(bot, msg.chat.id, match[1]));
bot.onText(/\/deletealert/, (msg) => handleDeleteAlertCommand(bot, msg.chat.id));

async function sendAlerts() {
    try {
        const price = await fetchBarkTokenPrice();
        if (price !== null && price >= config.alertThreshold) {
            bot.sendMessage(config.superAdminChatId, `Alert: BARK Token price is now ${price}`);
        }
    } catch (error) {
        logger.error('Error in sendAlerts:', error);
    }
}

setInterval(sendAlerts, config.alertInterval);

logger.info('BARK Token PingBot is running...');

module.exports = bot;
