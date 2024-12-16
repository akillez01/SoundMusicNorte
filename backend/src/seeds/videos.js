import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Video } from '../models/video.model.js'; // Certifique-se de que o caminho está correto

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Conectar ao banco de dados
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to the database');
    // Inserir dados de vídeos
    return Video.insertMany([
      { title: 'Video 1', artist: 'Artist 1', imageUrl: 'https://example.com/image1.jpg', audioUrl: 'https://example.com/audio1.mp3', duration: 300 },
      { title: 'Video 2', artist: 'Artist 2', imageUrl: 'https://example.com/image2.jpg', audioUrl: 'https://example.com/audio2.mp3', duration: 320 }
    ]);
  })
  .then(() => {
    console.log('Videos seeded successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Error seeding videos:', err);
    process.exit(1);
  });
