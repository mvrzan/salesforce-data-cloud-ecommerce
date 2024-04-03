import { Button } from "@twilio-paste/core/button";
import { UserIcon } from "@twilio-paste/icons/esm/UserIcon";

const UserButton = () => {
  return (
    <Button variant="primary_icon" size="reset">
      <UserIcon decorative={false} title="User settings" size="sizeIcon80" />
    </Button>
  );
};

export default UserButton;
