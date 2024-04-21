import axios from 'axios';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const createEvent = async (userEmail, userName = userEmail) => {
  const tokens = await GoogleSignin.getTokens();
  try {
    const developerEmail = 'ameay35@gmail.com';

    const response = await axios.post(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        summary: `${userName}'s Login Event`,
        start: {
          dateTime: new Date().toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: new Date(Date.now() + 10 * 60000).toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        attendees: [{email: developerEmail}, {email: userEmail}],
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error while creating an event ', error);
    throw error;
  }
};

export {createEvent};
