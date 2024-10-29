import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:3001");

const Message = () => {
  const { id } = useParams();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or sessionStorage

    // Use axios to fetch only the user ID from the backend
    axios
      .get("http://localhost:3001/api/profile/id", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      })
      .then((response) => {
        console.log("User ID:", response.data.userId); // Log the user ID to the console
        setCurrentUserId(response.data.userId); // Set the user ID in state
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data.message : error.message
        );
      });
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/contacts/${currentUserId}`
        );
        setContacts(response.data || []);
        if (response.data && response.data.length > 0) {
          setSelectedContact(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, [currentUserId]);

  useEffect(() => {
    if (selectedContact) {
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

  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const messageToSend = {
      sender: currentUserId,
      receiver: selectedContact._id,
      text: newMessage,
    };

    try {
      await axios.post("http://localhost:3001/api/messages", messageToSend);
      setMessages((prevMessages) => [...prevMessages, messageToSend]);
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
              className="p-4 py-5 flex items-center hover:bg-primary hover:text-white cursor-pointer border-b border-gray-300"
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
