
const express = require('express')
const router = express.Router();
const { getAttendenceById, getFullLogs, getOtHours, allEmployees, updateWeeklyHours, getTodayCheckins, getAttendance, getAttendanceSummary, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/AdminController')
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

router.post(
    '/employees',
    verifyToken,
    authorizeRoles('admin'),
    addEmployee
)

router.put(
    '/employees/:id',
    verifyToken,
    authorizeRoles('admin'),
    updateEmployee
)

router.delete(
    '/employees/:id',
    verifyToken,
    authorizeRoles('admin'),
    deleteEmployee
)

router.get(
    '/getFullLogs',
    verifyToken,
    authorizeRoles('admin'),
    getFullLogs
)

router.get(
    '/getOtHours',
    verifyToken,
    authorizeRoles('admin'),
    getOtHours
)



module.exports = router