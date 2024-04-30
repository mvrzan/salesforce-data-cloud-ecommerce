import { useState } from "react";

import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { ProductSettingsIcon } from "@twilio-paste/icons/esm/ProductSettingsIcon";

import SettingsModal from "../UI/SettingsModal";

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Box marginLeft="space60" marginTop="space30">
      {isModalOpen && <SettingsModal setIsModalOpen={setIsModalOpen} />}
      <Button
        variant="primary_icon"
        size="reset"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <ProductSettingsIcon decorative={false} title="Description of icon" />
      </Button>
    </Box>
  );
};

export default SettingsButton;
