import axios from 'axios';

const createEvent = async (userEmail, userName = userEmail) => {
  const accessToken =
    'ya29.a0Ad52N3-BURxy1BKEZkVHdl5d1Ym7_-aDQfssK9KDc8I3a538wmaKmecZ2hx4MolYY6ILzBDmib7bD4itvVyRgcfTW6mYSdGXlIy47tV28kOuDWJRCB_EwZ1nBGJBIvphOw3b7sRXH0HDjxiDHZDtZx-vjTN9hzmkZr8aCgYKARQSARESFQHGX2MiNPEAQbBbdX5gb55z5klRHA0170';

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
          Authorization: `Bearer ${accessToken}`,
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
