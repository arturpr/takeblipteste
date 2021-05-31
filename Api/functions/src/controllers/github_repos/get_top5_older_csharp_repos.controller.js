const controller = require("../../controller");
const service = require(`../../services/github_repos.service`);
const Fail = require("../../exceptions/Fail");

module.exports = controller(service, "getTop5OlderCSharpRepos", {
    preValidator: async (body) => {
        if (body.user === undefined || (body.user !== undefined && body.user === "")) {
            throw new Fail([{
                type: "INVALID_REQUEST",
                message: "É obrigatório informar o nome do usuário proprietário dos repositórios que serão retornados"
            }]);
        }
    }
});