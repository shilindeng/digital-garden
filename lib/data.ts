export const profile = {
  name: "Alex Dev",
  role: "Full Stack Engineer",
  bio: "Building digital gardens and exploring the intersection of design and code.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  location: "San Francisco, CA",
  email: "alex@example.com",
  socials: [
    { name: "GitHub", url: "https://github.com", icon: "Github" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" }
  ]
};

export const posts = [
  {
    title: "The Art of Bento Grids",
    slug: "bento-grids",
    date: "2024-03-15",
    category: "Design",
    abstract: "Why bento grids are taking over web design and how to build one."
  },
  {
    title: "React Server Components",
    slug: "rsc-guide",
    date: "2024-03-10",
    category: "Engineering",
    abstract: "Deep dive into RSC and how it changes the mental model of React."
  },
  {
    title: "Tailwind v4 is Here",
    slug: "tailwind-v4",
    date: "2024-03-01",
    category: "CSS",
    abstract: "Exploring the new engine and what it means for performance."
  }
];

export const stack = [
  { name: "Next.js", icon: "cpu" }, // Using lucide icon names as strings roughly
  { name: "React", icon: "atom" },
  { name: "Tailwind", icon: "wind" },
  { name: "Supabase", icon: "database" },
  { name: "TypeScript", icon: "code" },
  { name: "Framer", icon: "layers" }
];
