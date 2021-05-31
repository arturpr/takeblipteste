const service = require("./github_repos.service");

jest.setTimeout(10000);

test('Estão sendo retornados exatamente 5 repositórios', async () => {
    const data = await service.getTop5OlderCSharpRepos({ user: "takenet" });
    expect(data.length).toBe(5);
});


test('Todos os repositórios são da Takenet', async () => {
    const data = await service.getTop5OlderCSharpRepos({ user: "takenet" });
    let repos = 0;
    data.forEach(repo => {
        if (repo.fullName.split("/")[0] !== "takenet"){
            repos += 1;
        }
    });
    expect(repos).toBe(0);
});

test('É lançada exceção quando não é informado o usuário', async () => {
    try {
        await service.getTop5OlderCSharpRepos({ user: "" });
    }
    catch (error) {
        expect(error.message).toMatch("Usuário não informado");
    }
});
