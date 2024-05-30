const nodemailer = require('nodemailer');

const EmailSend = async (EmailTo, EmailText, EmailSubject)=>{

    let transport = nodemailer.createTransport({
// 1. First log in gmail account go to manage Account the write app in search bar
// 2. Write the App Name that you are used for sending mail finally get a password that is used in email Transport
// 3. use the following setting in your code Mail Setting Send from gmail start
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "info.kabyo@gmail.com",
            pass: "nmlo tzuz qpte elxt  ",
        },
// Mail Setting Send from gmail end

// Mail Setting Send from other mail Server start
        // host: "mail.teamrabbil.com",
        // port: 25,
        // secure: false,
        // auth: {user: "info@teamrabbil.com", pass: '~sR4[bhaC[Qs'},
// Mail Setting Send from other mail Server end
        tls: {rejectUnauthorized: false},
    })

    let mailOption={
        from:'MERN Ecommerce Solution <info.kabyo@gmail.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }
    return await transport.sendMail(mailOption)
}

module.exports = EmailSend ;