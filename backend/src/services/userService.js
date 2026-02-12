const { getFirestore } = require('../config/firebase');

class UserService {
  get db() {
    if (!this._db) {
      this._db = getFirestore();
    }
    return this._db;
  }

  get collection() {
    return this.db.collection('users');
  }

  async getUserById(userId) {
    const doc = await this.collection.doc(userId).get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return { id: doc.id, ...doc.data() };
  }

  async createUser(userId, userData) {
    const userDoc = {
      name: userData.name || '',
      email: userData.email || '',
      tokens: 0,
      nfts: [],
      reputation: 0,
      completedSessions: 0,
      languages: userData.languages || [],
      profileImage: userData.profileImage || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.collection.doc(userId).set(userDoc);
    return { id: userId, ...userDoc };
  }

  async updateUser(userId, updateData) {
    const updateDoc = {
      ...updateData,
      updatedAt: new Date()
    };

    await this.collection.doc(userId).update(updateDoc);
    return this.getUserById(userId);
  }

  async incrementTokens(userId, amount) {
    const userRef = this.collection.doc(userId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        throw new Error('User not found');
      }
      const currentTokens = doc.data().tokens || 0;
      transaction.update(userRef, { 
        tokens: currentTokens + amount,
        updatedAt: new Date()
      });
    });
  }

  async addNFT(userId, nftData) {
    const userRef = this.collection.doc(userId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        throw new Error('User not found');
      }
      const currentNFTs = doc.data().nfts || [];
      transaction.update(userRef, { 
        nfts: [...currentNFTs, nftData],
        updatedAt: new Date()
      });
    });
  }

  async incrementCompletedSessions(userId) {
    const userRef = this.collection.doc(userId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        throw new Error('User not found');
      }
      const currentSessions = doc.data().completedSessions || 0;
      transaction.update(userRef, { 
        completedSessions: currentSessions + 1,
        updatedAt: new Date()
      });
    });
  }

  async updateReputation(userId, value) {
    const userRef = this.collection.doc(userId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        throw new Error('User not found');
      }
      const currentReputation = doc.data().reputation || 0;
      transaction.update(userRef, { 
        reputation: currentReputation + value,
        updatedAt: new Date()
      });
    });
  }

  async deductTokens(userId, amount) {
    const userRef = this.collection.doc(userId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        throw new Error('User not found');
      }
      const currentTokens = doc.data().tokens || 0;
      if (currentTokens < amount) {
        throw new Error('Insufficient tokens');
      }
      transaction.update(userRef, { 
        tokens: currentTokens - amount,
        updatedAt: new Date()
      });
    });
  }

  async addTokens(userId, amount) {
    const userRef = this.collection.doc(userId);
    await this.db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        throw new Error('User not found');
      }
      const currentTokens = doc.data().tokens || 0;
      transaction.update(userRef, { 
        tokens: currentTokens + amount,
        updatedAt: new Date()
      });
    });
  }
}

module.exports = new UserService();