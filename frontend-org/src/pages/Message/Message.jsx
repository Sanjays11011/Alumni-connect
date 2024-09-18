import React from 'react'

const Message = () => {
  return (
    <div className="h-screen pt-16  flex font-manrope">
      
      <div className="w-2/5  border-r border-gray-300 flex flex-col">
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
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-4 flex items-center hover:bg-gray-200 cursor-pointer"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${i}`}
                alt="Contact Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">Contact {i + 1}</h3>
                <p className="text-sm text-gray-600">Hey, how's it going?</p>
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
            src="https://i.pravatar.cc/150?img=1"
            alt="Chat Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <h2 className="font-bold text-lg">Contact 1</h2>
        </div>

        <div className="flex-grow p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="bg-primary bg-opacity-40 text-black p-2 rounded inline-block">
             <p>Hi, how are you?</p> 
            </div>
          </div>
          <div className="mb-4 text-right">
            <div className="bg-blue-100 p-2 rounded inline-block">
              I'm good, how about you?
            </div>
          </div>
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
}

export default Message