import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
}

interface Project {
  id: string;
  title: string;
  tasks: Task[];
  isExpanded: boolean;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'Project 1', tasks: [], isExpanded: false },
    { id: '2', title: 'Project 2', tasks: [], isExpanded: false },
    { id: '3', title: 'Project 3', tasks: [], isExpanded: false },
    { id: '4', title: 'Project 4', tasks: [], isExpanded: false },
    { id: '5', title: 'Project 5', tasks: [], isExpanded: false },
  ]);

  const handleProjectTitleChange = (projectId: string, newTitle: string) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, title: newTitle } : project
    ));
  };

  const toggleProject = (projectId: string) => {
    setProjects(projects.map(project =>
      project.id === projectId ? { ...project, isExpanded: !project.isExpanded } : project
    ));
  };

  const addTask = (projectId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId && project.tasks.length < 15) {
        return {
          ...project,
          tasks: [...project.tasks, {
            id: Date.now().toString(),
            title: 'New Task',
            status: 'pending'
          }]
        };
      }
      return project;
    }));
  };

  const updateTask = (projectId: string, taskId: string, newTitle: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId ? { ...task, title: newTitle } : task
          )
        };
      }
      return project;
    }));
  };

  const toggleTaskStatus = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId 
              ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
              : task
          )
        };
      }
      return project;
    }));
  };

  const removeTask = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Management</h2>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleProject(project.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {project.isExpanded ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectTitleChange(project.id, e.target.value)}
                  className="text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1"
                />
              </div>
              <button
                onClick={() => addTask(project.id)}
                disabled={project.tasks.length >= 15}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm
                  ${project.tasks.length >= 15
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
              >
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>

            {project.isExpanded && (
              <div className="ml-8 mt-4 space-y-3">
                {project.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-3 group animate-fadeIn"
                  >
                    <div className="w-6 h-6 flex-shrink-0 border-l-2 border-b-2 border-gray-300" />
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTaskStatus(project.id, task.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => updateTask(project.id, task.id, e.target.value)}
                      className={`flex-grow bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1
                        ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}
                    />
                    <button
                      onClick={() => removeTask(project.id, task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                    >
                      <X size={16} className="text-red-500" />
                    </button>
                  </div>
                ))}
                {project.tasks.length === 0 && (
                  <p className="text-gray-400 text-sm italic">No tasks yet. Click "Add Task" to get started.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}