import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { senderId, receiverId } = useParams();

  console.log("CHAT BETWEEN:", senderId, receiverId);

  return (
    <div>
      Chat between {senderId} and {receiverId}
    </div>
  );
};

export default ChatRoom;