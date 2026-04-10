const WalletCard = ({ wallet, onDelete }) => {
  return (
    <div className="bg-[#111827] p-5 rounded-2xl 
                    border border-white/10 
                    shadow-lg 
                    hover:shadow-blue-500/10 
                    transition-all duration-300">

      <h2 className="text-lg font-semibold mb-3 
                     bg-gradient-to-r from-blue-500 to-purple-500 
                     bg-clip-text text-transparent">
        Wallet
      </h2>

      <div className="space-y-3">
        <p className="text-sm break-all text-gray-300">
          <span className="font-semibold text-gray-400">Public Key:</span><br />
          {wallet.publicKey}
        </p>

        <p className="text-sm break-all text-gray-300">
          <span className="font-semibold text-gray-400">Private Key:</span><br />
          {wallet.privateKey}
        </p>
      </div>

      <button
        onClick={onDelete}
        className="mt-5 w-full 
                   bg-red-500/90 hover:bg-red-600 
                   px-3 py-2 
                   rounded-lg 
                   text-sm font-medium 
                   transition-all duration-200"
      >
        Delete Wallet
      </button>
    </div>
  );
};

export default WalletCard;