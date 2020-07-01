import React from "react";
import { Modal } from "semantic-ui-react";
import ReactPlayer from "react-player";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default ({ file, fileName, handlePreviewClose }) => {
  const isVideo = fileName && fileName.toLowerCase().includes("mp4");
  const isPDF = fileName && fileName.toLowerCase().includes("pdf");

  return (
    <Modal size="tiny" open={file} onClose={handlePreviewClose}>
      <Modal.Header>viewing {fileName}</Modal.Header>
      <Modal.Content>
        <div className="flex justify-center items-center w-full h-full">
          {isVideo ? (
            <ReactPlayer
              controls={true}
              playing={true}
              url={file}
              alt="preview"
            />
          ) : isPDF ? (
            <iframe
              title="pdf-viewer"
              src={`http://docs.google.com/gview?url=${file}&embedded=true`}
              style={{ width: "718px", height: "700px" }}
              frameBorder="0"
            ></iframe>
          ) : (
            <img src={file} alt="preview" />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};
