import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import MediaPreview from './MediaPreview';
import Camera from './Camera';
import Messages from './Messages';
import ChatInput from './ChatInput';

export interface Message {
  text?: string;
  audioUrl?: string;
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
  max-height: 75vh;
`;

function ChatPageLayout() {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello', time: '11:01 AM' },
    { text: 'I have a question.', time: '11:03 AM' },
  ]);

  const [newMessage, setNewMessage] = useState<string>('');
  const [showMicrophone, setShowMicrophone] = useState<boolean>(true);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
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
        const newMessages = [
          ...messages,
          {
            audioUrl,
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
        setMediaType('image');
        setIsCameraOpen(false);
        const newMessages = [
          ...messages,
          {
            image: dataUrl,
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
        setMediaType('video');
        setIsCameraOpen(false);
        const newMessages = [
          ...messages,
          {
            videoUrl,
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      const newMessages = [
        ...messages,
        {
          file,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ];
      setMessages(newMessages);
      setFilePreview(fileUrl);
    }
  };

  const handleSendCapturedMedia = () => {
    if (capturedMedia && mediaType) {
      const newMessages = [
        ...messages,
        {
          mediaUrl: capturedMedia,
          mediaType,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ];
      setMessages(newMessages);
      setCapturedMedia(null);
      setMediaType(null);
    }
  };

  if (capturedMedia && mediaType) {
    return (
      <MediaPreview
        media={capturedMedia}
        type={mediaType}
        onSend={handleSendCapturedMedia}
      />
    );
  }

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
          <Messages
            key={index}
            message={message}
            handleDownload={handleDownload}
          />
        ))}
      </ChatMessages>
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleKeyPress={handleKeyPress}
        handleCameraClick={handleCameraClick}
        handleAttachmentClick={handleAttachmentClick}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleMicrophoneClick={handleMicrophoneClick}
        showMicrophone={showMicrophone}
        handleSendMessage={handleSendMessage}
      />
      {isCameraOpen && (
        <Camera
          videoRef={videoRef}
          recording={recording}
          recordingDuration={recordingDuration}
          handleCapturePhoto={handleCapturePhoto}
          handleStartRecording={handleStartRecording}
          handleStopRecording={handleStopRecording}
          handleSwitchCamera={handleSwitchCamera}
          handleCloseCamera={handleCloseCamera}
        />
      )}
      {capturedMedia && mediaType && (
        <MediaPreview
          media={capturedMedia}
          type={mediaType}
          onSend={handleSendCapturedMedia}
        />
      )}
    </ChatContainer>
  );
}
export default ChatPageLayout;
