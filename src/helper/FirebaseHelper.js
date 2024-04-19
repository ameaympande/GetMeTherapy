import auth from '@react-native-firebase/auth';

export const checkEmailExists = async email => {
  try {
    const signInMethods = await auth().fetchSignInMethodsForEmail(email);
    console.log('Signin', signInMethods);
    if (signInMethods.length === 0) {
      // The user does not exist.
      return false;
    } else {
      // The user exists.
      return true;
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return false;
    } else {
      console.error('Error checking email existence:', error);
      return false;
    }
  }
};
