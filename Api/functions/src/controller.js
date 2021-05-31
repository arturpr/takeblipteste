const Fail = require("./exceptions/Fail");
const Response = require("./response");
const Status = require("./status_types");

module.exports = (fn, service, options) => {

    return global.functions.https.onRequest(async (req, res) => {
        try {

            const ipAddress = req.get('x-forwarded-for') || req.connection.remoteAddress;

            // Caso a função obrigue autenticação, consulta se o token enviado é válido
            if (options !== undefined && options.preValidator) {
                await options.preValidator(req.body);
            }

            if (typeof fn === "function") {
                fn(req, res);
            }
            else {
                doService(req, res, fn[service]);
            }
        }
        catch (err) {
            if (err instanceof Fail) {
                res.json(Response(Status.FAIL, err.errors));
            }
            else {
                res.json(Response(Status.ERROR, null, 3, err.message, err));
            }
        }
    });
}

async function doService(req, res, fn) {
    try {
        let params = {
            request: req,
            response: res
        };

        for (param in req.body) {
            params[param] = req.body[param];
        }

        let result = await fn(params);
        if ((result !== undefined && Array.isArray(result) && result.length > 0) || (result !== undefined)) {
            res.json(Response(Status.SUCCESS, result));
        }
        else {
            res.json(Response(Status.FAIL, [
                { type: "NOT_FOUND", message: "Nenhum registro encontrado" }
            ]));
        }
    }
    catch (err) {
        if (err instanceof Fail) {
            res.json(Response(Status.FAIL, err.errors));
        }
        else {
            res.json(Response(Status.ERROR, null, 3, err.message, err));
        }

    }
}