import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MeetingNote {
  id: string;
  content: string;
  time: string;
}

interface MeetingNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string, time: string) => void;
  date: Date;
  existingNotes: MeetingNote[];
}

export default function MeetingNoteModal({
  isOpen,
  onClose,
  onSave,
  date,
  existingNotes
}: MeetingNoteModalProps) {
  const [note, setNote] = useState('');
  const [time, setTime] = useState('09:00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() && time) {
      onSave(note.trim(), time);
      setNote('');
      setTime('09:00');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {date.toLocaleDateString('default', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {existingNotes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Existing Notes</h4>
            <div className="space-y-2">
              {existingNotes.map(note => (
                <div
                  key={note.id}
                  className="bg-gray-50 p-2 rounded text-sm"
                >
                  <span className="font-medium">{note.time}</span>: {note.content}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
              placeholder="Enter meeting details..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}