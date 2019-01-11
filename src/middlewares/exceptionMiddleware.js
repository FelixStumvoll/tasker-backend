export default (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status ? err.status : 500).send(
        err.message ? err.message : 'Internal Server Error'
    );
};
