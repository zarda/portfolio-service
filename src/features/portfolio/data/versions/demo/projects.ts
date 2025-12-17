import { Project } from '../../../models';

/**
 * Demo Projects Data
 *
 * Projects are entities with unique IDs (extending Entity base class).
 * Each project has:
 * - title: Project name
 * - description: Brief explanation
 * - tags: Technology stack array
 * - imageUrl: Preview image (null uses auto-generated screenshot)
 * - liveUrl: Link to live demo
 * - githubUrl: Optional link to source code
 *
 * The hasGithub getter returns true if githubUrl is defined.
 */
export const projects: Project[] = [
  new Project(
    {
      title: 'E-Commerce Platform',
      description:
        'A full-featured online store with product catalog, shopping cart, ' +
        'user authentication, and payment integration. Demonstrates REST API ' +
        'design and state management patterns.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      imageUrl: null, // Will use auto-generated screenshot
      liveUrl: 'https://example.com/ecommerce',
      githubUrl: 'https://github.com/demo/ecommerce',
    },
    'demo-1'
  ),
  new Project(
    {
      title: 'Task Management App',
      description:
        'Collaborative task management with real-time updates, drag-and-drop ' +
        'interface, and team workspaces. Shows WebSocket implementation and ' +
        'optimistic UI updates.',
      tags: ['Vue.js', 'Firebase', 'TypeScript'],
      imageUrl: null,
      liveUrl: 'https://example.com/tasks',
      githubUrl: 'https://github.com/demo/tasks',
    },
    'demo-2'
  ),
  new Project(
    {
      title: 'Analytics Dashboard',
      description:
        'Data visualization dashboard with interactive charts, filters, and ' +
        'export functionality. This project has no GitHub link to demonstrate ' +
        'the optional githubUrl field.',
      tags: ['React', 'D3.js', 'Python', 'FastAPI'],
      imageUrl: null,
      liveUrl: 'https://example.com/analytics',
      // No githubUrl - demonstrates optional field
    },
    'demo-3'
  ),
];
