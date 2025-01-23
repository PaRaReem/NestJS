import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';
import { FirebaseController } from './firebase.controller';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebase = configService.get('app.firebase');
    const {
      type,
      project_id,
      private_key,
      private_key_id,
      client_email,
      client_id,
      auth_uri,
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url,
      universe_domain,
    } = firebase;
    const firebaseConfig = {
      type: type,
      project_id: project_id,
      private_key_id: private_key_id,
      private_key: private_key,
      client_email: client_email,
      client_id: client_id,
      auth_uri: auth_uri,
      token_uri: token_uri,
      auth_provider_x509_cert_url: auth_provider_x509_cert_url,
      client_x509_cert_url: client_x509_cert_url,
      universe_domain: universe_domain,
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
