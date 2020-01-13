isAuth = (req, res, next) => {
    if(!req.isAuthenticated())
        return res.status(403).end()

    next()
}

module.exports = isAuth