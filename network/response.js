exports.success = (req, res, data, status) => {
    res.status(status || 200).send({
            error: '',
            data: data
    })
        
}

exports.error = (req, res, data, status, details) => {
    res.status(status || 500).send({
            error: data,
            data: ''
    })
        
}
