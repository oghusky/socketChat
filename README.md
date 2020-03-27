# SocketChat

## About

SocketChat is a chat application.

## Getting Started

### Software Required
* [Node, npm](https://nodejs.org/en/download/)
* [Git](https://git-scm.com/downloads)
* [MongoDB](https://www.mongodb.com/download-center/community?jmp=docs)

### Setup

Clone project

```shell
> git clone git@github.com:oghusky/socketChat.git
```

Download dependencies

```shell
> npm install
```

Update environment file `.env.sample` and rename to `.env`

Create data directory for mongo

```shell
> mkdir C:/data
> mkdir C:/data/db
```

### Running locally

Run project

```shell
> npm run dev
```

View in browser at `localhost:3000`

### Tips

* You'll want to add `mongo` to your PATH so you can run it without using the full directory path. See [this guide for Windows](http://sysadmindata.com/set-mongodb-path-windows/).