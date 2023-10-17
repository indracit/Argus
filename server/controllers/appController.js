const {oracleFetch,mysqlFetch} = require('../utils/fetch');


const reports = async(req, res) => {
    let query = 'SELECT 1 + 1 AS "solution" from dual';
    let oracleresult = await oracleFetch(query);
    let mysqlresult =  await mysqlFetch(query);
    res.json({'mysqlresult':mysqlresult,'oracleresult':oracleresult})
}



module.exports = {reports}


