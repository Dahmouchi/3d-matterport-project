"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

interface ChartData {
  name: string
  pending: number
  confirmed: number
  rejected: number
  completed: number
}

interface ChartCardProps {
  data: ChartData[]
  title?: string
}

export function ChartCard({ data, title = "Reservations Status Trends" }: ChartCardProps) {
  return (
    <Card className="h-full rounded-none border-2 border-zinc-800 bg-zinc-900/50 ">
      <CardHeader>
        <CardTitle className="uppercase tracking-wider text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "6px",
                  color: "#f1f5f9",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="confirmed" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
