import ApiCalendar from 'react-google-calendar-api';

export const createEvent = async (Key, userName, userEmail) => {
  try {
    const config = {
      clientId:
        '81273183034-rsp1ekvpn0n25anajedbvshuv5v1o8fa.apps.googleusercontent.com',
      apiKey: Key,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      ],
    };

    const apiCalendar = new ApiCalendar(config);

    const event = {
      summary: `${userName}'s Login Event`,
      description: `${userName} logged in to the app.`,
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(new Date().getTime() + 10 * 60 * 1000).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: [{email: userEmail}],
    };

    const response = await apiCalendar.createEvent(event);
    console.log('Event created: ', response);
  } catch (error) {
    console.error('Error creating event: ', error);
  }
};
