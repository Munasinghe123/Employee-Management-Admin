require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db-config')
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/AuthRoutes');
const adminRoutes  = require('./routes/AdminRoutes')
const substationRoutes = require('./routes/SubstationRoutes')
const runWeeklyHoursJob = require('./jobs/weeklyHours.job');

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

//db connection check
(async () => {
    try {
        const connection = await db.getConnection();
        console.log(' Connected to MySQL database ');
        connection.release();
    } catch (err) {
        console.error('MySQL connection failed:', err.message);
        process.exit(1);
    }
})();

//routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/substation', substationRoutes);


app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});

runWeeklyHoursJob();

