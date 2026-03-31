interface ArchitectureDiagramProps {
  projectId: string;
}

export default function ArchitectureDiagram({ projectId }: ArchitectureDiagramProps) {
  switch (projectId) {
    case 'dataman':
      return <DatamanDiagram />;
    case 'polypoll':
      return <PolypollDiagram />;
    case 'url-shortener':
      return <UrlShortenerDiagram />;
    default:
      return null;
  }
}

function Box({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'red' | 'amber' | 'violet' | 'green';
}) {
  const styles = {
    default: 'bg-white border-gray-200 text-gray-700',
    blue: 'bg-blue-50 border-blue-200/80 text-blue-800',
    red: 'bg-rose-50 border-rose-200/80 text-rose-800',
    amber: 'bg-amber-50 border-amber-200/80 text-amber-800',
    violet: 'bg-violet-50 border-violet-200/80 text-violet-800',
    green: 'bg-emerald-50 border-emerald-200/80 text-emerald-800',
  };
  return (
    <div
      className={`px-3.5 py-2 text-[11px] font-semibold border rounded-lg text-center shadow-sm ${styles[variant]}`}
    >
      {children}
    </div>
  );
}

function Arrow({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  if (direction === 'down') {
    return (
      <div className="flex justify-center py-1.5">
        <svg width="12" height="16" viewBox="0 0 12 16" className="text-gray-300">
          <path d="M6 0v12M1 9l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" className="text-gray-300 mx-0.5 shrink-0">
      <path d="M0 6h16M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">{children}</div>;
}

function DatamanDiagram() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200/60 overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Box variant="amber">DeFiLlama API</Box>
          <Arrow />
          <Box>Pool Scanner</Box>
          <Arrow />
          <Box variant="blue">PostgreSQL</Box>
        </div>
        <Arrow direction="down" />
        <div className="flex items-center justify-center gap-3 mb-1">
          <div>
            <Box variant="red">Redis Cache</Box>
            <Label>-70% p99</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="blue">FastAPI Gateway</Box>
            <Label>26 endpoints</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="violet">ARIMA Pipeline</Box>
            <Label>19K+ forecasts</Label>
          </div>
        </div>
        <Arrow direction="down" />
        <div className="flex items-center justify-center gap-3">
          <Box variant="green">Streamlit UI</Box>
          <Box variant="green">Slack Alerts</Box>
          <Box variant="green">Bot Distribution</Box>
        </div>
      </div>
    </div>
  );
}

function PolypollDiagram() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200/60 overflow-x-auto">
      <div className="min-w-[500px]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div>
            <Box variant="amber">Chrome Extension</Box>
            <Label>120+ sites</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="blue">FastAPI Backend</Box>
            <Label>30+ endpoints</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="violet">Base L2 Contract</Box>
            <Label>USDC settlement</Label>
          </div>
        </div>
        <Arrow direction="down" />
        <div className="flex items-center justify-center gap-3 mb-1">
          <div>
            <Box variant="red">Groq / OpenRouter</Box>
            <Label>6 model endpoints</Label>
          </div>
          <div>
            <Box>Market Generation</Box>
            <Label>10-stage pipeline</Label>
          </div>
          <div>
            <Box variant="green">WebSocket</Box>
            <Label>Realtime updates</Label>
          </div>
        </div>
        <Arrow direction="down" />
        <div className="flex items-center justify-center gap-2">
          <Box>Exa</Box>
          <Box>Perplexity</Box>
          <Box>Replicate</Box>
          <Box>Cloudinary</Box>
          <Box>Slack</Box>
        </div>
        <Label>5+ external APIs · 1,700+ public figures</Label>
      </div>
    </div>
  );
}

function UrlShortenerDiagram() {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200/60 overflow-x-auto">
      <div className="min-w-[450px]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Box>Client</Box>
          <Arrow />
          <div>
            <Box variant="blue">Node.js API</Box>
            <Label>Rate limiter</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="red">Redis Cache</Box>
            <Label>Cache-aside</Label>
          </div>
        </div>
        <Arrow direction="down" />
        <div className="flex items-center justify-center gap-2 mb-1">
          <div>
            <Box variant="amber">Redis Queue</Box>
            <Label>Non-blocking</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="violet">Batch Worker</Box>
            <Label>Aggregation</Label>
          </div>
          <Arrow />
          <div>
            <Box variant="blue">PostgreSQL</Box>
            <Label>90% I/O reduction</Label>
          </div>
        </div>
        <Arrow direction="down" />
        <div className="flex items-center justify-center">
          <Box variant="green">Analytics Dashboard (React)</Box>
        </div>
      </div>
    </div>
  );
}
