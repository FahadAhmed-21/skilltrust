const { ethers } = require('ethers');

class TokenService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    this.contractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    this.contractABI = [
      "function balanceOf(address owner) view returns (uint256)",
      "function transfer(address to, uint256 amount) returns (bool)",
      "function mint(address to, uint256 amount) returns (bool)",
      "event Transfer(address indexed from, address indexed to, uint256 value)"
    ];
  }

  async getBalance(walletAddress) {
    try {
      const contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
      const balance = await contract.balanceOf(walletAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async transferTokens(fromPrivateKey, toAddress, amount) {
    try {
      const wallet = new ethers.Wallet(fromPrivateKey, this.provider);
      const contract = new ethers.Contract(this.contractAddress, this.contractABI, wallet);
      
      const tx = await contract.transfer(toAddress, ethers.parseEther(amount.toString()));
      await tx.wait();
      
      return { success: true, txHash: tx.hash };
    } catch (error) {
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }

  async mintTokens(toAddress, amount) {
    try {
      const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
      const contract = new ethers.Contract(this.contractAddress, this.contractABI, wallet);
      
      const tx = await contract.mint(toAddress, ethers.parseEther(amount.toString()));
      await tx.wait();
      
      return { success: true, txHash: tx.hash };
    } catch (error) {
      throw new Error(`Minting failed: ${error.message}`);
    }
  }

  async rewardUser(userId, amount, reason) {
    // This would integrate with user service to update both blockchain and database
    try {
      const userService = require('./userService');
      const user = await userService.getUserById(userId);
      
      if (user.walletAddress) {
        await this.mintTokens(user.walletAddress, amount);
      }
      
      await userService.incrementTokens(userId, amount);
      
      return { success: true, amount, reason };
    } catch (error) {
      throw new Error(`Reward failed: ${error.message}`);
    }
  }
}

module.exports = new TokenService();