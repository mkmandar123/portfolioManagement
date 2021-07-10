
# Portfolio Management System

Portfolio Management System is a set of APIs made in nodeJS which gives following functionalities:

1. Create a trade
2. Get all created trades
3. Get portfolio
4. Get portfolio returns

## Checks Added

I have added following checks to block invalid requests:

1. You cannot SELL a stock if you don't have one
2. Only BUY and SELL transactions are supported, any other transactions will be rejected
3. If user already has stock in his portfolio then increment quantity of existing stock rather than adding new entry
4. When stock quantity becomes 0, it is removed from portfolio

## Usage

Please follow the documentation hosted on Postman.

```bash
https://documenter.getpostman.com/view/13678014/Tzm6nGzR
```

This project is hosted on AWS, but you can also run it on your system locally.

Before trying to start the project, please create .env file and copy values from default.env to .env file

To run the project:
```bash
npm run start
```

To run the project in watch mode:
```bash
npm run debug
```

To build the project:
```bash
npm run build
```

## Assumptions
I have assumed that currently only single user will be using the system, but I've also taken in care so that in future it'll be easy to add more users.

Also, I have considered user to have infinite balance.

Please let me know your feedback.
