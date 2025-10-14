import type { PrimerSidebarLink, PrimerSolutionLink } from '../../types/content'

interface PrimerSidebarNavProps {
  sections: PrimerSidebarLink[]
  problemSolutions: PrimerSolutionLink[]
  activeSection: string
  onSectionChange: (id: string) => void
}

const PrimerSidebarNav = ({
  sections,
  problemSolutions,
  activeSection,
  onSectionChange,
}: PrimerSidebarNavProps) => {
  return (
    <>
      <div className="primer-sidebar-title">System Design Primer</div>
      <ul className="primer-sidebar-list">
        {sections.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={activeSection === link.id ? 'active' : ''}
              onClick={() => onSectionChange(link.id)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ padding: '0.5rem', marginTop: '1rem' }}>
        <div className="primer-sidebar-title">More System Design Solutions</div>
        <ul className="primer-sidebar-list">
          {problemSolutions.map((link) => (
            <li key={link.id}>
              <a href={link.path}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default PrimerSidebarNav
