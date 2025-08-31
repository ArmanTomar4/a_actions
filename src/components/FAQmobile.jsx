import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryHistory, setCategoryHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [clickedQuestion, setClickedQuestion] = useState(null);

  const faqData = {
    OCR_ENGINE: [
      { question: "What are the key features of your OCR product?", answer: "The key features of our a_OCR product include advanced optical character recognition that turns unstructured data from various sources into structured formats, with seamless ingestion from paper, Gmail, Drive, and SharePoint. It also incorporates understanding and action-taking capabilities, allowing for intelligent data processing and export to CSV, XML, or XLS, ensuring high efficiency across all use cases." },
      { question: "Does your OCR support multilingual document processing?", answer: "Yes, our a_OCR supports multilingual document processing, handling texts in multiple languages including non-Latin scripts with exceptional accuracy. This feature is designed to cater to global users, making it ideal for international businesses dealing with diverse linguistic content in documents." },
      { question: "Can your OCR handle handwritten text as well as printed?", answer: "Our a_OCR can handle both handwritten text and printed text effectively, leveraging advanced AI to recognize variations in writing styles. With its robust machine learning models, it achieves high accuracy even on challenging handwritten notes, forms, or signatures across all document types." },
      { question: "What integrations does your OCR offer with other software?", answer: "Our a_OCR offers integrations with popular software like Gmail, Google Drive, and SharePoint for easy data ingestion, as well as export options to CSV, XML, and XLS for compatibility with tools like Excel or databases. These integrations streamline workflows, allowing seamless connection with CRM systems, ERP software, and cloud storage solutions for automated data flow." },
      { question: "Is there a mobile version of your OCR product available?", answer: "Yes, there is a mobile version of our a_OCR product available, enabling users to scan and process documents on-the-go via iOS and Android apps. This mobile app supports real-time OCR, making it convenient for field workers or remote teams to convert unstructured data instantly." },
      { question: "How does your OCR differ from competitors like Google Cloud Vision or ABBYY?", answer: "Our a_OCR differs from competitors like Google Cloud Vision or ABBYY by offering a superior accuracy rate of 99.2% and being specifically tailored for all documents across industries, with a focus on Made-in-India innovation. Additionally, it includes built-in understanding and action layers for more intelligent processing, providing better value in terms of cost-effectiveness and customization compared to generic solutions." },
      { question: "What types of documents can your OCR process effectively?", answer: "Our a_OCR can process a wide variety of documents effectively, including invoices, receipts, contracts, forms, medical records, and handwritten notes. It excels in handling all types across industries, from structured forms to unstructured texts, ensuring reliable extraction regardless of complexity." },
      { question: "Does your OCR include post-processing tools for data validation?", answer: "Yes, our a_OCR includes post-processing tools for data validation, such as error correction mechanisms and intelligent understanding layers to verify extracted information. These tools allow users to review and refine data automatically, reducing errors and ensuring high-quality structured output." },
      { question: "Are there any hardware requirements for using your OCR?", answer: "There are minimal hardware requirements for using our a_OCR, as it is cloud-based and accessible via web or mobile apps, requiring only a standard device with internet access. No specialized hardware is needed beyond a scanner or camera for input, making it accessible for small businesses and enterprises alike." },
      { question: "How frequently do you update your OCR product with new features?", answer: "We update our a_OCR product frequently with new features, typically every quarter, incorporating user feedback and AI advancements to enhance performance. These updates include improvements in accuracy, new integrations, and support for emerging document types, keeping the product at the forefront of OCR technology." }
    ],
    DATA_STRUCTURING: [
      { question: "How do I upload documents to your OCR platform?", answer: "To upload documents to our a_OCR platform, simply use the web interface or mobile app to select files from your device or integrate with sources like Gmail or Drive. The upload is secure and quick, initiating the processing pipeline immediately." },
      { question: "What steps are involved in extracting data from a scanned document?", answer: "The steps involved in extracting data from a scanned document include ingestion, OCR recognition, understanding the content, taking actions like validation, and exporting to structured formats. This end-to-end process ensures accurate conversion from unstructured to usable data." },
      { question: "Can your OCR process documents in real-time?", answer: "Yes, our a_OCR can process documents in real-time, providing instant extraction for uploaded or scanned items. This feature is particularly useful for time-sensitive applications, delivering results within seconds." },
      { question: "How does your OCR handle complex layouts like tables and forms?", answer: "Our a_OCR handles complex layouts like tables and forms by using AI to detect and parse structures accurately. It extracts data from rows, columns, and fields while maintaining relationships, ensuring no loss of context." },
      { question: "What file formats can I export the extracted data to?", answer: "You can export the extracted data to formats like CSV, XML, XLS, as shown in our processing stack. These options allow easy integration with analysis tools or databases for further use." },
      { question: "Is there an API available for integrating your OCR into my app?", answer: "Yes, there is an API available for integrating our a_OCR into your app, enabling programmatic access to OCR functions. The API supports custom workflows, making it simple to embed in existing software." },
      { question: "How does the OCR manage batch processing of multiple files?", answer: "The OCR manages batch processing by allowing upload of multiple files, which are handled sequentially or in parallel for efficiency. This scales to large volumes, with progress tracking and bulk export options." },
      { question: "What happens if the OCR encounters unreadable text?", answer: "If the OCR encounters unreadable text, it flags the issue and uses AI-based error correction or suggests manual review. This minimizes data loss, maintaining overall high accuracy of 99.2%." },
      { question: "Can I customize extraction templates for specific documents?", answer: "Yes, you can customize extraction templates for specific documents, tailoring fields and rules to your needs. This enhances precision for recurring document types across industries." },
      { question: "How secure is the data during the OCR processing workflow?", answer: "The data during the OCR processing workflow is highly secure, with encryption in transit and at rest, complying with industry standards. We prioritize privacy, ensuring no unauthorized access throughout the pipeline." }
    ],
    SECURITY_COMPLIANCE: [
      { question: "What is the accuracy rate of your OCR for printed text?", answer: "The accuracy rate of our a_OCR for printed text is 99.2%, delivering reliable results across various fonts and qualities. This high precision reduces errors and supports dependable data extraction." },
      { question: "How does your OCR perform on low-quality or damaged documents?", answer: "Our a_OCR performs well on low-quality or damaged documents, using AI enhancements to reconstruct and recognize text effectively. Even with noise or degradation, it maintains close to 99.2% accuracy through advanced processing." },
      { question: "Does your OCR improve accuracy over time with machine learning?", answer: "Yes, our a_OCR improves accuracy over time with machine learning, learning from processed data to refine models. Continuous updates ensure evolving performance for better results on diverse documents." },
      { question: "What measures do you take to ensure data privacy during processing?", answer: "We ensure data privacy during processing with strict encryption, access controls, and compliance with regulations like GDPR. No data is stored without permission, protecting sensitive information throughout." },
      { question: "How accurate is your OCR for extracting specific fields like dates or numbers?", answer: "Our a_OCR is highly accurate for extracting specific fields like dates or numbers, achieving 99.2% precision due to specialized recognition. This makes it ideal for financial or analytical applications requiring exact data." },
      { question: "Can I test the accuracy of your OCR with my own sample documents?", answer: "Yes, you can test the accuracy of our a_OCR with your own sample documents via the free trial or demo. This allows real-world evaluation to confirm its effectiveness for your needs." },
      { question: "What is the accuracy for multilingual or non-Latin scripts?", answer: "The accuracy for multilingual or non-Latin scripts is 99.2%, supported by broad language models. It handles diverse scripts seamlessly, ensuring reliability across global use cases." },
      { question: "How does lighting or image quality affect OCR accuracy?", answer: "Lighting or image quality can affect OCR accuracy, but our system mitigates this with preprocessing algorithms. It adjusts for variations, maintaining high performance even in suboptimal conditions." },
      { question: "Are there benchmarks or third-party validations for your accuracy claims?", answer: "There are benchmarks and third-party validations supporting our 99.2% accuracy claims across industries. These independent assessments confirm its superior performance in real-world scenarios." },
      { question: "What error correction mechanisms are built into your OCR?", answer: "Our a_OCR has built-in error correction mechanisms, such as AI-based contextual fixes and flagging for review. These tools enhance overall reliability, correcting potential misreads automatically." }
    ],
    LLM_INTEGRATION: [
      { question: "How can I schedule a demo for your OCR product?", answer: "To schedule a demo for our a_OCR product, you can visit our website or contact our sales team via email or phone for a personalized session. Demos are tailored to your needs, showcasing live processing of your sample documents to demonstrate its capabilities effectively." },
      { question: "What is the process for purchasing your OCR solution?", answer: "The process for purchasing our a_OCR solution involves contacting our sales team for a quote, followed by agreement on terms and secure payment setup. Once purchased, we provide quick onboarding with training and support to ensure smooth implementation." },
      { question: "Do you offer custom solutions for enterprise clients?", answer: "Yes, we offer custom solutions for enterprise clients, including tailored integrations and features based on specific industry requirements. Our team works closely with you to develop bespoke OCR workflows that align with your business scale and objectives." },
      { question: "Are there any discounts for bulk or annual subscriptions?", answer: "Yes, there are discounts for bulk or annual subscriptions, designed to provide cost savings for high-volume users or long-term commitments. These discounts can be discussed during the quoting process to best fit your usage patterns." },
      { question: "Who can I contact for sales inquiries in my region?", answer: "For sales inquiries in your region, you can contact our dedicated regional representatives listed on our website or reach out to our global support team. We ensure localized assistance, including in India and international markets, to address your specific needs promptly." },
      { question: "What post-sales support do you provide to customers?", answer: "We provide comprehensive post-sales support, including technical assistance, training sessions, and ongoing maintenance for our customers. Our support team is available 24/7 via chat, email, or phone to resolve any issues and maximize product value." },
      { question: "Can I get a personalized quote based on my usage needs?", answer: "Yes, you can get a personalized quote based on your usage needs by providing details about your document volume and requirements to our sales team. We tailor the quote to ensure it aligns with your budget and projected usage for optimal cost-efficiency." },
      { question: "Do you have partnerships or resellers for your OCR?", answer: "Yes, we have partnerships and resellers for our a_OCR, collaborating with tech firms and distributors to expand reach. These partners can assist with sales and implementation in various regions, enhancing accessibility for customers." },
      { question: "What is the typical sales cycle for your product?", answer: "The typical sales cycle for our product ranges from 2-4 weeks, starting from initial inquiry to final purchase and setup. This includes demo, quote negotiation, and onboarding, streamlined for efficiency based on client readiness." },
      { question: "Are there referral programs for existing customers?", answer: "Yes, there are referral programs for existing customers, offering rewards like discounts or credits for successful referrals. This program encourages sharing experiences and helps grow our community while benefiting loyal users." }
    ],
    API_AUTOMATION: [
      { question: "What are the different pricing tiers for your OCR service?", answer: "Our a_OCR service offers different pricing tiers, including basic for small users, standard for mid-sized businesses, and enterprise for large-scale needs. Each tier provides varying levels of document processing limits, support, and features to suit diverse requirements." },
      { question: "Is there a free trial available for your OCR product?", answer: "Yes, there is a free trial available for our a_OCR product, allowing users to test its features with a limited number of documents. The trial helps you evaluate accuracy and integrations before committing to a paid plan." },
      { question: "How is pricing calculated—per document, per user, or per month?", answer: "Pricing is calculated per document or per month, depending on the tier, with flexible options for usage-based billing. This ensures cost alignment with actual needs, whether for occasional or high-volume processing." },
      { question: "Are there additional fees for high-volume usage?", answer: "There may be additional fees for high-volume usage beyond standard tiers, but these are transparently outlined in quotes. We offer scalable plans to avoid surprises, with options to upgrade as your needs grow." },
      { question: "Do you offer pricing plans for startups or small businesses?", answer: "Yes, we offer pricing plans for startups or small businesses, with affordable entry-level options and flexible scaling. These plans include essential features without high upfront costs, supporting growth in early stages." },
      { question: "What payment methods do you accept for subscriptions?", answer: "We accept various payment methods for subscriptions, including credit cards, bank transfers, and digital wallets. Payments are secure and processed through trusted gateways for convenience." },
      { question: "Is pricing scalable based on the number of users or documents?", answer: "Yes, pricing is scalable based on the number of users or documents, allowing adjustments as your team or volume expands. This flexibility ensures cost-effectiveness without overpaying for unused capacity." },
      { question: "Are there any hidden costs or setup fees?", answer: "There are no hidden costs or setup fees; all charges are clearly stated in our pricing structure and quotes. We prioritize transparency to build trust with our customers." },
      { question: "Do you provide volume discounts for large enterprises?", answer: "Yes, we provide volume discounts for large enterprises, reducing per-document costs for high usage. These are negotiated based on projected volumes to offer significant savings." },
      { question: "How often do pricing plans change, and how are customers notified?", answer: "Pricing plans change infrequently, typically annually, with advance notification to customers via email and our website. We ensure any changes are communicated well in advance to allow for adjustments." }
    ],
    BILLING_PLANS: [
      { question: "How does your OCR benefit the financial services industry?", answer: "Our a_OCR benefits the financial services industry by automating invoice and receipt processing, reducing errors and speeding up transactions. With 99.2% accuracy, it ensures compliant data handling across all financial documents." },
      { question: "What solutions do you offer for healthcare document processing?", answer: "We offer solutions for healthcare document processing, digitizing patient records and forms efficiently. This improves accessibility and accuracy, supporting better patient care across the industry." },
      { question: "Can your OCR be used in legal firms for contract analysis?", answer: "Yes, our a_OCR can be used in legal firms for contract analysis, extracting key terms and dates quickly. It handles complex legal documents with high precision, aiding in review and compliance." },
      { question: "How is your OCR applied in government and public sector workflows?", answer: "Our a_OCR is applied in government and public sector workflows for digitizing records and forms. It enhances efficiency in administrative tasks, working on all document types with reliability." },
      { question: "What advantages does your OCR provide to logistics companies?", answer: "The advantages for logistics companies include fast processing of shipping documents and invoices. This streamlines operations, reducing delays and errors in supply chain management." },
      { question: "Are there case studies for your OCR in retail or manufacturing sectors?", answer: "Yes, there are case studies for our a_OCR in retail or manufacturing sectors, showcasing improved inventory and order processing. These demonstrate cost savings and efficiency gains across operations." },
      { question: "How can education institutions use your OCR for digitization?", answer: "Education institutions can use our a_OCR for digitization of archives, exams, and administrative forms. It facilitates easy access to structured data, supporting research and management." },
      { question: "What role does your OCR play in insurance claim processing?", answer: "Our a_OCR plays a key role in insurance claim processing by extracting data from forms and receipts accurately. This accelerates approvals and reduces fraud with its high precision." },
      { question: "Can real estate firms benefit from your OCR for property documents?", answer: "Yes, real estate firms benefit from our a_OCR for processing property documents like deeds and contracts. It ensures quick extraction and organization, aiding in transactions and records management." },
      { question: "How does your OCR support e-commerce in invoice and receipt handling?", answer: "Our a_OCR supports e-commerce in invoice and receipt handling by automating data entry and validation. This boosts operational speed and accuracy, enhancing customer service and backend efficiency." }
    ]
  };

  const categories = [
    { id: 'OCR_ENGINE', label: 'OCR ENGINE', icon: '↗' },
    { id: 'DATA_STRUCTURING', label: 'DATA STRUCTURING', icon: '↗' },
    { id: 'SECURITY_COMPLIANCE', label: 'SECURITY & COMPLIANCE', icon: '↗' },
    { id: 'LLM_INTEGRATION', label: 'LLM INTEGRATION', icon: '↗' },
    { id: 'API_AUTOMATION', label: 'API AUTOMATION', icon: '↗' },
    { id: 'BILLING_PLANS', label: 'BILLING PLANS', icon: '↗' }
  ];

  const handleCategoryClick = (categoryId) => {
    const newHistory = categoryHistory.slice(0, currentHistoryIndex + 1);
    newHistory.push(categoryId);
    setCategoryHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
    setActiveCategory(categoryId);
  };

  const goBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setActiveCategory(categoryHistory[newIndex]);
    } else {
      setActiveCategory(null);
      setCurrentHistoryIndex(-1);
    }
  };

  const goForward = () => {
    if (currentHistoryIndex < categoryHistory.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      setCurrentHistoryIndex(newIndex);
      setActiveCategory(categoryHistory[newIndex]);
    }
  };

  // Function to handle question clicks and trigger chatbot
  const handleQuestionClick = (question, answer) => {
    console.log('FAQ: Question clicked:', { question, answer });

    // Set the clicked question for visual feedback
    setClickedQuestion(question);

    // Create and dispatch custom event for the chatbot
    const questionEvent = new CustomEvent('questionClicked', {
      detail: {
        question: question,
        answer: answer
      }
    });

    // Dispatch the event
    window.dispatchEvent(questionEvent);

    console.log('FAQ: Custom event dispatched successfully');

    // Add visual feedback - briefly highlight the clicked question
    const event = window.event;
    if (event && event.target) {
      const questionElement = event.target.closest('.question-item');
      if (questionElement) {
        questionElement.style.backgroundColor = '#444';
        questionElement.style.transform = 'scale(0.98)';
        setTimeout(() => {
          questionElement.style.backgroundColor = '';
          questionElement.style.transform = '';
        }, 200);
      }
    }

    // Reset clicked question after a delay
    setTimeout(() => {
      setClickedQuestion(null);
      console.log('FAQ: Reset clicked question state');
    }, 3000);
  };

  const canGoBack = currentHistoryIndex > 0 || activeCategory !== null;
  const canGoForward = currentHistoryIndex < categoryHistory.length - 1;

  return (
    <>
      <style>{`
        .faq-container {
          height: 60vh; 
          background-color: #1A1A1A;
          color: #fff;
          font-family: 'Courier New', monospace;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: height 0.4s ease;
          display: none;
        }

        @media (max-width: 768px) {
          .faq-container {
            display: flex !important;
          }
        }

        .faq-container.category-selected {
          height: 50vh;
        }

        .faq-header {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #333;
          flex-shrink: 0;
        }

        .faq-title {
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .nav-buttons {
          display: flex;
          border: 1px solid #444;
        }

        .nav-button {
          background: transparent;
          border: none;
          color: #fff;
          padding: 8px 12px;
          cursor: pointer;
          border-right: 1px solid #444;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .nav-button:last-child {
          border-right: none;
        }

        .nav-button:hover:not(:disabled) {
          background-color: #333;
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .faq-content {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .categories-panel {
          width: 100%;
          height: 100%;
          background-color: #1A1A1A;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .category-item {
          background: transparent;
          border: 1px solid #444;
          color: #ccc;
          padding: 14px 16px;
          text-align: left;
          cursor: pointer;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 1px;
          margin: 0 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .category-item:hover {
          background-color: #333;
          color: #fff;
        }

        .questions-panel {
          width: 100%;
          height: 100%;
          background-color: #1A1A1A;
          padding: 10px 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: all 0.4s ease;
        }

        .questions-panel.category-selected {
          height: calc(100% - 40px);
          min-height: 500px;
        }

        .questions-panel::-webkit-scrollbar {
          width: 8px;
        }

        .questions-panel::-webkit-scrollbar-track {
          background: #000;
        }

        .questions-panel::-webkit-scrollbar-thumb {
          background: #666;
          border-radius: 4px;
        }

        .questions-panel::-webkit-scrollbar-thumb:hover {
          background: #888;
        }

        .question-item {
          border: 1px solid #444;
          margin-bottom: 12px;
          background: transparent;
          color: #ccc;
          font-family: 'Courier New', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          min-height: 50px;
          display: flex;
          align-items: center;
        }

        .questions-panel.category-selected .question-item {
          margin-bottom: 15px;
          min-height: 55px;
        }

        .question-item:hover {
          background-color: #222;
          color: #fff;
          border-color: #666;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .question-item:active {
          transform: translateY(0);
        }

        .question-item::after {
          content: '→';
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          color: #888;
        }

        .question-item:hover::after {
          opacity: 1;
          color: #fff;
        }

        .question-header {
          padding: 12px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .question-text {
          line-height: 1.3;
          font-weight: 500;
          position: relative;
          padding-right: 20px;
        }

        .question-item:hover .question-text {
          color: #fff;
        }

        .panel-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .question-item.clicked {
          border-left: 4px solid #fff;
          transform: translateY(-2px);
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

      <div className={`faq-container ${activeCategory ? 'category-selected' : ''}`}>
        <div className="faq-header">
          <div className="faq-title">FAQ</div>
          <div className="nav-buttons">
            <button
              className="nav-button"
              onClick={goBack}
              disabled={!canGoBack}
            >
              ←
            </button>
            <button
              className="nav-button"
              onClick={goForward}
              disabled={!canGoForward}
            >
              →
            </button>
          </div>
        </div>

        <div className="faq-content">
          <AnimatePresence mode="wait">
            {!activeCategory ? (
              <motion.div
                key="categories"
                className="panel-wrapper"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="categories-panel">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      className="category-item"
                      onClick={() => handleCategoryClick(category.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{category.label}</span>
                      <span>{category.icon}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`questions-${activeCategory}`}
                className="panel-wrapper"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className={`questions-panel ${activeCategory ? 'category-selected' : ''}`}>

                  {faqData[activeCategory]?.map((item, index) => (
                    <motion.div
                      key={index}
                      className={`question-item ${clickedQuestion === item.question ? 'clicked' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: "#222",
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => handleQuestionClick(item.question, item.answer)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="question-header">
                        <div className="question-text">
                          {item.question}
                          {clickedQuestion === item.question && (
                            <span style={{
                              marginLeft: '8px',
                              color: '#00ff00',
                              fontSize: '8px',
                              animation: 'pulse 1s infinite'
                            }}>

                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default FAQ;