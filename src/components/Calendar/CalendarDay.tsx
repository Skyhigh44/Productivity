import React from 'react';

interface MeetingNote {
  id: string;
  content: string;
  time: string;
}

interface CalendarDayProps {
  date: Date | null;
  notes?: MeetingNote[];
  onClick: () => void;
}

export default function CalendarDay({ date, notes, onClick }: CalendarDayProps) {
  if (!date) {
    return <div className="h-24 bg-gray-50 rounded-lg"></div>;
  }

  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div
      onClick={onClick}
      className={`h-24 p-2 rounded-lg border cursor-pointer transition-all
        ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
        ${notes?.length ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="flex flex-col h-full">
        <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
          {date.getDate()}
        </span>
        {notes && notes.length > 0 && (
          <div className="mt-1 overflow-hidden">
            {notes.map((note) => (
              <div
                key={note.id}
                className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1 truncate"
              >
                {note.time}: {note.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}