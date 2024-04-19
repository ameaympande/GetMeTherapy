import emailjs from '@emailjs/react-native';

export const sendOtpEmail = async emailAddress => {
  const apiKey = '45O9cDOqgEO9rsKE0';
  emailjs.init({
    publicKey: apiKey,
  });
  const otp = generateOtp();
  try {
    const response = await emailjs.send('service_muq01r6', 'template_t9b34mk', {
      to_name: emailAddress,
      from_name: 'Getmetheray',
      otp: otp,
      to_email: emailAddress,
    });
    console.log('Email sent successfully:', response);
    return otp;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

function generateOtp() {
  const otpLength = 4;
  let otp = '';
  const digits = '0123456789';
  for (let i = 0; i < otpLength; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}
