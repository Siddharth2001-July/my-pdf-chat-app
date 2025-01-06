import * as pdfjsLib from 'pdfjs-dist';

// Use a local worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export const generateThumbnail = async (file, width = 200) => {
  try {
    // Convert File object to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    // Get the first page
    const page = await pdf.getPage(1);
    
    // Calculate height to maintain aspect ratio
    const viewport = page.getViewport({ scale: 1.0 });
    const scale = width / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = scaledViewport.height;
    
    // Render PDF page to canvas
    const context = canvas.getContext('2d');
    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
    };
    
    await page.render(renderContext).promise;
    
    // Convert canvas to data URL
    const thumbnailUrl = canvas.toDataURL('image/png');
    
    return thumbnailUrl;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
};