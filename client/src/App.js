import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [currentView, setCurrentView] = useState("landing"); // landing, dashboard

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        
        try {
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          setIsConnected(true);
          
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          
          setContract(contract);
          setProvider(provider);
          setCurrentView("dashboard");
        } catch (error) {
          console.log("User rejected connection");
        }
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        
        setContract(contract);
        setProvider(provider);
        setCurrentView("dashboard");
      } catch (error) {
        console.log("User rejected connection");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setIsConnected(false);
    setContract(null);
    setProvider(null);
    setCurrentView("landing");
  };

  return (
    <div className="App">
      <Header 
        isConnected={isConnected}
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        setModalOpen={setModalOpen}
        contract={contract}
      />
      
      {currentView === "landing" ? (
        <LandingPage connectWallet={connectWallet} />
      ) : (
        <div className="dashboard">
          <div className="dashboard-header">
            <div className="dashboard-nav">
              <button 
                className="back-to-home-btn glass-btn"
                onClick={() => setCurrentView("landing")}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
              </button>
            </div>
            <h1 className="dashboard-title">
              <span className="gradient-text">My Files</span>
            </h1>
            <p className="dashboard-subtitle">
              Decentralized file storage powered by blockchain
            </p>
          </div>
          
          <div className="dashboard-content">
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            />
            <Display contract={contract} account={account} />
          </div>
        </div>
      )}
      
      <Footer />
      
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract} />
      )}
    </div>
  );
}

export default App;