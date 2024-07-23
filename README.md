# AppTrove

AppTrove is a web application built with React JS and Firebase that stores download links to various applications. It offers several features to enhance user experience and ensure the availability of the latest applications.

## Features

- **Application Icons**: All apps have an icon photo which helps you save time.
- **Previews**: You can preview all applications before downloading.
- **Up-to-date**: Our archive is constantly growing while being consistently and efficiently updated.
- **Application Donations Option**: Support your favorite applications with donations.
- **Request for an Application**: Easily request for applications that are not available in our archive.
- **Feedback**: Provide feedback to help us improve the platform.

## Technologies Used

- **Frontend**: React JS
- **Backend**: Firebase (Firestore Database, Authentication)
- **Hosting**: Firebase Hosting

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Firebase CLI

### Installation

1.  **Clone the repository**

    ```sh
    git clone https://github.com/TaiwoJoshua/apptrove.git
    cd AppTrove
    ```

2.  **Install dependencies**

    ```sh
    npm install
    ```

### Firebase Setup

- If you haven't already, create a Firebase project at Firebase Console.

- In the root directory of the project, create a file named .env and add your Firebase configuration details:

  ```makefile
  REACT_APP_FIREBASE_API_KEY=your_api_key
  REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
  REACT_APP_FIREBASE_PROJECT_ID=your_project_id
  REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  REACT_APP_FIREBASE_APP_ID=your_app_id
  ```

### Run the application

```sh
npm start
```

The app should now be running on http://localhost:3000

## Deployment

To deploy the application to Firebase Hosting:

### Build the application

```sh
npm run build
```

### Deploy to Firebase

```sh
firebase deploy
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

- Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

- Taiwo Joshua
- joshuataiwo07@gmail.com
- Project Link: https://github.com/TaiwoJoshua/apptrove
