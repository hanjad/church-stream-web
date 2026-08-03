import { useEffect, useState } from 'react';
import { echo } from '../hooks/useLaravelEcho';

export default function LiveChat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const channel = echo.channel('live-chat');
        channel.listen('.chat.message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => echo.leaveChannel('live-chat');
    }, []);

    return (
        <div className="p-4 h-96 overflow-y-auto bg-gray-900 text-white rounded-lg">
            <h2 className="font-bold mb-2">Live Chat</h2>
            {messages.length === 0 && (
                <p className="text-gray-500 text-sm">Waiting for messages...</p>
            )}
            {messages.map((msg, i) => (
                <div key={i} className="mb-1">
                    <span className="font-bold text-blue-400">[{msg.platform}] {msg.username}:</span>{' '}
                    {msg.message}
                </div>
            ))}
        </div>
    );
}