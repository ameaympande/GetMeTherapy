export const createCalendarEventAPI = async (
  accessToken,
  userName,
  userEmail,
) => {
  const eventData = {
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

  try {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      },
    );

    if (response.status !== 200) {
      const errorResponse = await response.json();
      throw new Error(`Failed to create event: ${errorResponse.error.message}`);
    }

    const createdEvent = await response.json();
    return createdEvent;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};
