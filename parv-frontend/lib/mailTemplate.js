export const getAccountCreationSuccessTemplate = (username, password) => {
  return {
    subject: "Account Creation Successful",
    template: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created Successfully</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4; /* Light background */
        }
        .container {
            width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header img {
            max-width: 200px; /* Adjust logo size */
        }
        .content {
            margin-bottom: 20px;
        }
        .content h3 {
            color: #333; /* Darker heading color */
        }
        .details {
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 5px;
          background-color: #f9f9f9; /* Slightly darker background for details */
        }

        .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff; /* Blue button */
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="content">
        <h3>Congratulations! Your Parv Financials Account Has Been Created</h3>
        <p>Welcome to Parv Financials! You've successfully created your account. We're excited to have you on board.</p>
        <div class="details">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password} (Please keep this secure)</p>
        </div>
        <p>Get started now:</p>
        <a href="https://parvfinancialservices.vercel.app/login" class="cta-button">Visit Your Dashboard</a>
    </div>
    <div class="footer">
        <p>&copy; 2025 Parv Financials. All rights reserved.</p>
    </div>
</div>

</body>
</html>
 
`,
  };
};

export const getOTPTemplate = (otp) => {
  return {
    subject: "Password Reset OTP",
    template: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header img {
            max-width: 200px;
        }
        .content {
            margin-bottom: 20px;
        }
        .content h3 {
            color: #333;
        }
        .otp-box {
            background-color: #f9f9f9;
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 5px;
            text-align: center; /* Center the OTP */
            font-size: 20px; /* Make OTP larger */
            letter-spacing: 5px; /* Add some spacing between digits */
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <img src="your_logo_url_here" alt="Your Logo">
    </div>
    <div class="content">
        <h3>Password Reset Request</h3>
        <p>You recently requested to reset your password for your Parv Financials account. Please use the following One-Time Password (OTP) to proceed:</p>
        <div class="otp-box">
            ${otp}  </div>
        <p>This OTP is valid for a limited time. Please do not share this OTP with anyone.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
    </div>
    <div class="footer">
        <p>&copy; 2023 Parv Financials. All rights reserved.</p>
    </div>
</div>

</body>
</html>
`,
  };
};
