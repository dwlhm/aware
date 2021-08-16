module.exports = (req, res, next) => {
    
    let result = ""
    result += new Date().toISOString()
    result += `: Incoming ${req.method} `
    result += `request on ${req.url}`

    console.log(result)

    next()
}