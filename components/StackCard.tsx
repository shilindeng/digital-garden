import { stack } from "@/lib/data";
import { Cpu, Atom, Wind, Database, Code, Layers } from "lucide-react";

export function StackCard() {
  const IconMap: Record<string, any> = {
    cpu: Cpu,
    atom: Atom,
    wind: Wind,
    database: Database,
    code: Code,
    layers: Layers,
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-full place-items-center">
      {stack.map((item) => {
        const Icon = IconMap[item.icon] || Code;
        return (
          <div key={item.name} className="flex flex-col items-center gap-2 group">
            <div className="p-3 rounded-xl bg-muted/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <span className="text-xs text-muted-foreground font-medium">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
