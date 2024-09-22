import { LogoChatbot } from "@/components/Chatbot/LogoChatbot";
import { Usuario } from "@/components/Chatbot/IconUser";

export const ShowMessage = ({ mensaje, isChatbot }) => {
  return (
    <div className={`flex items-end ${!isChatbot && "flex-row-reverse"}`}>
      <div className="rounded bg-gray-900 w-8 aspect-square p-1.5">
        {isChatbot ? <LogoChatbot /> : <Usuario />}
      </div>
      <p className="mx-2 p-2 rounded bg-gray-200 text-gray-900 leading-4 text-sm">
        {mensaje}
      </p>
    </div>
  );
};
