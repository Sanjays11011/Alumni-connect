import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

// Helper function to generate a consistent room ID
const getRoomId = (userId1, userId2) => {
  return [userId1, userId2].sort().join("-");
};

const Message = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Get the current user ID on initial component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User not authenticated.");
      return;
    }

    axios
      .get("http://localhost:3001/api/profile/id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCurrentUserId(response.data.userId);
      })
      .catch((error) => {
        console.error(
          "Error fetching user ID:",
          error.response ? error.response.data.message : error.message
        );
      });
  }, []);

  // Fetch contacts for the current user
  useEffect(() => {
    const fetchContacts = async () => {
      if (!currentUserId) return;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/contacts/${currentUserId}`
        );
        const fetchedContacts = response.data || [];
        setContacts(fetchedContacts);
        if (fetchedContacts.length > 0) {
          setSelectedContact(fetchedContacts[0]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [currentUserId]);

  // Fetch messages and join the chat room for the selected contact
  useEffect(() => {
    if (selectedContact && currentUserId) {
      // Join a specific room based on the two user IDs
      const roomId = getRoomId(currentUserId, selectedContact._id);
      socket.emit("join chat room", roomId);

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/messages/${currentUserId}/${selectedContact._id}`
          );
          setMessages(response.data || []);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [currentUserId, selectedContact]);

  // Listen for incoming messages only in the current room
  useEffect(() => {
    const handleNewMessage = (message) => {
      // Only add messages that are relevant to the current conversation
      if (
        (message.sender === currentUserId && message.receiver === selectedContact?._id) ||
        (message.sender === selectedContact?._id && message.receiver === currentUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("chat message", handleNewMessage);

    return () => {
      socket.off("chat message", handleNewMessage);
    };
  }, [currentUserId, selectedContact]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !selectedContact || !currentUserId) return;

    const messageToSend = {
      sender: currentUserId,
      receiver: selectedContact._id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      // Post the message to the database
      await axios.post("http://localhost:3001/api/messages", messageToSend);

      // Emit the message to the server for real-time delivery
      socket.emit("chat message", messageToSend);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen pt-16 flex font-manrope">
      <div className="w-2/5 border-r border-gray-300 flex flex-col">
        <div className="p-4 bg-white border-b border-gray-300">
          <h2 className="font-bold text-lg">Chat</h2>
        </div>
        <div className="flex-grow overflow-y-auto bg-secondary">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`p-4 py-5 flex items-center hover:bg-gray-200 cursor-pointer border-b border-gray-300
              ${contact._id === selectedContact?._id ? "bg-primary text-white" : "bg-secondary"}`}
              onClick={() => setSelectedContact(contact)}
            >
              <h3 className="font-semibold">
                {contact.firstname} {contact.lastname}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/5 flex flex-col">
        <div className="p-4 bg-white border-b border-gray-300">
          <h2 className="font-bold text-lg">
            {selectedContact?.firstname || "Select a Contact"}{" "}
            {selectedContact?.lastname || ""}
          </h2>
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === currentUserId
                  ? "justify-end"
                  : "justify-start"
              } mb-2`}
            >
              {message.sender !== currentUserId && (
                <p className="text-gray-500 text-xs mb-1 mr-2 ">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
              <div
                className={`p-2 px-4 rounded-lg ${
                  message.sender === currentUserId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === currentUserId && (
                <p className="text-gray-500 text-xs mb-1 ml-2">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t border-gray-300 flex"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-lg mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;