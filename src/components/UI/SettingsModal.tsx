import { useState, useEffect } from "react";

import { Modal, ModalBody, ModalHeader, ModalFooter, ModalHeading, ModalFooterActions } from "@twilio-paste/core/modal";
import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/core/text";
import { Label } from "@twilio-paste/core/label";
import { Stack } from "@twilio-paste/core/stack";
import { Input } from "@twilio-paste/core/input";
import { Button } from "@twilio-paste/core/button";
import { HelpText } from "@twilio-paste/core/help-text";
import { useUID } from "@twilio-paste/core/uid-library";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";

import useScript from "../hooks/useScript";

interface CheckoutModalProps {
  setIsModalOpen: (value: boolean) => void;
}

const SettingsModal = ({ setIsModalOpen }: CheckoutModalProps) => {
  const [scriptUrl, setScriptUrl] = useState("");
  const modalHeadingID = useUID();
  const configureScriptUrl = useScript();

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="c360a.min.js"]');
    if (existingScript) {
      setScriptUrl(existingScript.getAttribute("src")!);
      return;
    }
  }, []);

  const saveChangesHandler = () => {
    setIsModalOpen(false);
    configureScriptUrl(scriptUrl);
  };

  return (
    <Modal
      isOpen
      onDismiss={() => {
        setIsModalOpen(false);
      }}
      size="default"
      ariaLabelledby="settings-modal"
    >
      <ModalHeader>
        <Stack orientation="vertical" spacing="space20">
          <ModalHeading id={modalHeadingID}>
            This is a
            <Text as="span" fontSize="fontSize70" color="colorTextDecorative40" fontWeight="fontWeightBold">
              {" "}
              settings modal!
            </Text>
          </ModalHeading>
          <Paragraph>Here you can change your Data Cloud CDN script URL.</Paragraph>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Stack orientation="vertical" spacing="space40">
          <Separator orientation="horizontal" verticalSpacing="space10" />
          <Box>
            <Label htmlFor="script_url" id="script_url-label" required>
              Data Cloud CDN Script URL
            </Label>
            <Input
              id="script_url"
              name="script_url"
              placeholder="https://cdn.c360a.salesforce.com/beacon/c360a/xxxx/scripts/c360a.min.js"
              type="text"
              value={scriptUrl}
              required
              autoComplete="given-name"
              onChange={(event) => {
                setScriptUrl(event.target.value);
              }}
            />
            <HelpText>Enter your Data Cloud tenant endpoint URL</HelpText>
          </Box>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button
            variant="destructive"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveChangesHandler}>
            Save changes
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};
export default SettingsModal;
