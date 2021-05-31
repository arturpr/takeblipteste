var path = require("path");
var GitHubReposModel = require("../models/github_repos.model");
var moment = require("moment");

const model = new GitHubReposModel();

exports.getTop5OlderCSharpRepos = async function ({ user }) {
    if (user === undefined || (user !== undefined && user === "")){
        throw new Error("Usuário não informado");
    }

    const LIMIT_RESULT = 5;

    let repos = await model.findByUserAndLanguage(user, "C#");

    repos = repos
        // Mantém apenas os atributos necessários para o tratamento dos dados
        .map(repo => {
            return {
                "id": repo.id,
                "full_name": repo.full_name,
                "description": repo.description,
                "owner_avatar_url": repo.owner.avatar_url,
                "language": repo.language,
                "created_at": repo.created_at,
                "created_at_time": moment(repo.created_at).toDate().getTime()
            }
        })

        //Ordena o resultado pela data de criação, da menor data para a maior
        .sort((a, b) => {
            return a.created_at_time >= b.created_at_time ? 1 : -1
        })

        //Limita o retorno para no máximo 5 repositórios
        .slice(0, repos.length > LIMIT_RESULT ? LIMIT_RESULT : repos.length)

        //Retorna apenas os atributos necessários e altera o padrão de nomenclatura para o padrão desta API
        .map(repo => {
            return {
                "id": repo.id,
                "fullName": repo.full_name,
                "description": repo.description,
                "ownerAvatarURL": repo.owner_avatar_url,
                "createdAt": repo.created_at,
            }
        });

    return repos;
}