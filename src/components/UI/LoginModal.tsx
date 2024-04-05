import { useEffect, useState } from "react";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalHeading,
  ModalFooterActions,
} from "@twilio-paste/core/modal";
import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/core/text";
import { Input } from "@twilio-paste/core/input";
import { Stack } from "@twilio-paste/core/stack";
import { Label } from "@twilio-paste/core/label";
import { Button } from "@twilio-paste/core/button";
import { useUID } from "@twilio-paste/core/uid-library";
import { HelpText } from "@twilio-paste/core/help-text";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";

import { writeToLocalStorage } from "../../utils/localStorageUtil";

interface LoginModalProps {
  setIsModalOpen: (value: boolean) => void;
}

const LoginModal = ({ setIsModalOpen }: LoginModalProps) => {
  const modalHeadingID = useUID();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (firstName && lastName && email) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, email]);

  const handleLogin = () => {
    writeToLocalStorage("isAuthenticated", "true");
    writeToLocalStorage("user", {
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen
      onDismiss={() => {
        setIsModalOpen(false);
      }}
      size="default"
      ariaLabelledby="login-modal"
    >
      <ModalHeader>
        <Stack orientation="vertical" spacing="space20">
          <ModalHeading id={modalHeadingID}>
            Welcome to
            <Text
              as="span"
              fontSize="fontSize70"
              color="colorTextDecorative40"
              fontWeight="fontWeightBold"
            >
              {" "}
              Data Cloud Shopping!
            </Text>
          </ModalHeading>
          <Paragraph>Let's get you signed up!</Paragraph>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Stack orientation="vertical" spacing="space40">
          <Separator orientation="horizontal" verticalSpacing="space10" />
          <Box>
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              name="first_name_input_field"
              placeholder="First Name"
              type="text"
              required
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <HelpText>Enter your last name</HelpText>
          </Box>
          <Box>
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              name="last_name_input_field"
              placeholder="Last Name"
              type="text"
              required
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <HelpText>Enter your first name</HelpText>
          </Box>
          <Box>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email_input_field"
              placeholder="Email address"
              type="email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <HelpText>Enter your email address</HelpText>
          </Box>
          <Box>
            <Label htmlFor="password">Phone number</Label>
            <Input
              id="phone_number"
              name="phone_number_input_field"
              placeholder="+123456789 - Optional"
              type="text"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
            <HelpText>Enter your password</HelpText>
          </Box>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Stack orientation="horizontal" spacing="space60">
            <Button variant="destructive" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleLogin}
              disabled={isButtonDisabled}
            >
              Sign up and Log in
            </Button>
          </Stack>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
