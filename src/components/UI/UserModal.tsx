import { useEffect, useRef, useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
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

import {
  writeToLocalStorage,
  readFromLocalStorage,
  deleteFromLocalStorage,
} from "../../utils/localStorageUtil";

declare const window: Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SalesforceInteractions: any;
  };

interface LoginModalProps {
  setIsModalOpen: (value: boolean) => void;
}

const UserModal = ({ setIsModalOpen }: LoginModalProps) => {
  const modalHeadingID = useUID();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const userTitleName = useRef(firstName);

  useEffect(() => {
    const isAuthenticated = readFromLocalStorage("isAuthenticated");

    if (isAuthenticated === "true") {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
      setPhoneNumber(user?.phoneNumber);

      userTitleName.current = user?.firstName;
    }
  }, [setIsModalOpen]);

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

  const handleSignOut = () => {
    writeToLocalStorage("isAuthenticated", "false");
    deleteFromLocalStorage("user");
    setIsModalOpen(false);

    window.SalesforceInteractions.sendEvent({
      user: {
        attributes: {
          name: "User Logged Out",
          eventType: "userLoggedOut",
          firstName,
          lastName,
          email,
          phoneNumber,
          isAnonymous: "1",
        },
      },
    });
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
            <Text
              as="span"
              fontSize="fontSize70"
              color="colorTextDecorative40"
              fontWeight="fontWeightBold"
            >
              {userTitleName.current}'s{" "}
            </Text>
            user information
          </ModalHeading>
          <Paragraph>Keep your information private!</Paragraph>
          <Text
            as="article"
            marginBottom="spaceNegative40"
            marginTop="spaceNegative60"
            fontStyle="italic"
            fontSize="fontSize20"
          >
            This information is stored in your browser's local storage.
          </Text>
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
              value={firstName}
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
              value={lastName}
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
              value={email}
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
              value={phoneNumber}
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
            <Button variant="destructive" onClick={handleSignOut}>
              Sign out
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Save changes
            </Button>
          </Stack>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
