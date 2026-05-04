export default function TaskCard({ task }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-lg transition ${isOverdue?"border-l-4 border-red-500":""}`}>
      <h3 className="font-semibold mb-2">{task.title}</h3>

      {task.project && <p className="text-sm text-gray-500">{task.project.name}</p>}
      {task.assignedTo && <p className="text-sm text-gray-500">{task.assignedTo.name}</p>}

      {task.dueDate && (
        <p className={`text-sm ${isOverdue?"text-red-500":"text-gray-500"}`}>
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}