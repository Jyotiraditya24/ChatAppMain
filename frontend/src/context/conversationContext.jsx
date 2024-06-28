import React, { useContext, useState, createContext } from "react";

export const ConversationContext = createContext();

export const useConversationContext = () => useContext(ConversationContext);

export const ConversationContextProvider = ({ children }) => {
  const [selectConversation, setSelectConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  // Example function to update selectConversation
  const updateSelectConversation = (conversation) => {
    setSelectConversation(conversation);
  };

  // Example function to add a new message
  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Example function to clear messages
  const clearMessages = () => {
    setMessages([]);
  };

  // Context value to be provided
  const contextValue = {
    selectConversation,
    messages,
    updateSelectConversation,
    addMessage,
    clearMessages,
  };

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
};
