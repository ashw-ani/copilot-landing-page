import React, { useState, useEffect, useRef } from 'react';
import './ChatBubble.css';

interface ChatBubbleProps {
  logoSrc?: string;
}

interface Message {
  id?: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface WebSocketResponse {
  message_id?: string;
  text?: string;
  content?: string;
  type?: string;
  sequence?: number;
  timestamp?: number;
  response?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ logoSrc = '/Logo2.png' }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'How can I help you today?', isUser: false, timestamp: new Date() }
  ]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to WebSocket when chat is opened
  useEffect(() => {
    if (isChatOpen && !socket) {
      connectWebSocket();
    }
    
    // Clean up WebSocket connection when component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [isChatOpen]);
  
  // Adjust chat box position based on window size
  useEffect(() => {
    const handleResize = () => {
      const chatBox = document.querySelector('.chat-box');
      if (chatBox && window.innerHeight < 800) {
        (chatBox as HTMLElement).style.height = `${Math.max(500, window.innerHeight - 100)}px`;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isChatOpen]);
  
  // Handle shimmer animation timing
  useEffect(() => {
    if (isChatOpen && isFirstOpen) {
      // After animation completes, set isFirstOpen to false
      const timer = setTimeout(() => {
        setIsFirstOpen(false);
      }, 2500); // Match the animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isChatOpen, isFirstOpen]);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentResponse]);

  const connectWebSocket = () => {
    try {
      const ws = new WebSocket('wss://copilot-streaming-api-det.inventory-dec.hrs.com/api');
      
      ws.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnected(true);
        setSocket(ws);
      };
      
      ws.onmessage = (event) => {
        try {
          console.log('Received message:', event.data);
          const data = JSON.parse(event.data);
          
          // Handle different response types
          if (data.type === 'raw_content') {
            // Append to the current response text
            setCurrentResponse(prev => {
              const newContent = data.text || data.content || '';
              if (prev) {
                return prev + newContent;
              } else {
                return newContent;
              }
            });
          } else if (data.type === 'formatted_response') {
            // Add the formatted response to messages and clear current response
            setMessages(prev => [...prev, {
              id: data.message_id,
              text: data.text || data.content || data.response || '',
              isUser: false,
              timestamp: new Date()
            }]);
            setCurrentResponse(null);
            setIsProcessing(false);
          } else if (data.type === 'stream_end') {
            // If streaming ends, add the accumulated response as a message
            if (currentResponse) {
              setMessages(prev => [...prev, {
                id: data.message_id,
                text: currentResponse,
                isUser: false,
                timestamp: new Date()
              }]);
              setCurrentResponse(null);
            }
            setIsProcessing(false);
          } else if (data.type === 'error') {
            // Handle error responses
            const errorMessage = data.text || data.content || data.response || 'An error occurred while processing your request.';
            addMessage(errorMessage, false);
            setIsProcessing(false);
          } else {
            // Handle other message types
            console.log('Processing message format:', data);
            const responseText = data.text || data.content || data.response || '';
            if (responseText) {
              addMessage(responseText, false);
              setIsProcessing(false);
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          // If it's not JSON, treat it as a plain text response
          addMessage(event.data, false);
          setIsProcessing(false);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        addMessage('Sorry, there was an error connecting to the service.', false);
        setIsConnected(false);
        setCurrentResponse(null);
        setIsProcessing(false);
      };
      
      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        setSocket(null);
        setCurrentResponse(null);
        
        // If we were processing a message when the connection closed, reset the state
        if (isProcessing) {
          setIsProcessing(false);
          addMessage('Connection lost. Please try again.', false);
        }
      };
      
      setSocket(ws);
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      addMessage('Sorry, there was an error connecting to the service.', false);
      setCurrentResponse(null);
      setIsProcessing(false);
    }
  };

  const toggleChat = () => {
    // Toggle chat state
    setIsChatOpen(!isChatOpen);
    
    // If opening the chat and not connected to WebSocket, try to connect
    if (!isChatOpen && !socket) {
      connectWebSocket();
    }
  };

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser, timestamp: new Date() }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim()) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!inputText.trim() || isProcessing) return;
    
    // Set processing state
    setIsProcessing(true);
    
    // Add user message to chat
    addMessage(inputText, true);
    
    // Reset current response
    setCurrentResponse(null);
    
    // Generate a unique session ID for each conversation
    const generateSessionId = () => {
      return Date.now().toString() + Math.random().toString(36).substring(2, 15);
    };
    
    // Send message to WebSocket if connected
    if (socket && isConnected) {
      try {
        const message = {
          action: "query",
          question: inputText,
          K_key: "Dummy Client",
          User_ID: "landingPageUser",
          // authToken: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwcmFzaGFudC5zaGFybWFAaHJzLmNvbSIsImVtYWlsIjoicHJhc2hhbnQuc2hhcm1hQGhycy5jb20iLCJyb2xlIjoiU1VQRVJBRE1JTiIsImFjY291bnROYW1lIjoiU2llbWVucyBBRyIsIm5hbWUiOiJQcmFzaGFudCIsImxhc3ROYW1lIjoiU2hhcm1hIiwibXlIcnNJZCI6InBzaDUxIiwiaWF0IjoxNzQ2OTY2OTc1LCJleHAiOjE3NDY5NzA1NzV9.GGi2V0Xcch0ZlgOx9tSHOjiOnHuXT2tFEU6miPZGbfZ_VYzlRlQZ6CUSzwLtNhSx",
          session_id: generateSessionId()
        };
        
        socket.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending message:', error);
        addMessage('Sorry, there was an error sending your message.', false);
        setIsProcessing(false);
      }
    } else {
      // If not connected, try to reconnect
      connectWebSocket();
      
      // Set a timeout to send the message after connection attempt
      setTimeout(() => {
        if (socket && isConnected) {
          // Store the current message to send after reconnection
          const pendingMessage = inputText;
          setInputText(''); // Clear input field
          
          // Send the stored message
          setInputText(pendingMessage);
          sendMessage(); // Try sending again after reconnection attempt
        } else {
          addMessage('Unable to connect to the service. Please try again later.', false);
          setIsProcessing(false);
        }
      }, 2000);
      
      addMessage('Trying to reconnect...', false);
    }
    
    // Clear input field
    setInputText('');
  };

  // Function to format message text with markdown-like syntax
  const formatMessageText = (text: string) => {
    if (!text) return [];
    
    // Handle special formatting for structured content
    if (text.includes("Key features") || text.includes("INSIGHTS")) {
      // Process structured content with headers and lists
      return formatStructuredContent(text);
    }
    
    // Clean up excessive newlines (more than 2 consecutive newlines become 2)
    const cleanedText = text.replace(/\n{3,}/g, '\n\n');
    
    // Check for code blocks (text between triple backticks)
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Find all code blocks and process them
    while ((match = codeBlockRegex.exec(cleanedText)) !== null) {
      // Add text before the code block
      if (match.index > lastIndex) {
        const beforeText = cleanedText.substring(lastIndex, match.index);
        parts.push(
          <div key={`text-${lastIndex}`}>
            {beforeText.split('\n').map((line, i) => 
              line ? <p key={i}>{line}</p> : <br key={i} style={{ marginBottom: '2px' }} />
            )}
          </div>
        );
      }
      
      // Add the code block
      parts.push(
        <div key={`code-${match.index}`} className="code-block">
          {match[1]}
        </div>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text after the last code block
    if (lastIndex < cleanedText.length) {
      const remainingText = cleanedText.substring(lastIndex);
      parts.push(
        <div key={`text-${lastIndex}`}>
          {remainingText.split('\n').map((line, i) => 
            line ? <p key={i}>{line}</p> : <br key={i} style={{ marginBottom: '2px' }} />
          )}
        </div>
      );
    }
    
    // If no code blocks were found, just return the text split by newlines
    if (parts.length === 0) {
      return cleanedText.split('\n').map((line, i) => 
        line ? <p key={i}>{line}</p> : <br key={i} style={{ marginBottom: '2px' }} />
      );
    }
    
    return parts;
  };
  
  // Function to format structured content with headers and lists
  const formatStructuredContent = (text: string) => {
    // Clean up excessive newlines
    let cleanedText = text.replace(/\n{3,}/g, '\n\n');
    
    // Split the text into sections based on double newlines
    const sections = cleanedText.split(/\n\n+/);
    
    return sections.map((section, sectionIndex) => {
      // Check if this section is a header (ends with "include:" or "to:" or is "INSIGHTS")
      const isHeader = /(:|\bINSIGHTS\b)$/.test(section.trim());
      
      if (isHeader) {
        // Return the header with proper styling
        return (
          <div key={`section-${sectionIndex}`} className="section-header">
            {section}
          </div>
        );
      } else {
        // Process the section content
        const lines = section.split('\n');
        
        return (
          <div key={`section-${sectionIndex}`} className="section-content">
            {lines.map((line, lineIndex) => {
              // Check if this is a numbered list item
              const listItemMatch = line.match(/^(\d+)\.\s+(.*)/);
              
              if (listItemMatch) {
                // Format as a list item
                return (
                  <div key={`line-${sectionIndex}-${lineIndex}`} className="list-item">
                    <span className="list-number">{listItemMatch[1]}.</span>
                    <span>{listItemMatch[2]}</span>
                  </div>
                );
              } else if (line.trim()) {
                // Regular paragraph
                return <p key={`line-${sectionIndex}-${lineIndex}`}>{line}</p>;
              } else {
                // Empty line
                return <br key={`line-${sectionIndex}-${lineIndex}`} style={{ marginBottom: '2px' }} />;
              }
            })}
          </div>
        );
      }
    });
  };
  
  // Function to render typing indicator
  const renderTypingIndicator = () => {
    return (
      <div className="message bot-message">
        <div className="message-content" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '4px' }}>Thinking</span>
          <span className="typing-dot" style={{ 
            width: '4px', 
            height: '4px', 
            borderRadius: '50%', 
            background: '#333', 
            margin: '0 2px',
            animation: 'pulse 1s infinite',
            animationDelay: '0s'
          }}></span>
          <span className="typing-dot" style={{ 
            width: '4px', 
            height: '4px', 
            borderRadius: '50%', 
            background: '#333', 
            margin: '0 2px',
            animation: 'pulse 1s infinite',
            animationDelay: '0.2s'
          }}></span>
          <span className="typing-dot" style={{ 
            width: '4px', 
            height: '4px', 
            borderRadius: '50%', 
            background: '#333', 
            margin: '0 2px',
            animation: 'pulse 1s infinite',
            animationDelay: '0.4s'
          }}></span>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-bubble-container">
      {/* Chat Box */}
      <div className={`chat-box ${isChatOpen ? 'chat-box-visible' : 'chat-box-hidden'} ${isChatOpen && isFirstOpen ? 'chat-box-first-open' : ''}`}>
        <div className="chat-header">
          <div className="header-title">
            <img src={logoSrc} alt="Logo" className="header-logo" />
            <span>Copilot</span>
          </div>
          <span className="chat-close" onClick={toggleChat}>×</span>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div 
              key={message.id || index} 
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {formatMessageText(message.text)}
              </div>
            </div>
          ))}
          {currentResponse && (
            <div className="message bot-message">
              <div className="message-content">
                {formatMessageText(currentResponse)}
              </div>
            </div>
          )}
          {isProcessing && !currentResponse && (
            renderTypingIndicator()
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Type your message..." 
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isProcessing || (!isConnected && messages.length > 0 && messages[messages.length - 1].isUser)}
          />
          <button 
            className="chat-send" 
            onClick={sendMessage}
            disabled={!inputText.trim() || isProcessing || (!isConnected && messages.length > 0 && messages[messages.length - 1].isUser)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Bubble - only show when chat is not open */}
      {!isChatOpen && (
        <div className={`chat-bubble pulse`} onClick={toggleChat}>
          <img src="/chatLogoNew-CZ9xL0ka.svg" alt="Chat" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;