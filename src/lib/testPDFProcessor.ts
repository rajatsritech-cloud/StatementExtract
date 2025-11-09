import { PDFProcessor } from './pdfProcessor';

// Test function to verify the PDF processor works
export const testPDFProcessor = async () => {
  console.log('Testing PDF Processor...');
  
  // Test with sample text
  const sampleText = `
    John Doe
    john.doe@email.com
    Account: ****1234
    Chase Bank
    Statement Period: 01/01/2024 - 01/31/2024
    
    01/01/2024 Salary Deposit $5,000.00
    01/02/2024 Grocery Store -$150.00
    01/03/2024 Electric Bill -$200.00
    01/05/2024 Freelance Payment $1,200.00
  `;
  
  const result = PDFProcessor['extractDataFromText'](sampleText);
  
  console.log('Extracted Data:', result);
  
  return result;
};
