module.exports = class Fail {
    constructor(err) {
        this.err = err;
    }

    get errors() {
        return this.err;
    }

    set errors(err) {
        this.err = err;
    }

}