const {oracleFetch,mysqlFetch} = require('../utils/fetch');
const {rrnQueries} = require('../utils/queries');

const reports = async(req, res) => {
    const {selectedValue,query} = req.body;
    let queries = rrnQueries(selectedValue,query.join("','"));

    if(selectedValue.substring(0, 3) === 'TCS'){
        result =  await mysqlFetch(queries);
    }

    if(selectedValue.substring(0, 3) === 'Int'){
        oracleResult =  await oracleFetch(queries);
        result = oracleResult.map((value) => {
            return {
                'TXN_ID' : value['0'] ,
                'RRN_REQ': value['1'] ,
                'FROM_ACCOUNT': value['2'] ,
                'TXN_SERVICE': value['3'] , 
                'TXN_DATE': value['4'] ,
                'TXN_TIME': value['5'] ,
                'AMOUNT': value['6'] ,
                'BANK_NAME': value['7'] ,
                'ACQ_BANK_ID': value['8'] ,
                'ACQ_ID': value['9'] , 
                'TERMINALID': value['10'] , 
                'LOCATION': value['11'] , 
                'STATUS': value['12'] 
                
            }
        })
    }

    let finalResult =  result.map((value,index)=> {
        return {id:index+1,...value}
    })
    console.log(finalResult);
    res.json({'result':finalResult})
}

module.exports = {reports}
