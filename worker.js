import { GoogleGenerativeAI } from '@google/generative-ai';

export default {
  async fetch(request, env, ctx) {
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const url = new URL(request.url);
    
    if (url.pathname === '/chat' && request.method === 'POST') {
      try {
        const { message, page_id } = await request.json();
        
        const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          systemInstruction: `You are an expert assistant for the company a_action. Your primary goal is to answer every question about a_action comprehensively. Your responses should be focused on a_action. Use the following FAQ as your knowledge base to answer questions accurately:

Q: What main problem does a_ACTION solve for businesses?
A: a_ACTION eliminates the difficulty of transforming LLM outputs into secure, real-world actions. By intercepting, authenticating, and mapping function calls into APIs, it ensures automation is reliable and not left to chance.

Q: How does a_ACTION connect AI models with real-world APIs?
A: It acts as a middleware that translates LLM function calls into structured API requests. This allows AI to work seamlessly with systems like CRMs, payment gateways, or databases.

Q: Why is a_ACTION better than custom in-house integrations?
A: Custom solutions take months to build and maintain. a_ACTION provides ready-made reliability, authentication, and monitoring, which saves costs and ensures smooth scaling across industries.

Q: Does a_ACTION support multiple LLMs and AI providers?
A: Yes, it is designed to be LLM-agnostic. Businesses can use OpenAI, Anthropic, Hugging Face, or in-house models without worrying about compatibility.

Q: What kinds of APIs can a_ACTION work with?
A: a_ACTION supports REST, GraphQL, SOAP, internal APIs, and legacy enterprise systems. This flexibility ensures it fits seamlessly into existing business tech stacks.

Q: Who are the primary customers for a_ACTION platform?
A: The platform targets enterprises, SaaS providers, and startups that want to safely transform LLM outputs into actionable API calls without building integrations manually.

Q: How does a_ACTION improve sales workflows and performance?
A: Sales teams can use AI to automate CRM updates, outreach workflows, and customer data syncing, all while ensuring accuracy and authentication.

Q: What pricing models does a_ACTION offer to customers?
A: a_ACTION offers flexible plans including pay-per-use, subscription tiers, and custom enterprise pricing for large-scale deployments.

Q: How does a_ACTION intercept LLM function and tool calls?
A: It sits between the LLM and execution layer, capturing every function call, validating it, and preparing it for secure API execution.

Q: How does a_ACTION ensure API calls are always valid?
A: It validates input parameters, checks authentication, and confirms schema compliance before sending a request to any external API.

Q: Which industries benefit the most from using a_ACTION?
A: Finance, healthcare, retail, logistics, SaaS, education, and government see the most impact by automating workflows with AI-driven API execution.`
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ response: text }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        console.error('Error in chatbot worker:', error);
        return new Response(JSON.stringify({ 
          response: "I'm sorry, I'm having trouble processing your request right now." 
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    if (url.pathname === '/' && request.method === 'GET') {
      return new Response(JSON.stringify({ message: "Chatbot API is running." }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
