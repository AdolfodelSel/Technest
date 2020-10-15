# Technest

Angular-Nest application that displays a list of accounts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

* [GiHub](https://github.com/AdolfodelSel/Technest) - Proyect code

### Running

A step by step series of examples that tell you how to get a development env running

Download the code

```
git clone https://github.com/AdolfodelSel/Technest.git
```

Go to Technest folder

```
cd Technest
```

Install dependencies

```
npm i
```

Run a dev server (It will take some time so better go for a coffee)

```
npm run dev:ssr
```

Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests.

## Built With

* [Angular](https://angular.io/) - The frontend framework used
* [NestJS](https://nestjs.com/) - The backend framework used

## Notes

I have used a Nest angular module for for a faster implementation.
This implied some problems in the creation of the websockets with the socket-io library, now solved.
It should be built in the traditional way for a better experience in production environments.

* [Module](https://www.npmjs.com/package/@nestjs/ng-universal) - Angular Universal module for Nest.

## Author

* **Adolfo del Sel Llano**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details