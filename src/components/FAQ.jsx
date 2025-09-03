import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ selectedQuestion, chatbotResponse }) => (
    <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        maxWidth: '400px',
        background: selectedQuestion ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        border: selectedQuestion ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
        backdropFilter: selectedQuestion ? 'blur(10px)' : 'none'
    }}>
        {selectedQuestion && (
            <div style={{ marginBottom: '10px' }}>
                <div style={{
                    fontSize: '10px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Question:
                </div>
                <div style={{
                    fontSize: '11px',
                    color: 'white',
                    marginBottom: '15px',
                    lineHeight: '1.4'
                }}>
                    {selectedQuestion}
                </div>
                <div style={{
                    fontSize: '10px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: '5px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    Answer:
                </div>
                <div style={{
                    fontSize: '11px',
                    color: 'white',
                    lineHeight: '1.4'
                }}>
                    {chatbotResponse}
                </div>
            </div>
        )}
    </div>
);

const AnimatedFAQDiagram = () => {
    console.log('AnimatedFAQDiagram component rendering...');

    const [currentStep, setCurrentStep] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const [focusedBox, setFocusedBox] = useState(null);
    const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [chatbotResponse, setChatbotResponse] = useState(null);
    const [visibleQuestions, setVisibleQuestions] = useState({
        leftQuestions: [],
        rightQuestions: [],
        leftConnectors: [],
        rightConnectors: []
    });

    // Track which question is currently active
    const [activeQuestion, setActiveQuestion] = useState(null);

    // Navigation state management
    const [navigationHistory, setNavigationHistory] = useState([{ type: 'faq', label: 'FAQ' }]);
    const [currentNavIndex, setCurrentNavIndex] = useState(0);

    console.log('State initialized:', { currentStep, isVisible, focusedBox });

    // Question sets for each info-box - moved here to avoid reference before declaration
    const questionSets = {
        'our-products': {
            leftQuestions: [
                'What main problem does a_ACTION solve for businesses?',
                'How does a_ACTION connect AI models with real-world APIs?',
                'Why is a_ACTION better than custom in-house integrations?',
                'Does a_ACTION support multiple LLMs and AI providers?',
                'What kinds of APIs can a_ACTION work with?'
            ],
            leftAnswers: [
                'a_ACTION eliminates the difficulty of transforming LLM outputs into secure, real-world actions. By intercepting, authenticating, and mapping function calls into APIs, it ensures automation is reliable and not left to chance.',
                'It acts as a middleware that translates LLM function calls into structured API requests. This allows AI to work seamlessly with systems like CRMs, payment gateways, or databases.',
                'Custom solutions take months to build and maintain. a_ACTION provides ready-made reliability, authentication, and monitoring, which saves costs and ensures smooth scaling across industries.',
                'Yes, it is designed to be LLM-agnostic. Businesses can use OpenAI, Anthropic, Hugging Face, or in-house models without worrying about compatibility.',
                'a_ACTION supports REST, GraphQL, SOAP, internal APIs, and legacy enterprise systems. This flexibility ensures it fits seamlessly into existing business tech stacks.'
            ],
            rightQuestions: [
                'Can enterprises customize a_ACTION for their unique workflows?',
                'How does a_ACTION handle large-scale enterprise workloads?',
                'What monitoring and visibility does a_ACTION provide to users?',
                'Can a_ACTION be deployed on-premise or in the cloud?',
                'How does a_ACTION future-proof AI-driven business operations?'
            ],
            rightAnswers: [
                'Absolutely. Enterprises can define validation rules, security controls, and mapping logic to ensure API executions match their business requirements and compliance standards.',
                'It is built for high concurrency, managing thousands of requests simultaneously with load balancing, retries, and error recovery mechanisms.',
                'Businesses gain dashboards with real-time logs, analytics, and execution tracking, making it easy to measure reliability and debug problems quickly.',
                'Yes, deployment options include public cloud, private cloud, hybrid, and on-premise to meet security or regulatory demands.',
                'By decoupling APIs from specific LLMs, businesses can easily upgrade or switch models while keeping workflows stable and functional.'
            ]
        },
        'sales': {
            leftQuestions: [
                'Who are the primary customers for a_ACTION platform?',
                'How does a_ACTION improve sales workflows and performance?',
                'Why should enterprises choose a_ACTION over alternatives?',
                'How quickly can businesses integrate a_ACTION into systems?',
                'What ROI can companies expect after using a_ACTION?'
            ],
            leftAnswers: [
                'The platform targets enterprises, SaaS providers, and startups that want to safely transform LLM outputs into actionable API calls without building integrations manually.',
                'Sales teams can use AI to automate CRM updates, outreach workflows, and customer data syncing, all while ensuring accuracy and authentication.',
                'a_ACTION is tailored to LLM-specific execution challenges, unlike generic integration tools. It prevents errors, enhances security, and provides visibility into every API action.',
                'Most businesses can be onboarded within days, with guided setup and API mapping, eliminating the months typically required for manual integrations.',
                'Customers see reduced development costs, faster automation adoption, and fewer API errors, which directly improves efficiency and revenue generation.'
            ],
            rightQuestions: [
                'How does a_ACTION reduce costs for organizations?',
                'Does a_ACTION provide dedicated sales or customer support teams?',
                'How does a_ACTION stand out in sales conversations?',
                'Can a_ACTION integrate with CRMs and sales tools easily?',
                'Are there real-world success stories with a_ACTION adoption?'
            ],
            rightAnswers: [
                'By avoiding custom integration builds and automating authentication, businesses cut down on engineering overhead and ongoing maintenance costs.',
                'Yes, enterprises get onboarding specialists, technical consultants, and customer success managers to ensure smooth deployment and usage.',
                'Its unique positioning as an LLM-focused execution layer, with built-in reliability and compliance, makes it a differentiated solution.',
                'Yes, it can connect with Salesforce, HubSpot, or custom CRMs to automate tasks like lead creation, data enrichment, and reporting.',
                'Yes, companies in finance, healthcare, and SaaS have already automated LLM-driven processes, reporting higher accuracy and faster execution.'
            ]
        },
        'pricing': {
            leftQuestions: [
                'What pricing models does a_ACTION offer to customers?',
                'Is there a free trial available for testing?',
                'How is billing calculated across different usage scenarios?',
                'Does a_ACTION provide special pricing for startups?',
                'Can customers choose monthly or annual billing cycles?'
            ],
            leftAnswers: [
                'a_ACTION offers flexible plans including pay-per-use, subscription tiers, and custom enterprise pricing for large-scale deployments.',
                'Yes, new customers can explore the platform with a limited free trial to evaluate compatibility with their workflows.',
                'Billing is based on API calls executed through the LLM pipeline, with additional considerations for authentication layers and monitoring features.',
                'Yes, discounted tiers and credits are available for early-stage businesses looking to experiment with AI-driven automation.',
                'Both options are supported, with annual contracts offering significant savings over month-to-month billing.'
            ],
            rightQuestions: [
                'Are software upgrades and new features included in plans?',
                'Does a_ACTION offer bulk or volume discounts?',
                'Are there hidden costs like setup or integration fees?',
                'Can pricing be customized for complex enterprise use cases?',
                'How does pricing compare with competitors?'
            ],
            rightAnswers: [
                'Yes, all subscription tiers include continuous updates, bug fixes, and access to new feature releases.',
                'Enterprises running large numbers of API calls receive significant discounts under volume pricing models.',
                'No, onboarding support and integration assistance are part of the subscription without extra charges.',
                'Yes, a_ACTION works with large organizations to create tailored contracts based on their scale and needs.',
                'a_ACTION delivers more value by bundling authentication, monitoring, and execution reliability into one offering, often replacing multiple tools.'
            ]
        },
        'how-it-works': {
            leftQuestions: [
                'How does a_ACTION intercept LLM function and tool calls?',
                'What authentication methods are supported by a_ACTION platform?',
                'How does a_ACTION map AI outputs into real APIs?',
                'What happens when an API request fails unexpectedly?',
                'Can developers configure mappings and execution policies themselves?'
            ],
            leftAnswers: [
                'It sits between the LLM and execution layer, capturing every function call, validating it, and preparing it for secure API execution.',
                'It supports OAuth2, JWT, API keys, and enterprise-grade SSO, ensuring compatibility with both public and private APIs.',
                'Using schema validation, custom mappings, and intelligent parsing, it transforms AI requests into structured, valid API calls.',
                'a_ACTION automatically retries, applies fallback strategies, and logs the error for visibility, ensuring resilience in workflows.',
                'Yes, developers can set mapping rules, validation constraints, and approval steps to ensure executions follow internal policies.'
            ],
            rightQuestions: [
                'Does a_ACTION support orchestrating multiple APIs in workflows?',
                'How does a_ACTION handle real-time LLM-driven requests?',
                'What security measures protect API calls in a_ACTION?',
                'Does a_ACTION provide tools for debugging and monitoring workflows?',
                'Can a_ACTION handle requests from multiple AI models simultaneously?'
            ],
            rightAnswers: [
                'Yes, it can chain together multiple API calls to execute complex, multi-step business workflows.',
                'It provides low-latency execution for scenarios like customer service chatbots or real-time analytics dashboards.',
                'All communication is encrypted, authenticated, and logged, ensuring data integrity and regulatory compliance.',
                'Yes, developers get full logs, sandbox testing, and detailed execution traces for troubleshooting.',
                'Yes, it supports multi-model environments, allowing enterprises to run different LLMs in parallel without conflicts.'
            ]
        },
        'accuracy': {
            leftQuestions: [
                'How does a_ACTION ensure API calls are always valid?',
                'How does it prevent hallucinated LLM outputs from causing errors?',
                'What error handling mechanisms are included by default?',
                'How is execution reliability measured and tracked over time?',
                'Can enterprises set custom validation rules for accuracy?'
            ],
            leftAnswers: [
                'It validates input parameters, checks authentication, and confirms schema compliance before sending a request to any external API.',
                'a_ACTION uses validation filters and safety rules to block or correct malformed or unauthorized requests generated by AI.',
                'Automatic retries, intelligent reformatting, and fallback options are built-in to ensure maximum execution success.',
                'Businesses can monitor success rates, error trends, and execution logs through detailed dashboards and reports.',
                'Yes, organizations can enforce business-specific rules to prevent incorrect or risky API calls.'
            ],
            rightQuestions: [
                'How does a_ACTION handle critical or sensitive actions?',
                'Does a_ACTION continuously improve its accuracy performance?',
                'How secure are API calls executed through a_ACTION?',
                'How consistent is execution across different APIs and industries?',
                'What success rate does a_ACTION deliver in real deployments?'
            ],
            rightAnswers: [
                'It can require human-in-the-loop approvals, adding an extra safeguard for high-risk processes.',
                'Yes, the system learns from past executions, refining mappings and error handling over time.',
                'Every call is authenticated, encrypted, and logged, ensuring that security is never compromised in pursuit of accuracy.',
                'The platform adapts to domain-specific APIs, ensuring that accuracy is maintained in finance, healthcare, retail, and more.',
                'In most production environments, a_ACTION achieves above 99% successful execution rates, ensuring businesses can trust it.'
            ]
        },
        'sectors': {
            leftQuestions: [
                'Which industries benefit the most from using a_ACTION?',
                'How does a_ACTION help financial services companies?',
                'Can healthcare organizations use a_ACTION safely and compliantly?',
                'How does retail benefit from adopting a_ACTION platform?',
                'What value does a_ACTION bring to logistics and supply chains?'
            ],
            leftAnswers: [
                'Finance, healthcare, retail, logistics, SaaS, education, and government see the most impact by automating workflows with AI-driven API execution.',
                'It powers secure transactions, fraud checks, compliance reporting, and customer support workflows without risking security or reliability.',
                'Yes, it integrates with EHR systems and ensures compliance with HIPAA and other data protection laws.',
                'Retailers use it for automating inventory updates, personalized offers, and real-time order tracking across systems.',
                'It connects LLM-driven planning tools to real-time shipment APIs, improving tracking, routing, and cost efficiency.'
            ],
            rightQuestions: [
                'How does the education sector leverage a_ACTION effectively?',
                'Why is a_ACTION important for SaaS product companies?',
                'How does customer service improve with a_ACTION adoption?',
                'Can government organizations safely deploy a_ACTION platform?',
                'How adaptable is a_ACTION for niche industries like gaming?'
            ],
            rightAnswers: [
                'AI tutors and learning platforms can securely pull data from external APIs to deliver personalized learning experiences.',
                'It allows SaaS providers to embed LLM automation directly into their apps without rebuilding integrations repeatedly.',
                'Contact centers can integrate LLM chatbots with CRM APIs, enabling automated yet accurate customer query resolution.',
                'Yes, a_ACTION offers secure, on-premise deployments with full audit logs to meet public sector compliance.',
                'Highly adaptable — it can power gaming APIs, real estate platforms, or any domain requiring secure AI-to-API execution.'
            ]
        }
    };

    const addToNavigationHistory = useCallback((item) => {
        setNavigationHistory(prev => {
            // Remove any items after current index (for proper forward navigation)
            const newHistory = prev.slice(0, currentNavIndex + 1);

            // Check if the last item is the same type and content to avoid duplicates
            const lastItem = newHistory[newHistory.length - 1];
            if (lastItem && lastItem.type === item.type && lastItem.label === item.label) {
                // Update the existing item instead of adding a new one
                newHistory[newHistory.length - 1] = item;
                return newHistory;
            }

            // Add new item if it's different
            newHistory.push(item);
            return newHistory;
        });

        // Only increment index if we're actually adding a new item
        setCurrentNavIndex(prev => {
            const currentItem = navigationHistory[prev];
            if (currentItem && currentItem.type === item.type && currentItem.label === item.label) {
                return prev; // Don't increment if we're updating the same item
            }
            return prev + 1;
        });
    }, [currentNavIndex, navigationHistory]);

    const animateQuestionsSequentially = useCallback((boxId) => {
        const questions = questionSets[boxId];
        if (!questions) return;

        // Reset visible questions
        setVisibleQuestions({
            leftQuestions: [],
            rightQuestions: [],
            leftConnectors: [],
            rightConnectors: []
        });

        // Animate left side first
        questions.leftQuestions.forEach((_, index) => {
            setTimeout(() => {
                // Show connector first
                setVisibleQuestions(prev => ({
                    ...prev,
                    leftConnectors: [...prev.leftConnectors, index]
                }));

                // Show question after connector
                setTimeout(() => {
                    setVisibleQuestions(prev => ({
                        ...prev,
                        leftQuestions: [...prev.leftQuestions, index]
                    }));
                }, 150);
            }, index * 300);
        });

        // Animate right side after left side
        const leftDelay = questions.leftQuestions.length * 300;
        questions.rightQuestions.forEach((_, index) => {
            setTimeout(() => {
                // Show connector first
                setVisibleQuestions(prev => ({
                    ...prev,
                    rightConnectors: [...prev.rightConnectors, index]
                }));

                // Show question after connector
                setTimeout(() => {
                    setVisibleQuestions(prev => ({
                        ...prev,
                        rightQuestions: [...prev.rightQuestions, index]
                    }));
                }, 150);
            }, leftDelay + index * 300);
        });
    }, []);

    const navigateBack = useCallback(() => {
        if (currentNavIndex > 0) {
            const newIndex = currentNavIndex - 1;
            setCurrentNavIndex(newIndex);
            const previousState = navigationHistory[newIndex];

            if (previousState.type === 'faq') {
                setFocusedBox(null);
                setSelectedQuestion(null);
                setChatbotResponse(null);
                setVisibleQuestions({
                    leftQuestions: [],
                    rightQuestions: [],
                    leftConnectors: [],
                    rightConnectors: []
                });
            } else if (previousState.type === 'infobox') {
                setFocusedBox(previousState.boxId);
                animateQuestionsSequentially(previousState.boxId);
            }
        }
    }, [currentNavIndex, navigationHistory, animateQuestionsSequentially]);

    const navigateForward = useCallback(() => {
        if (currentNavIndex < navigationHistory.length - 1) {
            const newIndex = currentNavIndex + 1;
            setCurrentNavIndex(newIndex);
            const nextState = navigationHistory[newIndex];

            if (nextState.type === 'infobox') {
                setFocusedBox(nextState.boxId);
                animateQuestionsSequentially(nextState.boxId);
            }
        }
    }, [currentNavIndex, navigationHistory, animateQuestionsSequentially]);



    // Initialize component visibility
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Handle question clicks - send to your external Chatbot.jsx
    const handleQuestionClick = useCallback((question) => {
        setActiveQuestion(question);
        console.log('FAQ: Question clicked:', question);

        // Find the corresponding answer for this question
        let answer = '';
        let found = false;

        // Search through all question sets to find the matching question and answer
        Object.keys(questionSets).forEach(boxId => {
            const questions = questionSets[boxId];

            // Check left questions
            const leftIndex = questions.leftQuestions.findIndex(q => q === question);
            if (leftIndex !== -1 && questions.leftAnswers && questions.leftAnswers[leftIndex]) {
                answer = questions.leftAnswers[leftIndex];
                found = true;
            }

            // Check right questions
            const rightIndex = questions.rightQuestions.findIndex(q => q === question);
            if (rightIndex !== -1 && questions.rightAnswers && questions.rightAnswers[rightIndex]) {
                answer = questions.rightAnswers[rightIndex];
                found = true;
            }
        });

        if (!found) {
            answer = "I'm sorry, I couldn't find a specific answer for that question. Please contact our support team for assistance.";
        }

        // Dispatch custom event to trigger chatbot with both question and answer
        console.log('FAQ: Dispatching questionClicked event with answer');
        window.dispatchEvent(new CustomEvent('questionClicked', {
            detail: {
                question: question,
                answer: answer
            }
        }));
        console.log('FAQ: Event dispatched with answer');

        // Only add to navigation history if we're not already in an answer state
        const currentState = navigationHistory[currentNavIndex];
        if (currentState.type !== 'answer') {
            addToNavigationHistory({
                type: 'answer',
                label: 'ANSWER',
                question: question,
                answer: answer
            });
        } else {
            // If we're already in answer state, just update the current entry
            setNavigationHistory(prev => {
                const newHistory = [...prev];
                newHistory[currentNavIndex] = {
                    type: 'answer',
                    label: 'ANSWER',
                    question: question,
                    answer: answer
                };
                return newHistory;
            });
        }
    }, [addToNavigationHistory, navigationHistory, currentNavIndex, questionSets]);

    const boxes = [
        { id: 'our-products', label: 'OUR PRODUCTS', position: { x: 220, y: 140 } },
        { id: 'sales', label: 'SALES', position: { x: 270, y: 185 } },
        { id: 'pricing', label: 'PRICING', position: { x: 258, y: 230 } },
        { id: 'how-it-works', label: 'HOW IT WORKS', position: { x: 564, y: 140 } },
        { id: 'accuracy', label: 'ACCURACY', position: { x: 564, y: 185 } },
        { id: 'sectors', label: 'SECTORS', position: { x: 564, y: 230 } }
    ];



    const connections = [
        {
            svg: `<path d="M0.146446 4.35355C-0.0488129 4.15829 -0.0488129 3.84171 0.146446 3.64645L3.32843 0.464466C3.52369 0.269204 3.84027 0.269204 4.03554 0.464466C4.2308 0.659728 4.2308 0.976311 4.03554 1.17157L1.20711 4L4.03554 6.82843C4.2308 7.02369 4.2308 7.34027 4.03554 7.53553C3.84027 7.7308 3.52369 7.7308 3.32843 7.53553L0.146446 4.35355ZM110.5 75V75.5C85.7324 75.5 70.4615 57.5358 55.3076 39.8251C40.0889 22.0386 24.9837 4.5 0.5 4.5V4V3.5C25.5163 3.5 40.9111 21.4614 56.0674 39.1749C71.2885 56.9642 86.2676 74.5 110.5 74.5V75Z" fill="white"/>`,
            position: { x: 200, y: 202 },
            viewBox: "0 0 111 76",
            id: 'line-1'
        },
        {
            svg: `<path d="M0.646446 4.35355C0.451187 4.15829 0.451187 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53554 0.464466C4.7308 0.659728 4.7308 0.976311 4.53554 1.17157L1.70711 4L4.53554 6.82843C4.7308 7.02369 4.7308 7.34027 4.53554 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM111 4V4.5H1V4V3.5H111V4Z" fill="white"/>`,
            position: { x: 200, y: 240 },
            viewBox: "0 0 111 8",
            id: 'line-2'
        },
        {
            svg: `<path d="M0.146446 71.6464C-0.0488129 71.8417 -0.0488129 72.1583 0.146446 72.3536L3.32843 75.5355C3.52369 75.7308 3.84027 75.7308 4.03554 75.5355C4.2308 75.3403 4.2308 75.0237 4.03554 74.8284L1.20711 72L4.03554 69.1716C4.2308 68.9763 4.2308 68.6597 4.03554 68.4645C3.84027 68.2692 3.52369 68.2692 3.32843 68.4645L0.146446 71.6464ZM110.5 1V0.5C85.7324 0.5 70.4615 18.4642 55.3076 36.1749C40.0889 53.9614 24.9837 71.5 0.5 71.5V72V72.5C25.5163 72.5 40.9111 54.5386 56.0674 36.8251C71.2885 19.0358 86.2676 1.5 110.5 1.5V1Z" fill="white"/>`,
            position: { x: 200, y: 278 },
            viewBox: "0 0 111 76",
            id: 'line-3'
        },
        {
            svg: `<path d="M110.854 4.35355C111.049 4.15829 111.049 3.84171 110.854 3.64645L107.672 0.464466C107.476 0.269204 107.16 0.269204 106.964 0.464466C106.769 0.659728 106.769 0.976311 106.964 1.17157L109.793 4L106.964 6.82843C106.769 7.02369 106.769 7.34027 106.964 7.53553C107.16 7.7308 107.476 7.7308 107.672 7.53553L110.854 4.35355ZM0.5 75V75.5C25.2676 75.5 40.5385 57.5358 55.6924 39.8251C70.9111 22.0386 86.0163 4.5 110.5 4.5V4V3.5C85.4837 3.5 70.0889 21.4614 54.9326 39.1749C39.7115 56.9642 24.7324 74.5 0.5 74.5V75Z" fill="white"/>`,
            position: { x: 460, y: 202 },
            viewBox: "0 0 111 76",
            id: 'line-4'
        },
        {
            svg: `<path d="M110.354 4.35355C110.549 4.15829 110.549 3.84171 110.354 3.64645L107.172 0.464466C106.976 0.269204 106.66 0.269204 106.464 0.464466C106.269 0.659728 106.269 0.976311 106.464 1.17157L109.293 4L106.464 6.82843C106.269 7.02369 106.269 7.34027 106.464 7.53553C106.66 7.7308 106.976 7.7308 107.172 7.53553L110.354 4.35355ZM0 4V4.5H110V4V3.5H0V4Z" fill="white"/>`,
            position: { x: 459, y: 240 },
            viewBox: "0 0 111 8",
            id: 'line-5'
        },
        {
            svg: `<path d="M110.854 71.6464C111.049 71.8417 111.049 72.1583 110.854 72.3536L107.672 75.5355C107.476 75.7308 107.16 75.7308 106.964 75.5355C106.769 75.3403 106.769 75.0237 106.964 74.8284L109.793 72L106.964 69.1716C106.769 68.9763 106.769 68.6597 106.964 68.4645C107.16 68.2692 107.476 68.2692 107.672 68.4645L110.854 71.6464ZM0.5 1V0.5C25.2676 0.5 40.5385 18.4642 55.6924 36.1749C70.9111 53.9614 86.0163 71.5 110.5 71.5V72V72.5C85.4837 72.5 70.0889 54.5386 54.9326 36.8251C39.7115 19.0358 24.7324 1.5 0.5 1.5V1Z" fill="white"/>`,
            position: { x: 459, y: 278 },
            viewBox: "0 0 111 76",
            id: 'line-6'
        }
    ];

    // Question box connectors
    const questionConnectors = [
        {
            id: 'left-connector-1',
            svg: `<path d="M0.646446 4.35355C0.451187 4.15829 0.451187 3.84171 0.646446 3.64645L3.82842 0.464466C4.02369 0.269204 4.34027 0.269204 4.53553 0.464466C4.7308 0.659728 4.7308 0.976311 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82842 7.53553L0.646446 4.35355ZM110 146V146.5C97.5902 146.5 87.6437 137.425 78.9634 124.085C70.2715 110.728 62.7446 92.9321 55.2255 75.1952C47.6954 57.4327 40.173 39.7287 31.478 26.4616C22.7723 13.1779 12.9936 4.5 1 4.5V4V3.5C13.5314 3.5 23.5709 12.5721 32.3144 25.9134C41.0688 39.2713 48.6267 57.0673 56.1461 74.8048C63.6764 92.5679 71.168 110.272 79.8015 123.54C88.4466 136.825 98.1325 145.5 110 145.5V146Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-1'
        },
        {
            id: 'left-connector-2',
            svg: `<path d="M0.146446 4.35355C-0.0488129 4.15829 -0.0488129 3.84171 0.146446 3.64645L3.32843 0.464466C3.52369 0.269204 3.84027 0.269204 4.03554 0.464466C4.2308 0.659728 4.2308 0.976311 4.03554 1.17157L1.20711 4L4.03554 6.82843C4.2308 7.02369 4.2308 7.34027 4.03554 7.53553C3.84027 7.7308 3.52369 7.7308 3.32843 7.53553L0.146446 4.35355ZM110.5 75V75.5C85.7324 75.5 70.4615 57.5358 55.3076 39.8251C40.0889 22.0386 24.9837 4.5 0.5 4.5V4V3.5C25.5163 3.5 40.9111 21.4614 56.0674 39.1749C71.2885 56.9642 86.2676 74.5 110.5 74.5V75Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-2'
        },
        {
            id: 'left-connector-3',
            svg: `<path d="M0.646446 4.35355C0.451187 4.15829 0.451187 3.84171 0.646446 3.64645L3.82843 0.464466C4.02369 0.269204 4.34027 0.269204 4.53554 0.464466C4.7308 0.659728 4.7308 0.976311 4.53554 1.17157L1.70711 4L4.53554 6.82843C4.7308 7.02369 4.7308 7.34027 4.53554 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM111 4V4.5H1V4V3.5H111V4Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-3'
        },
        {
            id: 'left-connector-4',
            svg: `<path d="M0.146446 71.6464C-0.0488129 71.8417 -0.0488129 72.1583 0.146446 72.3536L3.32843 75.5355C3.52369 75.7308 3.84027 75.7308 4.03554 75.5355C4.2308 75.3403 4.2308 75.0237 4.03554 74.8284L1.20711 72L4.03554 69.1716C4.2308 68.9763 4.2308 68.6597 4.03554 68.4645C3.84027 68.2692 3.52369 68.2692 3.32843 68.4645L0.146446 71.6464ZM110.5 1V0.5C85.7324 0.5 70.4615 18.4642 55.3076 36.1749C40.0889 53.9614 24.9837 71.5 0.5 71.5V72V72.5C25.5163 72.5 40.9111 54.5386 56.0674 36.8251C71.2885 19.0358 86.2676 1.5 110.5 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-4'
        },
        {
            id: 'left-connector-5',
            svg: `<path d="M0.646446 142.646C0.451187 142.842 0.451187 143.158 0.646446 143.354L3.82842 146.536C4.02369 146.731 4.34027 146.731 4.53553 146.536C4.7308 146.34 4.7308 146.024 4.53553 145.828L1.70711 143L4.53553 140.172C4.7308 139.976 4.7308 139.66 4.53553 139.464C4.34027 139.269 4.02369 139.269 3.82842 139.464L0.646446 142.646ZM110 1V0.5C97.5902 0.5 87.6437 9.57523 78.9634 22.9148C70.2715 36.2721 62.7446 54.0679 55.2255 71.8048C47.6954 89.5673 40.173 107.271 31.478 120.538C22.7723 133.822 12.9936 142.5 1 142.5V143V143.5C13.5314 143.5 23.5709 134.428 32.3144 121.087C41.0688 107.729 48.6267 89.9327 56.1461 72.1952C63.6764 54.4321 71.168 36.7279 79.8015 23.4602C88.4466 10.1748 98.1325 1.5 110 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-5'
        },
        {
            id: 'right-connector-1',
            svg: `<path d="M109.354 4.35355C109.549 4.15829 109.549 3.84171 109.354 3.64645L106.172 0.464466C105.976 0.269204 105.66 0.269204 105.464 0.464466C105.269 0.659728 105.269 0.976311 105.464 1.17157L108.293 4L105.464 6.82843C105.269 7.02369 105.269 7.34027 105.464 7.53553C105.66 7.7308 105.976 7.7308 106.172 7.53553L109.354 4.35355ZM0 146V146.5C12.4098 146.5 22.3563 137.425 31.0366 124.085C39.7285 110.728 47.2554 92.9321 54.7745 75.1952C62.3046 57.4327 69.827 39.7287 78.522 26.4616C87.2277 13.1779 97.0064 4.5 109 4.5V4V3.5C96.4686 3.5 86.4291 12.5721 77.6856 25.9134C68.9312 39.2713 61.3733 57.0673 53.8539 74.8048C46.3236 92.5679 38.832 110.272 30.1985 123.54C21.5534 136.825 11.8675 145.5 0 145.5V146Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-1'
        },
        {
            id: 'right-connector-2',
            svg: `<path d="M110.854 4.35355C111.049 4.15829 111.049 3.84171 110.854 3.64645L107.672 0.464466C107.476 0.269204 107.16 0.269204 106.964 0.464466C106.769 0.659728 106.769 0.976311 106.964 1.17157L109.793 4L106.964 6.82843C106.769 7.02369 106.769 7.34027 106.964 7.53553C107.16 7.7308 107.476 7.7308 107.672 7.53553L110.854 4.35355ZM0.5 75V75.5C25.2676 75.5 40.5385 57.5358 55.6924 39.8251C70.9111 22.0386 86.0163 4.5 110.5 4.5V4V3.5C85.4837 3.5 70.0889 21.4614 54.9326 39.1749C39.7115 56.9642 24.7324 74.5 0.5 74.5V75Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-2'
        },
        {
            id: 'right-connector-3',
            svg: `<path d="M110.354 4.35355C110.549 4.15829 110.549 3.84171 110.354 3.64645L107.172 0.464466C106.976 0.269204 106.66 0.269204 106.464 0.464466C106.269 0.659728 106.269 0.976311 106.464 1.17157L109.293 4L106.464 6.82843C106.269 7.02369 106.269 7.34027 106.464 7.53553C106.66 7.7308 106.976 7.7308 107.172 7.53553L110.354 4.35355ZM0 4V4.5H110V4V3.5H0V4Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-3'
        },
        {
            id: 'right-connector-4',
            svg: `<path d="M110.854 71.6464C111.049 71.8417 111.049 72.1583 110.854 72.3536L107.672 75.5355C107.476 75.7308 107.16 75.7308 106.964 75.5355C106.769 75.3403 106.769 75.0237 106.964 74.8284L109.793 72L106.964 69.1716C106.769 68.9763 106.769 68.6597 106.964 68.4645C107.16 68.2692 107.476 68.2692 107.672 68.4645L110.854 71.6464ZM0.5 1V0.5C25.2676 0.5 40.5385 18.4642 55.6924 36.1749C70.9111 53.9614 86.0163 71.5 110.5 71.5V72V72.5C85.4837 72.5 70.0889 54.5386 54.9326 36.8251C39.7115 19.0358 24.7324 1.5 0.5 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-4'
        },
        {
            id: 'right-connector-5',
            svg: `<path d="M109.354 142.646C109.549 142.842 109.549 143.158 109.354 143.354L106.172 146.536C105.976 146.731 105.66 146.731 105.464 146.536C105.269 146.34 105.269 146.024 105.464 145.828L108.293 143L105.464 140.172C105.269 139.976 105.269 139.66 105.464 139.464C105.66 139.269 105.976 139.269 106.172 139.464L109.354 142.646ZM0 1V0.5C12.4098 0.5 22.3563 9.57523 31.0366 22.9148C39.7285 36.2721 47.2554 54.0679 54.7745 71.8048C62.3046 89.5673 69.827 107.271 78.522 120.538C87.2277 133.822 97.0064 142.5 109 142.5V143V143.5C96.4686 143.5 86.4291 134.428 77.6856 121.087C68.9312 107.729 61.3733 89.9327 53.8539 72.1952C46.3236 54.4321 38.832 36.7279 30.1985 23.4602C21.5534 10.1748 11.8675 1.5 0 1.5V1Z" fill="white"/>`,
            viewBox: "0 0 110 147",
            line: 'line-5'
        },
    ];

    const steps = [
        { boxes: ['our-products'], lines: [] },
        { boxes: ['our-products', 'sales'], lines: [] },
        { boxes: ['our-products', 'sales', 'pricing'], lines: [] },
        { boxes: ['our-products', 'sales', 'pricing', 'how-it-works'], lines: [] },
        { boxes: ['our-products', 'sales', 'pricing', 'how-it-works', 'accuracy'], lines: [] },
        { boxes: ['our-products', 'sales', 'pricing', 'how-it-works', 'accuracy', 'sectors'], lines: ['line-1', 'line-2', 'line-3', 'line-4', 'line-5', 'line-6'] }
    ];

    // Intersection Observer to detect when component is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Animation logic - only start when component is visible
    useEffect(() => {
        if (!isVisible || animationComplete) return;

        const interval = setInterval(() => {
            setCurrentStep((prev) => {
                if (focusedBox) return prev;
                if (prev === steps.length - 1) {
                    clearInterval(interval);
                    setAnimationComplete(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [isVisible, animationComplete, steps.length, focusedBox]);

    const boxVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const handleWheel = useCallback((event) => {
        if (isScrolling || !focusedBox) return;

        event.preventDefault();
        setIsScrolling(true);

        const delta = Math.sign(event.deltaY);
        setCurrentFocusIndex(prev => {
            const newIndex = (prev + delta + boxes.length) % boxes.length;
            setFocusedBox(boxes[newIndex].id);
            return newIndex;
        });

        setTimeout(() => setIsScrolling(false), 200);
    }, [isScrolling, focusedBox, boxes]);

    const handleBoxClick = useCallback((boxId) => {
        if (focusedBox === boxId) {
            // If clicking the same focused box, return to FAQ main view
            setFocusedBox(null);
            setCurrentFocusIndex(0);
            setVisibleQuestions({
                leftQuestions: [],
                rightQuestions: [],
                leftConnectors: [],
                rightConnectors: []
            });

            // Navigate back in history only if we're not at the beginning
            if (currentNavIndex > 0) {
                navigateBack();
            }
        } else {
            const boxIndex = boxes.findIndex(box => box.id === boxId);
            const box = boxes[boxIndex];
            setCurrentFocusIndex(boxIndex);
            setFocusedBox(boxId);

            // Add to navigation history
            const infoBoxLabel = box.label.replace('-left', '').replace('-right', '');
            addToNavigationHistory({
                type: 'infobox',
                label: infoBoxLabel,
                boxId: boxId
            });

            // Start the sequential animation for questions
            animateQuestionsSequentially(boxId);
        }
    }, [focusedBox, boxes, animateQuestionsSequentially, navigateBack, addToNavigationHistory, currentNavIndex]);

    // Use the final step when animation is complete
    const currentStepData = animationComplete ? steps[steps.length - 1] : steps[currentStep];

    return (
        <>
            <div className="animated-faq-container" ref={containerRef}>
                {/* Navigation Breadcrumb */}
                <div className="faq-navigation">
                    <div className="nav-breadcrumb">
                        <button
                            className="nav-back-btn"
                            onClick={navigateBack}
                            disabled={currentNavIndex === 0}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="nav-forward-btn"
                            onClick={navigateForward}
                            disabled={currentNavIndex === navigationHistory.length - 1}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="breadcrumb-path">
                            {navigationHistory.map((item, index) => (
                                <React.Fragment key={index}>
                                    <span className={`breadcrumb-item ${index === currentNavIndex ? 'current' : ''}`}>
                                        {item.label}
                                    </span>
                                    {index < navigationHistory.length - 1 && (
                                        <span className="breadcrumb-separator">{'>'}</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="diagram-container">
                        {/* FAQ Center - Show only when no box is focused */}
                        {!focusedBox && (
                            <motion.div
                                className="faq-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
                                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
                            >
                                FAQ
                            </motion.div>
                        )}

                        <motion.div
                            className="boxes-container"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            onWheel={handleWheel}
                        >
                            <AnimatePresence mode="sync">
                                {focusedBox ? (
                                    // When a box is focused, create a centered layout with proper scrolling
                                    <div style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '67%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '300px',
                                        height: '280px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        overscrollBehavior: 'contain' /* prevents scroll chaining */

                                        
                                    }}>
                                        {boxes.map((box, index) => {
                                            const isFocused = focusedBox === box.id;
                                            const relativePosition = index - currentFocusIndex;

                                            // Calculate visual properties based on position
                                            let backgroundColor, borderColor, textColor, opacity, scale;

                                            if (isFocused) {
                                                textColor = '#000';
                                                opacity = 1;
                                                scale = 0.9;
                                            } else if (Math.abs(relativePosition) === 1) {
                                                backgroundColor = '#000';
                                                borderColor = '#666';
                                                textColor = '#fff';
                                                opacity = 0.9;
                                                scale = 0.8;
                                            } else if (Math.abs(relativePosition) === 2) {
                                                backgroundColor = '#000';
                                                borderColor = '#888';
                                                textColor = '#fff';
                                                opacity = 0.8;
                                                scale = 0.7;
                                            } else if (Math.abs(relativePosition) === 3) {
                                                backgroundColor = '#000';
                                                borderColor = '#aaa';
                                                textColor = '#fff';
                                                opacity = 0.7;
                                                scale = 0.6;
                                            } else if (Math.abs(relativePosition) === 4) {
                                                backgroundColor = '#000';
                                                borderColor = '#aaa';
                                                textColor = '#fff';
                                                opacity = 0.6;
                                                scale = 0.5;
                                            } else {
                                                backgroundColor = '#000';
                                                borderColor = '#aaa';
                                                textColor = '#fff';
                                                opacity = 0.5;
                                                scale = 0.4;
                                            }

                                            return (
                                                <motion.div
                                                    key={box.id}
                                                    className={`info-box ${box.id.includes('left') ? 'left-side' : 'right-side'} ${isFocused ? 'focused' : 'stacked'}`}
                                                    style={{
                                                        position: 'absolute',
                                                        top: box.top,
                                                        left: box.left,
                                                        width: '200px',
                                                        height: '45px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        cursor: 'pointer',
                                                        zIndex: isFocused ? 10 : 5,
                                                    }}
                                                    variants={boxVariants}
                                                    initial="hidden"
                                                    animate={{
                                                        scale: scale,
                                                        opacity: opacity,
                                                        y: relativePosition * 44, // Consistent spacing between boxes
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.4
                                                        }
                                                    }}
                                                    exit="exit"
                                                    onClick={() => handleBoxClick(box.id)}
                                                    whileHover={{
                                                        scale: scale * 1.03,
                                                        transition: { duration: 0.15 }
                                                    }}
                                                    whileTap={{
                                                        scale: scale * 0.97,
                                                        transition: { duration: 0.1 }
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: isFocused ? '14px' : '12px',
                                                        fontWeight: isFocused ? 600 : 500,
                                                        color: textColor,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px',
                                                        pointerEvents: 'none',
                                                        fontFamily: '"Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                                                    }}>
                                                        {box.label}
                                                    </div>
                                                    <div style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        color: textColor,
                                                        pointerEvents: 'none'
                                                    }}>
                                                        {isFocused ? '↗' : relativePosition > 0 ? '↘' : relativePosition < 0 ? '↖' : '↗'}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // Normal layout when no box is focused
                                    currentStepData.boxes.map((boxId) => {
                                        const box = boxes.find(b => b.id === boxId);

                                        return (
                                            <motion.div
                                                key={boxId}
                                                className={`info-box ${boxId.includes('left') ? 'left-side' : 'right-side'}`}
                                                style={{
                                                    position: 'absolute',
                                                    left: (boxId === 'our-products' || boxId === 'sales' || boxId === 'pricing') ? `${box.position.x - 26}px` : `${box.position.x}px`,
                                                    top: `${box.position.y}px`,
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    gap: '8px',
                                                    padding: '0.55rem 1rem'
                                                }}
                                                variants={boxVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                onClick={() => handleBoxClick(boxId)}
                                                whileHover={{ borderLeft: '4px solid white', transition: { duration: 0.15 } }}
                                                whileTap={{
                                                    borderLeft: '4px solid white',
                                                }}
                                            >
                                                <span>{box.label}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 24 25" fill="none">
                                                    <rect width="24" height="24" transform="translate(0 0.5)" fill="white" fill-opacity="0" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#fff" />
                                                </svg>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <svg
                            className="connection-lines"
                            viewBox="0 0 900 500"
                            preserveAspectRatio="xMidYMid meet"
                            style={{
                                opacity: focusedBox ? 0 : 1,
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="9"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <polygon
                                        points="0 0, 10 3.5, 0 7"
                                        fill="rgba(255, 255, 255, 0.8)"
                                    />
                                </marker>
                            </defs>

                            {connections.map((connection) => (
                                <g key={connection.id}>
                                    <motion.g
                                        transform={`translate(${connection.position.x}, ${connection.position.y})`}
                                        initial={{
                                            pathLength: 0,
                                            opacity: 0
                                        }}
                                        animate={{
                                            pathLength: currentStepData.lines.includes(connection.id) ? 1 : 0,
                                            opacity: currentStepData.lines.includes(connection.id) ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeInOut",
                                            delay: currentStepData.lines.indexOf(connection.id) * 0.05
                                        }}
                                    >
                                        <svg
                                            width="111"
                                            height="76"
                                            viewBox={connection.viewBox}
                                            dangerouslySetInnerHTML={{ __html: connection.svg }}
                                        />
                                    </motion.g>
                                </g>
                            ))}
                        </svg>

                        {/* Questions and Connectors for Focused Box */}
                        {focusedBox && questionSets[focusedBox] && (
                            <div className="questions-container">
                                {/* Left Side Questions */}
                                <div className="left-questions">
                                    {questionSets[focusedBox].leftQuestions.map((question, index) => (
                                        <div key={`left-${index}`}>
                                            {/* Left Connector */}
                                            <AnimatePresence>
                                                {visibleQuestions.leftConnectors.includes(index) && (
                                                    <motion.div
                                                        style={{
                                                            position: 'absolute',
                                                            left: index === 0 ? '237px' :
                                                                index === 1 ? '237px' :
                                                                    index === 2 ? '237px' :
                                                                        index === 3 ? '237px' :
                                                                            index === 4 ? '237px' : '250px',
                                                            top: index === 0 ? '77px' :
                                                                index === 1 ? '137px' :
                                                                    index === 2 ? '197px' :
                                                                        index === 3 ? '199px' :
                                                                            index === 4 ? '200px' : '377px',
                                                            zIndex: 5
                                                        }}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.3,
                                                            delay: 0.1
                                                        }}
                                                    >
                                                        <svg
                                                            width="150"
                                                            height="125"
                                                            viewBox={questionConnectors.find(c => c.id === `left-connector-${index + 1}`)?.viewBox || "0 0 110 147"}
                                                            dangerouslySetInnerHTML={{
                                                                __html: questionConnectors.find(c => c.id === `left-connector-${index + 1}`)?.svg || ''
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Left Question Box */}
                                            <AnimatePresence>
                                                {visibleQuestions.leftQuestions.includes(index) && (
                                                    <motion.div
                                                        className="question-box left-question"
                                                        style={{
                                                            position: 'absolute',
                                                            left: `${-85.5}px`,
                                                            top: `${50 + (index * 60)}px`,
                                                            width: '350px',
                                                            padding: '12px 16px',
                                                            borderRadius: '0',
                                                            backgroundColor: '#1A1A1A',
                                                            border: '0.5px solid white',
                                                            borderLeft: '0.5px solid white',
                                                            cursor: 'pointer',
                                                            zIndex: 6,
                                                            ...(activeQuestion === question && {
                                                                border: '0.5px solid white',
                                                                borderLeft: '4px solid white'
                                                            })
                                                        }}
                                                        initial={{ scale: 0, opacity: 0, x: -50 }}
                                                        animate={{ scale: 1, opacity: 1, x: 0 }}
                                                        exit={{ scale: 0, opacity: 0, x: -50 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.4,
                                                            cursor: 'pointer'
                                                        }}
                                                        whileHover={{ borderLeft: '4px solid white', transition: { duration: 0.15 } }}
                                                        whileTap={{ borderLeft: '4px solid white' }}
                                                        onClick={() => handleQuestionClick(question)}
                                                    >
                                                        <div style={{
                                                            fontSize: '11px',
                                                            fontWeight: 200,
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            lineHeight: '1.3',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px'
                                                        }}>
                                                            {question}
                                                        </div>

                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side Questions */}
                                <div className="right-questions">
                                    {questionSets[focusedBox].rightQuestions.map((question, index) => (
                                        <div key={`right-${index}`}>
                                            {/* Right Connector */}
                                            <AnimatePresence>
                                                {visibleQuestions.rightConnectors.includes(index) && (
                                                    <motion.div
                                                        style={{
                                                            position: 'absolute',
                                                            right: index === 0 ? '238px' :
                                                                index === 1 ? '238px' :
                                                                    index === 2 ? '238px' :
                                                                        index === 3 ? '239px' :
                                                                            index === 4 ? '238px' : '238px',
                                                            top: index === 0 ? '74px' :
                                                                index === 1 ? '134px' :
                                                                    index === 2 ? '195px' :
                                                                        index === 3 ? '197px' :
                                                                            index === 4 ? '198px' : '124px',
                                                            zIndex: 5
                                                        }}
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.3,
                                                            delay: 0.1
                                                        }}
                                                    >
                                                        <svg
                                                            width="150"
                                                            height="125"
                                                            viewBox={questionConnectors.find(c => c.id === `right-connector-${index + 1}`)?.viewBox || "0 0 110 147"}
                                                            dangerouslySetInnerHTML={{
                                                                __html: questionConnectors.find(c => c.id === `right-connector-${index + 1}`)?.svg || ''
                                                            }}
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Right Question Box */}
                                            <AnimatePresence>
                                                {visibleQuestions.rightQuestions.includes(index) && (
                                                    <motion.div
                                                        className="question-box right-question"
                                                        style={{
                                                            position: 'absolute',
                                                            right: `${-85.5}px`,
                                                            top: `${50 + (index * 60)}px`,
                                                            width: '350px',
                                                            padding: '12px 16px',
                                                            borderRadius: '0',
                                                            backgroundColor: '#1A1A1A',
                                                            border: '0.5px solid white',
                                                            borderLeft: '0.5px solid white',
                                                            cursor: 'pointer',
                                                            zIndex: 6,
                                                            ...(activeQuestion === question && {
                                                                border: '1px solid white',
                                                                borderLeft: '4px solid white'
                                                            })
                                                        }}
                                                        initial={{ scale: 0, opacity: 0, x: 50 }}
                                                        animate={{ scale: 1, opacity: 1, x: 0 }}
                                                        exit={{ scale: 0, opacity: 0, x: 50 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 300,
                                                            damping: 30,
                                                            duration: 0.4
                                                        }}
                                                        whileHover={{ borderLeft: '4px solid white', transition: { duration: 0.15 } }}
                                                        whileTap={{ borderLeft: '4px solid white', transition: { duration: 0.15 } }}
                                                        onClick={() => handleQuestionClick(question)}
                                                    >
                                                        <div style={{
                                                            fontSize: '11px',
                                                            fontWeight: 200,
                                                            color: 'white',
                                                            textAlign: 'left',
                                                            lineHeight: '1.3',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.5px'
                                                        }}>
                                                            {question}
                                                        </div>

                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Chatbot selectedQuestion={selectedQuestion} chatbotResponse={chatbotResponse} />
                </div>

                <style>{`
@media (max-width: 768px){
.animated-faq-container{
display: none !important;
}
}
                    .nav-breadcrumb {
                        display: flex;
                        align-items: center;
                    }

                    .nav-back-btn, .nav-forward-btn {
                        background: transparent;
                        border: 1px solid #FFF;
                        padding: 6px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.2s ease;
                    }
.nav-forward-btn {
    margin-right: 16px;
}
                    .nav-back-btn:hover, .nav-forward-btn:hover {
                        border-color: rgba(255, 255, 255, 0.4);
                    }

                    .nav-back-btn:disabled, .nav-forward-btn:disabled {
                        opacity: 0.3;
                        cursor: not-allowed;
                        border-color: rgba(255, 255, 255, 0.6);
                    }

                    .nav-back-btn:disabled:hover, .nav-forward-btn:disabled:hover {
                        border-color: rgba(255, 255, 255, 0.6);
                    }

                    .breadcrumb-path {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .breadcrumb-item {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 12px;
                        font-weight: 400;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                    }

                    .breadcrumb-item.current {
                        color: white;
                        font-weight: 500;
                    }

                    .breadcrumb-separator {
                        color: rgba(255, 255, 255, 0.4);
                        font-size: 12px;
                        margin: 0 2px;
                    }

                    @media (max-width: 768px) {
                        .faq-navigation {
                            top: 10px;
                            left: 10px;
                        }
                        
                        .nav-breadcrumb {
                            padding: 6px 12px;
                            gap: 8px;
                        }
                        
                        .breadcrumb-item {
                            font-size: 10px;
                        }
                    }

                    .info-box.focused {
                        background: rgba(248, 248, 248, 0.95) !important;
                        color: rgb(0, 0, 0) !important;
                        padding: 0 15px !important;
                        font-size: 14px !important;
                        font-weight: 600 !important;
                        letter-spacing: 0.5px;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .info-box.stacked {
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .animated-faq-container {
                        min-height: 67vh;
                        background: #1A1A1A;
                        color: white;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        overflow: hidden;
                        position: relative;
                          padding: 45px 95px 48px 95px;
                    }

                    .content-wrapper {
                        width: 100%;
                        max-width: 900px;
                        margin: 0 auto;
                        position: relative;
                    }

                    .diagram-container {
                        position: relative;
                        width: 100%;
                        height: 300px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .faq-center {
                        position: absolute;
                        top: 58%;
                        background: rgb(255, 255, 255);
                        color: rgb(0, 0, 0);
                        padding: 0.625rem 1.65rem;
                        font-weight: 400;
                        font-size: 1.2rem;
                        z-index: 10;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    .boxes-container {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }

                    .info-box {
                        background: rgba(30, 30, 30, 0.9);
                        border: 1px solid rgb(255, 255, 255);
                        color: #e2e8f0;
                        padding: 0.55rem 1rem;
                        font-size: 0.6rem;
                        font-weight: 400;
                        letter-spacing: 0.5px;
                        transform-origin: center;
                        width: auto;
                        text-align: center;
                        font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        transition: all 0.3s ease;
                    }

                    .connection-lines {
                        position: absolute;
                        top: 36px;
                        left: 38px;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: 5;
                    }

                    @media (max-width: 768px) {
                        .diagram-container {
                            height: 300px;
                        }
                        
                        .info-box {
                            font-size: 0.75rem;
                            padding: 0.5rem 0.75rem;
                        }

                        .info-box.focused {
                            width: 280px !important;
                            font-size: 0.75rem !important;
                            padding: 0.6rem 1.2rem !important;
                        }
                        
                        .faq-center {
                            font-size: 1rem;
                            padding: 0.75rem 1.5rem;
                        }
                    }
                `}</style>
            </div>
        </>
    );
};

export default AnimatedFAQDiagram;
