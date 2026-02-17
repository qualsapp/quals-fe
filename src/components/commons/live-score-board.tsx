"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Replace with your separate API URL
const SOCKET_SERVER_URL = "https://api.your-live-provider.com";

export default function LiveScoreboard() {
  const [matchData, setMatchData] = useState({
    homeTeam: "",
    homeScore: 0,
    awayScore: 0,
    awayTeam: "",
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Initialize connection
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"], // Faster, skips polling
    });

    // 2. Event: Connection Success
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to scoring server");
    });

    // 3. Event: Receiving Score Updates
    // 'scoreUpdate' is an example event name from your API documentation
    socket.on("scoreUpdate", (newData) => {
      setMatchData(newData);
    });

    // 4. Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
        />
        <h2 className="text-xl font-bold">Live Match Score</h2>
      </div>

      {matchData ? (
        <div className="mt-4 text-3xl font-mono">
          {matchData.homeTeam} {matchData.homeScore} - {matchData.awayScore}{" "}
          {matchData.awayTeam}
        </div>
      ) : (
        <p className="mt-4 animate-pulse">Waiting for kick-off...</p>
      )}
    </div>
  );
}
