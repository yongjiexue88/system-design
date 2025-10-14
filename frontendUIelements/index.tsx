/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- Icon Components ---
// FIX: Allow style and other props to be passed to SVG icon components.
const CheckmarkIcon = ({ className = '', ...props }) => (
  <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const ChevronDownIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);
const BookOpenIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const CodeBracketIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 12" />
    </svg>
);
const SunIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const MoonIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);
const SparklesIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0m-11.314 0a5 5 0 007.072 0" />
    </svg>
);
const PathIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
);
const TemplateIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);
const XCircleIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const HeartIcon = ({ className = '', ...props }) => (
  <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const ChatIcon = ({ className = '', ...props }) => (
  <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.117C2.672 15.145 2 13.513 2 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const PersonCircleIcon = ({ className = '', ...props }) => (
    <svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
    </svg>
);


// --- Main App Component ---
function App() {
  const [page, setPage] = useState('practice'); // 'courses', 'practice', 'primer', 'pricing'
  const [theme, setTheme] = useState('light');
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderPage = () => {
    switch (page) {
      case 'courses':
        return <CoursesPage />;
      case 'practice':
        return <PracticePage />;
      case 'primer':
        return <PrimerPage />;
      case 'pricing':
        return <PricingPage />;
      default:
        return <PracticePage />;
    }
  };

  return (
    <div>
      {showPromo && (
        <div className="promo-bar">
          <a href="#">
            <span>Welcome, NeetCode users! You've unlocked a special lifetime discount—just for you.</span>
            <span className="ml-2">🚀</span>
          </a>
          <button onClick={() => setShowPromo(false)} aria-label="Dismiss promotional banner">
            <XCircleIcon />
          </button>
        </div>
      )}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="nav-left">
              <a href="#" className="nav-logo-link">
                <CodeBracketIcon className="nav-logo-icon" />
                <span className="nav-logo-text">System Design School</span>
              </a>
                 <div className="nav-links">
                    <button onClick={() => setPage('courses')} className={page === 'courses' ? 'active' : ''}>Learn</button>
                    <button onClick={() => setPage('practice')} className={page === 'practice' ? 'active' : ''}>Practice</button>
                    <button onClick={() => setPage('primer')} className={page === 'primer' ? 'active' : ''}>Primer</button>
                    <button onClick={() => setPage('pricing')} className={page === 'pricing' ? 'active' : ''}>Pricing</button>
                </div>
            </div>
            <div className="nav-right">
               <div className="relative">
                 <button className="nav-links">
                    <span>Tools</span>
                    <ChevronDownIcon className="h-4 w-4" />
                 </button>
               </div>
               <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                  {theme === 'dark' ? <SunIcon style={{color: '#facc15'}} /> : <MoonIcon />}
               </button>
               <button className="login-btn">
                Login
               </button>
            </div>
          </div>
        {/* FIX: Removed extra closing div tag */}
      </nav>
      <main>
        <div className="main-content-area">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

// --- Page Components ---

function CoursesPage() {
    return (
        <div>
            <h1 className="page-title">System Design Courses</h1>
            <div className="card-grid">
                <SystemDesignCard 
                    section="1" 
                    title="System Design Fundamentals"
                    completed={2}
                    total={5}
                    topics={[
                        { name: "CDNs", completed: true },
                        { name: "Load Balancers", completed: true },
                        { name: "API Gateways", completed: false },
                        { name: "Microservices", completed: false },
                        { name: "Databases", completed: false },
                    ]}
                />
                <SystemDesignCard 
                    section="2" 
                    title="Domain Knowledge"
                    completed={1}
                    total={4}
                    topics={[
                        { name: "Geospatial Search", completed: true },
                        { name: "Distributed Transactions", completed: false },
                        { name: "Real-time Bidding", completed: false },
                        { name: "Web Crawlers", completed: false },
                    ]}
                />
                <SystemDesignCard 
                    section="3" 
                    title="Popular Interview Problems"
                    completed={0}
                    total={6}
                    topics={[
                        { name: "Design TinyURL", completed: false },
                        { name: "Design Twitter", completed: false },
                        { name: "Design a Web Crawler", completed: false },
                        { name: "Design an API Rate Limiter", completed: false },
                        { name: "Design Dropbox", completed: false },
                        { name: "Design YouTube", completed: false },
                    ]}
                />
            </div>
        </div>
    );
}

function PracticePage() {
    const questions = [
        { name: "Design LeetCode", companies: 3, difficulty: "Easy", status: "Start Now" },
        { name: "Design URL Shortener", companies: 7, difficulty: "Easy", status: "Start Now" },
        { name: "Design Webhook", companies: 5, difficulty: "Medium", status: "Start Now" },
        { name: "Design a Collaborative Editing System", companies: 1, difficulty: "Medium", status: "Coming Soon" },
        { name: "Design Spotify Top K Songs", companies: 1, difficulty: "Hard", status: "Coming Soon" },
    ];
    return (
        <div className="practice-page">
             <h1 className="page-title" style={{padding: 0}}>Practice System Design Questions</h1>
             <p className="text-tertiary mb-6">Select a problem to start practicing.</p>
             <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {questions.map((q, i) => (
                    <div key={i} className="practice-item">
                        <div>
                            <p style={{fontWeight: 700, fontSize: '1.125rem'}}>{q.name}</p>
                            <p style={{fontSize: '0.875rem'}} className="text-tertiary">{q.companies} Companies</p>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                            <span className={`practice-item-difficulty ${
                                q.difficulty === 'Easy' ? 'difficulty-easy' :
                                q.difficulty === 'Medium' ? 'difficulty-medium' :
                                'difficulty-hard'
                            }`}>{q.difficulty}</span>
                            <button className="sd-card-start-btn" style={{marginTop: 0}} disabled={q.status === 'Coming Soon'}>{q.status}</button>
                        </div>
                    </div>
                ))}
             </div>
        </div>
    )
}

function PrimerPage() {
    const [activeSection, setActiveSection] = useState('introduction');
    const ctaCardContent = {
        title: "The System Design Courses",
        description: "Go beyond memorizing solutions to specific problems. Learn the core concepts, patterns and templates to solve any problem.",
        link: "#",
        buttonText: "Start Learning"
    };

    const primerSidebarLinks = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'what-is-system-design', title: 'What Is System Design?' },
        { id: 'what-are-system-design-interviews', title: 'What Are System Design Interviews?' },
        { id: 'main-components', title: 'Main Components' },
        { id: 'microservices', title: 'Microservices' },
        { id: 'relational-database', title: 'Relational Database' },
        { id: 'nosql-database', title: 'NoSQL Database' },
        { id: 'object-storage', title: 'Object Storage' },
        { id: 'cache', title: 'Cache' },
        { id: 'message-queues', title: 'Message Queues' },
        { id: 'api-gateway', title: 'API Gateway' },
        { id: 'interview-step-by-step', title: 'Interview Step-by-Step' },
        { id: 'functional-requirements', title: 'Functional Requirements' },
        { id: 'non-functional-requirements', title: 'Non-Functional Requirements' },
        { id: 'api-design', title: 'API Design' },
        { id: 'high-level-design', title: 'High-Level Design' },
        { id: 'deep-dives', title: 'Deep Dives' },
        { id: 'core-design-challenges', title: 'Core Design Challenges' },
        { id: 'challenge-1-too-many-concurrent-users', title: 'Challenge 1: Too Many Concurrent Users' },
        { id: 'challenge-2-too-much-data-to-move-around', title: 'Challenge 2: Too Much Data to Move Around' },
        { id: 'challenge-3-the-system-should-be-fast-and-responsive', title: 'Challenge 3: The System Should be Fast and Responsive' },
        { id: 'challenge-4-inconsistent-outdated-states', title: 'Challenge 4: Inconsistent (outdated) States' },
        { id: 'designing-for-scale', title: 'Designing for Scale' },
        { id: 'decomposition', title: 'Decomposition' },
        { id: 'vertical-scaling', title: 'Vertical Scaling' },
        { id: 'horizontal-scaling', title: 'Horizontal Scaling' },
        { id: 'partitioning', title: 'Partitioning' },
        { id: 'caching', title: 'Caching' },
        { id: 'buffer-with-message-queues', title: 'Buffer with Message Queues' },
        { id: 'separating-read-and-write', title: 'Separating Read and Write' },
        { id: 'combining-techniques', title: 'Combining Techniques' },
        { id: 'adapting-to-changing-business-requirements', title: 'Adapting to Changing Business Requirements' },
        { id: 'master-template', title: 'Master Template' },
    ];

    const problemSolutionsLinks = [
        { id: 'design-leetcode', title: 'Design LeetCode', path: '#' },
        { id: 'design-url-shortener', title: 'Design URL Shortener', path: '#' },
        { id: 'design-webhook', title: 'Design Webhook', path: '#' },
        { id: 'design-google-doc', title: 'Design a Collaborative Editing System like Google Docs', path: '#' },
    ];

    const commentsData = [
        { user: { name: 'mohan nair', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIYYAv_Jxbv5E54xzXGGx79h0-cjx8_ELwRtH9qLlRnGHXuBw=s96-c' }, content: 'How is the GET request for tweets returning the likes and comments since those are stored in Engagement DB as per the HLD?', date: 'Tue Sep 23 2025' },
        { user: { name: 'PLuna', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLLWGkWBYCMVivKjQk37HKyGhmwKZoNBX9H6IZ1rqoPNTqIww=s96-c' }, content: 'This is awesome. Thank you so much for posting this. One thing that confuses me is how to get good at the API Design part.', date: 'Wed Jul 30 2025' },
        { user: { name: 'Don Mamaril', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLLQXvqV9TlsnjJQdOLcYUb4wqE_8zNoT93s8W2QoOkeQVcZQ=s96-c' }, content: 'This was an excellent primer. Thank you!', date: 'Sun Jul 20 2025' },
    ];


    return (
        <div className="primer-container">
            {/* Left Sidebar */}
            <aside className="primer-left-sidebar">
                <PrimerSidebarNav
                    sections={primerSidebarLinks}
                    problemSolutions={problemSolutionsLinks}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </aside>

            {/* Main Content Area */}
            <div className="primer-content">
                <div className="primer-article">
                    <h1>System Design Primer</h1>
                    <p><img src="https://placehold.co/800x400/64748b/FFFFFF?text=System+Design+Primer+Feature+Image" alt="System Design Primer" /></p>
                    <h2 id="introduction">Introduction</h2>
                    <p>Welcome to the System Design Primer by our team here at System Design School. System design knowledge is essential for all developers to learn for two main reasons:</p>
                    <ol>
                        <li>System design interviews are asked when interviewing as most companies, especially in big tech</li>
                        <li>System design is what separates good from great engineers - anyone can code, but not anyone can design robust, scalable systems</li>
                    </ol>
                    <h3 id="what-is-system-design">What Is System Design?</h3>
                    <p>Have you ever wondered how big tech companies like Google, Amazon, and Netflix build systems that effortlessly handle billions of users, terabytes of data, and massive spikes in traffic - all while staying fast, reliable, and secure? This is all done through the development of robust systems that work to be as efficient as possible, at as large a scale as possible. And the process of building these systems is what we refer to as system design.</p>
                    <h3 id="what-are-system-design-interviews">What Are System Design Interviews?</h3>
                    <p>As you progress in your career, writing code no longer becomes your main job - after all, with AI advancements, writing code is becoming easier than ever. Instead, companies need engineers who can step back and look at the big picture. Can you design something that works seamlessly under high traffic? Can you make decisions that balance cost, speed, and reliability? This is what gets assessed in a system design interview.</p>
                    <h2 id="main-components">Main Components</h2>
                    <p>Many of the most common system design problems have been solved - in fact, some of them are so common that engineers have developed tools for these that fit into every system, which we refer to as <strong>components</strong>. A system design interview isn’t about solving problems from scratch - it’s about knowing what components you need to piece together.</p>
                    <h3 id="microservices">Microservices</h3>
                    <p>Services are where the application code and business logic lives. While you can structure your application as either a monolith or microservices, most system design interview problems deal with large-scale systems that benefit from a microservices architecture.</p>
                    <h3 id="relational-database">Relational Database</h3>
                    <p>At the heart of most applications lies data, and in many cases, that data needs to be structured in a way that’s easy to understand, query, and maintain. Enter the <strong>relational database</strong>, a workhorse for handling structured data in countless systems.</p>
                    <h3 id="nosql-database">NoSQL Database</h3>
                    <p>Not all data is neat and structured like rows in a spreadsheet. Sometimes, your data is messy, dynamic, or just doesn’t fit nicely into the table structure that’s expected in a relational database. That’s where <strong>NoSQL databases</strong> come in.</p>
                    <h3 id="object-storage">Object Storage</h3>
                    <p>As applications and systems grow, so does the need to store large amounts of unstructured data - think images, videos, backups, and logs. Traditional storage solutions like file systems or databases often struggle to keep up with the scalability and flexibility needed for such massive datasets. That’s where <strong>object storage</strong> comes in.</p>
                    <h3 id="cache">Cache</h3>
                    <p>Whenever you’re fetching data from a database, it takes time and compute resources to do. While each request might only take milliseconds, system design is all about designing for scale, and with millions of users, this can lead to significant problems. This is where <strong>caches</strong> come in.</p>
                    <h3 id="message-queues">Message Queues</h3>
                    <p>When building modern distributed systems, one of the most common challenges is communication between different services. A <strong>message queue</strong> solves these problems by acting as an intermediary. It allows services to send messages without worrying about whether the receiving service is ready to process them.</p>
                    <h3 id="api-gateway">API Gateway</h3>
                    <p>An <strong>API Gateway</strong> solves these issues, by acting as a single entry point for all API requests. It routes requests to the appropriate services, handles cross-cutting concerns like authentication, and even helps optimize performance with caching and rate limiting. Think of it as a traffic cop that directs and controls the flow of requests in your system.</p>
                    <h2 id="interview-step-by-step">Interview Step-by-Step</h2>
                    <p>The key to success in system design interviews is following a structured approach. As we learn this interview process, we’ll actually show you how to solve a popular system design problem, Design Twitter, so you can see how it works in a real interview!</p>
                    <h3 id="functional-requirements">Functional Requirements</h3>
                    <p>At the start of any system design interview, the first step is to define your core functional requirements. This stage usually takes only a few minutes.</p>
                    <h3 id="non-functional-requirements">Non-Functional Requirements</h3>
                    <p>After defining functional requirements, we will move on to non-functional requirements. This stage also usually only takes a few minutes.</p>
                    <h3 id="api-design">API Design</h3>
                    <p>After defining our requirements, it’s time to move on to the API design stage. Again, this stage should only take a few minutes.</p>
                    <h3 id="high-level-design">High-Level Design</h3>
                    <p>High-level design is the bulk of the interview, and is where you’ll combine the work from the first few parts with your knowledge of system design. This should take around 15-20 minutes, but varies based on your level.</p>
                    <h3 id="deep-dives">Deep Dives</h3>
                    <p>Deep dives are the last step of the system design interview, and usually focus on addressing higher-level, more specific challenges or edge cases in your system.</p>
                    <h2 id="core-design-challenges">Core Design Challenges</h2>
                    <p>Now that we have a fair understanding of how to solve a system design problem, we should take a look at some of the most common system design problems.</p>
                    <h3 id="challenge-1-too-many-concurrent-users">Challenge 1: Too Many Concurrent Users</h3>
                    <p>While a large user-base introduces many problems, the most common and intuitive one is that a single machine/database has a RPS/QPS limit.</p>
                    <h3 id="challenge-2-too-much-data-to-move-around">Challenge 2: Too Much Data to Move Around</h3>
                    <p>The twin challenge of too many users is the issue of too much data. The data becomes 'big' when it's no longer possible to hold everything on one machine.</p>
                    <h3 id="challenge-3-the-system-should-be-fast-and-responsive">Challenge 3: The System Should be Fast and Responsive</h3>
                    <p>Most user-facing apps must be quick. The response time should be less than 500ms. If it goes longer than 1 second, the user will have a poor experience.</p>
                    <h3 id="challenge-4-inconsistent-outdated-states">Challenge 4: Inconsistent (outdated) States</h3>
                    <p>This challenge is a result of solving Challenge 1 and Challenge 2. With data replication and asynchronous data update, the read requests can easily see inconsistent data.</p>
                    <h2 id="designing-for-scale">Designing for Scale</h2>
                    <p>Scaling a system effectively is one of the most critical aspects of satisfying non-functional requirements in system design.</p>
                    <h3 id="decomposition">Decomposition</h3>
                    <p>Decomposition involves breaking down requirements into microservices.</p>
                    <h3 id="vertical-scaling">Vertical Scaling</h3>
                    <p>Vertical scaling represents the brute force approach to scaling.</p>
                    <h3 id="horizontal-scaling">Horizontal Scaling</h3>
                    <p>Horizontal scaling focuses on scaling out by running multiple identical instances of stateless services.</p>
                    <h3 id="partitioning">Partitioning</h3>
                    <p>Partitioning involves splitting requests and data into shards and distributing them across services or databases.</p>
                    <h3 id="caching">Caching</h3>
                    <p>Caching serves to improve query read performance by storing frequently accessed data in faster memory storage, such as in-memory caches.</p>
                    <h3 id="buffer-with-message-queues">Buffer with Message Queues</h3>
                    <p>High-concurrency scenarios often encounter write-intensive operations. Message queues can buffer write requests, changing synchronous operations into asynchronous ones.</p>
                    <h3 id="separating-read-and-write">Separating Read and Write</h3>
                    <p>We want to separate read and write operations to treat them differently.</p>
                    <h3 id="combining-techniques">Combining Techniques</h3>
                    <p>Effective scaling usually requires a multi-faceted approach combining several techniques.</p>
                    <h3 id="adapting-to-changing-business-requirements">Adapting to Changing Business Requirements</h3>
                    <p>Adapting business requirements offers a practical way to handle large traffic loads.</p>
                    <h2 id="master-template">Master Template</h2>
                    <p>Here is the common template to design scalable services (and therefore solve many system design problems):</p>
                    <p><img src="https://placehold.co/800x400/64748b/FFFFFF?text=Design+Diagram" alt="design-diagram" /></p>
                    
                    <div className="youtube-container">
                        <h3>System Design Master Template</h3>
                        <iframe
                            className="youtube-iframe"
                            src="https://www.youtube.com/embed/OWVaX_cBrh8?si=MAfaQS1TV1r7USUI"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div className="comments-section">
                    <CommentSection comments={commentsData} />
                </div>
            </div>

            <aside className="primer-right-sidebar">
                <CtaCard {...ctaCardContent} />
                <PrimerTocNav
                    headings={primerSidebarLinks}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </aside>
        </div>
    );
}

// FIX: Create missing PricingPage component
function PricingPage() {
    return (
        <div className="pricing-page-container">
            <h1 className="page-title" style={{fontSize: '2.25rem', fontWeight: 800}}>Invest in Your System Design Mastery</h1>
            <p className="text-tertiary" style={{maxWidth: '42rem', margin: '1rem auto 0', fontSize: '1.125rem'}}>
                Acing your system design skills isn't just about the next interview — it's about elevating your entire career trajectory.
            </p>

            <div className="pricing-page-grid">
                <PricingCard 
                    plan="Free" 
                    price="0" 
                    features={['Practice free questions.', 'Accessing free course content.']} 
                    buttonText="Free Forever" 
                    isPopular={false} 
                />
                <PricingCard 
                    plan="Pro Yearly" 
                    price="45" 
                    period="/yr" 
                    originalPrice="99.99"
                    features={['Unlock all system design courses.', 'Access to continuously updating questions and content.']} 
                    buttonText="Upgrade" 
                    isPopular={true} 
                />
                <PricingCard 
                    plan="Pro Lifetime" 
                    price="99" 
                    originalPrice="198"
                    features={['Paid once, own forever', 'Access to all future updates']} 
                    buttonText="Upgrade" 
                    isPopular={false} 
                />
            </div>
            
            <div className="section-container" style={{textAlign: 'center'}}>
                <h2 className="section-title">Our user says it best</h2>
                <div className="cta-card" style={{maxWidth: '42rem', margin: '0 auto'}}>
                    <img src="https://i.pravatar.cc/64?u=ram" alt="Ram" style={{width: '4rem', height: '4rem', borderRadius: '9999px', margin: '0 auto 1rem'}} />
                    <blockquote className="italic text-secondary">"This is the quickest, most comprehensive way to get interview ready in a practical fashion..."</blockquote>
                    <p style={{fontWeight: 600, marginTop: '1rem'}}>Ram</p>
                </div>
            </div>

            <TargetAudience />
            <FeaturesSection />
            <FaqSection />
        </div>
    );
}


// --- Helper Components ---

function PrimerSidebarNav({ sections, problemSolutions, activeSection, setActiveSection }) {
    return (
        <>
            <div className="primer-sidebar-title">System Design Primer</div>
            <ul className="primer-sidebar-list">
                {sections.map(link => (
                    <li key={link.id}>
                        <a href={`#${link.id}`} className={activeSection === link.id ? 'active' : ''} onClick={() => setActiveSection(link.id)} >
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
            <div style={{padding: '0.5rem', marginTop: '1rem'}}>
                <div className="primer-sidebar-title">More System Design Solutions</div>
                <ul className="primer-sidebar-list">
                    {problemSolutions.map(link => ( <li key={link.id}><a href={link.path}>{link.title}</a></li> ))}
                </ul>
            </div>
        </>
    );
}

function PrimerTocNav({ headings, activeSection, setActiveSection }) {
    return (
        <div style={{position: 'sticky', top: '6rem', overflowY: 'auto', flexGrow: 1}}>
            <div className="primer-sidebar-title">On This Page</div>
            <ul className="primer-sidebar-list">
                {headings.map(heading => (
                    <li key={heading.id}>
                        <a href={`#${heading.id}`} className={activeSection === heading.id ? 'active' : ''} onClick={() => setActiveSection(heading.id)} >
                            {heading.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CtaCard({ title, description, link, buttonText, className = '' }) {
    return (
        <div className={`cta-card ${className}`}>
            <p className="cta-card-title">{title}</p>
            <p className="cta-card-desc">{description}</p>
            <a href={link} className="cta-card-btn">{buttonText}</a>
        </div>
    );
}

function CommentSection({ comments }) {
    return (
        <div style={{marginTop: '2rem', paddingTop: '1.5rem'}}>
            <h4 style={{fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.5rem', borderTop: '1px solid var(--border-primary)', paddingTop: '1rem'}}>Comments</h4>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem'}}>
                <button className="comments-join-btn">
                    <PersonCircleIcon style={{width: '1.5rem', height: '1.5rem', marginRight: '0.5rem'}} />Join the Discussion
                </button>
            </div>
            <div>
                {comments.map((comment, index) => (
                    <CommentItem key={index} comment={comment} />
                ))}
            </div>
        </div>
    );
}

function CommentItem({ comment }) {
    return (
        <div className="comment-item">
            <div className="comment-item-avatar">
                {comment.user.avatar ? <img src={comment.user.avatar} alt={`${comment.user.name}'s avatar`} /> : <PersonCircleIcon />}
            </div>
            <div style={{flexGrow: 1}}>
                <div style={{fontWeight: 600}}>{comment.user.name}</div>
                <div className="comment-item-content">{comment.content}</div>
                <div className="comment-item-date">{comment.date}</div>
                <div className="comment-item-actions">
                    <button><HeartIcon /><span></span></button>
                    <button><ChatIcon /></button>
                </div>
            </div>
        </div>
    );
}

function SystemDesignCard({ section, title, completed, total, topics }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="system-design-card">
      <div className="sd-card-header">
        <div>
          <p style={{color: 'var(--blue-500)', fontSize: '0.875rem', fontWeight: 600}}>SECTION {section}</p>
          <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem'}}>{title}</h2>
        </div>
        <div className="sd-card-header-icon"><BookOpenIcon /></div>
      </div>
      <div>
        <div className="sd-card-progress-bar"><div className="sd-card-progress" style={{ width: `${progress}%` }}></div></div>
        <p className="sd-card-progress-text">{completed}/{total} Completed</p>
      </div>
      <div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="sd-card-topics-toggle">
          <span>Topics Covered</span>
          <ChevronDownIcon style={{width: '1.25rem', height: '1.25rem', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'none'}} />
        </button>
        {isExpanded && (
           <ul className="sd-card-topics-list">
           {topics.map((topic, index) => (
             <li key={index} className="sd-card-topic-item">
               <span className={topic.completed ? 'sd-card-topic-item-completed' : ''}>{topic.name}</span>
               {topic.completed ? <CheckmarkIcon className="checkmark-icon" /> : <div className="empty-circle"></div>}
             </li>
           ))}
         </ul>
        )}
      </div>
      <button className="sd-card-start-btn">Start Lesson</button>
    </div>
  );
}

// FIX: Made `period` and `originalPrice` props optional with default null values.
function PricingCard({ plan, price, period = null, originalPrice = null, features, buttonText, isPopular }) {
    return (
        <div className={`pricing-card ${isPopular ? 'pricing-card-popular' : ''}`}>
            {isPopular && <span className="popular-badge">Most Popular</span>}
            <h3 style={{fontSize: '1.125rem', fontWeight: 600}}>{plan}</h3>
            <p className="pricing-card-price">
                <span className="price-amount">${price}</span>
                {period && <span className="price-period">{period}</span>}
                {originalPrice && <span className="price-original">from ${originalPrice}</span>}
            </p>
            <button className="pricing-card-button">{buttonText || "Upgrade"}</button>
            <ul className="pricing-card-features">
                {features.map((feature, index) => (
                    <li key={index} className="pricing-card-feature">
                        <CheckmarkIcon /><span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function TargetAudience() {
    const points = [
        "Software engineers preparing for Big Tech or mid to senior-level system design interviews.",
        "Mid-level developers looking to strengthen architectural fundamentals and grow into leadership roles.",
        "Students & boot-camp grads who want to learn beyond basic coding and level up their system design skills."
    ];
    return (
        <div className="section-container">
            <h2 className="section-title">Who is System Design School for?</h2>
            <div className="audience-section-box">
                <ul className="audience-list">
                    {points.map((point, i) => ( <li key={i} className="audience-list-item"><CheckmarkIcon /><span>{point}</span></li> ))}
                </ul>
            </div>
        </div>
    );
}

function FeaturesSection() {
    const features = [
        { icon: <SparklesIcon />, title: "Interactive Practice", description: "Practice real-world system design questions and get instant AI-powered feedback." },
        { icon: <PathIcon />, title: "Structured Learning Paths", description: "Follow a curated curriculum built by ex-FAANG engineers - from fundamentals to advanced topics." },
        { icon: <TemplateIcon />, title: "Reusable Design Templates", description: "Accelerate interviews with proven patterns you can adapt to any problem." },
    ];
    return (
        <div className="section-container">
            <div className="features-grid">
                {features.map((feature, i) => (
                    <div key={i} className="feature-item">
                        <div className="feature-icon-wrapper">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FaqSection() {
    const faqs = [
        { q: "How is System Design School different from other resources?", a: "1) Structured approach - teach a person to fish. Beyond canned write-ups, we give you a full conceptual toolkit, reusable design patterns and show you how you can adapt to any problem. 2) Hands-on practice & instant AI feedback. Stop passively watching videos." },
        { q: "Is the subscription really worth it?", a: "Absolutely! Thanks to our limited-time promotion, the entry plan is only $0.12/day -- that's an insane deal." },
        { q: "Can I cancel at any time?", a: "Absolutely. You can cancel your subscription in one click from your dashboard -- you will retain access until the end of your current billing cycle." },
        { q: "Do you offer a money-back guarantee?", a: "Yes! All paid plans come with a 7-day, 100% money-back guarantee. If you're not satisfied, just reach out and we'll refund you--no questions asked." },
    ];
    return (
        <div className="faq-container">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-accordion">
                {faqs.map((faq, i) => <FaqItem key={i} question={faq.q} answer={faq.a} />)}
            </div>
        </div>
    );
}

function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <button onClick={() => setIsOpen(!isOpen)} className="faq-question-btn">
                <h3>{question}</h3>
                <ChevronDownIcon className={isOpen ? 'open' : ''} />
            </button>
            {isOpen && <div className="faq-answer"><p>{answer}</p></div>}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);