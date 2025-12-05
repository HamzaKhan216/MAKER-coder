# To-Do List Application

A simple and intuitive application to manage your daily tasks and to-do lists.

## Running with Docker

To build and run the application using Docker Compose, navigate to the root directory of the project and execute the following command:

bash
docker-compose up --build


This command will:
1. Build the necessary Docker images (if they don't exist or if changes have been made).
2. Start the services defined in your `docker-compose.yml` file.

Once the containers are up and running, you can access the application through your web browser, typically at `http://localhost:[PORT]`, where `[PORT]` is the port specified in your Docker Compose configuration for the web service.