import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && contract && account) {
      setIsUploading(true);
      try {
        console.log("Starting upload process...");
        
        const formData = new FormData();
        formData.append("file", file);

        console.log("Uploading to Pinata...");
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API,
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log("Pinata upload successful:", resFile.data);
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        console.log("Adding to blockchain...");
        const tx = await contract.add(account, ImgHash);
        console.log("Transaction hash:", tx.hash);
        
        // Wait for transaction to be mined
        await tx.wait();
        console.log("Transaction confirmed!");
        
        // Show success notification
        showNotification("File uploaded successfully!", "success");
        setFileName("");
        setFile(null);
      } catch (error) {
        console.error("Upload error:", error);
        showNotification(`Failed to upload file: ${error.message}`, "error");
      } finally {
        setIsUploading(false);
      }
    } else {
      showNotification("Please select a file and ensure wallet is connected", "error");
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
    e.preventDefault();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setFileName(droppedFile.name);
    }
  };

  const showNotification = (message, type) => {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      background: ${type === 'success' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const iconMap = {
      'pdf': '📄',
      'doc': '📝',
      'docx': '📝',
      'txt': '📄',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🖼️',
      'mp4': '🎥',
      'avi': '🎥',
      'mov': '🎥',
      'mp3': '🎵',
      'wav': '🎵',
      'zip': '📦',
      'rar': '📦',
      'folder': '📁'
    };
    return iconMap[extension] || '📄';
  };

  return (
    <div className="file-upload-section">
      <div className="upload-container">
        <div className="upload-header">
          <h2 className="upload-title">
            <span className="gradient-text">Upload Files</span>
          </h2>
          <p className="upload-subtitle">
            Drag and drop files here or click to browse
          </p>
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'file-selected' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
        <input
          type="file"
              className="file-input"
              onChange={retrieveFile}
          id="file-upload"
              accept="*/*"
            />
            
            {!file ? (
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="upload-text">
                  <span className="upload-main-text">Choose files to upload</span>
                  <span className="upload-sub-text">or drag and drop</span>
                </div>
                <div className="upload-formats">
                  <span>PDF, DOC, IMG, MP4, MP3, ZIP</span>
                </div>
              </label>
            ) : (
              <div className="file-preview">
                <div className="file-info">
                  <div className="file-icon-large">
                    {getFileIcon(fileName)}
                  </div>
                  <div className="file-details">
                    <div className="file-name-large">{fileName}</div>
                    <div className="file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="remove-file-btn"
                  onClick={() => {
                    setFile(null);
                    setFileName("");
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {file && (
            <div className="upload-actions">
              <button 
                type="submit" 
                className={`upload-btn ${isUploading ? 'uploading' : ''}`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="spinner"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Upload to Blockchain
                  </>
                )}
        </button>
            </div>
          )}
      </form>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
