const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    superAdminChatId: process.env.SUPER_ADMIN,
    barkTokenAddress: process.env.BARK_TOKEN_ADDRESS,
    token2022ProgramId: process.env.TOKEN_2022_PROGRAM_ID,
    solanaRpcMainnet: process.env.SOLANA_RPC_MAINNET,
    solanaRpcDevnet: process.env.SOLANA_RPC_DEVNET,
    alertThreshold: parseFloat(process.env.ALERT_THRESHOLD) || 0.0001,
    alertInterval: parseInt(process.env.ALERT_INTERVAL, 10) || 300000
};
