
const express = require('express')
const router = express.Router();
const { allEmployees, getTodayCheckins, getAttendance, getAttendanceSummary } = require('../controllers/AdminController')
const authorizeRoles = require('../Middleware/RoleMiddleWare')
const verifyToken = require('../Middleware/VerifyAccessToken');

router.get(
    '/all-employees',
    verifyToken,
    authorizeRoles('admin'),
    allEmployees
)

router.get(
    '/today-checkins',
    verifyToken,
    authorizeRoles('admin'),
    getTodayCheckins
)

router.get(
    '/attendance',
    verifyToken,
    authorizeRoles('admin'),
    getAttendance
)

router.get(
    '/attendance-summary',
    verifyToken,
    authorizeRoles('admin'),
    getAttendanceSummary
)

module.exports = router