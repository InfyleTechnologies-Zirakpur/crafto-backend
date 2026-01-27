const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendEmailOtp = (email) => {
  return client.verify.v2
    .services(process.env.TWILIO_VERIFY_SID)
    .verifications.create({
      to: email,
      channel: "email",
    });
};

exports.verifyEmailOtp = (email, otp) => {
  return client.verify.v2
    .services(process.env.TWILIO_VERIFY_SID)
    .verificationChecks.create({
      to: email,
      code: otp,
    });
};
