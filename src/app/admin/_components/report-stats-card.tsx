import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface ReportStatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactElement<LucideIcon>
  trend?: {
    value: number
    label: string
    type: "positive" | "negative" | "neutral"
  }
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
}

export function ReportStatsCard({ title, value, description, icon, trend, badge }: ReportStatsCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {badge && (
            <Badge variant={badge.variant || "outline"} className="text-xs">
              {badge.text}
            </Badge>
          )}
          <div className="text-slate-500">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-50">{value}</div>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.type === "positive"
                  ? "text-emerald-400"
                  : trend.type === "negative"
                    ? "text-red-400"
                    : "text-slate-400"
              }`}
            >
              {trend.type === "positive" ? "+" : trend.type === "negative" ? "-" : ""}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-slate-500 ml-1">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
