# Project Name Readme

## Overview

This project is a mobile application that provides login and authentication features along with integration with Google Calendar. Users can log in using email and password or Google account. Additionally, they can sign up using email and password. The app automatically creates an event in the developer's Google Calendar upon each user login or signup.

## Features

### Login and Authentication

- Allow users to log in using their email and password.
- Implement the option for users to log in with Google.
- Enable users to sign up and create an account using Google.
- Provide a sign-up form for users to create an account using email and password.
- Include a "Forgot Password" feature that sends an OTP to the user's email for password reset.

### Google Calendar Integration

- Upon each user login or signup, automatically create an event in the developer's Google Calendar.
- The title of the event will be “User’s Name Login Event” (Replace “User’s Name” with the name of the user)
- The duration of the event will be 10 mins.
- Add the user as a guest to the event in the Google Calendar.

## Project Requirements

- Utilize Google Calendar API for integration.
- Ensure accuracy to the wireframes provided in the Figma document.
- Implement functionality as per the wireframes, including login, signup, and Google Calendar integration.
- Ensure seamless user experience and intuitive UI design.

## Installation and Setup

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Navigate to the project directory:

```bash
cd <project_directory>
```

3. Install dependencies:

```bash
# Example command for npm
npm install

# Example command for yarn
yarn install
```

4. Follow instructions for setting up Firebase Authentication and Google Calendar API in the Firebase Console and Google Cloud Console respectively.

5. Include necessary configuration files for Firebase and Google Calendar API in the project.

6. Build the project:

```bash
# Example command for Android
./gradlew assembleDebug

# Example command for iOS
# (if applicable)
```

7. Run the project on a simulator or physical device:

```bash
# Example command for Android
./gradlew installDebug

# Example command for iOS
# (if applicable)
```

## Deployment

Include deployment details once the project is ready for deployment.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
