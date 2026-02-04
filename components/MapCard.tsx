import { MapPin } from "lucide-react";

export function MapCard() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-muted/30 flex items-center justify-center group">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Radar Pulse Effect */}
      <div className="absolute h-32 w-32 rounded-full border border-primary/20 animate-ping opacity-75" />
      <div className="absolute h-48 w-48 rounded-full border border-primary/10 animate-ping delay-75 opacity-50" />
      
      <div className="z-10 flex flex-col items-center gap-2">
        <div className="relative">
          <MapPin className="h-8 w-8 text-primary drop-shadow-lg" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 blur-sm rounded-full" />
        </div>
        <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
          <span className="text-xs font-semibold">San Francisco, CA</span>
        </div>
      </div>
    </div>
  );
}
