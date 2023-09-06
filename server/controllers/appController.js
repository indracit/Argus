const fetch = require('../utils/fetch')
const  { insight_queries,report_queries } = require("../queries/queries");

const insights = async(req, res) => {
    res.json(await fetch(insight_queries[req.body.query]));
}

const reports = async(req, res) => {
    res.json(await fetch(report_queries[req.body.query]));
}


module.exports = {insights,reports}


