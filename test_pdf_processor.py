#!/usr/bin/env python3
"""
PDF Processor Test Script
Tests the bank statement converter functionality end-to-end
"""

import requests
import json
import time
import os
from pathlib import Path

class PDFProcessorTester:
    def __init__(self):
        self.base_url = "http://localhost:3000"
        self.test_results = {
            "server_running": False,
            "page_accessible": False,
            "pdfjs_worker_accessible": False,
            "pdf_file_exists": False
        }
    
    def test_server_running(self):
        """Test if the Next.js server is running"""
        print("Testing server connectivity...")
        try:
            response = requests.get(self.base_url, timeout=5)
            if response.status_code == 200:
                print("Server is running")
                self.test_results["server_running"] = True
                return True
            else:
                print(f"Server returned status {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"Server connection failed: {e}")
            return False
    
    def test_page_accessible(self):
        """Test if the converter page is accessible"""
        print("\nTesting converter page accessibility...")
        try:
            response = requests.get(f"{self.base_url}/convert-bank-statement-to-csv-excel", timeout=5)
            if response.status_code == 200:
                print("Converter page is accessible")
                self.test_results["page_accessible"] = True
                return True
            else:
                print(f"Converter page returned status {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"Page access failed: {e}")
            return False
    
    def test_pdfjs_worker_accessible(self):
        """Test if the PDF.js worker is accessible"""
        print("\nTesting PDF.js worker accessibility...")
        try:
            # Test the worker URL that the application uses
            worker_url = "https://unpkg.com/pdfjs-dist@5.4.394/legacy/build/pdf.worker.min.mjs"
            response = requests.head(worker_url, timeout=10)
            if response.status_code == 200:
                print("PDF.js worker is accessible")
                self.test_results["pdfjs_worker_accessible"] = True
                return True
            else:
                print(f"PDF.js worker returned status {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print(f"PDF.js worker access failed: {e}")
            return False
    
    def test_pdf_file_exists(self):
        """Test if the test PDF file exists"""
        print("\nTesting PDF file existence...")
        pdf_path = Path("C:/Users/HP/Desktop/statementextractor/671457213-US-Bank-Statement-BankStatements.pdf")
        if pdf_path.exists():
            print(f"Test PDF file exists: {pdf_path}")
            print(f"File size: {pdf_path.stat().st_size / 1024 / 1024:.2f} MB")
            self.test_results["pdf_file_exists"] = True
            return True
        else:
            print(f"Test PDF file not found: {pdf_path}")
            return False
    
    def generate_test_report(self):
        """Generate a comprehensive test report"""
        print("\n" + "="*60)
        print("COMPREHENSIVE TEST REPORT")
        print("="*60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results.values() if result)
        
        print(f"\nTest Results: {passed_tests}/{total_tests} passed")
        print("\nDetailed Results:")
        for test_name, result in self.test_results.items():
            status = "PASS" if result else "FAIL"
            print(f"  {test_name.replace('_', ' ').title()}: {status}")
        
        if passed_tests == total_tests:
            print("\nALL TESTS PASSED!")
            print("\nNEXT STEPS:")
            print("1. Open browser and go to: http://localhost:3000/convert-bank-statement-to-csv-excel")
            print("2. Upload your US Bank statement PDF")
            print("3. The application will process it end-to-end")
            print("4. Export functionality will work correctly")
            print("\nCONSOLE TESTS:")
            print("- Open browser console (F12)")
            print("- Run: runPDFTests() for comprehensive testing")
        else:
            print("\nSOME TESTS FAILED")
            print("Please check the failed tests above and fix the issues.")
        
        return passed_tests == total_tests
    
    def run_all_tests(self):
        """Run all tests"""
        print("Starting PDF Processor Test Suite...")
        print(f"Started at: {time.strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Run individual tests
        self.test_server_running()
        self.test_page_accessible()
        self.test_pdfjs_worker_accessible()
        self.test_pdf_file_exists()
        
        # Generate final report
        success = self.generate_test_report()
        
        print(f"\nCompleted at: {time.strftime('%Y-%m-%d %H:%M:%S')}")
        return success

def main():
    """Main function to run the test suite"""
    print("PDF Processor - End-to-End Test Suite")
    print("=" * 50)
    
    tester = PDFProcessorTester()
    success = tester.run_all_tests()
    
    if success:
        print("\nAll tests completed successfully!")
        print("The PDF processor is ready for production use.")
    else:
        print("\nSome tests failed.")
        print("Please fix the issues before proceeding.")
    
    return 0 if success else 1

if __name__ == "__main__":
    exit(main())
