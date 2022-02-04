# NodeJS-Task

**Follow step by step to install both the services.**

1. Setup or use your rabbitmq server and change the credentials in .env file in both the services.
2. Change smtp details in .env file as I left the credentials there as it is testing smtp details.
3. Import accubits.sql file in MySql Database and change credentials accordingly in .env file.
4. Install node_modules using below command in both the services folder in serviceA and ServiceB.

   ```console
   $ npm install
   ```

5. Start you create user api server by below command

   ```console
   $ npm run start
   ```

   URL of post api create user : http://localhost:5000/create-user

   Post data sample :

    ```console
    {
        "firstname": "amit",
        "lastname": "singh",
        "email": "amit@gmail.com",
        "age": "45"
    }
    ```

    Next start your consumer serivce by below command and leave the server as it is.

   ```console
   $ npm run start
   ```

   Note : Here I have not used csv file as I didn't get the point completely.