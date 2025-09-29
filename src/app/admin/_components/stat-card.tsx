import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type StatCardProps = {
  title: string
  value: string
  delta: string
  deltaType: "positive" | "negative" | "neutral" | "warning"
  icon: ReactNode
}

export function StatCard({ title, value, delta, deltaType, icon }: StatCardProps) {
  const deltaColor = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-zinc-400",
    warning: "text-yellow-400",
  }

  return (
    <Card className="rounded-none border-2 border-zinc-800 bg-zinc-900/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-zinc-400">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-zinc-50">{value}</div>
        <p className={cn("text-xs", deltaColor[deltaType])}>{delta} from last cycle</p>
      </CardContent>
    </Card>
  )
}
