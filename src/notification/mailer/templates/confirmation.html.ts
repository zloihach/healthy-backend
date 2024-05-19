export const confirmationTemplate = (name: string, url: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Confirm your Email</title>
</head>
<body>
  <h1>Hello, ${name}!</h1>
  <p>Thank you for registering at Nice App. Please confirm your email by clicking the link below:</p>
  <p><a href="${url}">Confirm your Email</a></p>
  <p>If you did not register at Nice App, please ignore this email.</p>
</body>
</html>
`;
