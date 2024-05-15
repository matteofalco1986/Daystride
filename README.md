DAYSTRIDE USER AND INSTALLATION GUIDE
Daystride is a web app that allows you to track your daily activity and mood. Daystride is composed of:

-    Frontend: Developed in REACT, located in the "./clientapp/" folder.
-    Backend: Developed in .NET CORE as a web API, located in the "./API/" folder.
-    SQL Server Database

To run the app on your machine, follow these steps.

1.    DOWNLOAD THE APP

You can download the app by cloning the repository with the command:
git clone https://github.com/matteofalco1986/Daystride.git

2.    CREATE THE DATABASE
The database will be created using the query contained in the "DaystrideDbInitializationQuery.sql" file.

-    Open the "DaystrideDbInitializationQuery.sql" file located in the project's root.
-    Execute the query.

If an error occurs, it is likely that the path for creating the database on lines 7 and 9 of the query does not match the SQL Server engine installed. If this happens, try replacing the path in the query with the one for the currently installed system. The names of the DB and log should remain "DayStride.mdf" and "DayStride_log.ldf."

3.    REPLACE THE CONNECTION STRING

Replace the connection string in the following files:

-    /API/appsettings.json - Line 10
-    /API/Data/DayStrideContext.cs - Line 47
  
The app interfaces with the database via SQL Server Authentication, having been developed on MacOS with SQL Server in Docker. To maintain this connection method, simply update the server IP with your machine's IP. If you prefer to use "Windows Authentication" (recommended for local development on PC), replace the connection string with the following:
"Server=localhost;Database=DayStride;Encrypt=True;Trusted_Connection=True;TrustServerCertificate=True;"

4.    INSTALL CLIENT-SIDE PACKAGES

-    Ensure NodeJs is installed on your machine.
-    From the terminal, navigate to the "./clientapp/" folder.
-    Run the following command:
    -    npm install @fullcalendar/bootstrap5 @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react @reduxjs/toolkit axios bootstrap bootstrap-icons date-fns react-bootstrap react-bootstrap-icons react-icons react-redux react-router-dom

ONCE THE APP IS RUNNING

Most of the app's functionalities are accessible only after login and/or registration. Authentication is managed by generating a JWT token from the server. By default, the token is saved in the browser's local storage, from which the frontend part of the app reads it. The server verifies the presence of the token in the client's request header and validates it, authorizing access to the pages.
Registration is managed using the properties provided by the IdentityUser class in .NET Core, which means passwords are hashed and not recognizable by looking at the database.

Valid username and password for login are:
-    Username: admin
-    Password: Pa$$w0rd

THE "INSPIRE ME" SECTION
The Inspire Me section includes quotes and relaxing backgrounds. The app uses an external API for quotes and images.

-    Image API: Pexels (https://www.pexels.com/api/)
  
Authentication requires a token to be included in the request header. If the token expires or doesn't work, visit https://www.pexels.com/api/new/ to get a new token and use it to replace the one saved in the PexelsToken constant in /clientapp/src/data/data.js.

START THE APP VIA TERMINAL
Start the Server
-    Navigate to the /Daystride/API/ folder.
-    Type dotnet run or dotnet watch --no-hot-reload

Start the Client
-    Navigate to the /Daystride/clientapp/ folder.
-    Type npm start
