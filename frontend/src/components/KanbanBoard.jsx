import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import API from "../api/axios";
import toast from "react-hot-toast";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  FolderKanban,
  Calendar,
  GripVertical
} from "lucide-react";


// ================= TASK CARD =================
function SortableTaskCard({ task, onStatusChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm p-4 
        cursor-grab active:cursor-grabbing 
        hover:shadow-lg hover:-translate-y-1 transition-all duration-200
        ${isOverdue ? "border-l-4 border-red-500" : ""}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <GripVertical className="w-4 h-4 text-gray-400" />
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
          {task.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-sm text-gray-900 mb-2">
        {task.title}
      </h3>

      {/* Project */}
      {task.project && (
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <FolderKanban className="w-3 h-3 mr-1" />
          {task.project.name}
        </div>
      )}

      {/* User */}
      {task.assignedTo && (
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <User className="w-3 h-3 mr-1" />
          {task.assignedTo.name}
        </div>
      )}

      {/* Date */}
      {task.dueDate && (
        <div className={`text-xs mb-2 ${isOverdue ? "text-red-500" : "text-gray-500"}`}>
          <Calendar className="inline w-3 h-3 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      {/* Status Change */}
      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="w-full border rounded p-1 text-xs focus:ring-2 focus:ring-blue-400"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </motion.div>
  );
}


// ================= MAIN BOARD =================
export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const filteredTasks =
    user?.role === "admin"
      ? tasks
      : tasks.filter((t) => t.assignedTo?._id === user?.id);

  const columns = {
    todo: filteredTasks.filter((t) => t.status === "todo"),
    "in-progress": filteredTasks.filter((t) => t.status === "in-progress"),
    done: filteredTasks.filter((t) => t.status === "done"),
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      toast.success("Updated 🎯");
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    let overColumn = null;

    Object.keys(columns).forEach((col) => {
      if (columns[col].find((t) => t._id === over.id)) {
        overColumn = col;
      }
    });

    if (overColumn) {
      updateStatus(active.id, overColumn);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center mb-6 bg-white p-4 rounded-xl shadow-sm border">
        <FolderKanban className="w-6 h-6 mr-2 text-blue-600" />
        <h2 className="text-xl font-bold">Kanban Board</h2>
      </div>

      {/* Board */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-3 gap-8">

          {Object.keys(columns).map((col) => (
            <div key={col} className="bg-gray-50 rounded-2xl p-4 border shadow-inner">

              {/* Column Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold capitalize">{col}</h3>
                <span className="bg-white px-2 py-1 text-xs rounded-full shadow">
                  {columns[col].length}
                </span>
              </div>

              {/* Tasks */}
              <SortableContext
                items={columns[col].map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3 min-h-[200px]">

                  {columns[col].length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                      📭 No tasks
                    </div>
                  ) : (
                    columns[col].map((task) => (
                      <SortableTaskCard
                        key={task._id}
                        task={task}
                        onStatusChange={updateStatus}
                      />
                    ))
                  )}

                </div>
              </SortableContext>

            </div>
          ))}

        </div>
      </DndContext>
    </div>
  );
}