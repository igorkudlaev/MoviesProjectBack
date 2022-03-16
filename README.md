# Movies Project Back

<img src="https://docs.nestjs.kr/assets/logo-small.svg" alt="Nest Logo" width="100"/>
<img src="https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png" alt="Nest Logo" width="100"/>
<img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="Nest Logo" width="100"/>

## Features

- Saving files in Google Cloud Storage
- Swagger for documentation REST api
- Auth with Google
- Docker for dev time
- Nestjs as REST api server
- Typescript

## Starting
This project requires [docker-compose](https://docs.docker.com/compose/install/) v3.3 to run.

### Configure environment

1. Create .env file from .env.example and configure
2. Add key.json with credentials of [Google Service Account](https://cloud.google.com/iam/docs/service-accounts)
3. Configure [GOOGLE_CLIENT_ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) in .env for google auth

### Start project

Open a terminal in the root derictory of project and execute script.

```sh
docker-compose up
```

## Docs

Follow the link (http://localhost:3000/api/docs/) to see swagger doc
