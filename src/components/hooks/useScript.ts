declare const window: Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SalesforceInteractions: any;
  };

const useScript = () => {
  const configureScriptUrl = (url: string) => {
    const script = document.createElement("script");
    script.src = url;

    script.onload = () => {
      window.SalesforceInteractions.init({
        consents: [
          {
            provider: "Test Provider",
            purpose: window.SalesforceInteractions.ConsentPurpose.Tracking,
            status: window.SalesforceInteractions.ConsentStatus.OptIn,
          },
        ],
      })
        .then(() => {
          console.log("Salesforce Interactions initialized");
        })
        .catch((error: Error) => {
          console.error("Salesforce Interactions failed to initialize", error);
        });
    };

    document.head.appendChild(script);
  };

  return configureScriptUrl;
};

export default useScript;
