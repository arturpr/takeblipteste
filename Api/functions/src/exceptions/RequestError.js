module.exports = class RequestError {
    constructor(message, request, response) {
        this.message = message;
        this.request = request;
        this.response = response;
    }
}