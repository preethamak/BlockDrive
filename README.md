# BlockDrive (Hardhat + React + Pinata)

This repository contains a decentralized file storage DApp:
- Smart contracts (Hardhat)
- Frontend client (React/CRA)
- IPFS via Pinata API

The DApp lets users upload files to IPFS (through Pinata) and store the resulting IPFS URL on-chain with access control.

## Repository layout

- `BlockDrive/` — project root
  - `contracts/Upload.sol` — Solidity contract for storing IPFS URLs and managing access lists
  - `scripts/deploy.js` — Hardhat deployment script
  - `hardhat.config.js` — Hardhat configuration (artifacts output to `client/src/artifacts`)
  - `client/` — React app (consumes the ABI and addresses)
    - `src/components/FileUpload.js` — handles Pinata upload and contract write

A separate README exists at `BlockDrive/README.md` with an overview; this root README is the canonical, actionable guide.

## Prerequisites

- Node.js 18.x and npm 9+
- A wallet (e.g., MetaMask) in your browser
- Pinata account with API key/secret

Optional but recommended:
- An Ethereum RPC provider (e.g., Alchemy, Infura) for testnets

## Environment variables

For security, store secrets in environment files instead of hardcoding in source code. The current `client/src/components/FileUpload.js` includes inline Pinata credentials. Replace those with environment variables.

1) Create `BlockDrive/client/.env` with:

```
REACT_APP_PINATA_API_KEY=your_pinata_api_key
REACT_APP_PINATA_SECRET_API_KEY=your_pinata_secret
REACT_APP_PINATA_JWT=optional_jwt_from_pinata
REACT_APP_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

2) Update `FileUpload.js` to read from `process.env.REACT_APP_*` (instructions below).

For Hardhat networks (deploying to testnets), create `BlockDrive/.env` (and add `require('dotenv').config()` in `hardhat.config.js`) with:

```
ALCHEMY_API_KEY=...
INFURA_API_KEY=...
PRIVATE_KEY=0x...
``` 

Then extend `networks` in `hardhat.config.js` accordingly (example below).

## Install and build

From repo root:

- Install Hardhat deps and compile contracts
  - `cd BlockDrive`
  - `npm install`
  - `npx hardhat compile`

- Install client deps and run dev server
  - `cd client`
  - `npm install`
  - `npm start`

React dev server runs on http://localhost:3000

## Local blockchain (optional)

You can run a local Hardhat node and deploy contracts for end-to-end local testing.

- Start node: `cd BlockDrive && npx hardhat node`
- In a new shell, deploy: `npx hardhat run scripts/deploy.js --network localhost`
- Copy the printed contract address and update the frontend configuration (see below) so the app points to the correct address.

## Frontend contract wiring

The contract artifacts (ABI) are written to `client/src/artifacts`. After deployment, pass the deployed address to your frontend where it instantiates the contract. Typically this is in `client/src/App.js`.

Example wiring (pseudocode):

- Get provider via `window.ethereum`
- Create signer and contract: `new ethers.Contract(address, abi, signer)`
- Pass `contract` and `account` to `FileUpload` component

Ensure the deployed address is updated anytime you redeploy.

## Pinata/IPFS workflow

- User selects a file in the frontend
- The app calls Pinata's `pinFileToIPFS` with your API key/secret (or JWT) to pin the file
- The resulting IPFS hash is combined with the gateway URL and sent to the smart contract via `Upload.add(user, url)`

Security note: Prefer using a server-side function or Pinata JWT to avoid exposing raw API keys in the browser. If you must use browser-only, rotate keys regularly and restrict them in Pinata.

## Recommended improvements (optional)

- Move Pinata keys to env variables and remove hardcoded strings in `FileUpload.js`
- Add testnets to `hardhat.config.js` (e.g., Sepolia):

```js
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: '0.8.9',
  networks: {
    hardhat: { chainId: 1337 },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  paths: { artifacts: './client/src/artifacts' }
};
```

- After deployment to testnet, write the address to a file the frontend can import, e.g., `client/src/contract-address.json`:

```json
{ "Upload": "0xDeployedAddressHere" }
```

and import it in the app code.

## Continuous Integration

A GitHub Actions workflow is provided at `.github/workflows/ci.yml`:
- Installs dependencies
- Compiles contracts
- Runs tests (if present)
- Builds the React client
- Uploads build outputs and contract artifacts as CI artifacts

Trigger: on push/PR to `main` or `master` that touch `Dgdrive3.0/**`.

## Deployment

- Static hosting for the client: deploy `Dgdrive3.0/client/build` to any static host (e.g., GitHub Pages, Netlify, Vercel). For GitHub Pages for a CRA app, you can add `homepage` and a `gh-pages` script in `client/package.json`.
- Contract deployment: use `npx hardhat run scripts/deploy.js --network <network>` with credentials configured in `hardhat.config.js`.

## Contracts

`Upload.sol` exposes:
- `add(address user, string url)` — append an IPFS URL under the user's list
- `allow(address user)` / `disallow(address user)` — grant/revoke read access
- `display(address user)` — returns user's urls, requires owner or granted access
- `shareAccess()` — returns access list for the sender

## Security checklist

- Do not commit `.env` files. Add to `.gitignore`.
- Do not ship raw Pinata API keys to the browser; use JWT or a backend proxy.
- Validate file types/size in the frontend before upload.
- Handle contract reorgs and transaction failures gracefully in the UI.

## License

SPDX-License-Identifier: GPL-3.0
