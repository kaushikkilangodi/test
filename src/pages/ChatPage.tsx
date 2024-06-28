import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import PanoramaFishEyeOutlinedIcon from '@mui/icons-material/PanoramaFishEyeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SwitchCameraIcon from '@mui/icons-material/SwitchCamera';
import { MdDownload } from 'react-icons/md';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


interface Message {
  text?: string;
  audioUrl?: string;
  sender: 'system' | 'user';
  time: string;
  image?: string;
  file?: File;
  videoUrl?: string;
}

const ChatContainer = styled.div`
  width: 100%;
  background-color: white;
  position: relative;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  overflow-y: auto;
  max-height: 63vh;
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
  max-width: 85%;
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
  max-width: 100%;
  border-radius: 10px;
  margin-top: 3px;
  margin-right: 2px;
`;

const VideoMessage = styled.video`
  max-width: 100%;
  border-radius: 10px;
  margin-top: 3px;
  margin-right: 2px;
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
  background-color: white;
`;

const InputWrapper = styled.div`
  border-radius: 50px;
  border: 1px solid;
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
  bottom: 0;
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
  position: absolute;
  width: 100%;
  height: 100vh;
  max-width: 625px;
  margin: 0 auto;

  @media (max-width: 380px) {
    width: 602px;
    height: 100vh;
  }
  @media (max-width: 350px) {
    width: 602px;
    height: 100vh;
  }
`;

const CaptureButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background: none;
  cursor: pointer;
