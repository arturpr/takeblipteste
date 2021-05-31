const glob = require("glob");

global.admin = require("firebase-admin");
global.firebase = require("firebase");
global.functions = require("firebase-functions");
global.settings = require("./config/settings");

/**
 * Inicia o Firebase
 */
var serviceAccount = require(`./key/${global.settings.project}-key.json`);
global.admin.initializeApp({
    credential: global.admin.credential.cert(serviceAccount),
    databaseURL: `https://${global.settings.project}.firebaseio.com`
});

const firebaseConfig = require(`./key/${global.settings.project}-firebase-config.json`);
global.firebase.initializeApp(firebaseConfig);

/**
 * Função de escaneamento dos arquivos para criar as Cloud Functions
 */
function loadFunctions(path, sufix) {
    const searchPattern = path + `/**/*.${sufix}.*`;

    const files = glob.sync(searchPattern, { cwd: __dirname, ignore: "./node_modules/**" });
    files.forEach(file => {
        //Define o nome da função considerando a pasta a partir da pasta indicada em 'path'
        const functionName = file.slice(0, (sufix.length + 4) * -1).slice(path.length + 1, file.length).replace(/[/]/gi, "__")
        exports[functionName] = require(file);
    });
}

loadFunctions("./src/controllers", "controller");
