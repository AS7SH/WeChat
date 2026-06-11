export const HTML_OTP_Email = (username, heading, duration, title) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>WeChat Authenticate</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f9fafb; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); }
    .header { background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .content { padding: 24px; font-size: 15px; line-height: 1.6; }
    .content p { margin: 12px 0; }
    .verify-btn { display: inline-block; margin: 20px auto; background: #3b82f6; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 15px; font-weight: 600; }
    .verify-btn:hover { background: #2563eb; }
    .footer { background: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WeChat</h1>
    </div>

    <div class="content">
      <p>Hello <strong>${username}</strong>,</p>
      <p>${heading}</p>

      <p>This code is valid for <strong>${duration}</strong>. Please do not share it with anyone.</p>
      
      <p style="text-align:center;">
        <a href="{{params.link}}"  class="verify-btn">${title}</a>
      </p>

      <p>If you did not request this, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      <p>&copy; 2026 WeChat. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
};

export const HTML_ForgotPass_Email = (username, heading, duration, title) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>WeChat Authenticate</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f9fafb; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08); }
    .header { background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
    .content { padding: 24px; font-size: 15px; line-height: 1.6; }
    .content p { margin: 12px 0; }
    .verify-btn { display: inline-block; margin: 20px auto; background: #3b82f6; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 15px; font-weight: 600; }
    .verify-btn:hover { background: #2563eb; }
    .footer { background: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>WeChat</h1>
    </div>

    <div class="content">
      <p>Hello <strong>${username}</strong>,</p>
      <p>${heading}</p>

      <p>This code is valid for <strong>${duration}</strong>. Please do not share it with anyone.</p>
      
      <p style="text-align:center;">
        <a style="cursor:pointer" class="verify-btn">${title}</a>
      </p>

      <p>If you did not request this, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      <p>&copy; 2026 WeChat. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
};
