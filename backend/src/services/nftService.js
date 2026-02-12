const { getFirestore } = require('../config/firebase');

class NFTService {
  constructor() {
    this.db = getFirestore();
    this.collection = this.db.collection('nfts');
  }

  async mintNFT(nftData) {
    const nft = {
      ...nftData,
      mintedAt: new Date(),
      status: 'active'
    };

    const docRef = await this.collection.add(nft);
    return { id: docRef.id, ...nft };
  }

  async getNFTById(nftId) {
    const doc = await this.collection.doc(nftId).get();
    if (!doc.exists) {
      throw new Error('NFT not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async getUserNFTs(userId) {
    const snapshot = await this.collection
      .where('ownerId', '==', userId)
      .orderBy('mintedAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async transferNFT(nftId, newOwnerId) {
    await this.collection.doc(nftId).update({
      ownerId: newOwnerId,
      updatedAt: new Date()
    });
    return this.getNFTById(nftId);
  }
}

module.exports = new NFTService();