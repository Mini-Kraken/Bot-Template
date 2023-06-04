const { WebhookClient } = require("discord.js");

const webhooks = {
    bug: {
        id : 'ID_WEBHOOK',
        token : 'TOKEN_WEBHOOK'
    },
    geral: {
        id : 'ID_WEBHOOK',
        token : 'TOKEN_WEBHOOK'}
}


async function logMessage(channel, message) {
    return await logGeneralMessage(channel, {
        content: message
    });
}


async function logEmbedMessage(channel, embed) {
    return await logGeneralMessage(channel, {
        embeds: [embed]
    });
}


async function logGeneralMessage(channel, message) {
    const webhookInfo = webhooks[channel];

    const webhookClient = new WebhookClient(webhookInfo);
    return await webhookClient.send(message);
}


module.exports = {
    logMessage, 
    logEmbedMessage,
    logGeneralMessage
};