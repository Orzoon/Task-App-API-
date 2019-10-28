const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = process.env.EMAIL;


sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'orzoonkunwar7.ak@gmail.com',
        subject: 'Orzoon\'s Task App',
        text: `${name} Welcome to orzoon'\s Task App`
    })
}
const sendCancelEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'orzoonkunwar7.ak@gmail.com',
        subject: 'Orzoon\'s Task App',
        text: `${name} You have deleted your account from orzoon'\s Task App`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

