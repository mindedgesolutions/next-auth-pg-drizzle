import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 587,
  auth: {
    user: 'resend',
    pass: 're_QJNxRh1P_MiZKqW8fjeqnj8sqMFMWPjdg',
  },
});
