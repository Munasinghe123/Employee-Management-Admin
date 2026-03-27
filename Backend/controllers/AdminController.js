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
        a.id,
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
        const { id, name, userName, password, role, substationId } = req.body;

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


const getFullLogsByEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Get all logs for employee
    const [logs] = await db.query(`
      SELECT dl.*, s.name AS substationName
      FROM daily_logs dl
      JOIN substations s ON dl.substationId = s.substationId
      WHERE dl.employeeId = ?
      ORDER BY dl.logDate DESC, dl.logTime DESC
    `, [id]);

    // 2. For each log, attach related data
    const fullLogs = [];

    for (const log of logs) {
      const id = log.id;

      // feeders
      const [feeders] = await db.query(`
        SELECT feederNo, current
        FROM feeder_logs
        WHERE dailyLogId = ?
      `, [id]);

      // station supply
      const [stationRows] = await db.query(`
        SELECT voltage, amps
        FROM station_supply_logs
        WHERE dailyLogId = ?
      `, [id]);

      // transformers
      const [transformers] = await db.query(`
        SELECT transformerNo, kv33, kv11, amps11, tapPosition, pf
        FROM transformer_logs
        WHERE dailyLogId = ?
      `, [id]);

      fullLogs.push({
        ...log,
        stationSupply: stationRows[0] || null,
        feeders,
        transformers
      });
    }

    res.json(fullLogs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getFullLogsByEmployee, allEmployees, getTodayCheckins, getAttendance, getAttendanceSummary, deleteEmployee, updateEmployee, addEmployee }