import { useState } from 'react'
import CommentsSection from '../components/primer/CommentsSection'
import CtaCard from '../components/primer/CtaCard'
import PrimerMetadata from '../components/primer/PrimerMetadata'
import PrimerSidebarNav from '../components/primer/PrimerSidebarNav'
import PrimerTocNav from '../components/primer/PrimerTocNav'
import {
  primerComments,
  primerCta,
  primerMetadata,
  primerProblemSolutions,
  primerSidebarLinks,
} from '../data/primer'

const PrimerPage = () => {
  const [activeSection, setActiveSection] = useState('introduction')

  const handleSectionChange = (id: string) => {
    setActiveSection(id)
  }

  return (
    <div className="primer-container">
      <aside className="primer-left-sidebar">
        <PrimerSidebarNav
          sections={primerSidebarLinks}
          problemSolutions={primerProblemSolutions}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </aside>

      <div className="primer-content">
        <div className="primer-article">
          <h1>System Design Primer</h1>
          <p>
            <img
              src="https://placehold.co/800x400/64748b/FFFFFF?text=System+Design+Primer+Feature+Image"
              alt="System Design Primer"
            />
          </p>
          <h2 id="introduction">Introduction</h2>
          <p>
            Welcome to the System Design Primer by our team here at System Design School. System design knowledge is
            essential for all developers to learn for two main reasons:
          </p>
          <ol>
            <li>System design interviews are asked when interviewing as most companies, especially in big tech</li>
            <li>
              System design is what separates good from great engineers - anyone can code, but not anyone can design
              robust, scalable systems
            </li>
          </ol>
          <h3 id="what-is-system-design">What Is System Design?</h3>
          <p>
            Have you ever wondered how big tech companies like Google, Amazon, and Netflix build systems that
            effortlessly handle billions of users, terabytes of data, and massive spikes in traffic - all while staying
            fast, reliable, and secure? This is all done through the development of robust systems that work to be as
            efficient as possible, at as large a scale as possible. And the process of building these systems is what we
            refer to as system design.
          </p>
          <h3 id="what-are-system-design-interviews">What Are System Design Interviews?</h3>
          <p>
            As you progress in your career, writing code no longer becomes your main job - after all, with AI
            advancements, writing code is becoming easier than ever. Instead, companies need engineers who can step back
            and look at the big picture. Can you design something that works seamlessly under high traffic? Can you make
            decisions that balance cost, speed, and reliability? This is what gets assessed in a system design interview.
          </p>
          <h2 id="main-components">Main Components</h2>
          <p>
            Many of the most common system design problems have been solved - in fact, some of them are so common that
            engineers have developed tools for these that fit into every system, which we refer to as <strong>components</strong>. A system design
            interview isn{`'`}t about solving problems from scratch - it{`'`}s about knowing what components you need to piece together.
          </p>
          <h3 id="microservices">Microservices</h3>
          <p>
            Services are where the application code and business logic lives. While you can structure your application as
            either a monolith or microservices, most system design interview problems deal with large-scale systems that
            benefit from a microservices architecture.
          </p>
          <h3 id="relational-database">Relational Database</h3>
          <p>
            At the heart of most applications lies data, and in many cases, that data needs to be structured in a way
            that’s easy to understand, query, and maintain. Enter the <strong>relational database</strong>, a workhorse for handling structured data in
            countless systems.
          </p>
          <h3 id="nosql-database">NoSQL Database</h3>
          <p>
            Not all data is neat and structured like rows in a spreadsheet. Sometimes, your data is messy, dynamic, or
            just doesn’t fit nicely into the table structure that’s expected in a relational database. That’s where{' '}
            <strong>NoSQL databases</strong> come in.
          </p>
          <h3 id="object-storage">Object Storage</h3>
          <p>
            As applications and systems grow, so does the need to store large amounts of unstructured data - think
            images, videos, backups, and logs. Traditional storage solutions like file systems or databases often
            struggle to keep up with the scalability and flexibility needed for such massive datasets. That’s where{' '}
            <strong>object storage</strong> comes in.
          </p>
          <h3 id="cache">Cache</h3>
          <p>
            Whenever you’re fetching data from a database, it takes time and compute resources to do. While each request
            might only take milliseconds, system design is all about designing for scale, and with millions of users,
            this can lead to significant problems. This is where <strong>caches</strong> come in.
          </p>
          <h3 id="message-queues">Message Queues</h3>
          <p>
            When building modern distributed systems, one of the most common challenges is communication between
            different services. A <strong>message queue</strong> solves these problems by acting as an intermediary. It allows services to send
            messages without worrying about whether the receiving service is ready to process them.
          </p>
          <h3 id="api-gateway">API Gateway</h3>
          <p>
            An <strong>API Gateway</strong> solves these issues, by acting as a single entry point for all API requests. It routes requests to the
            appropriate services, handles cross-cutting concerns like authentication, and even helps optimize performance
            with caching and rate limiting. Think of it as a traffic cop that directs and controls the flow of requests
            in your system.
          </p>
          <h2 id="interview-step-by-step">Interview Step-by-Step</h2>
          <p>
            A typical interview flows like this: clarify requirements, design the system architecture, identify
            bottlenecks, and plan for scaling. You must communicate trade-offs and justify choices throughout the
            discussion.
          </p>
          <h3 id="functional-requirements">Functional Requirements</h3>
          <p>Understand what the system must do. What are the core actions? What inputs and outputs matter?</p>
          <h3 id="non-functional-requirements">Non-Functional Requirements</h3>
          <p>
            Consider expectations around latency, reliability, availability, scalability, cost, and operational
            complexity.
          </p>
          <h3 id="api-design">API Design</h3>
          <p>
            Identify critical APIs, their payloads, request frequency, and access patterns. APIs clarify how clients
            interact with the system.
          </p>
          <h3 id="high-level-design">High-Level Design</h3>
          <p>
            Sketch the core components: clients, services, databases, and external dependencies. Call out relationships
            between them.
          </p>
          <h3 id="deep-dives">Deep Dives</h3>
          <p>
            Interviewers often drill into a specific component. Be ready to explain how it scales, handles failures, and
            stores data.
          </p>
          <h2 id="core-design-challenges">Core Design Challenges</h2>
          <p>
            Every system design problem ultimately maps to a few fundamental challenges. Recognizing them helps you reuse
            patterns across different scenarios.
          </p>
          <h3 id="challenge-1-too-many-concurrent-users">Challenge 1: Too Many Concurrent Users</h3>
          <p>
            While a large user-base introduces many problems, the most common and intuitive one is that a single
            machine/database has a RPS/QPS limit.
          </p>
          <h3 id="challenge-2-too-much-data-to-move-around">Challenge 2: Too Much Data to Move Around</h3>
          <p>
            The twin challenge of too many users is the issue of too much data. The data becomes &apos;big&apos; when it&apos;s no
            longer possible to hold everything on one machine.
          </p>
          <h3 id="challenge-3-the-system-should-be-fast-and-responsive">
            Challenge 3: The System Should be Fast and Responsive
          </h3>
          <p>
            Most user-facing apps must be quick. The response time should be less than 500ms. If it goes longer than 1
            second, the user will have a poor experience.
          </p>
          <h3 id="challenge-4-inconsistent-outdated-states">Challenge 4: Inconsistent (outdated) States</h3>
          <p>
            This challenge is a result of solving Challenge 1 and Challenge 2. With data replication and asynchronous
            data update, the read requests can easily see inconsistent data.
          </p>
          <h2 id="designing-for-scale">Designing for Scale</h2>
          <p>
            Scaling a system effectively is one of the most critical aspects of satisfying non-functional requirements in
            system design.
          </p>
          <h3 id="decomposition">Decomposition</h3>
          <p>Decomposition involves breaking down requirements into microservices.</p>
          <h3 id="vertical-scaling">Vertical Scaling</h3>
          <p>Vertical scaling represents the brute force approach to scaling.</p>
          <h3 id="horizontal-scaling">Horizontal Scaling</h3>
          <p>Horizontal scaling focuses on scaling out by running multiple identical instances of stateless services.</p>
          <h3 id="partitioning">Partitioning</h3>
          <p>Partitioning involves splitting requests and data into shards and distributing them across services or databases.</p>
          <h3 id="caching">Caching</h3>
          <p>
            Caching serves to improve query read performance by storing frequently accessed data in faster memory storage,
            such as in-memory caches.
          </p>
          <h3 id="buffer-with-message-queues">Buffer with Message Queues</h3>
          <p>
            High-concurrency scenarios often encounter write-intensive operations. Message queues can buffer write
            requests, changing synchronous operations into asynchronous ones.
          </p>
          <h3 id="separating-read-and-write">Separating Read and Write</h3>
          <p>We want to separate read and write operations to treat them differently.</p>
          <h3 id="combining-techniques">Combining Techniques</h3>
          <p>Effective scaling usually requires a multi-faceted approach combining several techniques.</p>
          <h3 id="adapting-to-changing-business-requirements">Adapting to Changing Business Requirements</h3>
          <p>Adapting business requirements offers a practical way to handle large traffic loads.</p>
          <h2 id="master-template">Master Template</h2>
          <p>
            Here is the common template to design scalable services (and therefore solve many system design problems):
          </p>
          <p>
            <img src="https://placehold.co/800x400/64748b/FFFFFF?text=Design+Diagram" alt="design-diagram" />
          </p>

          <div className="youtube-container">
            <h3>System Design Master Template</h3>
            <iframe
              className="youtube-iframe"
              src="https://www.youtube.com/embed/OWVaX_cBrh8?si=MAfaQS1TV1r7USUI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <PrimerMetadata metadata={primerMetadata} />
        <CommentsSection comments={primerComments} />
      </div>

      <aside className="primer-right-sidebar">
        <CtaCard
          title={primerCta.title}
          description={primerCta.description}
          href={primerCta.link}
          buttonText={primerCta.buttonText}
        />
        <PrimerTocNav
          headings={primerSidebarLinks}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </aside>
    </div>
  )
}

export default PrimerPage
