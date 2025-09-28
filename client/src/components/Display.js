import { useState, useEffect } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid, list
  const [sortBy, setSortBy] = useState("name"); // name, date, size
  const [searchTerm, setSearchTerm] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [showSharedFiles, setShowSharedFiles] = useState(false);

  useEffect(() => {
    if (contract && account) {
      loadFiles();
    }
  }, [contract, account]);

  const loadFiles = async () => {
    setLoading(true);
    try {
    let dataArray;
      if (showSharedFiles && otherAddress) {
        dataArray = await contract.display(otherAddress);
      } else {
        dataArray = await contract.display(account);
      }
      
      if (dataArray && dataArray.length > 0) {
        const fileList = dataArray.map((url, index) => {
          const fileName = extractFileName(url);
          const fileType = getFileType(fileName);
          return {
            id: index,
            name: fileName,
            url: url,
            type: fileType,
            size: "Unknown",
            date: new Date().toLocaleDateString(),
            isImage: isImageFile(fileName)
          };
        });
        
        setFiles(fileList);
    } else {
        setFiles([]);
      }
    } catch (e) {
      console.error("Error loading files:", e);
      showNotification("You don't have access to these files", "error");
    } finally {
      setLoading(false);
    }
  };

  const extractFileName = (url) => {
    // Extract filename from IPFS URL
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart || `File_${Date.now()}`;
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const typeMap = {
      'pdf': 'PDF Document',
      'doc': 'Word Document',
      'docx': 'Word Document',
      'txt': 'Text File',
      'jpg': 'JPEG Image',
      'jpeg': 'JPEG Image',
      'png': 'PNG Image',
      'gif': 'GIF Image',
      'mp4': 'MP4 Video',
      'avi': 'AVI Video',
      'mov': 'MOV Video',
      'mp3': 'MP3 Audio',
      'wav': 'WAV Audio',
      'zip': 'ZIP Archive',
      'rar': 'RAR Archive'
    };
    return typeMap[extension] || 'File';
  };

  const isImageFile = (fileName) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const extension = fileName.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
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

  const handleFileClick = (file) => {
    window.open(file.url, '_blank');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'size':
        return b.size.localeCompare(a.size);
      default:
        return 0;
    }
  });

  const showNotification = (message, type) => {
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

  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <div className="header-left">
          <h2 className="manager-title">
            <span className="gradient-text">My Files</span>
          </h2>
          <div className="file-count">
            {sortedFiles.length} {sortedFiles.length === 1 ? 'file' : 'files'}
          </div>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search files..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="view-controls">
            <select 
              className="sort-select glass-btn"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="size">Sort by Size</option>
            </select>
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H10V10H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 3H21V10H14V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 14H21V21H14V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 14H10V21H3V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="file-actions">
        <div className="action-left">
          <button 
            className={`action-btn ${!showSharedFiles ? 'active' : ''}`}
            onClick={() => {
              setShowSharedFiles(false);
              setOtherAddress("");
              loadFiles();
            }}
          >
            My Files
          </button>
          <button 
            className={`action-btn ${showSharedFiles ? 'active' : ''}`}
            onClick={() => setShowSharedFiles(true)}
          >
            Shared Files
          </button>
        </div>
        
        <div className="action-right">
          <button 
            className="refresh-btn glass-btn"
            onClick={loadFiles}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 15C19.9828 16.2984 19.1949 17.4642 18.2 18.4C17.2051 19.3358 16.0338 20.0098 14.7735 20.3683C13.5132 20.7268 12.2 20.7607 10.922 20.4672C9.644 20.1737 8.43618 19.5599 7.4 18.67L4 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 9C4.01725 7.70162 4.80512 6.53581 5.8 5.6C6.79489 4.66419 7.96616 3.99015 9.22648 3.63166C10.4868 3.27317 11.8 3.23926 13.078 3.53277C14.356 3.82628 15.5638 4.44005 16.6 5.33L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {showSharedFiles && (
        <div className="shared-files-input">
      <input
        type="text"
            placeholder="Enter wallet address to view shared files..."
            className="address-input"
            value={otherAddress}
            onChange={(e) => setOtherAddress(e.target.value)}
          />
          <button 
            className="load-shared-btn gradient-btn"
            onClick={loadFiles}
            disabled={!otherAddress}
          >
            Load Shared Files
          </button>
        </div>
      )}

      <div className="file-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner-large"></div>
            <p>Loading files...</p>
          </div>
        ) : sortedFiles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>No files found</h3>
            <p>
              {showSharedFiles 
                ? "Enter a wallet address to view shared files" 
                : "Upload your first file to get started"
              }
            </p>
          </div>
        ) : (
          <div className={`file-grid ${viewMode}`}>
            {sortedFiles.map((file) => (
              <div 
                key={file.id} 
                className="file-item"
                onClick={() => handleFileClick(file)}
              >
                <div className="file-preview">
                  {file.isImage ? (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="file-thumbnail"
                    />
                  ) : (
                    <div className="file-icon-preview">
                      {getFileIcon(file.name)}
                    </div>
                  )}
                </div>
                
                <div className="file-info">
                  <div className="file-name" title={file.name}>
                    {file.name}
                  </div>
                  <div className="file-meta">
                    <span className="file-type">{file.type}</span>
                    <span className="file-date">{file.date}</span>
                  </div>
                </div>
                
                <div className="file-actions-hover">
                  <button 
                    className="action-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(file.url, '_blank');
                    }}
                    title="Open"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
      </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default Display;