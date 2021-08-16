module.exports = (data) => {

    let result = { status: 404 }

    if (data) {
        result.status = data.status
        result.body = data.data
    }

    switch (result.status) {
        case 200:
            result.message = 'OK'
            break;

        case 201:
            result.message = 'Created'
            break
        
        case 400:
            result.message = 'Bad Request'
            break

        case 500:
            result.message = 'Internal Server Error'
            break
    
        default:
            result.message = 'Not Found'
            break;
    }

    return {
                status: result.status, 
                message: result.message, 
                data: result.body || undefined 
            }

}