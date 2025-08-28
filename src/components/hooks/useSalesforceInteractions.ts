import { Product } from "../../utils/types";
import { readFromLocalStorage } from "../../utils/localStorageUtil";

interface SalesforceInteractions {
  addToCartHook: (product: Product) => void;
  clearCartHook: () => void;
  purchaseHook: (cart: Product[]) => void;
  viewDetailsHook: (id: number, title: string, currentPath: string, price: number, rating: number) => void;
  removeItemFromCartHook: (product: Product) => void;
  userLoggedInHook: (firstName: string, lastName: string, email: string, phoneNumber: string) => void;
  userLoggedOutHook: (firstName: string, lastName: string, email: string, phoneNumber: string) => void;
}

const useSalesforceInteractions = (): SalesforceInteractions => {
  const userLoggedIn = JSON.parse(readFromLocalStorage("isAuthenticated") as string);

  const addToCartFunction = (product: Product) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    if (product === undefined) {
      return;
    }

    const { id, image, price, title, description, rating } = product;

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user added a product to the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CartInteractionName.AddToCart,
          lineItem: {
            catalogObjectType: "Product",
            catalogObjectId: id.toString(),
            quantity: 1,
            price,
            currency: "USD",
            attributes: {
              title,
              description,
              rating: rating.rate,
              image,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user added a product to the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CartInteractionName.AddToCart,
        lineItem: {
          catalogObjectType: "Product",
          catalogObjectId: id.toString(),
          quantity: 1,
          price: price,
          currency: "USD",
          attributes: {
            title,
            description,
            rating: rating.rate,
            image,
          },
        },
      },
    });

    return;
  };

  const clearCartFunction = () => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user cleared the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: "Cart Cleared",
          eventType: "cartCleared",
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user cleared the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: "Cart Cleared",
        eventType: "cartCleared",
      },
    });

    return;
  };

  const purchaseFunction = (cart: Product[]) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    const totalCartValue = cart.reduce((acc: number, product: Product) => acc + product.price * product.quantity!, 0);

    const lineItems = cart.map((product: Product) => {
      return {
        catalogObjectType: "Product",
        catalogObjectId: product.id.toString(),
        quantity: product.quantity,
        price: product.price,
        currency: "USD",
        attributes: {
          title: product.title,
          description: product.description,
          rating: product.rating.rate,
          image: product.image,
        },
      };
    });

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user purchased the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.OrderInteractionName.Purchase,
          order: {
            id: Math.random().toString(),
            totalValue: totalCartValue,
            currency: "USD",
            lineItems,
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that unknown user purchased the items in the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.OrderInteractionName.Purchase,
        order: {
          id: Math.random().toString(),
          totalValue: totalCartValue,
          currency: "USD",
          lineItems,
        },
      },
    });

    return;
  };

  const removeItemFromCartFunction = (product: Product) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user removed an item from the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CartInteractionName.RemoveFromCart,
          lineItem: {
            catalogObjectType: "Product",
            catalogObjectId: product.id.toString(),
            quantity: product.quantity,
            price: product.price,
            currency: "USD",
            attributes: {
              title: product.title,
              description: product.description,
              rating: product.rating.rate,
              image: product.image,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user removed an item from the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CartInteractionName.RemoveFromCart,
        lineItem: {
          catalogObjectType: "Product",
          catalogObjectId: product.id.toString(),
          quantity: product.quantity,
          price: product.price,
          currency: "USD",
          attributes: {
            title: product.title,
            description: product.description,
            rating: product.rating.rate,
            image: product.image,
          },
        },
      },
    });

    return;
  };

  const viewDetailsFunction = (id: number, title: string, currentPath: string, price: number, rating: number) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user viewed a product
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
          catalogObject: {
            type: "Product",
            id: id.toString(),
            attributes: {
              name: title,
              category: currentPath,
              price,
              rating,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user viewed the details of a product
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CatalogObjectInteractionName.ViewCatalogObject,
        catalogObject: {
          type: "Product",
          id: id.toString(),
          attributes: {
            name: title,
            category: currentPath,
            price,
            rating,
          },
        },
      },
    });

    return;
  };

  const userLoggedInFunction = (firstName: string, lastName: string, email: string, phoneNumber: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    window.SalesforceInteractions.sendEvent({
      user: {
        attributes: {
          name: "User Logged In",
          eventType: "userLoggedIn",
          firstName,
          lastName,
          email,
          phoneNumber,
          isAnonymous: "1",
        },
      },
    });

    return;
  };

  const userLoggedOutFunction = (firstName: string, lastName: string, email: string, phoneNumber: string) => {
    if (window.SalesforceInteractions === undefined) {
      return;
    }

    window.SalesforceInteractions.sendEvent({
      user: {
        attributes: {
          name: "User Logged Out",
          eventType: "userLoggedOut",
          firstName,
          lastName,
          email,
          phoneNumber,
          isAnonymous: "1",
        },
      },
    });

    return;
  };

  return {
    addToCartHook: addToCartFunction,
    clearCartHook: clearCartFunction,
    purchaseHook: purchaseFunction,
    viewDetailsHook: viewDetailsFunction,
    removeItemFromCartHook: removeItemFromCartFunction,
    userLoggedInHook: userLoggedInFunction,
    userLoggedOutHook: userLoggedOutFunction,
  };
};

export default useSalesforceInteractions;
