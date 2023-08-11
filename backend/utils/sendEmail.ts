import nodemailer, { Transporter } from 'nodemailer'

interface EmailOptions {
  email: string
  subject: string
  message: string
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: parseInt((process.env as any).SMPT_PORT),
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailOptions)
}

export default sendEmail
