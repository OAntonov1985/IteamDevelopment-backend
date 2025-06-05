const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const app = require('./src/app');
const server = http.createServer(app);

process.on('uncaughtException', err => {
    const msg = 'UNCAUGHT EXCEPTION! 💥 Shutting down...';
    console.log(msg);
    process.exit(1);
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    const msg = `🚀 Сервер слухає порт ${PORT}`;
    console.log(msg);
});

const DB_STRING = process.env.DATABASE_URL_STRING;

mongoose.connect(DB_STRING, { sanitizeFilter: true }).then(con => {
    const msg = `✅ Підключено до бази даних: ${con.connection.host}`;
    console.log(msg);
}).catch(err => {
    const msg = ('❌ Помилка з’єднання з базою даних:', err);
    console.log(msg);
    process.exit(1);
});

process.on('unhandledRejection', err => {
    const msg = ('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(msg);
    server.close(() => {
        process.exit(1);
    });
});
