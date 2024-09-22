import { LogoChatbot } from "@/components/Chatbot/LogoChatbot";

import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
export const Loading = () => {
  return (
    <div className="z-[60] flex flex-row justify-start gap-5">
      <IoChatbubbleEllipsesSharp size={25} className="text-gray-900" />
      <div className="flex items-center justify-start mt-3">
        <div className="flex space-x-2">
          <div className="w-1 h-1 bg-gray-900 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-gray-900 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-gray-900 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
