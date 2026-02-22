import { account, databases } from './appwrite';
import { ID } from 'appwrite';

export const authService = {
  // User Registration with full profile
  async registerUser(userData) {
    try {
      const { email, password, ...profileData } = userData;
      
      // Create authentication account
      const user = await account.create(
        ID.unique(), 
        email, 
        password, 
        `${profileData.firstName} ${profileData.lastName}`
      );
      
      // Login the user
      await this.loginUser(email, password);
      
      // Prepare document data with proper types
      const documentData = {
        userId: user.$id,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        age: parseInt(profileData.age, 10),
        profession: profileData.profession,
        address: profileData.address,
        phoneNumber: profileData.phoneNumber,
        email: email,
      };

      // Add optional fields only if they have values
      if (profileData.institute) {
        documentData.institute = profileData.institute;
      }
      if (profileData.company) {
        documentData.company = profileData.company;
      }
      if (profileData.position) {
        documentData.position = profileData.position;
      }
      
      // Save additional user data to database
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        user.$id,
        documentData
      );
      
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile from database
  async getUserProfile(userId) {
    try {
      return await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
        userId
      );
    } catch (error) {
      throw error;
    }
  },

  // User Login
  async loginUser(email, password) {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  },

  // Admin Login
  async loginAdmin(email, password) {
    try {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      if (email !== adminEmail) {
        throw new Error('Unauthorized: Admin access only');
      }
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  },

  // Get Current User
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  // Logout
  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  },

  // Check if user is admin
  isAdmin(email) {
    return email === import.meta.env.VITE_ADMIN_EMAIL;
  }
};
