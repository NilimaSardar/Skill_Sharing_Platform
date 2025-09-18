import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const { chatId } = useParams();
  return <div>Chat Room for ID: {chatId}</div>;
}