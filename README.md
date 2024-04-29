<a  href="https://www.salesforce.com/">
<img  src="https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-with-type-logo.svg"  alt="Salesforce"  width="250"  />
</a>

# Data Cloud E-Commerce Web Tracking

This project is a simple React web application built with Vite that uses the Salesforce Data Cloud SDK to track web events. It is a proof of concept (POC) that was used for learning and testing out the SDK capabilities.

# Table of Contents

- [Data Cloud E-Commerce Web Tracking](#data-cloud-e-commerce-web-tracking)
- [Table of Contents](#table-of-contents)
  - [What does it do?](#what-does-it-do)
  - [How does it work?](#how-does-it-work)
  - [Technologies used](#technologies-used)
- [Configuration](#configuration)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Development](#development)
    - [Deployment](#deployment)
  - [License](#license)
  - [Disclaimer](#disclaimer)

---

## What does it do?

This application loads various e-commerce products from the [FakeStore API](https://fakestoreapi.com/), displays them across various categories, allows users to view items, add and remove items from cart, view a cart, clear the cart, simulate a checkout, and simulate a login flow.

In addition to the above, this application loads the [Salesforce Data Cloud SDK](https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360a_api_connect_data.htm) and tracks the following web events:

- when a user looks at an item
- when a user adds an item to the cart
- when a user removes item from the cart
- when a user clear their cart completely
- when a user logs in
- when a user logs out
- when a user completes his order
- which pages the user navigated

## How does it work?

## Technologies used

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [FakestoreAPI](https://fakestoreapi.com/)
- [Twilio Paste](https://paste.twilio.design/)
- [React router](https://reactrouter.com/en/main)
- [Typescript](https://www.typescriptlang.org/)
- [Data Cloud SDK](https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360a_api_connect_data.htm)

For a more detailed overview of the development & production dependencies, please check `package.json`.

# Configuration

## Requirements

To run this application locally and successfully stream data to Data Cloud, you will need the following:

- An active Salesforce account with Data Cloud provisioned
- Node.js version 20 or later installed (type `node -v` in your terminal to check). Follow [instructions](https://nodejs.org/en/download) if you don't have node installed
- npm version 10.0.0 or later installed (type `npm -v` in your terminal to check). Node.js includes `npm`

## Setup

The first step is to install the project dependencies via a terminal interface by running the `npm install` in the proper folder:

```
cd salesforce-data-cloud-ecommerce
npm install
```

### Development

To run the application locally, use the command line, navigate to the folder, ensure the dependencies are installed properly, and run the following:

```
cd salesforce-data-cloud-ecommerce
npm run dev
```

This will automatically run the Vite development server. Your app will run on `http://localhost:5173` by default.

When you make changes to your code, the browser window will be automatically refreshed.

### Deployment

Once you are happy with your application, you can deploy it!

From your command line, navigate to the application folder and build your application.

```
cd salesforce-data-cloud-ecommerce
npm build
```

By default, it uses `<root>/index.html` as the build entry point, and produces an application bundle that is suitable to be served over a static hosting service. For more details on the build step, visit the [official documentation](https://vitejs.dev/guide/build.html).

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Salesforce bears no responsibility to support the use or implementation of this software.
