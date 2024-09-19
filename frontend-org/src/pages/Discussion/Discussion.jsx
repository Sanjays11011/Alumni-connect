import { useState } from "react";
import discussionData from "../../Datas/discussionData.json";

const Discussion = () => {
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [newReply, setNewReply] = useState(''); // State for new reply

  const handleClick = (id) => {
    setSelectedQuery(id);
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value); // Update reply input
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();

    // Logic to handle new reply submission, for now, just console.log the reply
    if (newReply.trim()) {
      console.log(`Reply to query ${selectedQuery}:`, newReply);
      setNewReply(''); // Clear the input after submission
    }
  };

  return (
    <div className="pt-16 w-[98vw] h-svh flex flex-row font-manrope">
      {/* Queries Section */}
      <div className="w-1/3 h-full border custom-scrollbar">
        <p className="m-3 text-xl border-b">Queries</p>
        {discussionData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full h-1/4 flex flex-col justify-center border-b-2 cursor-pointer p-4 ${
              selectedQuery === item.id ? 'bg-secondary text-black' : 'bg-white text-gray-800'
            }`}
          >
            <h1 className="p-2 text-xl font-bold duration-300">{item.query}</h1>
            <p className="p-2 text-sm font-semibold opacity-60">
              {item.author}'s query in Discussion
              <span>&nbsp;|&nbsp;{item.date}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Replies Section */}
      <div className="w-2/3 h-full border custom-scrollbar flex flex-col">
        <h1 className="m-3 text-xl border-b flex-none">Replies</h1>
        <div className="w-full flex-1 flex flex-col items-center overflow-y-auto">
          {selectedQuery !== null &&
            discussionData
              .find((item) => item.id === selectedQuery)
              ?.replies.map((reply, index) => (
                <div
                  key={index}
                  className="w-3/4 my-3 rounded-md shadow-xl flex flex-col p-4"
                  style={{ minHeight: "fit-content" }} // Dynamic container size
                >
                  <div className="flex flex-col justify-start border-b pb-2">
                    <p className="font-semibold text-xl">{reply.author}'s reply in Discussion</p>
                    <p className="text-sm opacity-60">{reply.date}</p>
                  </div>
                  <p className="p-4 font-semibold opacity-65">{reply.reply}</p>
                </div>
              ))}
        </div>

        {/* Typing Section */}
        {selectedQuery !== null && (
          <form
            className="w-full border-t p-4 flex items-center justify-center"
            onSubmit={handleReplySubmit}
          >
            <input
              type="text"
              className="w-3/4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your reply here..."
              value={newReply}
              onChange={handleReplyChange}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Discussion;
