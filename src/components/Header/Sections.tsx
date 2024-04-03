import { useNavigate } from "react-router-dom";

import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

const Sections = () => {
  const navigate = useNavigate();

  const homeClicked = () => {
    navigate("/home");
  };

  const menClicked = () => {
    navigate("/men");
  };

  const womenClicked = () => {
    navigate("/women");
  };

  const jewelryClicked = () => {
    navigate("/jewelry");
  };

  const electronicsClicked = () => {
    navigate("/electronics");
  };

  return (
    <Stack orientation="horizontal" spacing="space120">
      <Button variant="link" onClick={homeClicked}>
        <Text as="p" fontSize="fontSize70">
          Home
        </Text>
      </Button>
      <Button variant="link" onClick={menClicked}>
        <Text as="p" fontSize="fontSize70">
          Men
        </Text>
      </Button>
      <Button variant="link" onClick={womenClicked}>
        <Text as="p" fontSize="fontSize70">
          Women
        </Text>
      </Button>
      <Button variant="link" onClick={jewelryClicked}>
        <Text as="p" fontSize="fontSize70">
          Jewelry
        </Text>
      </Button>
      <Button variant="link" onClick={electronicsClicked}>
        <Text as="p" fontSize="fontSize70">
          Electronics
        </Text>
      </Button>
    </Stack>
  );
};

export default Sections;
