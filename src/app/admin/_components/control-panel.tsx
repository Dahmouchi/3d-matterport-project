import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ControlPanel() {
  return (
    <Card className="h-full rounded-none border-2 border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="uppercase tracking-wider text-zinc-400">System Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-balancing" className="text-zinc-300">
            Auto-Balancing
          </Label>
          <Switch id="auto-balancing" defaultChecked className="rounded-none" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="threat-detection" className="text-zinc-300">
            Threat Detection
          </Label>
          <Switch id="threat-detection" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="maintenance-mode" className="text-zinc-500">
            Maintenance Mode
          </Label>
          <Switch id="maintenance-mode" disabled />
        </div>
        <div className="space-y-2 pt-4">
          <Button className="w-full rounded-none border-2 border-yellow-400/50 bg-yellow-900/50 text-yellow-300 hover:bg-yellow-900/80">
            Purge Caches
          </Button>
          <Button variant="destructive" className="w-full rounded-none">
            Initiate System Reboot
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
