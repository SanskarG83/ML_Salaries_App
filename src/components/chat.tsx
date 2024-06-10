import React, { useState } from 'react';
import { Button, Input, List } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: input,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.5
        },
        {
          headers: {
            Authorization: `${process.env.REACT_APP_OPENAI_API_KEY}`,
            // 'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);

      const message = response.data.choices[0]?.text.trim();
      if (message) {
        setMessages([...messages, `You: ${input}`, `Bot: ${message}`]);
        setInput('');
      } else {
        setMessages([...messages, `You: ${input}`, `Bot: (No response)`]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, `You: ${input}`, `Bot: (Error sending message)`]);
    }
    setLoading(false);
  };

  return (
    <div>
      <List
        bordered
        dataSource={messages}
        renderItem={item => <List.Item>{item}</List.Item>}
        style={{ marginBottom: 16 }}
      />
      <TextArea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={4}
      />
      <Button type="primary" onClick={handleSend} loading={loading} style={{ marginTop: 16 }}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
