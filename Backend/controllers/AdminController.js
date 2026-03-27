const db = require("../config/db-config")
const bcrypt = require('bcrypt');


const getTodayCheckins = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT COUNT(*) AS total 
            FROM attendance
            WHERE created_at >= CURDATE()
            AND created_at < CURDATE() + INTERVAL 1 DAY;
        `);

        return res.status(200).json({
            message: "Today's check-ins",
            total: result[0].total
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getAttendance = async (req, res) => {
    try {
        const { date, substation } = req.query;

        const selectedDate = date || new Date().toISOString().split("T")[0];

        let query = `
      SELECT 
        a.employeeId,
        a.substationId,
        a.shiftId,
        a.checkInTime,
        a.checkOutTime,
        a.checkInValid,
        a.checkOutValid
      FROM attendance a
      WHERE DATE(a.attendanceDate) = ?
    `;

        const params = [selectedDate];

        if (substation && substation !== "all") {
            query += ` AND a.substationId = ?`;
            params.push(substation);
        }

        const [rows] = await db.query(query, params);

        console.log("attendece ", rows);

        return res.status(200).json({
            data: rows
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAttendanceSummary = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const [rows] = await db.query(`
      SELECT 
        COUNT(CASE WHEN checkInTime IS NOT NULL AND checkOutTime IS NULL THEN 1 END) AS active,
        COUNT(CASE WHEN checkInTime IS NOT NULL AND checkOutTime IS NOT NULL THEN 1 END) AS completed,
        COUNT(CASE WHEN checkInValid = 0 THEN 1 END) AS invalid
      FROM attendance
      WHERE attendanceDate = ?
    `, [today]);

        console.log(rows[0])

        return res.status(200).json(rows[0]);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const allEmployees = async (req, res) => {

    try {
        const [employees] = await db.query('SELECT * FROM employee')

        if (employees.length === 0) {
            return res.status(404).json("No employees found")
        }

        console.log("all employees", employees);

        res.status(200).json({
            message: "All employees",
            data: employees
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addEmployee = async (req, res) => {
    try {
        const { employeeId, name, userName, password, role, substationId } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO employee (employeeId, name, userName, password, role, substationId) VALUES (?, ?, ?, ?, ?, ?)",
            [employeeId, name, userName, hashedPassword, role, substationId]
        );

        res.json({ message: "Employee added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, userName, role, substationId } = req.body;

        await db.query(
            "UPDATE employee SET name=?, userName=?, role=?, substationId=? WHERE employeeId=?",
            [name, userName, role, substationId, id]
        );

        res.json({ message: "Employee updated" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteEmployee = async (req, res) => {
    try {
        console.log("delete hit", req.params)
        const { id } = req.params;

        await db.query("DELETE FROM employee WHERE employeeId=?", [id]);

        res.json({ message: "Employee deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { allEmployees, getTodayCheckins, getAttendance, getAttendanceSummary, deleteEmployee, updateEmployee, addEmployee }