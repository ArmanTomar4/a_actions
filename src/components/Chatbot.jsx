import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typingMessage, setTypingMessage] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    // API configuration
    const API_BASE_URL = 'http://localhost:8000';

    const typewriterEffect = (text, messageId) => {
        let index = 0;
        const speed = 5; // milliseconds per character - much faster!

        const typeNextChar = () => {
            if (index < text.length) {
                setTypingMessage(prev => ({
                    ...prev,
                    text: text.substring(0, index + 1)
                }));
                index++;
                // Scroll to bottom during typing
                setTimeout(() => {
                    scrollToBottom();
                    typeNextChar();
                }, speed);
            } else {
                // Typewriter effect complete
                setIsTyping(false);
                setTypingMessage(null);

                // Update the actual message with full text
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, text: text } : msg
                ));

                // Final scroll after message is complete
                setTimeout(scrollToBottom, 100);
            }
        };

        typeNextChar();
    };

    // Function to detect current page context
    const getCurrentPageContext = () => {
        const pathname = window.location.pathname;
        if (pathname.includes('faq') || pathname.includes('help')) return 'support';
        if (pathname.includes('services') || pathname.includes('products')) return 'services';
        if (pathname.includes('about')) return 'about';
        if (pathname.includes('contact')) return 'contact';
        if (pathname.includes('pricing')) return 'pricing';
        return 'home'; // default to home page context
    };

    // Function to call the chatbot API
    const callChatbotAPI = async (message, pageId = null) => {
        try {
            // If no pageId provided, detect current page context
            const currentPage = pageId || getCurrentPageContext();

            const payload = {
                message: message,
                page_id: currentPage
            };

            console.log('Sending to API:', payload);

            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            return data.response;
        } catch (error) {
            console.error('Error calling chatbot API:', error);
            return "I'm sorry, I'm having trouble connecting to the server right now. Please try again later.";
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Listen for questions from FAQ component
    useEffect(() => {
        const handleQuestionClicked = (event) => {
            console.log('Chatbot: Event received!', event.detail);
            const { question, answer } = event.detail;
            setIsVisible(true);
            console.log('Chatbot: Setting visible to true');

            // Add the question as a user message immediately
            const userMessage = {
                id: messages.length + 1,
                text: question,
                type: 'user'
            };

            // Add the answer as a bot message with placeholder text
            const botMessage = {
                id: messages.length + 2,
                text: '', // Start with empty text
                type: 'bot'
            };

            setMessages(prev => [...prev, userMessage, botMessage]);

            // Start typewriter effect after 2 seconds
            setTimeout(() => {
                setIsTyping(true);
                setTypingMessage({
                    id: botMessage.id,
                    text: '',
                    type: 'bot'
                });

                // Scroll to bottom when typing starts
                setTimeout(scrollToBottom, 100);

                typewriterEffect(answer, botMessage.id);
            }, 2000);

            // Scroll to chatbot after a short delay to ensure it's rendered
            setTimeout(() => {
                const chatbotElement = document.querySelector('.chatbot-container');
                if (chatbotElement) {
                    import('../utils/smoothScroll.js').then(({ smoothScrollTo }) => {
                        smoothScrollTo(chatbotElement, { duration: 800, align: 'center' });
                    });
                }
            }, 300);
        };

        console.log('Chatbot: Adding event listener');
        window.addEventListener('questionClicked', handleQuestionClicked);

        return () => {
            window.removeEventListener('questionClicked', handleQuestionClicked);
        };
    }, []);

    const suggestedQuestions = [
        "WHAT FILE TYPES DOES AOCR SUPPORT?"
    ];

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsLoading(true);

            const userMessage = {
                id: messages.length + 1,
                text: inputValue.toUpperCase(),
                type: 'user'
            };
            setMessages(prev => [...prev, userMessage]);
            setInputValue('');

            // Add bot message placeholder
            const botMessage = {
                id: messages.length + 2,
                text: '',
                type: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);

            try {
                // Call the chatbot API
                const apiResponse = await callChatbotAPI(userMessage.text);

                // Show typing indicator and start typewriter effect
                setIsTyping(true);
                setTypingMessage({
                    id: botMessage.id,
                    text: '',
                    type: 'bot'
                });

                // Scroll to bottom when typing starts
                setTimeout(scrollToBottom, 100);

                typewriterEffect(apiResponse, botMessage.id);
            } catch (error) {
                console.error('Error getting response:', error);
                const errorMessage = "I'm sorry, I'm having trouble processing your request right now.";
                setIsTyping(true);
                setTypingMessage({
                    id: botMessage.id,
                    text: '',
                    type: 'bot'
                });
                typewriterEffect(errorMessage, botMessage.id);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSuggestedQuestion = async (question) => {
        const userMessage = {
            id: messages.length + 1,
            text: question,
            type: 'user'
        };
        setMessages(prev => [...prev, userMessage]);

        // Add bot message placeholder
        const botMessage = {
            id: messages.length + 2,
            text: '',
            type: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);

        // Show typing indicator
        setIsTyping(true);
        setTypingMessage({
            id: botMessage.id,
            text: '',
            type: 'bot'
        });

        try {
            // Call the chatbot API
            const apiResponse = await callChatbotAPI(question);

            // Scroll to bottom when typing starts
            setTimeout(scrollToBottom, 100);

            // Start typewriter effect with API response
            typewriterEffect(apiResponse, botMessage.id);
        } catch (error) {
            console.error('Error getting response:', error);
            const errorMessage = "I'm sorry, I'm having trouble processing your request right now.";
            typewriterEffect(errorMessage, botMessage.id);
        }
    };

    return (
        <>
            {isVisible && (
                <div className="chatbot-container">
                    <div className="chatbot-box">
                        {/* Messages Section */}
                        <div className="chatbot-messages" ref={messagesContainerRef}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chatbot-message ${message.type === 'user' ? 'user' : 'bot'}`}
                                >
                                    {message.text}
                                </div>
                            ))}

                            {/* Show typing indicator */}
                            {isTyping && typingMessage && (
                                <div className="chatbot-message bot">
                                    {typingMessage.text}
                                    <span className="typing-cursor">|</span>
                                </div>
                            )}
                        </div>

                        {/* Input Section */}
                        <div className="chatbot-input-section">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="ASK ANY QUESTIONS"
                                className="chatbot-input"
                            />
                            <button
                                className="chatbot-send-button"
                                style={{
                                    padding: '5px',
                                }}
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <div className="loading-spinner"></div>
                                ) : (
                                    <svg width="208" height="208" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M72.8125 133.429L80.7165 134.377L76.6064 37L72.8125 133.429Z" fill={inputValue.trim() ? "white" : "black"} />
                                        <path d="M81.3488 133.112H72.8125L47.8359 172L81.3488 133.112Z" fill={inputValue.trim() ? "white" : "black"} />
                                        <path d="M74.709 136.906L80.3998 129.951L196.114 147.023L74.709 136.906Z" fill={inputValue.trim() ? "white" : "black"} />
                                        <path d="M80.4004 129.951L76.9227 136.274L8 165.677L80.4004 129.951Z" fill={inputValue.trim() ? "white" : "black"} fill-opacity="0.3" />
                                        <path d="M80.4016 129.951L200.542 75.5713L76.9238 136.274L80.4016 129.951Z" fill={inputValue.trim() ? "white" : "black"} />
                                    </svg>

                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
                .chatbot-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 54vh;
                    background-color: #000;
                    z-index: 1000;
                    padding: 0px 95px 48px 95px;
                }

                .chatbot-box {
                    background-color: #000;
                    border-radius: 0;
                    border: 1px solid #666;
                    width: 100%;
                    height: 15.25rem;
                    display: flex;
                    flex-direction: column;
                    padding: 16px;
                    gap: 24px;
                }

                @media (max-width: 768px) {
                    .chatbot-container {
                        padding: 0px 0px 48px 0px;
                        width: 100%;
                        max-width: 100vw;
                        min-height: 40vh;
                    }
                    .chatbot-box {
                        width: 100%;
                        border: none;
                        border-radius: 0;
                        margin: 0;
                        height: 50vh;
                        min-height: 300px;
                    }
                    .chatbot-messages {
                        height: 200px;
                        max-height: 200px;
                    }
                }

                @media (max-width: 480px) {
                    .chatbot-container {
                        padding: 0px 0px 24px 0px;
                        width: 100vw;
                        margin: 0;
                        min-height: 35vh;
                    }
                    .chatbot-box {
                        width: 100vw;
                        border: none;
                        border-radius: 0;
                        margin: 0;
                        height: 45vh;
                        min-height: 250px;
                        padding: 12px;
                    }
                    .chatbot-messages {
                        height: 180px;
                        max-height: 180px;
                    }
                    .chatbot-input-section {
                        gap: 8px;
                    }
                    .chatbot-input {
                        padding: 10px 12px;
                        font-size: 11px;
                    }
                    .chatbot-send-button {
                        width: 36px;
                        height: 36px;
                    }
                    .chatbot-message {
                        font-size: 11px;
                        line-height: 1.4;
                    }
                }

                @media (max-width: 768px) and (orientation: landscape) {
                    .chatbot-box {
                        height: 60vh;
                        min-height: 250px;
                    }
                    .chatbot-messages {
                        height: 150px;
                        max-height: 150px;
                    }
                }

                @media (max-width: 480px) and (orientation: landscape) {
                    .chatbot-box {
                        height: 40vh;
                        min-height: 100px;
                    }
                    .chatbot-messages {
                        height: 120px;
                        max-height: 120px;
                    }
                }

                .chatbot-messages {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    overflow-y: auto;
                    height: 300px;
                    max-height: 300px;
                    margin-bottom: 16px;
                }

                .chatbot-message {
                    font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 1.5;
                    word-wrap: break-word;
                }

                .chatbot-message.bot {
                    color: #ffffff;
                    text-align: left;
                    letter-spacing: 0.04rem;
                }

                .chatbot-message.user {
                    color: #ffffffaf;
                    text-transform: uppercase;
                    text-align: left;
                }

                .chatbot-input-section {
                    display: flex;
                    gap: 0;
                    align-items: center;
                    margin-top: auto;
                }

                .chatbot-input {
                    flex: 1;
                    background: none;
                    border: 1px solid #FFF;
                    border-radius: 0;
                    border-right: none;
                    padding: 12px 16px;
                    font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                    text-transform: uppercase;
                    color: #FFF;
                    outline: none;
                }

                .chatbot-send-button {
                    background-color: #0035DD;
                    border: 1px solid #FFF;
                    border-left: none;
                    border-radius: 0;
                    width: 40px;
                    height: 40px;
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .chatbot-send-button:hover:not(:disabled) {
                    background-color: #0028b0;
                }

                .chatbot-send-button:disabled {
                    background-color: #FFF;
                    cursor: not-allowed;
                }

                .chatbot-send-button:disabled svg path {
                    stroke: #000;
                }

                .chatbot-send-button:not(:disabled) svg path {
                    stroke: #fff;
                }

                .typing-cursor {
                    animation: blink 1s infinite;
                    color: #4169e1;
                    font-weight: bold;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid #ffffff;
                    border-top: 2px solid transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .chatbot-messages::-webkit-scrollbar {
                    width: 8px;
                }

                .chatbot-messages::-webkit-scrollbar-track {
                    background: #f5f5dc;
                }

                .chatbot-messages::-webkit-scrollbar-thumb {
                    background: #4169e1;
                    border-radius: 4px;
                }

                .chatbot-messages::-webkit-scrollbar-thumb:hover {
                    background: #3151b0;
                }
            `}</style>
        </>
    );
};

export default Chatbot;