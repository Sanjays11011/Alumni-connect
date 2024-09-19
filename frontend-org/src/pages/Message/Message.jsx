import React, { useState } from 'react';
import contactsData from '../../Datas/contactsData.json'; // Adjust the path as needed

const Message = () => {
  const [selectedContact, setSelectedContact] = useState(contactsData.contacts[0]); // Default to first contact

  return (
    <div className="h-screen pt-16 flex font-manrope">
      
      <div className="w-2/5 border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-300">
          <h2 className="font-bold text-lg">Chat</h2>
        </div>

        {/* Search Bar */}
        <div className="p-2 bg-secondary">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 rounded-lg"
          />
        </div>

        {/* Contacts List */}
        <div className="flex-grow overflow-y-auto bg-secondary">
          {contactsData.contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 flex items-center hover:bg-gray-200 cursor-pointer"
              onClick={() => setSelectedContact(contact)}
            >
              <img
                src={contact.avatar}
                alt={`${contact.name}'s Avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-600">
                  {contact.messages[contact.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section - 3/5 of the screen */}
      <div className="w-3/5 bg-white flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-300 flex items-center">
          <img
            src={selectedContact.avatar}
            alt="Chat Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <h2 className="font-bold text-lg">{selectedContact.name}</h2>
        </div>

        <div className="flex-grow p-4 overflow-y-auto">
          {selectedContact.messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender === 'me' ? 'text-right' : ''}`}
            >
              <div
                className={`p-2 rounded inline-block ${
                  message.sender === 'me'
                    ? 'bg-blue-100'
                    : 'bg-primary bg-opacity-40 text-black'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex border-gray-300">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
