import { Button } from "@/components/ui/button"

interface ViewSelectorProps {
  currentView: "monthly" | "weekly" | "daily"
  onViewChange: (view: "monthly" | "weekly" | "daily") => void
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  return (
    <div className="bg-white rounded-full p-2 shadow-sm">
      <div className="flex rounded-full">
        <Button
          variant={currentView === "monthly" ? "secondary" : "ghost"}
          className="rounded-l-full"
          onClick={() => onViewChange("monthly")}
        >
          月別
        </Button>
        <Button
          variant={currentView === "weekly" ? "secondary" : "ghost"}
          className="rounded-none"
          onClick={() => onViewChange("weekly")}
        >
          週別
        </Button>
        <Button
          variant={currentView === "daily" ? "secondary" : "ghost"}
          className="rounded-r-full"
          onClick={() => onViewChange("daily")}
        >
          日別
        </Button>
      </div>
    </div>
  )
}

