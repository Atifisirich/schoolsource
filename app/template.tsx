// Re-mounts on every navigation, giving each page a short fade-and-rise entry (under 300ms).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
