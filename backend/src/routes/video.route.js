import { Router } from "express";
import {
  getAllVideos,
  getFeaturedVideos,
  getMadeForYouVideos,
  getTrendingVideos,
} from "../controller/video.controller.js"; // Importando os controladores

const router = Router();

// Rota para obter todos os vídeos
router.get("/", getAllVideos);

// Rota para obter vídeos em destaque
router.get("/featured", getFeaturedVideos);

// Rota para obter vídeos feitos para você
router.get("/made-for-you", getMadeForYouVideos);

// Rota para obter vídeos em tendência
router.get("/trending", getTrendingVideos);

export default router;
