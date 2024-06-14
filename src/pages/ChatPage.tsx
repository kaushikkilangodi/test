import  { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import ChatHeader from '../components/ChatHeader';
import PanoramaFishEyeOutlinedIcon from '@mui/icons-material/PanoramaFishEyeOutlined';
import CloseIcon from '@mui/icons-material/Close';

interface Message {
  text?: string;
  audioUrl?: string;
  sender: 'system' | 'user';
  time: string;
  image?: string;
  file?: File;
}

const ChatContainer = styled.div`
  width: 100%;
  background-color: white;
  position:relative;
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
  max-width:85%;
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

const ImageMessage = styled.img`
  max-width:100%;
  border-radius:10px;
  margin-top: 3px;
  margin-right:2px;
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
  border-top: 1px solid #d6c7c7;
  position: fixed;
  bottom: 0;
  background-color:white;
`;

const InputWrapper = styled.div`
  border-radius: 50px;
  border: 1px solid ;
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

const CameraOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
 
`;

const CaptureButton = styled.button`
  position: absolute;
  display: flex;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background: none;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  cursor: pointer;
`;



const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello', sender: 'user', time: '11:01 AM' },
    { text: 'I have a question.', sender: 'user', time: '11:03 AM' },
  ]);

  const [newMessage, setNewMessage] = useState<string>('');
  const [showMicrophone, setShowMicrophone] = useState<boolean>(true);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
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

  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing the camera: ', err);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        const currentTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        setMessages([
          ...messages,
          { image: imageData, sender: 'user', time: currentTime },
        ]);
        setCapturedMedia(imageData);
        handleCloseCamera();
      }
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };


  return (
    <>
      <ChatContainer>
      {isCameraOpen && (
          <CameraOverlay>
            <VideoContainer>
              <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
              <CaptureButton onClick={handleCapture}>
                <PanoramaFishEyeOutlinedIcon style={{ fontSize: '20vw', color: 'white' }} />
              </CaptureButton>
              <CloseButton onClick={handleCloseCamera}>
                <CloseIcon style={{ fontSize: '12vw', color: 'white' }} />
              </CloseButton>
            </VideoContainer>
          </CameraOverlay>
        )}
         {capturedMedia && (
        <div style={{width: '100%',height:'100%' ,objectFit:'cover'}}>
        </div>
      )}
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
                    ) : message.image ? (
                      <ImageMessage src={message.image} alt="Captured" />
                ) : (
                  <AudioMessage controls src={message.audioUrl} />
                )}
                <Timestamp>{message.time}</Timestamp>
              </MessageText>
            </MessageContainer>
          ))}
        </ChatMessages>
      </ChatContainer>
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
            <AttachFileIcon sx={{ fontSize: '22px' }} />
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
            {!isCameraOpen && (
            <CameraButton onClick={handleOpenCamera}>
              <CameraAltOutlinedIcon sx={{ fontSize: '23px' }} />
            </CameraButton>
      )}
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
