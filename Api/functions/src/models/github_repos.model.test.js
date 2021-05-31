const Model = require("./github_repos.model");

const model = new Model();

jest.setTimeout(10000);

test('Estão sendo retornados repositórios', async () => {
    const data = await model.findByUserAndLanguage("takenet", "C#");
    expect(data.length).toBeGreaterThan(0);
});

test('Não existem repositórios de usuários diferentes de takenet', async () => {
    const data = await model.findByUserAndLanguage("takenet", "C#");
    let reposNotTake = 0;
    data.forEach(repo => {
        if (repo.owner.login !== "takenet") {
            reposNotTake += 1;
        }
    });
    expect(reposNotTake).toBe(0);
});

test('Não existem repositórios de linguagens diferentes de C#', async () => {
    const data = await model.findByUserAndLanguage("takenet", "C#");
    let reposNotCSharp = 0;
    data.forEach(repo => {
        if (repo.language !== "C#") {
            reposNotCSharp += 1;
        }
    });
    expect(reposNotCSharp).toBe(0);
});

