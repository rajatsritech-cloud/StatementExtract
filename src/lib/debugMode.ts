// Debug script to help identify UI issues
console.log('🔍 === DEBUG MODE ACTIVATED ===');

// Monitor file upload events
let uploadEvents = [];

// Override the file upload handler to add debugging
if (typeof window !== 'undefined') {
  // Monitor all console logs
  const originalLog = console.log;
  console.log = function(...args) {
    originalLog.apply(console, args);
    
    // Store upload-related logs
    const message = args.join(' ');
    if (message.includes('📁') || message.includes('📄') || message.includes('🔄')) {
      uploadEvents.push({
        timestamp: new Date().toISOString(),
        message: message
      });
    }
  };
  
  // Monitor errors
  const originalError = console.error;
  console.error = function(...args) {
    originalError.apply(console, args);
    
    const message = args.join(' ');
    if (message.includes('❌') || message.includes('Error')) {
      uploadEvents.push({
        timestamp: new Date().toISOString(),
        type: 'error',
        message: message
      });
    }
  };
  
  // Function to show debug info
  window.showUploadDebug = function() {
    console.log('📊 === UPLOAD DEBUG INFO ===');
    console.log('Total events captured:', uploadEvents.length);
    uploadEvents.forEach((event, index) => {
      console.log(`${index + 1}. [${event.timestamp}] ${event.type || 'info'}: ${event.message}`);
    });
    
    // Check if processing modal is visible
    const processingModal = document.querySelector('[class*="processing"]');
    console.log('Processing modal visible:', !!processingModal);
    
    // Check if results modal is visible
    const resultsModal = document.querySelector('[class*="results"]');
    console.log('Results modal visible:', !!resultsModal);
    
    // Check React state (approximate)
    console.log('🔍 React state check:');
    console.log('- isProcessing state:', document.body.innerHTML.includes('Processing...'));
    console.log('- showResults state:', document.body.innerHTML.includes('Transaction Details'));
  };
  
  // Function to test file upload manually
  window.testFileUpload = function() {
    console.log('🧪 Testing file upload manually...');
    
    // Create a mock file
    const mockFile = new File(['test content'], 'test-statement.pdf', {
      type: 'application/pdf'
    });
    
    // Find the file input
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      console.log('✅ File input found');
      
      // Create event
      const event = new Event('change', { bubbles: true });
      
      // Mock the files
      Object.defineProperty(fileInput, 'files', {
        value: [mockFile],
        writable: false
      });
      
      // Trigger the event
      fileInput.dispatchEvent(event);
      console.log('🔄 File upload event triggered');
    } else {
      console.log('❌ File input not found');
    }
  };
  
  // Function to reset debug
  window.resetDebug = function() {
    uploadEvents = [];
    console.log('🔄 Debug logs cleared');
  };
  
  console.log('🔧 Debug functions loaded:');
  console.log('- showUploadDebug() - Show upload events');
  console.log('- testFileUpload() - Test file upload manually');
  console.log('- resetDebug() - Clear debug logs');
  
  // Auto-show debug after 10 seconds
  setTimeout(() => {
    console.log('⏰ Auto-debug check...');
    window.showUploadDebug();
  }, 10000);
}

export {};
