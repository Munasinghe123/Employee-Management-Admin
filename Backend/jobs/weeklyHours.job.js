const cron = require("node-cron");
const db = require("../config/db-config");

const runWeeklyHoursJob = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("Running weekly hours job...");

      await db.query(`
        INSERT INTO employee_weekly_hours (
          employee_id,
          week_start_date,
          week_end_date,
          total_hours,
          overtime_hours
        )
        SELECT 
          a.employeeId,

          DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY),
          DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY),

          ROUND(SUM(TIMESTAMPDIFF(MINUTE, a.checkInTime, a.checkOutTime)) / 60, 2),

          ROUND(
            GREATEST(
              (SUM(TIMESTAMPDIFF(MINUTE, a.checkInTime, a.checkOutTime)) - (45 * 60)) / 60,
              0
            ),
            2
          )

        FROM attendance a
        WHERE 
          a.workStatus = 'CHECKED_OUT'
          AND a.attendanceDate BETWEEN 
            DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)
            AND DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 6 DAY)

        GROUP BY a.employeeId

        ON DUPLICATE KEY UPDATE
          total_hours = VALUES(total_hours),
          overtime_hours = VALUES(overtime_hours)
      `);

      console.log("Weekly hours updated");

    } catch (err) {
      console.error("Cron job error:", err);
    }
  });
};

module.exports = runWeeklyHoursJob;