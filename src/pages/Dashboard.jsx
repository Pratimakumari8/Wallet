import { useState } from "react";
import AddWalletButton from "../components/AddWalletButton";
import WalletCard from "../components/WalletCard";

import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";

const Dashboard = () => {
  const [wallets, setWallets] = useState([]);
  const [mnemonic, setMnemonic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  // ➕ Add Wallet Click
  const handleAddWalletClick = () => {
    if (mnemonic) {
      generateWallet(); // already have seed → just add wallet
      return;
    }

    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setIsFirstTime(true); // 👈 first time
    setShowModal(true);
  };

  // 🔐 Generate Wallet
  const generateWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);

    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const newWallet = {
      publicKey: keypair.publicKey.toBase58(),
      privateKey: Array.from(keypair.secretKey)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    };

    setWallets([...wallets, newWallet]);
    setShowModal(false);
    setIsFirstTime(false);
  };

  // 🗑️ Delete Wallet
  const deleteWallet = (index) => {
    const updated = wallets.filter((_, i) => i !== index);
    setWallets(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      
      {/* 🔥 Title */}
      <h1 className="text-3xl text-center font-bold mb-6 
                     bg-gradient-to-r from-blue-500 to-purple-500 
                     bg-clip-text text-transparent">
        Web Wallet
      </h1>

      {/* ➕ Add Wallet Button */}
      <div className="flex justify-center mt-4">
        <AddWalletButton onClick={handleAddWalletClick} />
      </div>

      {/* 👁️ Show Secret Phrase Button */}
      {mnemonic && (
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-blue-400 hover:underline"
          >
            Show Secret Phrase
          </button>
        </div>
      )}

      {/* 💳 Wallet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {wallets.length === 0 ? (
          <div className="col-span-2 flex justify-center">
            <p className="text-gray-400 text-sm text-center mt-6 max-w-md">
              No wallets yet. Click "Add Wallet" to create one 🚀
            </p>
          </div>
        ) : (
          wallets.map((wallet, index) => (
            <WalletCard
              key={index}
              wallet={wallet}
              onDelete={() => deleteWallet(index)}
            />
          ))
        )}
      </div>

      {/* 🔐 Secret Phrase Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          
          <div className="bg-[#111827] p-6 rounded-2xl max-w-lg w-full border border-white/10">
            
            <h2 className="text-xl font-semibold mb-4 text-center">
              Your Secret Phrase
            </h2>

            <p className="text-sm text-gray-400 mb-4 text-center">
              Save this phrase securely. It cannot be recovered.
            </p>

            {/* 🔑 Phrase Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {mnemonic.split(" ").map((word, i) => (
                <div
                  key={i}
                  className="bg-black/30 p-2 rounded text-center text-sm"
                >
                  {word}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Close
              </button>

              {/* Only show Continue first time */}
              {isFirstTime && (
                <button
                  onClick={generateWallet}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;