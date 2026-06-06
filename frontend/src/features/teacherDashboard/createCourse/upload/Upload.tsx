import React, { useRef, ChangeEvent } from "react";
import { ReactComponent as Videoicon } from "../../../../assets/images/video.svg";
import { ReactComponent as Audioicon } from "../../../../assets/images/audio.svg";
import { ReactComponent as PDF } from "../../../../assets/images/Pdf.svg";
import { ReactComponent as Text } from "../../../../assets/images/Text.svg";
import { ReactComponent as Documents } from "../../../../assets/images/documents.svg";
import "./Upload.scss";

const UploadData: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = event.target.files;
      // Handle the selected files here (e.g., upload or process them)
      console.log(selectedFiles);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-text">
        <h3>
          Drop files here,{" "}
          <span className="browse" onClick={handleBrowseClick}>
            browse files
          </span>{" "}
          or import from:
        </h3>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelect}
        multiple // Add this attribute if you want to allow selecting multiple files
      />
      {/* Second Div with icon and text */}
      <div className="upload-icon-wraper">
        <div className="upload-icon" onClick={handleBrowseClick}>
          <div className="icon">
            <Videoicon />
          </div>
          <div className="text">
            <p>Video</p>
          </div>
        </div>
        <div className="upload-icon" onClick={handleBrowseClick}>
          <div className="icon">
            <Audioicon />
          </div>
          <div className="text">
            <p>Audio</p>
          </div>
        </div>
        <div className="upload-icon" onClick={handleBrowseClick}>
          <div className="icon">
            <PDF />
          </div>
          <div className="text">
            <p>pdf</p>
          </div>
        </div>
        <div className="upload-icon" onClick={handleBrowseClick}>
          <div className="icon">
            <Text />
          </div>
          <div className="text">
            <p>Text</p>
          </div>
        </div>
        <div className="upload-icon" onClick={handleBrowseClick}>
          <div className="icon">
            <Documents />
          </div>
          <div className="text">
            <p>documents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadData;
