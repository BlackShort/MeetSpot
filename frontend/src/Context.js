import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('https://meetspot.onrender.com');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [modal, setModal] = useState(false);
  const [detail, setDetail] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (currentStream) {
          myVideo.current.srcObject = currentStream;
        }
      }).catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  
    socket.on('me', (id) => setMe(id));
  
    socket.on('CallingUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  
    socket.on("callRejected", () => {
      setCall({});
      setModal(false);
    });
  
    socket.on("callEnded", () => {
      leaveCall();
    });
  
    return () => {
      socket.off("me");
      socket.off("CallingUser");
      socket.off("callRejected");
      socket.off("callEnded");
    };
  }, []);
  


  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('CallingUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('acceptCall', (signal) => {
      setCallAccepted(true);
      setModal(false);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: true, trickle: true, stream });

    peer.on('signal', (data) => {
      socket.emit('AnswerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const RejectCall = () => {
    socket.emit("RejectCall", { to: call.from });
    setCallAccepted(false);
    setCall({});
  };

  const leaveCall = () => {
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      modal,
      setModal,
      detail,
      setDetail,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      RejectCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
