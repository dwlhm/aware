const resultService = require("../services/result.service")

module.exports = (req, res) => {
    
    const result = resultService(res.body)
    res.status(Number(result.status))
    res.json(result)
}