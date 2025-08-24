'use client';
import React, { useState, useMemo } from 'react';

// A simple SVG icon for the accordion chevron
const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);


export default function EmailIndividual({ thread, onBack }) {
  // Reverse the thread to show oldest first (chronological order)
  const chronologicalThread = useMemo(() => [...thread].reverse(), [thread]);
  
  // Set the default open index to the last item (the newest email)
  const [openIndex, setOpenIndex] = useState(chronologicalThread.length - 1);
  const [replyText, setReplyText] = useState('');

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const handleSendReply = () => {
    if (!replyText.trim()) return; // Don't send empty replies
    alert(`Reply Sent:\n\n${replyText}`);
    setReplyText(''); // Clear the textarea after sending
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to Inbox
        </button>
        <h2 className="text-xl font-bold text-gray-800">{thread[0].subject}</h2>
      </div>

      <div className="space-y-3">
        {chronologicalThread.map((email, index) => (
          // Removed the conditional border from this div
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button 
              onClick={() => handleToggle(index)}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            >
                <div className="flex items-center gap-3">
                    <img src={email.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="font-semibold">{email.from}</p>
                        <p className="text-xs text-gray-500">to {email.to}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{email.date}</span>
                    {/* Added the status badge here */}
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        email.status === 'SEND'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                        {email.status}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Collapsible Content */}
            {openIndex === index && (
              <div className="p-4 border-t border-gray-200 text-gray-700 bg-white">
                <p>{email.body}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Section */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Reply</h3>
        <div className="border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
            <textarea
                className="w-full p-3 border-0 focus:ring-0 resize-none rounded-lg"
                rows="4"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
            ></textarea>
        </div>
        <div className="mt-3 flex justify-end">
            <button
                onClick={handleSendReply}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                disabled={!replyText.trim()}
            >
                Send Reply
            </button>
        </div>
      </div>
    </div>
  );
}