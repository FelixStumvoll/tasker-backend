export default paramsArray => (req, res, next) => {
    let body = req.body;
    try {
        paramsArray.forEach(element => {
            if (!body[element]) {
                throw 'Parameter missing';
            }
        });
        
        return next();
    } catch (ex) {
        return next(ex);
    }
};
