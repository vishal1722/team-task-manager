import { useEffect, useState } from "react";
import API from "../api/axios";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function Stats() {
  const [stats, setStats] = useState({ total: 0, done: 0, overdue: 0 });

  useEffect(() => {
    API.get("/tasks").then(res => {
      const tasks = res.data;
      setStats({
        total: tasks.length,
        done: tasks.filter(t=>t.status==="done").length,
        overdue: tasks.filter(t=>t.dueDate && new Date(t.dueDate)<new Date() && t.status!=="done").length
      });
    });
  }, []);

  const data = [
    { title:"Total", value:stats.total, icon:Clock },
    { title:"Done", value:stats.done, icon:CheckCircle },
    { title:"Overdue", value:stats.overdue, icon:AlertTriangle }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data.map((d,i)=>{
        const Icon=d.icon;
        return (
          <div key={i} className="card hover:scale-[1.02] transition">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{d.title}</p>
                <h2 className="text-2xl font-bold">{d.value}</h2>
              </div>
              <Icon className="w-6 h-6 text-blue-500"/>
            </div>
          </div>
        )
      })}
    </div>
  );
}