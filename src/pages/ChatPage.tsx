import  { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import ChatHeader from '../components/ChatHeader';

interface Message {
  text?: string;
  audioUrl?: string;
  sender: 'system' | 'user';
  time: string;
  image?: string;
  file?: File;
}

const Chatcontainer = styled.div`
  width: 100%;
  background-color: white;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  overflow-y: auto;
  max-height: 63vh; /* Adjust as needed */
`;

const MessageContainer = styled.div<{ sender: 'system' | 'user' }>`
  display: flex;
  justify-content: ${({ sender }) =>
    sender === 'user' ? 'flex-end' : 'flex-start'};
  margin-bottom: 15px;
`;

const MessageText = styled.div<{ sender: 'system' | 'user' }>`
  padding: 1% 2% 1% 3%;
  border-radius: 10px;
  max-width: 100%;
  font-size: 16px;
  background-color: ${({ sender }) =>
    sender === 'system' ? '#f1f1f1' : '#A5C8F2'};
  color: black;
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) =>
    sender === 'system' ? 'flex-start' : 'flex-end'};
  overflow: hidden;
`;

const AudioMessage = styled.audio`
  max-width: 100%;
  padding: 3px;
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #888;
`;

const ChatInput = styled.div`
  width: 93%;
  max-width: 390px;
  padding: 10px;
  margin: 0 0 2px 0;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  background-color:white;
`;

const InputWrapper = styled.div`
  border-radius: 50px;
  border: 1px solid #888;
  width: 90%;
`;

const InputField = styled.input`
  width: 73%;
  height: 70%;
  padding: 8px;
  margin-left: 17px;
  border: none;
  outline: none;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: black;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled(IconButton)`
  right: 14px;
`;

const MicrophoneButton = styled(IconButton)`
  color: white;
  background-color: #007bff;
  margin-left: 86%;
  width: 38px;
  height: 38px;
  border-radius: 50%;

  @media (max-width: 380px) {
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
  @media (max-width: 350px) {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }
`;

const AttachmentButton = styled(IconButton)`
  right: 24%;
`;

const CameraButton = styled(IconButton)`
  right: 15%;
`;

const VideoContainer = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello', sender: 'user', time: '11:01 AM' },
    { text: 'I have a question.', sender: 'user', time: '11:03 AM' },
  ]);

  const [newMessage, setNewMessage] = useState<string>('');
  const [showMicrophone, setShowMicrophone] = useState<boolean>(true);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setMessages([
        ...messages,
        { text: newMessage, sender: 'user', time: currentTime },
      ]);
      setNewMessage('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    setShowMicrophone(e.target.value.trim() === '');
  };

  const handleInputFocus = () => {
    setShowMicrophone(newMessage.trim() === '');
  };

  const handleInputBlur = () => {
    if (newMessage.trim() === '') {
      setShowMicrophone(true);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    setShowVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        setShowVideo(false);
        alert('Unable to access camera. Please ensure you have given camera permissions.');
      });
  };

  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setShowVideo(false);
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();

        const chunks: Blob[] = [];
        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const currentTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          setMessages([
            ...messages,
            { audioUrl, sender: 'user', time: currentTime },
          ]);
        };
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <>
      <Chatcontainer>
        <ChatMessages ref={chatMessagesRef}>
          <ChatHeader />
          {messages.map((message, index) => (
            <MessageContainer key={index} sender={message.sender}>
              <MessageText sender={message.sender}>
                {message.text ? (
                  message.text
                ) : message.file ? (
                  <div>
                    <strong>{message.file.name}</strong>
                    <br />
                    <a
                      href={URL.createObjectURL(message.file)}
                      download={message.file.name}
                    >
                      {message.file.name}
                    </a>
                  </div>
                ) : (
                  <AudioMessage controls src={message.audioUrl} />
                )}
                <Timestamp>{message.time}</Timestamp>
              </MessageText>
            </MessageContainer>
          ))}
        </ChatMessages>

        {showVideo && (
          <VideoContainer>
            <video
              ref={videoRef}
              autoPlay
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <button
              onClick={stopVideoStream}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
              }}
            >
              Stop Video
            </button>
          </VideoContainer>
        )}
      </Chatcontainer>
      <ChatInput>
        <InputWrapper>
          <InputField
            placeholder="Message"
            value={newMessage}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSend() : null)}
          />
          <AttachmentButton onClick={handleAttachmentClick}>
            <AttachFileIcon sx={{ fontSize: '20px' }} />
          </AttachmentButton>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                const currentTime = new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                setMessages([
                  ...messages,
                  { file, sender: 'user', time: currentTime },
                ]);
              }
            }}
          />
          <CameraButton onClick={handleCameraClick}>
            <CameraAltOutlinedIcon sx={{ fontSize: '20px' }} />
          </CameraButton>
        </InputWrapper>
        {showMicrophone ? (
          <MicrophoneButton
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
          >
            <KeyboardVoiceOutlinedIcon sx={{ fontSize: '23px' }} />
          </MicrophoneButton>
        ) : (
          <SendButton onClick={handleSend}>
            <FaPaperPlane />
          </SendButton>
        )}
      </ChatInput>
    </>
  );
};

export default ChatPage;
