import { IconChatBot } from "@/Util/constantes";
import Image from "next/image";

export const LogoChatbot = () => {
  return (
    <div className="relative min-w-[20px] min-h-[20px]">
      <Image src={IconChatBot} alt="Logo Chatbot" fill />
    </div>
  );
};
