import { useState, useEffect } from "react";

import UserModal from "../UI/UserModal";
import LoginModal from "../UI/LoginModal";
import { readFromLocalStorage } from "../../utils/localStorageUtil";

import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { UserIcon } from "@twilio-paste/icons/esm/UserIcon";
import { LogInIcon } from "@twilio-paste/icons/esm/LogInIcon";

const UserButton = () => {
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = readFromLocalStorage("isAuthenticated");
    if (isAuthenticated === "true") {
      const user = JSON.parse(readFromLocalStorage("user") as string);
      setUserName(user?.firstName);
      setIsAuthenticated(true);
    }

    if (isAuthenticated === "false") {
      setUserName("");
      setIsAuthenticated(false);
    }
  }, [isModalOpen]);

  return (
    <Box marginRight="space40">
      {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} />}
      {isModalOpen && isAuthenticated && (
        <UserModal setIsModalOpen={setIsModalOpen} />
      )}
      <Button
        variant="primary_icon"
        size="reset"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {isAuthenticated ? (
          <>
            {userName}
            <UserIcon
              decorative={false}
              title="User settings"
              size="sizeIcon80"
            />
          </>
        ) : (
          <>
            Log in
            <LogInIcon
              decorative={false}
              title="User settings"
              size="sizeIcon80"
            />
          </>
        )}
      </Button>
    </Box>
  );
};

export default UserButton;
