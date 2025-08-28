export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number | undefined;
}

declare global {
  export interface Window {
    SalesforceInteractions: {
      init: (config: { consents: { provider: string; purpose: string; status: string }[] }) => Promise<void>;

      ConsentPurpose: { Tracking: string };
      ConsentStatus: { OptIn: string };
      getAnonymousId: () => string;

      CatalogObjectInteractionName: {
        ViewCatalogObject: string;
      };

      CartInteractionName: {
        AddToCart: string;
        RemoveFromCart: string;
      };

      OrderInteractionName: {
        Purchase: string;
      };

      sendEvent: (
        event:
          | {
              interaction: {
                name: string;
                chatMessage?: string;
                eventType?: string;
                category?: string;

                catalogObject?: {
                  type: string;
                  id: string;
                  attributes: {
                    name?: string;
                    category?: string;
                    price?: number;
                    rating?: number;
                    productDescription?: string;
                    productName?: string;
                  };
                };

                lineItem?: {
                  catalogObjectType: string;
                  catalogObjectId: string;
                  quantity: number | undefined;
                  price: number;
                  currency: string;
                  attributes: {
                    title: string;
                    description: string;
                    rating: number;
                    image: string;
                  };
                };

                order?: {
                  id: string;
                  totalValue: number;
                  currency: string;
                  lineItems: {
                    catalogObjectType: string;
                    catalogObjectId: string;
                    quantity: number | undefined;
                    price: number;
                    currency: string;
                    attributes: {
                      title: string;
                      description: string;
                      rating: number;
                      image: string;
                    };
                  }[];
                };

                firstName?: string;
                lastName?: string;
                email?: string;
                phoneNumber?: string;
                isAnonymous?: string;
              };
              user?: {
                attributes: {
                  name?: string;
                  eventType: string;
                  firstName: string;
                  lastName: string;
                  isAnonymous: string;
                  email: string;
                  phoneNumber: string;
                };
              };
            }
          | {
              user: {
                attributes: {
                  name?: string;
                  eventType: string;
                  firstName: string;
                  lastName: string;
                  isAnonymous: string;
                  email: string;
                  phoneNumber: string;
                };
              };
            }
      ) => void;
    };
  }
}
