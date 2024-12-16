import { Video } from "../models/video.model.js";

// Buscar todos os vídeos
export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

// Buscar vídeos em destaque (por exemplo, aleatórios)
export const getFeaturedVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      { $sample: { size: 6 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

// Buscar vídeos feitos para você (aleatórios)
export const getMadeForYouVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

// Buscar vídeos em tendência (aleatórios)
export const getTrendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.json(videos);
  } catch (error) {
    next(error);
  }
};