`;

const RecordButton = styled.button`
  position: absolute;
  bottom: 40px;
  left: 40%;
  transform: translateX(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: white;
`;

const StopButton = styled.button`
  position: absolute;
  bottom: 40px;
  left: 70%;
  transform: translateX(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: white;
`;

const SwitchCameraButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
  background-color: black;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  cursor: pointer;
  color: white;
  background-color: black;
`;

const TimerDisplay = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 20px;
  background-color: black;
`;

const DownloadButton = styled.button`
  margin-top: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  max-width: 100%;
  white-space: nowrap; /* Ensures text doesn't wrap */
  overflow: hidden; /* Prevents overflow */
  text-overflow: ellipsis; /* Adds ellipsis (...) for overflow */
`;
const PdfPreview = styled.embed`
  max-width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-top: 3px;
  margin-right: 2px;
  overflow: hidden; /* Prevents overflow */
  text-overflow: ellipsis; /* Adds ellipsis (...) for overflow */
`;

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello', sender: 'user', time: '11:01 AM' },
    { text: 'I have a question.', sender: 'user', time: '11:03 AM' },
  ]);

  const [newMessage, setNewMessage] = useState<string>('');
  const [showMicrophone, setShowMicrophone] = useState<boolean>(true);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [, setCapturedMedia] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [recording, setRecording] = useState<boolean>(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(
    null
  );
  const [recordingDuration, setRecordingDuration] = useState<string>('00:00');
  const [, setFilePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (recording && recordingStartTime) {
      timer = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - recordingStartTime) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const seconds = String(elapsed % 60).padStart(2, '0');
        setRecordingDuration(`${minutes}:${seconds}`);
      }, 1000);
    } else {
      setRecordingDuration('00:00');
    }

    return () => clearInterval(timer);
  }, [recording, recordingStartTime]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessages = [
        ...messages,
        {
          text: newMessage,
          sender: 'user' as const,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ];
      setMessages(newMessages);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMicrophoneClick = async () => {
    if (showMicrophone) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const newMessages: (Message | { audioUrl: string; sender: "user" | "system"; time: string; })[] = [
          ...messages,
          {
            audioUrl,
            sender: 'user' as const,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
        setMessages(newMessages);
        setShowMicrophone(true);
      };
      recorder.start();
      setMediaRecorder(recorder);
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    }
    setShowMicrophone(!showMicrophone);
  };

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

 const handleSwitchCamera = async () => {
   if (isCameraOpen) {
     const stream = await navigator.mediaDevices.getUserMedia({
       video: { facingMode: facingMode === 'user' ? 'environment' : 'user' },
     });

     if (videoRef.current) {
       videoRef.current.srcObject = stream;
       mediaStreamRef.current = stream;
       setFacingMode((prevMode) =>
         prevMode === 'user' ? 'environment' : 'user'
       );
     }
   }
 };


  const handleCapturePhoto = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedMedia(dataUrl);
        setIsCameraOpen(false);
        const newMessages: (Message | { image: string; sender: 'user' | 'system'; time: string })[] = [
          ...messages,
          {
            image: dataUrl,
            sender: 'system',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
        setMessages(newMessages);
      }
    }
  };

  const handleStartRecording = async () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      const options = { mimeType: 'video/webm; codecs=vp9' };
      const recorder = new MediaRecorder(stream, options);
      const videoChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        setCapturedMedia(videoUrl);
        setIsCameraOpen(false);
        const newMessages: (Message | { videoUrl: string; sender: "user" | "system"; time: string })[] = [
          ...messages,
          {
            videoUrl,
            sender: 'user',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ];
        setMessages(newMessages);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      setRecordingStartTime(Date.now());
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setRecordingStartTime(null);
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (isCameraOpen) {
      (async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          mediaStreamRef.current = stream;
        }
      })();
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isCameraOpen, facingMode]);

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const newMessages: (Message | { file: File; sender: "user" | "system"; time: string })[] = [
      ...messages,
      {
        file,
        sender: 'user',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ];
    setMessages(newMessages);

    if (!file.type.startsWith('application/pdf')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setFilePreview(dataUrl);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null); // Clear any existing preview for PDF files
    }
  }
};


  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ChatContainer>
      <ChatMessages ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <MessageContainer key={index} sender={message.sender}>
            <MessageText sender={message.sender}>
              {message.text && <span>{message.text}</span>}
              {message.audioUrl && (
                <AudioMessage controls src={message.audioUrl} />
              )}
              {message.image && (
                <ImageMessage src={message.image} alt="Image" />
              )}
              {message.videoUrl && (
                <VideoMessage controls src={message.videoUrl} />
              )}
              {message.file && (
                <>
                  {message.file && (
                    <>
                      <DownloadButton
                        onClick={() => handleDownload(message.file!)}
                      >
                        <MdDownload style={{ marginRight: '5px' }} />
                        {message.file.name}
                      </DownloadButton>
                      {message.file.type === 'application/pdf' && (
                        <div>
                          <a
                            href={URL.createObjectURL(message.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {message.file.name}
                          </a>
                        </div>
                      )}
                      {message.file.type ===
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                        <div>
                          <PdfPreview
                            src={URL.createObjectURL(message.file)}
                            type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          />
                          <a
                            href={URL.createObjectURL(message.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {message.file.name}
                          </a>
                        </div>
                      )}
                      {message.file.type ===
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && (
                        <div>
                          <PdfPreview
                            src={URL.createObjectURL(message.file)}
                            type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          />
                          <a
                            href={URL.createObjectURL(message.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {message.file.name}
                          </a>
                        </div>
                      )}
                      {message.file.type.startsWith('image/') && (
                        <ImageMessage
                          src={URL.createObjectURL(message.file)}
                          alt="Image"
                        />
                      )}
                      {/* Add similar conditions for other file types as needed */}
                    </>
                  )}
                  <DownloadButton onClick={() => handleDownload(message.file!)}>
                    <MdDownload style={{ marginRight: '5px' }} />
                  </DownloadButton>
                  {/* Add similar conditions for other file types (e.g., Excel, documents) */}
                </>
              )}
              <Timestamp>{message.time}</Timestamp>
            </MessageText>
          </MessageContainer>
        ))}
      </ChatMessages>
      <ChatInput>
        <InputWrapper>
          <InputField
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputWrapper>
        <CameraButton onClick={handleCameraClick}>
          <CameraAltOutlinedIcon />
        </CameraButton>
        <AttachmentButton onClick={handleAttachmentClick}>
          <AttachFileIcon />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </AttachmentButton>

        <MicrophoneButton
          onClick={handleMicrophoneClick}
          style={{ display: newMessage ? 'none' : 'block' }}
        >
          {showMicrophone ? (
            <KeyboardVoiceOutlinedIcon />
          ) : (
            <PanoramaFishEyeOutlinedIcon />
          )}
        </MicrophoneButton>
        <SendButton
          onClick={handleSendMessage}
          style={{ display: newMessage ? 'block' : 'none' }}
        >
          <FaPaperPlane />
        </SendButton>
      </ChatInput>

      {isCameraOpen && (
        <CameraOverlay>
          <VideoContainer>
            <video ref={videoRef} autoPlay playsInline />
            {!recording && (
              <>
                <CaptureButton onClick={handleCapturePhoto}>
                  <CameraAltOutlinedIcon
                    style={{
                      color: 'white',
                      fontSize: '60px',
                      marginBottom: '40px',
                    }}
                  />
                </CaptureButton>
                <RecordButton onClick={handleStartRecording}>
                  <RadioButtonUncheckedIcon
                    style={{
                      color: 'white',
                      fontSize: '40px',
                      marginBottom: '30px',
                    }}
                  />
                </RecordButton>
              </>
            )}
            {recording && (
              <StopButton onClick={handleStopRecording}>
                <RadioButtonCheckedIcon
                  style={{
                    color: 'red',
                    fontSize: '60px',
                    marginRight: '200px',
                  }}
                />
              </StopButton>
            )}
            <SwitchCameraButton onClick={handleSwitchCamera}>
              <SwitchCameraIcon style={{ color: 'white', fontSize: '40px' }} />
            </SwitchCameraButton>
            <CloseButton onClick={handleCloseCamera}>
              <CloseIcon style={{ color: 'white', fontSize: '40px' }} />
            </CloseButton>
            {recording && <TimerDisplay>{recordingDuration}</TimerDisplay>}
          </VideoContainer>
        </CameraOverlay>
      )}
    </ChatContainer>
  );
}

export default ChatPage;
