# NodeJS-Task

**Follow step by step to install both the services.**

1. Setup or use your rabbitmq server and change the credentials in .env file in both the services.
2. Change smtp details in .env file as I left the credentials there as it is testing smtp details.
3. Import accubits.sql file in MySql Database and change credentials accordingly in .env file.
4. Install node_modules using (npm install) command in both the services folder in serviceA and ServiceB.
5. Start you create user api server by below command

   command : npm run start

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

    Next start your consumer serivce by below command.

    command : npm run start