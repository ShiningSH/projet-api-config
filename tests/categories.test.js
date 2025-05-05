import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server/app.js'; // ou le fichier qui exporte ton `express()` sans `listen`

describe('Categories API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should GET all categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 404 for non-existent category ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/categories/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});
