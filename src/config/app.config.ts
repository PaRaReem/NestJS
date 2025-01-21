import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.ENV || 'DEV',
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
}));

//*ตัวอย่างอนเรียกใช้
// constructor(
//     private configService: ConfigService
// ) {}
//   const { port, database, jwtSecret } = this.configService.get('app');
