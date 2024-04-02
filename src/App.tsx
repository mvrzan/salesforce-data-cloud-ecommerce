import { Theme } from "@twilio-paste/core/theme";
import {
  Callout,
  CalloutHeading,
  CalloutText,
} from "@twilio-paste/core/callout";
import Navigation from "./components/Header/Navigation";

const App = () => (
  <Theme.Provider theme="default">
    <Navigation />
    <Callout variant="neutral">
      <CalloutHeading as="h2">Heads up!</CalloutHeading>
      <CalloutText>This is some information you need to know.</CalloutText>
    </Callout>
  </Theme.Provider>
);

export default App;
