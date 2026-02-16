// Video preloading utility for better performance
export const preloadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    
    video.addEventListener('canplaythrough', () => {
      resolve(video);
    });
    
    video.addEventListener('error', (error) => {
      reject(error);
    });
    
    video.src = src;
  });
};

// Cache for preloaded videos
const videoCache = new Map();

export const getCachedVideo = async (src) => {
  if (videoCache.has(src)) {
    return videoCache.get(src);
  }
  
  try {
    const video = await preloadVideo(src);
    videoCache.set(src, video);
    return video;
  } catch (error) {
    console.warn('Failed to preload video:', src, error);
    return null;
  }
};

// Preload multiple videos in parallel
export const preloadVideos = async (sources) => {
  const promises = sources.map(src => getCachedVideo(src));
  return Promise.allSettled(promises);
};
