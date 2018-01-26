
const fetch = require('node-fetch');

console.log(check("https://ingsoft2-deblasiis-180024.herokuapp.com/count",{prova: "provatext"},{count: 5},200));

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    var parametri = Object.keys(invocationParameters);
    var urlQuery = "?";
    for (var i = 0; i < parametri.length; i++) {
        urlQuery += parametri[i] + "=" + invocationParameters[parametri[i]];
        if(i < (parametri.length - 1)) {
            urlQuery += "&"
        }
    }

    return urlConnection(url, urlQuery, expectedResultData, expectedResultStatus);

}

function urlConnection(url, params, expData, expStatus) {

    var checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    };

    return fetch(url + params)
        .then(function(response) {
            var statusCheck = false;
            if(response.status == expStatus) {
                statusCheck = true;
            }
            checkResult.resultStatus = response.status;
            checkResult.statusTestPassed = statusCheck;

            return response.json();
        })
        .then(function(body) {
            var dataCheck = false;
            if(body == expData) {
                dataCheck = true;
            }
            checkResult.resultData = body;
            checkResult.resultDataAsExpected = dataCheck;

            //console.log(checkResult);
            return checkResult;
        });
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check;