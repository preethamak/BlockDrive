import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [address, setAddress] = useState("");
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const loadAccessList = async () => {
      if (contract) {
        try {
          const addressList = await contract.shareAccess();
          setAccessList(addressList);
        } catch (error) {
          console.error("Error loading access list:", error);
        }
      }
    };
    loadAccessList();
  }, [contract]);

  const handleShare = async () => {
    if (!address.trim()) {
      showNotification("Please enter a wallet address", "error");
      return;
    }

    setLoading(true);
    try {
    await contract.allow(address);
      showNotification("Access granted successfully!", "success");
    setModalOpen(false);
    } catch (error) {
      console.error("Error sharing:", error);
      showNotification("Failed to grant access. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAccess = async () => {
    if (!selectedAddress) {
      showNotification("Please select an address to revoke", "error");
      return;
    }

    setLoading(true);
    try {
      await contract.disallow(selectedAddress);
      showNotification("Access revoked successfully!", "success");
      // Reload access list
      const addressList = await contract.shareAccess();
      setAccessList(addressList);
      setSelectedAddress("");
    } catch (error) {
      console.error("Error revoking access:", error);
      showNotification("Failed to revoke access. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

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

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="modal-background" onClick={() => setModalOpen(false)}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <span className="gradient-text">Share Files</span>
          </h2>
          <button 
            className="close-btn"
            onClick={() => setModalOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="share-section">
            <h3 className="section-title">Grant Access</h3>
            <p className="section-description">
              Enter a wallet address to grant access to your files
            </p>
            
            <div className="input-group">
            <input
              type="text"
                className="address-input"
                placeholder="Enter wallet address (0x...)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button 
                className="share-btn gradient-btn"
                onClick={handleShare}
                disabled={loading || !address.trim()}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Sharing...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Grant Access
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="access-section">
            <h3 className="section-title">Manage Access</h3>
            <p className="section-description">
              View and revoke access for users who can view your files
            </p>
            
            {accessList.length > 0 ? (
              <div className="access-list">
                <div className="access-header">
                  <span className="access-label">Address</span>
                  <span className="access-label">Status</span>
                  <span className="access-label">Actions</span>
                </div>
                
                {accessList.map((access, index) => (
                  <div key={index} className="access-item">
                    <div className="access-address">
                      <div className="address-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="address-text">{formatAddress(access.user)}</span>
                    </div>
                    
                    <div className="access-status">
                      <span className={`status-badge ${access.access ? 'active' : 'inactive'}`}>
                        {access.access ? 'Active' : 'Inactive'}
                      </span>
          </div>
                    
                    <div className="access-actions">
            <button
                        className="revoke-btn glass-btn"
              onClick={() => {
                          setSelectedAddress(access.user);
                          handleRevokeAccess();
                        }}
                        disabled={loading}
                        title="Revoke Access"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-access">
                <div className="empty-icon">👥</div>
                <p>No shared access yet</p>
                <span>Grant access to users to see them here</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="cancel-btn glass-btn"
            onClick={() => setModalOpen(false)}
          >
            Close
            </button>
          </div>
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

export default Modal;