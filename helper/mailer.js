import { createTransport } from "nodemailer"
const getTransport = () =>
    createTransport({
        service: "Gmail",
        auth: {
            user: "dothithuha.140@gmail.com",
            pass: "emgaiermaxmmgtnl",
        },
    });

async function sendEmail({ from = "Hà", to, subject, html, text }) {
    const transporter = getTransport();

    const mailOptions = {
        from,
        to,
        subject,
        text,
        html,
    };
    await transporter.sendMail(mailOptions);
}

export default sendEmail;