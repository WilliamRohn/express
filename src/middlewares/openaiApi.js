const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

module.exports = openai
