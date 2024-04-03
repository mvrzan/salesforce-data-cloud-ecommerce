import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { useNavigate } from "react-router-dom";

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
    <Stack orientation="horizontal" spacing="space60">
      <Button variant="link" onClick={homeClicked}>
        Home
      </Button>
      <Button variant="link" onClick={menClicked}>
        Men
      </Button>
      <Button variant="link" onClick={womenClicked}>
        Women
      </Button>
      <Button variant="link" onClick={jewelryClicked}>
        Jewelry
      </Button>
      <Button variant="link" onClick={electronicsClicked}>
        Electronics
      </Button>
    </Stack>
  );
};

export default Sections;
