/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const TimelineContext = createContext();


const initialEntries = [
  { id: 1, type: "Call", friendName: "Mahmudul Hasan", date: "2026-03-19", timestamp: new Date("2026-03-19").getTime() },
  { id: 2, type: "Text", friendName: "Nusrat Jahan", date: "2026-03-11", timestamp: new Date("2026-03-11").getTime() },
  { id: 3, type: "Video", friendName: "Mahmudul Hasan", date: "2026-03-08", timestamp: new Date("2026-03-08").getTime() },
  { id: 4, type: "Video", friendName: "Rakib Chowdhury", date: "2026-02-24", timestamp: new Date("2026-02-24").getTime() },
  { id: 5, type: "Call", friendName: "Rafiul Karim", date: "2026-03-11", timestamp: new Date("2026-03-11").getTime() },
  { id: 6, type: "Text", friendName: "Sabina Yasmin", date: "2026-03-13", timestamp: new Date("2026-03-13").getTime() },
  { id: 7, type: "Call", friendName: "Nusrat Jahan", date: "2026-03-11", timestamp: new Date("2026-03-11").getTime() },
  { id: 8, type: "Video", friendName: "Aisha Rahman", date: "2026-03-23", timestamp: new Date("2026-03-23").getTime() },
  { id: 9, type: "Text", friendName: "Nusrat Jahan", date: "2026-03-28", timestamp: new Date("2026-03-28").getTime() },
  { id: 10, type: "Call", friendName: "Tanvir Ahmed", date: "2026-03-30", timestamp: new Date("2026-03-30").getTime() },
  { id: 11, type: "Video", friendName: "Farhana Akter", date: "2026-02-20", timestamp: new Date("2026-02-20").getTime() },
  { id: 12, type: "Text", friendName: "Mim Akter", date: "2026-04-01", timestamp: new Date("2026-04-01").getTime() },
];

export const TimelineProvider = ({ children }) => {
  const [entries, setEntries] = useState(initialEntries);

  const addEntry = (type, friendName) => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];

    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: dateStr,
      timestamp: now.getTime(),
    };

    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => useContext(TimelineContext);