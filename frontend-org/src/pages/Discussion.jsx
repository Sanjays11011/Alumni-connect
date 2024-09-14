import { useState } from "react";
import discussionData from "../Datas/discussionData.json";
const Discussion = () => {
    const [selectedQuery, setSelectedQuery] = useState(null);
  
    const handleClick = (id) => {
      setSelectedQuery(id);

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
                selectedQuery === item.id ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <h1 className="p-2 text-xl font-bold duration-300 ">{item.query}</h1>
              <p className="p-2 text-sm font-semibold opacity-60">
                {item.author}'s query in Discussion
                <span>&nbsp;|&nbsp;{item.date}</span>
              </p>
            </div>
          ))}
        </div>
  
        {/* Replies Section */}
        <div className="w-2/3 h-full border custom-scrollbar">
          <h1 className="m-3 text-xl border-b flex-none">Replies</h1>
          <div className="w-full h-full flex flex-col items-center">
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
        </div>
      </div>
    );
  };
  
  export default Discussion;