const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "trungducloz11111@gmail.com",
        pass: "lwrs nhre roew efns",
    },
});