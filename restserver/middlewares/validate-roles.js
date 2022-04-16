const isAdminRole = (req, res, next) => {

    if(!req.user)
        return res.status(500).json({
            mgs: "can't validate role without token"
        })

    const { role, name } = req.user

    if(role !== 'ADMIN_ROLE')
        return res.status(401).json({
            mgs: `${name} is not an administrator`
        })

    next()
}

const hasRole = ( ...roles ) => {

    return (req, res, next) => {

        if(!req.user)
            return res.status(500).json({
                mgs: "can't validate role without token"
            })
        
        if( !roles.includes( req.user.role ) )
            return res.status(401).json({
                mgs: `The service requires one of these roles ${roles}`
            })

        next()
    }

}

module.exports = {
    isAdminRole,
    hasRole
}