import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { Card } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import ModalsContainer from "./components/modals";

const Container = styled.div`
  background-color: #e2e2e2;
`;

const CardContainer = styled.div`
  max-width: 25rem;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentlyLoggedUser = window.localStorage.getItem("user");

    if (user) {
      window.localStorage.setItem("user", user);
    }

    if (window.localStorage.getItem("user")) {
      setUser(currentlyLoggedUser);
    }
  }, [user]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const formData = new FormData();

      for (let i = 0; i < acceptedFiles.length; i++) {
        formData.append("files", acceptedFiles[i]);
      }

      axios
        .post(`http://localhost:8080/upload`, formData, {
          headers: {
            user,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    [user]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container className="h-screen flex justify-center items-center">
      <CardContainer>
        <Card fluid>
          <Card.Content>
            <Card.Header>Hello, {user}.</Card.Header>

            <Card.Description>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here!</p>
                ) : (
                  <p>Drag and drop some files here to upload.</p>
                )}
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Previously uploaded files
            <div>
              <div>file 1</div>
              <div>file 1</div>
              <div>file 1</div>
            </div>
          </Card.Content>
        </Card>
      </CardContainer>

      <ModalsContainer
        loginProps={{
          isLoggedIn: !Boolean(user),
          setUser,
        }}
      />
    </Container>
  );
}

export default App;
