import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io as SocketIo } from "socket.io-client";
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import "./projects.css";
import { IoSend } from "react-icons/io5";
const Project = () => {
    const params = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [socket, setSocket] = useState(null);
    const [code, setCode] = useState("// Write your code here...\n");
    const [language, setLanguage] = useState("javascript");
    const [review, setReview] = useState("*No review yet. Click 'get-review' to generate a code review.*");
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [showCopyButton, setShowCopyButton] = useState(false);
    const [copiedText, setCopiedText] = useState(false);
    const messagesEndRef = useRef(null);
    
    // Function to handle code changes from the editor
    function handleEditorChange(value) {
        setCode(value);
        socket.emit("code-change", value);
    }

    function handleUserMessage() {
        if (input.trim() === "") return;
        
        const newMessage = {
            text: input,
            sender: "user"
        };
        
        setMessages((prev) => {
            return [...prev, newMessage];
        });
        
        socket.emit("chat-message", input);
        setInput("");
    }

    function getReview() {
        setIsReviewLoading(true);
        socket.emit("get-review", code);
    }

    function clearCode() {
        setCode("// Write your code here...\n");
        socket.emit("code-change", "// Write your code here...\n");
    }

    function copyCode() {
        navigator.clipboard.writeText(code);
        setCopiedText(true);
        setTimeout(() => {
            setCopiedText(false);
        }, 2000);
    }

    function copyReview() {
        navigator.clipboard.writeText(review);
        setCopiedText(true);
        setTimeout(() => {
            setCopiedText(false);
        }, 2000);
    }

    // Function to change programming language
    function changeLanguage(newLanguage) {
        setLanguage(newLanguage);
    }

    // Auto-scroll to the bottom of the messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        const io = SocketIo("localhost:3000", {
            query: {
                project: params.id
            }
        });

        io.emit("chat-history");

        io.on('chat-history', (messages) => {
            setMessages(messages.map((message) => ({
                text: message.text,
                sender: message.sender || "other" // Default to "other" if sender is not specified
            })));
        });

        io.on('chat-message', (message) => {
            setMessages((prev) => {
                return [...prev, { text: message, sender: "other" }];
            });
        });

        io.on('code-change', (code) => {
            setCode(code);
        });

        io.on('project-code', (code) => {
            setCode(code);
        });

        io.on("code-review", (review) => {
            console.log(review);
            setReview(review);
            setIsReviewLoading(false);
        });
        
        io.emit("get-project-code");

        setSocket(io);
        
        return () => {
            io.disconnect();
        };
    }, [params.id]);

    // Handle key press for sending messages
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    };

    return (
        <main className='project-main'>
            <section className='project-section'>
                <div className="chat-container">
                    <div className="chat-header">
                        <h3>Chat</h3>
                    </div>
                    <div className="messages-container">
                        {messages.length === 0 ? (
                            <div className="no-messages">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div 
                                    className={`message ${message.sender === "user" ? "message-outgoing" : "message-incoming"}`} 
                                    key={index}
                                >
                                    <div className="message-content">
                                        <span>{message.text}</span>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="input-area">
                        <input
                            type="text"
                            placeholder='Type your message...'
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            onKeyPress={handleKeyPress}
                            value={input}
                        />
                        <button
                            className="send-button"
                            onClick={handleUserMessage}
                            disabled={input.trim() === ""}
                        >
                           <IoSend />
                        </button>
                    </div>
                </div>
                
                <div className="code-container">
                    <div className="code-header">
                        <div className="language-selector">
                            <select
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="typescript">TypeScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="csharp">C#</option>
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                            </select>
                        </div>
                        <div className="code-actions">
                            <button 
                                className="clear-button" 
                                onClick={clearCode}
                                title="Clear Code"
                            >
                                <i className="ri-delete-bin-line"></i> Clear
                            </button>
                            <button 
                                className="copy-button" 
                                onClick={copyCode}
                                title="Copy Code"
                            >
                                {copiedText ? (
                                    <><i className="ri-check-line"></i> Copied</>
                                ) : (
                                    <><i className="ri-file-copy-line"></i> Copy</>
                                )}
                            </button>
                        </div>
                    </div>
                    <div 
                        className="editor-container" 
                        onMouseEnter={() => setShowCopyButton(true)}
                        onMouseLeave={() => setShowCopyButton(false)}
                    >
                        <Editor
                            height="100%"
                            width="100%"
                            language={language}
                            value={code}
                            onChange={handleEditorChange}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                wordWrap: 'on',
                                automaticLayout: true,
                                formatOnType: true,
                                formatOnPaste: true,
                                cursorBlinking: "smooth",
                            }}
                        />
                    </div>
                </div>
                
                <div className="review-container">
                    <div className="review-header">
                        <h3>Code Review</h3>
                        <div className="review-actions">
                            <button 
                                className="copy-review-button" 
                                onClick={copyReview}
                                title="Copy Review"
                            >
                                <i className="ri-file-copy-line"></i> Copy
                            </button>
                            <button
                                onClick={getReview}
                                className={`get-review-button ${isReviewLoading ? 'loading' : ''}`}
                                disabled={isReviewLoading}
                            >
                                {isReviewLoading ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-magic-line"></i>
                                        Get AI Review
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="review-content">
                        <ReactMarkdown>{review}</ReactMarkdown>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Project;