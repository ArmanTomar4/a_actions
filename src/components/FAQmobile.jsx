import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryHistory, setCategoryHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [clickedQuestion, setClickedQuestion] = useState(null);

  const faqData = {
    OUR_PRODUCTS: [
      { question: "What main problem does a_ACTION solve for businesses?", answer: "a_ACTION eliminates the difficulty of transforming LLM outputs into secure, real-world actions. By intercepting, authenticating, and mapping function calls into APIs, it ensures automation is reliable and not left to chance." },
      { question: "How does a_ACTION connect AI models with real-world APIs?", answer: "It acts as a middleware that translates LLM function calls into structured API requests. This allows AI to work seamlessly with systems like CRMs, payment gateways, or databases." },
      { question: "Why is a_ACTION better than custom in-house integrations?", answer: "Custom solutions take months to build and maintain. a_ACTION provides ready-made reliability, authentication, and monitoring, which saves costs and ensures smooth scaling across industries." },
      { question: "Does a_ACTION support multiple LLMs and AI providers?", answer: "Yes, it is designed to be LLM-agnostic. Businesses can use OpenAI, Anthropic, Hugging Face, or in-house models without worrying about compatibility." },
      { question: "What kinds of APIs can a_ACTION work with?", answer: "a_ACTION supports REST, GraphQL, SOAP, internal APIs, and legacy enterprise systems. This flexibility ensures it fits seamlessly into existing business tech stacks." },
      { question: "Can enterprises customize a_ACTION for their unique workflows?", answer: "Absolutely. Enterprises can define validation rules, security controls, and mapping logic to ensure API executions match their business requirements and compliance standards." },
      { question: "How does a_ACTION handle large-scale enterprise workloads?", answer: "It is built for high concurrency, managing thousands of requests simultaneously with load balancing, retries, and error recovery mechanisms." },
      { question: "What monitoring and visibility does a_ACTION provide to users?", answer: "Businesses gain dashboards with real-time logs, analytics, and execution tracking, making it easy to measure reliability and debug problems quickly." },
      { question: "Can a_ACTION be deployed on-premise or in the cloud?", answer: "Yes, deployment options include public cloud, private cloud, hybrid, and on-premise to meet security or regulatory demands." },
      { question: "How does a_ACTION future-proof AI-driven business operations?", answer: "By decoupling APIs from specific LLMs, businesses can easily upgrade or switch models while keeping workflows stable and functional." }
    ],
    SALES: [
      { question: "Who are the primary customers for a_ACTION platform?", answer: "The platform targets enterprises, SaaS providers, and startups that want to safely transform LLM outputs into actionable API calls without building integrations manually." },
      { question: "How does a_ACTION improve sales workflows and performance?", answer: "Sales teams can use AI to automate CRM updates, outreach workflows, and customer data syncing, all while ensuring accuracy and authentication." },
      { question: "Why should enterprises choose a_ACTION over alternatives?", answer: "a_ACTION is tailored to LLM-specific execution challenges, unlike generic integration tools. It prevents errors, enhances security, and provides visibility into every API action." },
      { question: "How quickly can businesses integrate a_ACTION into systems?", answer: "Most businesses can be onboarded within days, with guided setup and API mapping, eliminating the months typically required for manual integrations." },
      { question: "What ROI can companies expect after using a_ACTION?", answer: "Customers see reduced development costs, faster automation adoption, and fewer API errors, which directly improves efficiency and revenue generation." },
      { question: "How does a_ACTION reduce costs for organizations?", answer: "By avoiding custom integration builds and automating authentication, businesses cut down on engineering overhead and ongoing maintenance costs." },
      { question: "Does a_ACTION provide dedicated sales or customer support teams?", answer: "Yes, enterprises get onboarding specialists, technical consultants, and customer success managers to ensure smooth deployment and usage." },
      { question: "How does a_ACTION stand out in sales conversations?", answer: "Its unique positioning as an LLM-focused execution layer, with built-in reliability and compliance, makes it a differentiated solution." },
      { question: "Can a_ACTION integrate with CRMs and sales tools easily?", answer: "Yes, it can connect with Salesforce, HubSpot, or custom CRMs to automate tasks like lead creation, data enrichment, and reporting." },
      { question: "Are there real-world success stories with a_ACTION adoption?", answer: "Yes, companies in finance, healthcare, and SaaS have already automated LLM-driven processes, reporting higher accuracy and faster execution." }
    ],
    PRICING: [
      { question: "What pricing models does a_ACTION offer to customers?", answer: "a_ACTION offers flexible plans including pay-per-use, subscription tiers, and custom enterprise pricing for large-scale deployments." },
      { question: "Is there a free trial available for testing?", answer: "Yes, new customers can explore the platform with a limited free trial to evaluate compatibility with their workflows." },
      { question: "How is billing calculated across different usage scenarios?", answer: "Billing is based on API calls executed through the LLM pipeline, with additional considerations for authentication layers and monitoring features." },
      { question: "Does a_ACTION provide special pricing for startups?", answer: "Yes, discounted tiers and credits are available for early-stage businesses looking to experiment with AI-driven automation." },
      { question: "Can customers choose monthly or annual billing cycles?", answer: "Both options are supported, with annual contracts offering significant savings over month-to-month billing." },
      { question: "Are software upgrades and new features included in plans?", answer: "Yes, all subscription tiers include continuous updates, bug fixes, and access to new feature releases." },
      { question: "Does a_ACTION offer bulk or volume discounts?", answer: "Enterprises running large numbers of API calls receive significant discounts under volume pricing models." },
      { question: "Are there hidden costs like setup or integration fees?", answer: "No, onboarding support and integration assistance are part of the subscription without extra charges." },
      { question: "Can pricing be customized for complex enterprise use cases?", answer: "Yes, a_ACTION works with large organizations to create tailored contracts based on their scale and needs." },
      { question: "How does pricing compare with competitors?", answer: "a_ACTION delivers more value by bundling authentication, monitoring, and execution reliability into one offering, often replacing multiple tools." }
    ],
    HOW_IT_WORKS: [
      { question: "How does a_ACTION intercept LLM function and tool calls?", answer: "It sits between the LLM and execution layer, capturing every function call, validating it, and preparing it for secure API execution." },
      { question: "What authentication methods are supported by a_ACTION platform?", answer: "It supports OAuth2, JWT, API keys, and enterprise-grade SSO, ensuring compatibility with both public and private APIs." },
      { question: "How does a_ACTION map AI outputs into real APIs?", answer: "Using schema validation, custom mappings, and intelligent parsing, it transforms AI requests into structured, valid API calls." },
      { question: "What happens when an API request fails unexpectedly?", answer: "a_ACTION automatically retries, applies fallback strategies, and logs the error for visibility, ensuring resilience in workflows." },
      { question: "Can developers configure mappings and execution policies themselves?", answer: "Yes, developers can set mapping rules, validation constraints, and approval steps to ensure executions follow internal policies." },
      { question: "Does a_ACTION support orchestrating multiple APIs in workflows?", answer: "Yes, it can chain together multiple API calls to execute complex, multi-step business workflows." },
      { question: "How does a_ACTION handle real-time LLM-driven requests?", answer: "It provides low-latency execution for scenarios like customer service chatbots or real-time analytics dashboards." },
      { question: "What security measures protect API calls in a_ACTION?", answer: "All communication is encrypted, authenticated, and logged, ensuring data integrity and regulatory compliance." },
      { question: "Does a_ACTION provide tools for debugging and monitoring workflows?", answer: "Yes, developers get full logs, sandbox testing, and detailed execution traces for troubleshooting." },
      { question: "Can a_ACTION handle requests from multiple AI models simultaneously?", answer: "Yes, it supports multi-model environments, allowing enterprises to run different LLMs in parallel without conflicts." }
    ],
    ACCURACY: [
      { question: "How does a_ACTION ensure API calls are always valid?", answer: "It validates input parameters, checks authentication, and confirms schema compliance before sending a request to any external API." },
      { question: "How does it prevent hallucinated LLM outputs from causing errors?", answer: "a_ACTION uses validation filters and safety rules to block or correct malformed or unauthorized requests generated by AI." },
      { question: "What error handling mechanisms are included by default?", answer: "Automatic retries, intelligent reformatting, and fallback options are built-in to ensure maximum execution success." },
      { question: "How is execution reliability measured and tracked over time?", answer: "Businesses can monitor success rates, error trends, and execution logs through detailed dashboards and reports." },
      { question: "Can enterprises set custom validation rules for accuracy?", answer: "Yes, organizations can enforce business-specific rules to prevent incorrect or risky API calls." },
      { question: "How does a_ACTION handle critical or sensitive actions?", answer: "It can require human-in-the-loop approvals, adding an extra safeguard for high-risk processes." },
      { question: "Does a_ACTION continuously improve its accuracy performance?", answer: "Yes, the system learns from past executions, refining mappings and error handling over time." },
      { question: "How secure are API calls executed through a_ACTION?", answer: "Every call is authenticated, encrypted, and logged, ensuring that security is never compromised in pursuit of accuracy." },
      { question: "How consistent is execution across different APIs and industries?", answer: "The platform adapts to domain-specific APIs, ensuring that accuracy is maintained in finance, healthcare, retail, and more." },
      { question: "What success rate does a_ACTION deliver in real deployments?", answer: "In most production environments, a_ACTION achieves above 99% successful execution rates, ensuring businesses can trust it." }
    ],
    SECTORS: [
      { question: "Which industries benefit the most from using a_ACTION?", answer: "Finance, healthcare, retail, logistics, SaaS, education, and government see the most impact by automating workflows with AI-driven API execution." },
      { question: "How does a_ACTION help financial services companies?", answer: "It powers secure transactions, fraud checks, compliance reporting, and customer support workflows without risking security or reliability." },
      { question: "Can healthcare organizations use a_ACTION safely and compliantly?", answer: "Yes, it integrates with EHR systems and ensures compliance with HIPAA and other data protection laws." },
      { question: "How does retail benefit from adopting a_ACTION platform?", answer: "Retailers use it for automating inventory updates, personalized offers, and real-time order tracking across systems." },
      { question: "What value does a_ACTION bring to logistics and supply chains?", answer: "It connects LLM-driven planning tools to real-time shipment APIs, improving tracking, routing, and cost efficiency." },
      { question: "How does the education sector leverage a_ACTION effectively?", answer: "AI tutors and learning platforms can securely pull data from external APIs to deliver personalized learning experiences." },
      { question: "Why is a_ACTION important for SaaS product companies?", answer: "It allows SaaS providers to embed LLM automation directly into their apps without rebuilding integrations repeatedly." },
      { question: "How does customer service improve with a_ACTION adoption?", answer: "Contact centers can integrate LLM chatbots with CRM APIs, enabling automated yet accurate customer query resolution." },
      { question: "Can government organizations safely deploy a_ACTION platform?", answer: "Yes, a_ACTION offers secure, on-premise deployments with full audit logs to meet public sector compliance." },
      { question: "How adaptable is a_ACTION for niche industries like gaming?", answer: "Highly adaptable — it can power gaming APIs, real estate platforms, or any domain requiring secure AI-to-API execution." }
    ]
  };

  const categories = [
    { id: 'OUR_PRODUCTS', label: 'OUR PRODUCTS', icon: '↗' },
    { id: 'SALES', label: 'SALES', icon: '↗' },
    { id: 'PRICING', label: 'PRICING', icon: '↗' },
    { id: 'HOW_IT_WORKS', label: 'HOW IT WORKS', icon: '↗' },
    { id: 'ACCURACY', label: 'ACCURACY', icon: '↗' },
    { id: 'SECTORS', label: 'SECTORS', icon: '↗' }
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

        .faq-nav-button {
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

        .faq-nav-button:last-child {
          border-right: none;
        }

        .faq-nav-button:hover:not(:disabled) {
          background-color: #333;
        }

        .faq-nav-button:disabled {
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
              className="faq-nav-button"
              onClick={goBack}
              disabled={!canGoBack}
            >
              ←
            </button>
            <button
              className="faq-nav-button"
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