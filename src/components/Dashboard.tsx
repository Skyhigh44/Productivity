import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, BarChart, Users, Briefcase, Brain, Target, Coffee } from 'lucide-react';
import Calendar from './Calendar/Calendar';
import ProjectManager from './Projects/ProjectManager';

interface DashboardProps {
  username: string;
}

export default function Dashboard({ username }: DashboardProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const [time, setTime] = React.useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      title: 'Schedule',
      icon: CalendarIcon,
      color: 'bg-purple-500',
      content: '3 meetings today',
      onClick: () => {
        setShowCalendar(prev => !prev);
        setShowProjects(false);
      }
    },
    {
      title: 'Projects',
      icon: Briefcase,
      color: 'bg-green-500',
      content: '2 due this week',
      onClick: () => {
        setShowProjects(prev => !prev);
        setShowCalendar(false);
      }
    },
    {
      title: 'Team',
      icon: Users,
      color: 'bg-blue-500',
      content: '5 active members'
    },
    {
      title: 'Tasks',
      icon: Target,
      color: 'bg-red-500',
      content: '8 pending items'
    },
    {
      title: 'Progress',
      icon: BarChart,
      color: 'bg-yellow-500',
      content: '68% completed'
    },
    {
      title: 'Focus Time',
      icon: Brain,
      color: 'bg-indigo-500',
      content: '2h 30m today'
    },
    {
      title: 'Breaks',
      icon: Coffee,
      color: 'bg-pink-500',
      content: 'Next in 45m'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {username}</h1>
            <div className="flex items-center space-x-2">
              <Clock className="text-gray-500" size={20} />
              <span className="text-lg font-semibold text-gray-600">{time}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={card.onClick}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${card.onClick ? 'cursor-pointer' : ''}`}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <card.icon className="text-white" size={24} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{card.title}</h2>
                </div>
                <p className="text-gray-600">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-300 ${showCalendar ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
          <Calendar />
        </div>

        <div className={`transition-all duration-300 ${showProjects ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
          <ProjectManager />
        </div>
      </main>
    </div>
  );
}