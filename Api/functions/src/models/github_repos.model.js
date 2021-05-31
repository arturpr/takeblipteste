const axios = require("axios").default;

const apiHost = "https://api.github.com";

module.exports = class Model {

    async findByUserAndLanguage(user, language) {
        const query = encodeURIComponent(`user:${user} language:${language}`);
        const result = await axios.get(`${apiHost}/search/repositories?q=${query}&per_page=500&page=1`);
        return result.data.items;
    }

}