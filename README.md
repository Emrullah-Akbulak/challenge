# Challenge

## How to start

This project can be built with Docker (v25.0.0 recommended) and offers 3 different environments for development, production(built) and test.

Note: Switching between different environments requires rebuilding.

## Using Docker

### Production

Production environment can be run with:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

This environment uses `Nginx` to serve `React` with production optimizations.

The client (aka `React App`) can be directly accessed from http://localhost and api endpoints are served under http://localhost:8000 address.

### Development

Development environment can be run with:

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

This environment does not use any reverse proxy and serves `ExpressJS` and `React` servers under ports `8000` and `3000` respectively. However, this environment offers quick refresh for developers to be able to mirror their changes to docker containers while coding.

Express server is served under http://localhost:8000  
React server is served under http://localhost:3000

### Tests

Test environment can be run with:

```
docker-compose -f docker-compose.test.yml up
```

This environment runs all the tests in ExpressJS server using Jest and returns the output

## Containers

### <u>Server</u>

This container holds the RestAPI Logic of the whole app using ExpressJS

#### **Endpoints**

#### Home

> `Path:` **/**  
> `Method`: **GET**  
> `Paremeters:` None  
> `Explanation:` This endpoint returns string "Hello World!" to show that the server is working.

#### Email Generator

> `Path:` **/email-generator/generate**  
> `Method`: **POST**  
> `Paremeters:`
>
> ```ts
> {
>   firstName: string; // At least 1 characters long
>   lastName: string; // At least 1 characters long
>   domain: string; // A valid domain name
> }
> ```
>
> `Explanation:` This endpoint returns a generated email using firstName and lastName if the domain is recognisable.

### <u>Web</u>

This container both holds the ReactJS for Client and Nginx for static file serving and reverse proxy server. The container either uses the basic React server for development or Nginx to serve both RestAPI and client files based on current environment.

#### <b>Pages</b>

> `Name:` Email Finder  
> `Path:` **/**  
> `Explanation:` This is the main and the only path for the client-side. It only servers a UI that users can enter firstName, lastName and domain to generate a email. It also holds a temp history.

## Without Docker

This project can also be run without the need of docker if you do not have access to it, however it requires some manual labor such as installing packages manually and setting up environment.

### Building and running ExpressJS Server

To run the server you need the following packages to be installed in your computer:

> `NodeJS`: v20.10.0  
> `NPM`: v10.2.3

If you have everything ready you can switch to the server directory on your terminal and run

```bash
npm i
```

This will install all required packages for you. After that you need to set two environment variables before you can run the project which are listed below

> `ENVIRONMENT`: dev  
> `PORT`: 8000

If you have no idea how to set them see [the article](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html)

Normaly these are set through docker or the platform you are working on, after you set these you can just run the project using the following command

```bash
npm run dev
```

### Running tests for ExpressJS Server

If you have installed all the packages already, set your environment variables to

> `ENVIRONMENT`: test  
> `PORT`: 8000

then you can just run

```bash
npm run test
```

### Building and running React Server

To run the client you need the following packages to be installed in your computer:

> `NodeJS`: v20.10.0  
> `NPM`: v10.2.3

If you have everything ready you can switch to the client directory on your terminal and run

```bash
npm i
```

After the install you can start the server with the following command

```bash
npm start
```

You can access the client from http://localhost:3000
