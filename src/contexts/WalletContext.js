import React, { createContext, useContext, useState, useEffect } from 'react';
import walletService from '../services/walletService';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);
      const result = await walletService.connectWallet();
      
      setIsConnected(true);
      setAccount(result.account);
      setNetwork(result.network);
      
      // Get balance
      const balance = await walletService.getBalance();
      setBalance(balance);
      
      return result;
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    walletService.disconnect();
    setIsConnected(false);
    setAccount(null);
    setBalance('0');
    setNetwork(null);
  };

  const refreshBalance = async () => {
    if (isConnected && account) {
      try {
        const balance = await walletService.getBalance();
        setBalance(balance);
      } catch (error) {
        console.error('Failed to refresh balance:', error);
      }
    }
  };

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (walletService.isConnected()) {
        setIsConnected(true);
        setAccount(walletService.account);
        try {
          const balance = await walletService.getBalance();
          setBalance(balance);
          const network = await walletService.getNetwork();
          setNetwork(network);
        } catch (error) {
          console.error('Failed to get wallet info:', error);
        }
      }
    };
    checkConnection();
  }, []);

  const value = {
    isConnected,
    account,
    balance,
    network,
    loading,
    connectWallet,
    disconnectWallet,
    refreshBalance
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};