const AddWalletButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-center
                 hover:opacity-90 
                 px-6 py-2.5 
                 rounded-xl 
                 font-semibold 
                 shadow-lg 
                 shadow-blue-500/20 
                 transition-all duration-200 
                 active:scale-95"
    >
      + Add Wallet
    </button>
  );
};

export default AddWalletButton;