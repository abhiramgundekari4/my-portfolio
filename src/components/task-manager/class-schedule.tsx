'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Calendar, BookOpen, User, MapPin, Clock, X } from 'lucide-react';

interface ClassEntry {
  id: string;
  subject: string;
  timeSlot: string;
  room: string;
  faculty: string;
  day: string;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DEFAULT_CLASSES: ClassEntry[] = [
  {
    id: 'c1',
    subject: 'Database Management Systems (DBMS)',
    timeSlot: '09:00 AM - 10:00 AM',
    room: 'Room 304, Block-A',
    faculty: 'Dr. K. Srinivas',
    day: 'Monday',
  },
  {
    id: 'c2',
    subject: 'Design & Analysis of Algorithms',
    timeSlot: '10:15 AM - 11:15 AM',
    room: 'Room 102, Block-B',
    faculty: 'Prof. R. Sharma',
    day: 'Monday',
  },
  {
    id: 'c3',
    subject: 'Machine Learning Fundamentals',
    timeSlot: '01:30 PM - 03:00 PM',
    room: 'ML Lab, Block-C',
    faculty: 'Dr. A. Reddy',
    day: 'Tuesday',
  },
  {
    id: 'c4',
    subject: 'Data Structures & OOPs',
    timeSlot: '11:30 AM - 12:30 PM',
    room: 'CS Lab 3, Block-A',
    faculty: 'Mrs. S. Lakshmi',
    day: 'Wednesday',
  },
  {
    id: 'c5',
    subject: 'Database Management Systems (DBMS)',
    timeSlot: '09:00 AM - 10:00 AM',
    room: 'Room 304, Block-A',
    faculty: 'Dr. K. Srinivas',
    day: 'Thursday',
  },
  {
    id: 'c6',
    subject: 'Machine Learning Fundamentals',
    timeSlot: '01:30 PM - 03:00 PM',
    room: 'ML Lab, Block-C',
    faculty: 'Dr. A. Reddy',
    day: 'Friday',
  },
];

export function ClassSchedule() {
  const [classes, setClasses] = useState<ClassEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [subject, setSubject] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [room, setRoom] = useState('');
  const [faculty, setFaculty] = useState('');

  // Hydrate schedule from storage or set defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('smart_task_manager_schedule');
      if (stored) {
        setClasses(JSON.parse(stored));
      } else {
        setClasses(DEFAULT_CLASSES);
        localStorage.setItem('smart_task_manager_schedule', JSON.stringify(DEFAULT_CLASSES));
      }
    } catch (e) {
      console.error('Failed to load class schedule', e);
    }
  }, []);

  const saveToStorage = (updatedList: ClassEntry[]) => {
    setClasses(updatedList);
    try {
      localStorage.setItem('smart_task_manager_schedule', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save schedule', e);
    }
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !timeSlot || !room || !faculty) return;

    const newClass: ClassEntry = {
      id: `c-${Date.now()}`,
      subject,
      timeSlot,
      room,
      faculty,
      day: selectedDay,
    };

    const updated = [...classes, newClass];
    saveToStorage(updated);

    // Reset fields
    setSubject('');
    setTimeSlot('');
    setRoom('');
    setFaculty('');
    setShowAddForm(false);
  };

  const handleDeleteClass = (id: string) => {
    const updated = classes.filter((c) => c.id !== id);
    saveToStorage(updated);
  };

  const filteredClasses = classes
    .filter((c) => c.day === selectedDay)
    .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

  return (
    <div className="space-y-6 text-gray-900">
      {/* Day Selector Navigation Row */}
      <div className="flex bg-white p-1 rounded-xl border border-gray-200 overflow-x-auto scrollbar-none gap-1 shadow-sm">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day);
              setShowAddForm(false);
            }}
            className={`flex-1 min-w-[90px] py-2 px-3 text-xs font-bold rounded-lg uppercase tracking-wider transition-all text-center ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {day.substring(0, 3)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Timetable List Grid */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>{selectedDay}&apos;s Timetable</span>
            </h2>
            
            {!showAddForm && (
              <Button
                size="sm"
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 rounded-lg border-none"
              >
                <Plus className="h-4 w-4" /> Add Class
              </Button>
            )}
          </div>

          {filteredClasses.length === 0 ? (
            <Card className="bg-white border border-dashed border-gray-300 flex flex-col items-center justify-center p-12 text-center text-gray-500 shadow-sm rounded-xl">
              <BookOpen className="h-10 w-10 mb-3 text-gray-300" />
              <p className="text-sm font-medium">No classes scheduled for {selectedDay}.</p>
              <button 
                onClick={() => setShowAddForm(true)}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline"
              >
                Add one now
              </button>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredClasses.map((item) => (
                <Card 
                  key={item.id} 
                  className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm rounded-xl"
                >
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-blue-600 shrink-0" />
                        <span>{item.subject}</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          <span>{item.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          <span className="truncate">{item.room}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                          <span className="truncate">{item.faculty}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteClass(item.id)}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                      title="Remove class"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Side Panel: Form to add new entry */}
        <div className="space-y-4">
          {showAddForm ? (
            <Card className="bg-white border border-gray-200 p-5 shadow-sm rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600">New Class Entry</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-1 rounded hover:bg-gray-100 text-gray-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddClass} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-gray-600">Subject / Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Design & Analysis of Algorithms"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-gray-900 text-xs font-normal focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600">Time Slot</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:15 AM - 11:15 AM"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-gray-900 text-xs font-normal focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600">Classroom / Lab Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Room 302, Block-A"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-gray-900 text-xs font-normal focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600">Instructor / Faculty</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. R. Sharma"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-gray-900 text-xs font-normal focus:bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg mt-2 border-none"
                >
                  Save Entry
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="bg-white border border-gray-200 p-5 space-y-3 shadow-sm rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600">Classroom Utility</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Use the weekly scheduler to outline your class timetable at SR University. 
              </p>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs font-medium text-gray-600 leading-normal">
                Coordinate your assignment deadlines in the <strong>Kanban Board</strong> directly with your daily classroom timeslots and assigned professors!
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
