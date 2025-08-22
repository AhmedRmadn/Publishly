export async function retryWithBackoff(fn, retries = 3, delay = 500) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(res => setTimeout(res, delay * Math.pow(2, attempt - 1)));
    }
  }
}

export async function parallelUploadChunks({
  file,
  totalChunks,
  uploadId,
  concurrency = 4,
  onProgress,
  uploadFn,
}) {
  let uploadedCount = 0;
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < totalChunks) {
      const index = currentIndex++;
      await retryWithBackoff(() => uploadFn(uploadId, file, index));
      uploadedCount++;
      onProgress(Math.floor((uploadedCount / totalChunks) * 100));
    }
  }

  await Promise.all(new Array(concurrency).fill(null).map(() => worker()));
}
