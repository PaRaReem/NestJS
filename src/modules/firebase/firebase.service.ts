import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { app } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { formatDateTimeFirebase } from 'src/common/utils/format.util';

@Injectable()
export class FirebaseService {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly collection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {
    this.db = this.firebaseApp.firestore();
    this.collection = this.db.collection('test-crud');
  }

  //#region testConnection | ทดสบการเชื่อมต่อ firebase
  async testConnection(): Promise<string> {
    try {
      const snapshot = await this.collection.limit(1).get();
      if (snapshot.empty) {
        return 'No documents found in the test collection';
      } else {
        return 'Firebase connection is successful';
      }
    } catch (error) {
      console.error('Error connecting to Firebase:', error);
      throw new BadRequestException('Failed to connect to Firebase');
    }
  }
  //#endregion
  //#region getCollection | เลือกcollection
  getCollection(collectionName: string): FirebaseFirestore.CollectionReference {
    return this.db.collection(collectionName);
  }
  //#endregion
  //#region | create
  async createDoc(collectionName: string, item: any) {
    try {
      const collection = this.getCollection(collectionName);
      const docRef = await collection.add({
        ...item, // ข้อมูลที่รับมา
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
      const docSnapshot = await docRef.get();
      return {
        id: docRef.id,
        ...formatDateTimeFirebase(docSnapshot.data()),
      };
    } catch (error) {
      console.error(`Error adding documents in "${collectionName}":`, error);
      throw new BadRequestException(
        `Failed to add documents in "${collectionName}"`,
      );
    }
  }
  //#endregion
  //#region | read
  async readDoc(collectionName: string, id?: string): Promise<any[]> {
    const collection = this.getCollection(collectionName);
    try {
      let querySnapshot = null;
      if (id) {
        const docSnapshot = await collection.doc(id).get();
        if (!docSnapshot.exists) {
          throw new NotFoundException(`Document with ID "${id}" not found.`);
        }
        return [
          {
            id: docSnapshot.id,
            ...formatDateTimeFirebase(docSnapshot.data()),
          },
        ];
      } else {
        querySnapshot = await collection.get();
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...formatDateTimeFirebase(doc.data()),
        }));
      }
    } catch (error) {
      console.error(`Error reading documents in "${collectionName}":`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to read documents in "${collectionName}"`,
      );
    }
  }
  //#endregion
  //#region | update

  async updateDoc(
    collectionName: string,
    id: string,
    updatedItem: any,
  ): Promise<any> {
    const collection = this.getCollection(collectionName);
    try {
      const docRef = collection.doc(id);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.exists) {
        throw new NotFoundException(`Document with ID "${id}" not found.`);
      }
      await docRef.update({
        ...updatedItem, // ข้อมูลที่รับมา
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { message: `Item with ID "${id}" updated successfully!` };
    } catch (error) {
      console.error(`Error updating document in "${collectionName}":`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to update document in "${collectionName}": ${error.message}`,
      );
    }
  }

  //#endregion
  //#region | delete
  async deleteDoc(collectionName: string, id: string): Promise<any> {
    const collection = this.getCollection(collectionName);
    try {
      const docRef = collection.doc(id);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.exists) {
        throw new NotFoundException(`Document with ID "${id}" not found.`);
      }
      await docRef.delete();
      return { message: `Item with ID "${id}" deleted successfully!` };
    } catch (error) {
      console.error(`Error deleting document in "${collectionName}":`, error);
      // Handle the error based on its type (Firestore related or other errors)
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to delete document in "${collectionName}": ${error.message}`,
      );
    }
  }
  //#endregion
}
