import auth from '@react-native-firebase/auth';

export const sendOTPByEmail = email => {
  console.log('Sending password reset email to:', email);
  return auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log('Password reset email sent successfully');
      return true;
    })
    .catch(error => {
      console.error('Error sending password reset email:', error);
      return false;
    });
};

export const handlePasswordResetLink = () => {
  return new Promise(resolve => {
    auth().onAuthStateChanged(user => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
