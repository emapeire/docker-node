# Docker Node 🐳: learning best practices

## A simple Node.js project with Docker, MongoDB and MySQL

### Setting up the project

You'll need to configure the environment variables for the project. To do this, you can create a `.env` file in the root of the project with the following content:

```env
# Docker Configuration
IS_DOCKER_ENV=<flase | true>

# Application Configuration
APP_CONTAINER_NAME=<app_container_name>
APP_PORT=<app_port>

# MySQL Configuration
MYSQL_CONTAINER_HOST=<mysql_container_host>
MYSQL_PORT=<mysql_port>
MYSQL_DATABASE=<mysql_database>
MYSQL_ROOT_USER=<mysql_root_user>
MYSQL_ROOT_PASSWORD=<mysql_root_password>

# MongoDB Configuration
MONGO_CONTAINER_HOST=<mongo_container_host>
MONGO_DATABASE=<mongo_database>
MONGO_PORT=<mongo_port>
```

Also, you can look at the [`.env.example`](.env.example) file to see an example of the environment variables.

### Running the project

To run the project, you'll need to have Docker installed. Then, you can run the following command:

```bash
docker-compose up
```

For building the project, you can run the following command:

```bash
docker-compose up --build
```

This will build the Docker image and start the container. You can access the application at `http://localhost:3000`.

### Stopping the project

To stop the project, you can run the following command:

```bash
docker-compose down
```

This will stop the container and remove it.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
