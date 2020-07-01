import React, { useCallback, useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { Card } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import cs from "classnames";

import ModalsContainer from "./components/modals";

const Container = styled.div`
  background-color: #e2e2e2;
`;

const CardContainer = styled.div`
  max-width: 25rem;
`;

function App() {
  const [user, setUser] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [previewData, setPreviewData] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const currentlyLoggedUser = window.localStorage.getItem("user");

    if (user) {
      window.localStorage.setItem("user", user);
    }

    if (window.localStorage.getItem("user")) {
      setUser(currentlyLoggedUser);
    }
  }, [user]);

  const handleLogOut = () => {
    window.localStorage.clear();

    setUser(null);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setIsUploading(true);
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
          setIsUploading(false);
        })
        .catch((err) => console.log(err));
    },
    [user]
  );

  useEffect(() => {
    if (user !== null) {
      axios
        .get("http://localhost:8080/uploads", { headers: { user } })
        .then((v) => {
          setUploadedFiles(v.data);
        });
    }
  }, [user]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container className="h-screen flex flex-col justify-center items-center">
      <CardContainer>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <div className="flex justify-between">
                <div>Hello, {user}.</div>

                <div
                  onClick={handleLogOut}
                  className="text-gray-500 text-sm cursor-pointer"
                >
                  Log out
                </div>
              </div>
            </Card.Header>

            <Card.Description>
              {isUploading ? (
                <div>Uploading files. Please wait..</div>
              ) : (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />

                  <p className={cs({ "text-green-500": isDragActive })}>
                    Drag and drop some files here to upload.
                  </p>
                </div>
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="text-black"> Previously uploaded files</div>
            <div
              style={{
                maxHeight: "12rem",
                overflow: "auto",
              }}
            >
              {uploadedFiles === null ? (
                <div className="mt-2">Loading files...</div>
              ) : uploadedFiles.length <= 0 ? (
                <div>No recently uploaded files.</div>
              ) : (
                uploadedFiles.map((v) => (
                  <div
                    key={v.file}
                    onClick={() => {
                      setPreviewData(v);
                    }}
                    className="my-2 cursor-pointer"
                  >
                    {v.fileName}
                  </div>
                ))
              )}
            </div>
          </Card.Content>
        </Card>
      </CardContainer>

      <ModalsContainer
        loginProps={{
          isLoggedIn: !Boolean(user),
          setUser,
        }}
        previewProps={{
          ...previewData,
          handlePreviewClose: () => setPreviewData({}),
        }}
      />
    </Container>
  );
}

export default App;
