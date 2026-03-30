
const express = require('express')
const router = express.Router();
const { getFullLogsByEmployee, allEmployees, getTodayCheckins, getAttendance, getAttendanceSummary, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/AdminController')
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
    '/get-full-logs-by-employee/:id',
    verifyToken,
    authorizeRoles('admin'),
    getFullLogsByEmployee
)

module.exports = router