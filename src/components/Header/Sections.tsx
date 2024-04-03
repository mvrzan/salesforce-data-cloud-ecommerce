import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

const Sections = () => {
  return (
    <Stack orientation="horizontal" spacing="space60">
      <Button variant="link">Home</Button>
      <Button variant="link">Men</Button>
      <Button variant="link">Women</Button>
      <Button variant="link">Jewelry</Button>
      <Button variant="link">Electronics</Button>
    </Stack>
  );
};

export default Sections;
