import { metadata, viewport } from 'next-sanity/studio'

export { metadata, viewport }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="sanity" style={{ height: '100vh' }}>
      {children}
    </div>
  )
}
