'use client';
import React, { useState, useMemo, useEffect } from "react";
import EmailIndividual from '@/app/emailIndividual/page'
import axios from "axios";

// Expanded sample data to demonstrate grouping
const emails = [
  {
    subject: "Re: Web App Demo",
    body: "Thanks, Morgan. I've reviewed the demo and it looks great. I have a few questions.",
    date: "08/03/2025",
    from: "jordan@example.com",
    to: "morgan@iksena281.com",
    avatar: "/img/email2.png",
    status: 'RECEIVED'
  },
  {
    subject: "Follow-up: Web App Demo",
    body: "Hello Jordan, Just checking in to see if you had a chance to review our web app demo...",
    date: "08/02/2025",
    from: "morgan@iksena281.com",
    to: "jordan@example.com",
    avatar: "/img/email1.png",
    status: 'SEND'
  },
  {
    subject: "Project Update",
    body: "Hi team, here is the update for Project Phoenix for this week.",
    date: "08/04/2025",
    from: "manager@iksena281.com",
    to: "jordan@example.com",
    avatar: "/img/email3.png",
    status: 'SEND'
  },
  {
    subject: "Re: Web App Demo",
    body: "Of course, happy to answer them. When would be a good time to connect?",
    date: "08/04/2025",
    from: "morgan@iksena281.com",
    to: "jordan@example.com",
    avatar: "/img/email1.png",
    status: 'SEND'
  }
];


export default function RepDashboard() {
  const [selectedThread, setSelectedThread] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get("email");

  console.log("emailParam", emailParam)

  useEffect(() => {
    axios.post('https://shax99.app.n8n.cloud/webhook/rep-mailbox', emailParam).then((res) => {
      console.log("res", res);
    })
      .catch((err) => {
        console.log("err", err);
      });
  }, [])

  // Group emails into conversation threads using useMemo for efficiency
  const emailThreads = useMemo(() => {
    const threads = {};
    // Assuming 'morgan@iksena281.com' is our user.
    const currentUserEmail = "morgan@iksena281.com";

    emails.forEach(email => {
      // The other person in the conversation determines the thread key
      const otherParty = email.from === currentUserEmail ? email.to : email.from;
      if (!threads[otherParty]) {
        threads[otherParty] = [];
      }
      threads[otherParty].push(email);
    });

    // Sort emails within each thread by date (newest first) for consistency
    Object.values(threads).forEach(thread => {
      thread.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    return Object.values(threads);
  }, []);

  // If a thread is selected, show the individual email view
  if (selectedThread) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <EmailIndividual
            thread={selectedThread}
            onBack={() => setSelectedThread(null)}
          />
        </div>
      </div>
    );
  }

  // Otherwise, show the list of conversations
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Subject & Last Message</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {emailThreads.map((thread, idx) => {
                const latestEmail = thread[0]; // The most recent email
                const threadCount = thread.length;

                return (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50 cursor-pointer transition-all"
                    onClick={() => setSelectedThread(thread)}
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={latestEmail.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <span className="font-medium text-gray-800">
                        {latestEmail.from === "morgan@iksena281.com" ? latestEmail.to : latestEmail.from}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">{latestEmail.subject}</span>
                        {threadCount > 1 && (
                          <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {threadCount}
                          </span>
                        )}
                      </div>
                      <p className="truncate max-w-xs text-sm">{latestEmail.body}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{latestEmail.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${latestEmail.status === 'SEND'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {latestEmail.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}