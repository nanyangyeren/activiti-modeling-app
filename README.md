# Activiti Modeling Application

<p align="center">
    <img title="Activiti" width="250px" src="activiti.png" alt="Activiti">
</p>

## Introduction

The Activiti Modeling Application (AMA) is an application built using
[Alfresco Application Development Framework (ADF)](https://github.com/Alfresco/alfresco-ng2-components) components and was generated with [Angular CLI](https://github.com/angular/angular-cli).

---

## Running the application

### Prerequisites

```bash
$ npm install
```

### Development server

```bash
$ npm start
```

Run the script above for the development server. Navigate to `http://localhost:4200/` (opens by default).

### Development server with local ADF components

```bash
$ npm run start:dev
```

Run the script above for the development server using the local ADF components. For this to work properly you must have to chek out the [Alfresco Application Development Framework (ADF)](https://github.com/Alfresco/alfresco-ng2-components) to the same parent directory which contains this repository too. Like this:

-   parent-folder
    -   alfresco-adf-components
    -   activiti-modeler-application

After starting the dev server, navigate to `http://localhost:4200/` (opens by default).

### Production server

```bash
$ npm run start:dist
```

Run the script above for the production server. This command is only intended to be used when running on the target environment.

After starting the production server, navigate to `http://localhost:4200/`.

---

## Building the application

### Development build

```bash
$ npm run build
```

### Development build with local ADF components

```bash
$ npm run build:dev
```

### Production build

```bash
$ npm run build:dist
```

### Running in Docker

First build the application as above.

Then `docker build . -t alfresco/alfresco-modeler-app:latest` to build the image

Start with below (substituting with values for your deployment):

`docker run -it -e APP_CONFIG_OAUTH2_HOST="http://KEYCLOAKHOST/auth/realms/activiti" -e APP_CONFIG_OAUTH2_CLIENTID="activiti" -e API_URL="http://GATEWAYHOST" -p 8080:80 alfresco/alfresco-modeling-app:latest`

If any substitutions don't work then check that the placeholders in `docker-entrypoint.sh` match `src/app.config.json`

---

## Running unit tests

```bash
$ npm test
```

Run the script above to execute the unit tests via [Jest](https://jestjs.io/).

---

## Browser Support

The application is supported in the following browsers:

| **Browser**   | **Version** |
| ------------- | ----------- |
| Chrome        | Latest      |
| Safari (OS X) | 9.x         |
| Firefox\*     | Latest      |
| Edge          | 13, 14      |
