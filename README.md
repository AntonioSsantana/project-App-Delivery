<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png" width="200">
</p>

<h3 align="center">App Delivery</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)](https://github.com/antonioclp/project-app-delivery) 
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/antonioclp/project-app-delivery.svg)](https://github.com/antonioclp/project-app-delivery)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

> [!NOTE]\
> Project that acts as a platform for delivery.

### Usage
```bash
git clone git@github.com:antonioclp/project-app-delivery.git

cd project-app-delivery
```

#### Front-end
> Node version 16 or higher.
```bash
cd front-end

npm install

npm run dev
```

#### Back-end
> Use docker and docker-compose.
```bash
cd back-end

docker-compose up -d

npm run dev
```


| Route | Usage
| --- | --- |
| **POST: /users** | Get existing user |
| **POST: /login** | Login and validate user |
| **POST: /register** | Register a user |
| **GET: /users:id** | Get user by id |
| **POST: /validateUsers** | Route to validate users |