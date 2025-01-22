import { Injectable, Inject } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    this.db = this.firebaseApp.firestore();
    this.collection = this.db.collection('test-collection'); // Use a test collection
  }

  // Method to test the Firebase connection
  async testConnection(): Promise<string> {
    try {
      // Try reading a document from the collection to test connection
      const snapshot = await this.collection.limit(1).get();
      if (snapshot.empty) {
        return 'No documents found in the test collection';
      } else {
        return 'Firebase connection is successful';
      }
    } catch (error) {
      console.error('Error connecting to Firebase:', error);
      throw new Error('Failed to connect to Firebase');
    }
  }
}
