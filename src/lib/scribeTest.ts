// Test Scribe.js OCR implementation
import scribe from 'scribe.js-ocr';

console.log('🧪 Testing Scribe.js OCR...');

// Test if Scribe.js is properly imported
if (typeof scribe !== 'undefined' && scribe.extractText) {
  console.log('✅ Scribe.js imported successfully');
  console.log('📝 Available methods:', Object.keys(scribe));
} else {
  console.log('❌ Scribe.js not properly imported');
}

// Simple test function
export async function testScribeOCR(file: File): Promise<string> {
  try {
    console.log('🚀 Starting Scribe.js OCR test...');
    
    const startTime = Date.now();
    const results = await scribe.extractText([file]);
    const endTime = Date.now();
    
    console.log(`✅ Scribe.js OCR completed in ${endTime - startTime}ms`);
    console.log(`📝 Extracted text length: ${results[0]?.length || 0} characters`);
    
    return results[0] || '';
    
  } catch (error) {
    console.error('❌ Scribe.js OCR test failed:', error);
    throw error;
  }
}

console.log('🎯 Scribe.js test module loaded');
