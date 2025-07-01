const MessagesList = () => {
  const messages = [
    { id: 1, sender: "Student A", content: "I need help with lesson 2" },
    { id: 2, sender: "Student B", content: "Can I submit late?" },
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="border p-4 rounded-md bg-white shadow">
          <p className="font-semibold">{msg.sender}</p>
          <p className="text-gray-700">{msg.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;