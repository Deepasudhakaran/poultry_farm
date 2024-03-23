const AdminModel = require('../models/Admin');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header.authorization;
        console.log('received auth token:', authHeader);

        const authToken = authHeader.replace(/^Bearer\s+/i, '');
        console.log('Received auth token : ', authToken);

        if (!authToken)
            return res.status(401).json({
                message: 'No auth Token',
            });

        const decoded = jwt.verify(authToken, process.env.Admin_SECRET_KEY);
        console.log("Decoded", decoded);

        const admin = await AdminModel.findOne({ _id: decoded.id });
        console.log("Admin", admin);

        if (!admin) {
            return res.status(401).json({
                message: "Unauthorized token"
            });
        }
        req.admin = admin;
        next();
    } catch (error) {
        return res.json({
            message: "Unauthorized acess",
        });
    }
};