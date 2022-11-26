const accountRegisterTemplate = (content) => {
  const { username, token } = content;
  const html = `
    <h2>Hello ${username},</h2>
    <p>Please click on the following button to activate your account</p>

    <a href="http://localhost:3000?${token}" target="_blank">
    Activate Account
    </a>
    `;

  return html;
};

module.exports = { accountRegisterTemplate };
