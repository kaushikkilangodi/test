import styled from "styled-components";
import { MdDownload } from 'react-icons/md';
import { Message } from "./ChatPage";

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const MessageText = styled.div`
  padding: 1% 2% 1% 3%;
  border-radius: 10px;
  max-width: 85%;
  font-size: 16px;
  background-color: #A5C8F2;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
interface MessageProps {
message: Message;
handleDownload: (file: File) => void;
}

export default function Messages({ message, handleDownload }: MessageProps) {
  return (
    <>
      <MessageContainer>
        <MessageText>
          {message.text && <span>{message.text}</span>}
          {message.audioUrl && <AudioMessage controls src={message.audioUrl} />}
          {message.image && <ImageMessage src={message.image} alt="Image" />}
          {message.videoUrl && <VideoMessage controls src={message.videoUrl} />}
          {message.file && (
            <>
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
              <DownloadButton onClick={() => handleDownload(message.file!)}>
                <MdDownload style={{ marginRight: '5px' }} />
                {message.file.name}
              </DownloadButton>
            </>
          )}
          <Timestamp>{message.time}</Timestamp>
        </MessageText>
      </MessageContainer>
    </>
  );
}