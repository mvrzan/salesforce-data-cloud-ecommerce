<p align="center">
<p align="center">
<a  href="https://www.salesforce.com/"><img  src="./screenshots/salesforce-logo.svg"  alt="Salesforce"  width="150" height="150" hspace="50"/></a>
<a href="https://www.salesforce.com/data/"><img  src="./screenshots/data-cloud-logo.png"  alt="lock_icon"  width="150" height="150" hspace="50"/></a>
<a href="https://react.dev/"><img  src="./screenshots/react-logo.png"  alt="lock_icon"  width="150" height="150" hspace="50"/></a>
<p/>
<p/>

# Data Cloud E-Commerce Web Tracking

This project is a simple React web application built with Vite that uses the Salesforce Data Cloud SDK to track web events. It is a proof of concept (POC) that was used for learning and testing out the SDK capabilities.

# Table of Contents

- [Data Cloud E-Commerce Web Tracking](#data-cloud-e-commerce-web-tracking)
- [Table of Contents](#table-of-contents)
  - [What does it do?](#what-does-it-do)
  - [Architecture diagram](#architecture-diagram)
  - [E-Commerce Application Demo](#e-commerce-application-demo)
  - [Landing page](#landing-page)
  - [Home](#home)
  - [Men](#men)
  - [Women](#women)
  - [Jewelry](#jewelry)
  - [Electronics](#electronics)
  - [Cart](#cart)
  - [Not found](#not-found)
  - [Script configuration](#script-configuration)
  - [Technologies used](#technologies-used)
- [Configuration](#configuration)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Salesforce](#salesforce)
    - [Development](#development)
    - [Deployment](#deployment)
- [Kudos](#kudos)
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

## Architecture diagram

![](./screenshots/architecture-diagram.png)

The application is built with React so it is a Single Page Application (SPA) that connects to the FakeStore API to fetch data asynchronously. The fetched data are various e-commerce products that are then filtered and displayed to the user in various categories.

In the header of the page, there is a [settings/cog icon](#script-configuration) that opens a modal window. In there you can paste your Data Cloud tenant endpoint for the JavaScript file to be loaded onto the page. Once you click on **Save changes**, the Data Cloud JavaScript file will be fetched from the CDN and added into the `<script>` tag and added to the `window` object. This logic is executed by the [useScript](/src/components/hooks/useScript.ts) hook.

Once you save your script URL, it will then be saved to your browser's local storage. On application load, the application will check the browser local storage for an existing script. This is done so you don't have to re-enter the script tag every time you open the application or refresh a page.

**NOTE**: The purpose behind the settings option is to allow developers to easily install this application and add your Data Cloud tenant endpoint with ease.

To track various events aforementioned previously, a custom react hook was created called [useSalesforceInteractions](/src/components/hooks/useSalesforceInteractions.ts) that returns an object with various event tracking functions.

Throughout the application, the various event tracking functions are used that send the tracking data to your [Data Cloud tenant specific endpoint](https://help.salesforce.com/s/articleView?id=sf.c360_a_tenant_specific_endpoint.htm&type=5).

**NOTE**: This application does not use [Salesforce sitemap](https://developer.salesforce.com/docs/atlas.en-us.c360a_api.meta/c360a_api/c360a_api_sitemap.htm). Instead, all events are tracked in the react application itself.

## E-Commerce Application Demo

![](./screenshots/web-app-demo.gif)

## Landing page

<img width="100%" src="./screenshots/landing.png"/>

## Home

<img width="100%" src="./screenshots/home.png"/>

## Men

<img width="100%" src="./screenshots/home.png"/>

## Women

<img width="100%" src="./screenshots/women.png"/>

## Jewelry

<img width="100%" src="./screenshots/jewelry.png"/>

## Electronics

<img width="100%" src="./screenshots/electronics.png"/>

## Cart

<img width="100%" src="./screenshots/cart.png"/>

## Not found

<img width="100%" src="./screenshots/not-found.png"/>

## Script configuration

<img width="100%" src="./screenshots/script-configuration.png"/>

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

The first step is to clone the GitHub project and install the project dependencies via a terminal interface by running the `npm install` in the proper folder:

```
cd salesforce-data-cloud-ecommerce
npm install
```

### Salesforce

1. In Data Cloud, create a new website connector. The instructions can be found in the [official documentation here](https://developer.salesforce.com/docs/data/data-cloud-int/guide/c360-a-set-up-mobile-web-connection.html).
2. The schema document for this web application is located in the `utils` folder. You can download the schema from [here](./salesforce/web-connector-schema.json).
3. The third step in this process is to create the appropriate data streams in Data Cloud. To do so, please follow the [official documentation here](https://help.salesforce.com/s/articleView?id=sf.c360_a_create_a_mobile_web_data_stream.htm&type=5)
4. Official mapping documentation can be found [here](https://developer.salesforce.com/docs/marketing/einstein-personalization/guide/integrate-salesforce-interactions-sdk.html#map-website-connector-object-fields).

Here you can see how the your mappings should be configured:

**Identity DMO**

| DLO Field Name | Behavioral Event Table | Maps To | Data Model Entities | Engagement Name             |
| -------------- | ---------------------- | ------- | ------------------- | --------------------------- |
| deviceId       | identity               | ➤       | Individual          | Individual Id (Primary Key) |
| firstName      | identity               | ➤       | Individual          | First Name                  |
| lastName       | identity               | ➤       | Individual          | Last Name                   |
| isAnonymous    | identity               | ➤       | Individual          | Is Anonymous                |

**Contact Point Email DMO**

| DLO Field Name | Behavioral Event Table | Maps To | Data Model Entities | Engagement Name                      |
| -------------- | ---------------------- | ------- | ------------------- | ------------------------------------ |
| email          | contactPointEmail      | ➤       | Contact Point Email | Contact Point Email Id (Primary Key) |
| email          | contactPointEmail      | ➤       | Contact Point Email | Email Address                        |
| deviceId       | contactPointEmail      | ➤       | Contact Point Email | Party                                |

**Behavioral data stream**

| DLO Field Name                    | Behavioral Event Table | Maps To | Data Model Entities            | Engagement Name                                 |
| --------------------------------- | ---------------------- | ------- | ------------------------------ | ----------------------------------------------- |
| dateTime                          | All Event Data         | ➤       | Product Browse Engagement      | Created Date                                    |
| interactionName                   | Catalog                | ➤       | Product Browse Engagement      | Engagement Channel Action                       |
| dateTime                          | All Event Data         | ➤       | Product Browse Engagement      | Engagement Date Time                            |
| eventType                         | Catalog                | ➤       | Product Browse Engagement      | Engagement Type                                 |
| deviceId                          | All Event Data         | ➤       | Product Browse Engagement      | Individual                                      |
| attributePersonalizationId        | Catalog                | ➤       | Product Browse Engagement      | Personalization                                 |
| attributePersonalizationContentId | Catalog                | ➤       | Product Browse Engagement      | Personalization Content                         |
| id                                | Catalog                | ➤       | Product Browse Engagement      | Product                                         |
| eventId                           | All Event Data         | ➤       | Product Browse Engagement      | \*Product Browse Engagement Id Primary Key      |
| type                              | Catalog                | ➤       | Product Browse Engagement      | Product Browse Event Type                       |
| productSku                        | Catalog                | ➤       | Product Browse Engagement      | Product SKU                                     |
| orderId                           | Order                  | ➤       | Product Order Engagement       | Correlation Id                                  |
| dateTime                          | All Event Data         | ➤       | Product Order Engagement       | Created Date                                    |
| orderCurrency                     | Order                  | ➤       | Product Order Engagement       | Currency                                        |
| dateTime                          | All Event Data         | ➤       | Product Order Engagement       | Engagement Date Time                            |
| eventType                         | Order                  | ➤       | Product Order Engagement       | Engagement Type                                 |
| deviceId                          | All Event Data         | ➤       | Product Order Engagement       | Individual                                      |
| eventId                           | All Event Data         | ➤       | Product Order Engagement       | \*Product Order Engagement Id Primary Key       |
| adjustedProductAmount             | Order                  |         | Product Order Engagement       | Adjusted Total Product Amount                   |
| orderTotalValue                   | Order                  | ➤       | Product Order Engagement       | Total Product Amount                            |
| interactionName                   | Order                  |         | Product Order Engagement       | Engagement Channel Action                       |
| dateTime                          | All Event Data         | ➤       | Sales Order Product Engagement | Created Date                                    |
| eventType                         | Order Item             | ➤       | Sales Order Product Engagement | Engagement Type (Custom)                        |
| deviceId                          | All Event Data         | ➤       | Sales Order Product Engagement | Individual (Custom)                             |
| quanity                           | Order Item             | ➤       | Sales Order Product Engagement | Ordered Quantity                                |
| catalogObjectId                   | Order Item             | ➤       | Sales Order Product Engagement | Product                                         |
| price                             | Order Item             | ➤       | Sales Order Product Engagement | Product Price Amount                            |
| orderEventId                      | Order Item             | ➤       | Sales Order Product Engagement | ProductOrderEngagement                          |
| eventId                           | All Event Data         | ➤       | Sales Order Product Engagement | \*Sales Order Product Engagement Id Primary Key |
| dateTime                          | All Event Data         | ➤       | Shopping Cart Engagement       | Created Date                                    |
| currency                          | Cart Item              | ➤       | Shopping Cart Engagement       | Currency                                        |
| dateTime                          | All Event Data         | ➤       | Shopping Cart Engagement       | Engagement Date Time                            |
| event type                        | Cart Item              | ➤       | Shopping Cart Engagement       | Engagement Type                                 |
| deviceId                          | All Event Data         | ➤       | Shopping Cart Engagement       | Individual                                      |
| catalogObjectId                   | Cart Item              | ➤       | Shopping Cart Engagement       | Product                                         |
| price                             | Cart Item              | ➤       | Shopping Cart Engagement       | Product Price                                   |
| interactionName                   | Cart Item              | ➤       | Shopping Cart Engagement       | Engagement Channel Action                       |
| quanity                           | Cart Item              | ➤       | Shopping Cart Engagement       | Product Quantity                                |
| eventId                           | All Event Data         | ➤       | Shopping Cart Engagement       | \*Shopping Cart Engagement Id Primary Key       |
| dateTime                          | All Event Data         | ➤       | Website Engagement             | Created Date                                    |
| eventType                         | Browse                 | ➤       | Website Engagement             | Engagement Type                                 |
| deviceId                          | All Event Data         | ➤       | Website Engagement             | Individual                                      |
| interactionName                   | Browse                 | ➤       | Website Engagement             | Name                                            |
| pageName                          | Browse                 | ➤       | Website Engagement             | Page Name                                       |
| pageUrl                           | Browse                 | ➤       | Website Engagement             | Page URL                                        |
| eventId                           | All Event Data         | ➤       | Website Engagement             | \*Website Engagement Id Primary Key             |

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

# Kudos

This project was inspired by [Custom Threads](https://github.com/developedbygeo/Custom-threads) repository.

# License

[MIT](http://www.opensource.org/licenses/mit-license.html)

# Disclaimer

This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Salesforce bears no responsibility to support the use or implementation of this software.
