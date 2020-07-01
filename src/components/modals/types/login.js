import React, { useState } from "react";
import { Button, Modal, Input } from "semantic-ui-react";

export default ({ isLoggedIn, setUser }) => {
  const [username, setUsername] = useState("");
  return (
    <Modal size="tiny" open={isLoggedIn} onClose={() => {}}>
      <Modal.Header>Log in to your account</Modal.Header>
      <Modal.Content>
        <div className="flex flex-col justify-center items-center">
          <div className="py-4 px-12 w-full">
            <Input
              value={username}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setUser(username);
                }
              }}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              placeholder="username"
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setUser(username)} positive content="Login" />
      </Modal.Actions>
    </Modal>
  );
};
