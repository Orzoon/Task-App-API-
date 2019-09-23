const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = process.env.EMAIL;


sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'orzoonkunwar7.ak@gmail.com',
        subject: 'Orzoon\'s Task App',
        text: `${name} Welcomt to orzoon'\s Task App to`
    })
}
const sendCancelEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'orzoonkunwar7.ak@gmail.com',
        subject: 'Orzoon\'s Task App',
        text: `${name} You have cancelled your account from orzoon'\s Task App to`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

