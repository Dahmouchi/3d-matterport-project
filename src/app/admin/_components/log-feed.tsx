import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const logEntries = [
  {
    timestamp: "T-0.1s",
    level: "INFO",
    message: "Unit #7841 reported online. Status: NOMINAL.",
  },
  {
    timestamp: "T-0.9s",
    level: "INFO",
    message: "Protocol 4-Delta initiated for resource balancing.",
  },
  {
    timestamp: "T-1.5s",
    level: "WARN",
    message: "Sub-processor B-12 latency spike detected: 150ms.",
  },
  {
    timestamp: "T-2.2s",
    level: "INFO",
    message: "Personnel #1204 authenticated via Sector 7 terminal.",
  },
  {
    timestamp: "T-3.0s",
    level: "ERROR",
    message: "CRITICAL: Coolant flow to Core 3 below threshold. Alert #003 triggered.",
  },
  {
    timestamp: "T-4.1s",
    level: "INFO",
    message: "Data sync with Archive-Gamma complete.",
  },
]

export function LogFeed() {
  return (
    <Card className="rounded-none border-2 border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="uppercase tracking-wider text-zinc-400">System Log Stream</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] space-y-2 overflow-y-auto bg-black/30 p-2">
          {logEntries.map((entry, index) => (
            <div key={index} className="flex items-start gap-4 text-xs">
              <span className="text-zinc-500">{entry.timestamp}</span>
              <span
                className={`font-bold ${
                  entry.level === "ERROR"
                    ? "text-red-400"
                    : entry.level === "WARN"
                      ? "text-yellow-400"
                      : "text-green-400"
                }`}
              >
                [{entry.level}]
              </span>
              <p className="flex-1 text-zinc-300">{entry.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
