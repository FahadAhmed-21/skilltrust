import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

class WalletService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.account = null;
    this.mockMode = process.env.REACT_APP_USE_MOCKS === 'true';
  }

  async connectWallet() {
    try {
      const provider = await detectEthereumProvider();
      
      if (!provider) {
        if (this.mockMode) {
          return this.connectMockWallet();
        }
        return {
          success: false,
          error: 'MetaMask not installed',
          installUrl: 'https://metamask.io/download/'
        };
      }

      this.provider = new ethers.BrowserProvider(provider);
      
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      });
      
      this.account = accounts[0];
      this.signer = await this.provider.getSigner();
      
      return {
        success: true,
        account: this.account,
        network: await this.getNetwork()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getNetwork() {
    if (!this.provider) return null;
    const network = await this.provider.getNetwork();
    return {
      name: network.name,
      chainId: Number(network.chainId)
    };
  }

  async getBalance(address = this.account) {
    if (!this.provider || !address) return '0';
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async signMessage(message) {
    if (!this.signer) throw new Error('Wallet not connected');
    return await this.signer.signMessage(message);
  }

  async sendTransaction(to, amount) {
    if (!this.signer) throw new Error('Wallet not connected');
    
    const tx = {
      to,
      value: ethers.parseEther(amount.toString())
    };
    
    return await this.signer.sendTransaction(tx);
  }

  isConnected() {
    return !!this.account;
  }

  connectMockWallet() {
    this.account = '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87';
    return {
      success: true,
      account: this.account,
      network: { name: 'localhost', chainId: 1337 },
      mock: true
    };
  }

  disconnect() {
    this.provider = null;
    this.signer = null;
    this.account = null;
  }
}

export default new WalletService();