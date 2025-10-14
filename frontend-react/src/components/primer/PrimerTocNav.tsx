import type { PrimerSidebarLink } from '../../types/content'

interface PrimerTocNavProps {
  headings: PrimerSidebarLink[]
  activeSection: string
  onSectionChange: (id: string) => void
}

const PrimerTocNav = ({ headings, activeSection, onSectionChange }: PrimerTocNavProps) => {
  return (
    <div style={{ position: 'sticky', top: '6rem', overflowY: 'auto', flexGrow: 1 }}>
      <div className="primer-sidebar-title">On This Page</div>
      <ul className="primer-sidebar-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={activeSection === heading.id ? 'active' : ''}
              onClick={() => onSectionChange(heading.id)}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PrimerTocNav
