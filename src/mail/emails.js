const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WEEKLY_SUMMARY_TEMPLATE,
  SESSION_REMINDER_TEMPLATE
} = require('./emailTemplate');
const { transporter } = require('../config/mail');

async function sendVerificationEmail(email, verificationToken) {
  transporter.sendMail(
    {
      to: email,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        '{verificationCode}',
        verificationToken
      ),
    },
    function (error, info) {
      if (error) {
        console.error('Error sending verification email', error);
        throw new Error('Error sending verification email: ' + error.message);
      } else {
        console.log('Verification email sent successfully', info);
      }
    }
  );
}

// Function to send a welcome email
async function sendWelcomeEmail(email, name) {
  transporter.sendMail(
    {
      to: email,
      subject: 'Welcome to Auth Company',
      html:
        '<h1>Welcome, ' +
        name +
        '!</h1><p>Thank you for verifying your email.</p>', // Replace with your HTML template if needed
    },
    function (error, info) {
      if (error) {
        console.error('Error sending welcome email', error);
        throw new Error('Error sending welcome email: ' + error.message);
      } else {
        console.log('Welcome email sent successfully', info);
      }
    }
  );
}

// Function to send a password reset email
async function sendPasswordResetEmail(email, resetURL) {
  transporter.sendMail(
    {
      to: email,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
    },
    function (error, info) {
      if (error) {
        console.error('Error sending password reset email', error);
        throw new Error('Error sending password reset email: ' + error.message);
      } else {
        console.log('Password reset email sent successfully', info);
      }
    }
  );
}

// Function to send a password reset success email
async function sendResetSuccessEmail(email) {
  transporter.sendMail(
    {
      to: email,
      subject: 'Password Reset Successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    },
    function (error, info) {
      if (error) {
        console.error('Error sending password reset success email', error);
        throw new Error(
          'Error sending password reset success email: ' + error.message
        );
      } else {
        console.log('Password reset success email sent successfully', info);
      }
    }
  );
}
// Hàm gửi email nhắc nhở buổi tập
async function sendSessionReminderEmail(email, sessionTime, sessionDate) {
  return transporter.sendMail(
    {
      to: email,
      subject: 'Nhắc nhở buổi tập sắp diễn ra',
      html: SESSION_REMINDER_TEMPLATE.replace(
        '{sessionTime}',
        sessionTime
      ).replace('{sessionDate}', sessionDate),
    },
    function (error, info) {
      if (error) {
        console.error('Error sending session reminder email:', error);
        throw new Error('Error sending session reminder email: ' + error.message);
      } else {
        console.log('Session reminder email sent successfully:', info);
      }
    }
  );
}

async function sendWeeklyNotificationEmail(email, completedSessions, canceledSessions) {
  return transporter.sendMail(
    {
      to: email,
      subject: 'Thông báo Tổng kết Tuần từ Gym-Cap',
      html: WEEKLY_SUMMARY_TEMPLATE.replace(
        '{completedSessions}',
        completedSessions
      ).replace('{canceledSessions}', canceledSessions),
    },
    function (error, info) {
      if (error) {
        console.error('Error sending weekly notification email:', error);
        throw new Error('Error sending weekly notification email: ' + error.message);
      } else {
        console.log('Weekly notification email sent successfully:', info);
      }
    }
  );
}

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendWeeklyNotificationEmail,
  sendSessionReminderEmail,
};
