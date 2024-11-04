const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

const ORDER_PLACED_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body style="background-color: grey; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white">
        <tbody>
            <tr>
                <td align="center">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="550">
                        <tbody>
                            <tr>
                                <td align="center" style="background-color: hsl(45, 50%, 91%); padding: 20px;">
                                    <a href="#" style="text-decoration: none;">
                                        <img src="https://i.ibb.co/8r7FCM1/7cac6b9e60404132a5a99a36d6aaf474-removebg-preview.png"
                                            alt="Logo" style="width: 40%; height: auto;">
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" style="padding: 20px;">
                    <p style="font-weight: bold; font-size: 32px; letter-spacing: 0.025em; color: black;">
                        Order Confirmation.
                    </p>
                    <h2 style="margin-top: 0;">Hey,</h2>
                    <p style="font-size: 16px; color: black;">
                        We've got your order! Your world is about to look a whole lot better.
                        We'll drop you another email when your order ships.
                    </p>
                    <h3 style="color: rgb(0, 0, 0); margin-bottom: 5px;">Order Id: <span style="color: rgb(0, 119, 255);">{orderId}</span></h3>
                    <h3 style="color: rgb(0, 119, 255); margin-top: 0;">Payment Status: <span style="color: rgb(0, 119, 255);">{paymentStatus}</span></h3>
                </td>
            </tr>
            <tr style="text-align: center;">
                <td style="padding: 20px; background-color: white;">
                    <a href="http://192.46.209.205:3003/"
                        style="text-decoration: none; color: black; border: 2px solid hsl(46, 72%, 60%); padding: 10px 30px; font-weight: bold;">
                        Shop More!
                    </a>
                </td>
            </tr>
            <tr style="background-color: hsl(46, 72%, 60%); height: 40px; text-align: center; color: white;">
                <td>
                    <p style="line-height: 1.5em; margin: 10px 0;">
                        wp_ecom_application
                    </p>
                    <a href="#" style="margin: 0 5px;">
                        <img height="30"
                            src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
                            width="30" alt="Twitter">
                    </a>
                    <a href="#" style="margin: 0 5px;">
                        <img height="30"
                            src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
                            width="30" alt="LinkedIn">
                    </a>
                    <a href="#" style="margin: 0 5px;">
                        <img height="20"
                            src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
                            width="24" alt="Facebook" style="padding-bottom: 5px;">
                    </a>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-size: 11px; color: #999999; padding: 20px;">
                    <a href="#" style="color:#999999; text-decoration: underline;">PRIVACY STATEMENT</a> |
                    <a href="#" style="color:#999999; text-decoration: underline;">TERMS OF SERVICE</a> |
                    <a href="#" style="color:#999999; text-decoration: underline;">RETURNS</a><br>
                    © 2022 wp_ecom_application. All Rights Reserved.<br>
                    If you do not wish to receive any further emails from us, please
                    <a href="#" style="text-decoration: none; color: #999999;">unsubscribe</a>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`;

module.exports = {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  ORDER_PLACED_TEMPLATE,
};
