const Status = require("./status_types");

module.exports = function (status, data, errorCode, errorMessage, errException) {

    var ret = {
        status: status,
    };

    if (status === Status.SUCCESS) {
        ret["data"] = data;
    }
    else if (status === Status.FAIL) {
        ret["error"] = { errors: data };
    }
    else if (status === Status.ERROR) {
        ret["error"] = {
            code: errorCode,
            message: errorMessage
        };
    }

    return ret;

}