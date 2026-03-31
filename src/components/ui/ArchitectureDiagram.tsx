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

function Box({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`px-3 py-2 text-xs font-medium text-text-primary bg-white border border-border rounded-lg text-center ${className}`}
    >
      {children}
    </div>
  );
}

function Arrow({ direction = 'right' }: { direction?: 'right' | 'down' }) {
  if (direction === 'down') {
    return (
      <div className="flex justify-center py-1">
        <span className="text-text-secondary text-xs">↓</span>
      </div>
    );
  }
  return <span className="text-text-secondary text-xs mx-1">→</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] text-text-secondary mt-1 text-center">{children}</div>;
}

function DatamanDiagram() {
  return (
    <div className="bg-secondary rounded-xl p-6 border border-border overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Row 1: Data ingestion */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Box className="bg-amber-50 border-amber-200">DeFiLlama API</Box>
          <Arrow />
          <Box>Pool Scanner</Box>
          <Arrow />
          <Box className="bg-blue-50 border-blue-200">PostgreSQL</Box>
        </div>

        <Arrow direction="down" />

        {/* Row 2: Core platform */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div>
            <Box className="bg-red-50 border-red-200">Redis Cache</Box>
            <Label>-70% p99</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-blue-50 border-blue-200">FastAPI Gateway</Box>
            <Label>26 endpoints</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-violet-50 border-violet-200">ARIMA Pipeline</Box>
            <Label>19K+ forecasts</Label>
          </div>
        </div>

        <Arrow direction="down" />

        {/* Row 3: Outputs */}
        <div className="flex items-center justify-center gap-4">
          <div>
            <Box className="bg-green-50 border-green-200">Streamlit UI</Box>
          </div>
          <div>
            <Box className="bg-green-50 border-green-200">Slack Alerts</Box>
          </div>
          <div>
            <Box className="bg-green-50 border-green-200">Bot Distribution</Box>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolypollDiagram() {
  return (
    <div className="bg-secondary rounded-xl p-6 border border-border overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Row 1: Frontend */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div>
            <Box className="bg-amber-50 border-amber-200">Chrome Extension</Box>
            <Label>120+ sites</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-blue-50 border-blue-200">FastAPI Backend</Box>
            <Label>30+ endpoints</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-violet-50 border-violet-200">Base L2 Contract</Box>
            <Label>USDC settlement</Label>
          </div>
        </div>

        <Arrow direction="down" />

        {/* Row 2: AI + Data layer */}
        <div className="flex items-center justify-center gap-4 mb-2">
          <div>
            <Box className="bg-red-50 border-red-200">Groq / OpenRouter</Box>
            <Label>6 model endpoints</Label>
          </div>
          <div>
            <Box>Market Generation</Box>
            <Label>10-stage pipeline</Label>
          </div>
          <div>
            <Box className="bg-green-50 border-green-200">WebSocket</Box>
            <Label>Realtime updates</Label>
          </div>
        </div>

        <Arrow direction="down" />

        {/* Row 3: External integrations */}
        <div className="flex items-center justify-center gap-3">
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
    <div className="bg-secondary rounded-xl p-6 border border-border overflow-x-auto">
      <div className="min-w-[450px]">
        {/* Row 1: Request flow */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Box>Client</Box>
          <Arrow />
          <div>
            <Box className="bg-blue-50 border-blue-200">Node.js API</Box>
            <Label>Rate limiter</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-red-50 border-red-200">Redis Cache</Box>
            <Label>Cache-aside</Label>
          </div>
        </div>

        <Arrow direction="down" />

        {/* Row 2: Write path */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div>
            <Box className="bg-amber-50 border-amber-200">Redis Queue</Box>
            <Label>Non-blocking writes</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-violet-50 border-violet-200">Batch Worker</Box>
            <Label>Aggregation</Label>
          </div>
          <Arrow />
          <div>
            <Box className="bg-blue-50 border-blue-200">PostgreSQL</Box>
            <Label>90% I/O reduction</Label>
          </div>
        </div>

        <Arrow direction="down" />

        {/* Row 3: Output */}
        <div className="flex items-center justify-center">
          <Box className="bg-green-50 border-green-200">Analytics Dashboard (React)</Box>
        </div>
      </div>
    </div>
  );
}
