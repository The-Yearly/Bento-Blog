-- -- Sample users data
-- INSERT INTO users (name, email, password) VALUES
-- ('John Doe', 'john.doe@example.com', 'password123'),
-- ('Jane Smith', 'jane.smith@example.com', 'password123'),
-- ('Bob Johnson', 'bob.johnson@example.com', 'password123'),
-- ('Alice Brown', 'alice.brown@example.com', 'password123'),
-- ('Charlie Wilson', 'charlie.wilson@example.com', 'password123');

INSERT INTO posts (uid, title, image, time, "desc", content) VALUES
(1, 'Getting Started with Go', 'https://example.com/images/go-tutorial.jpg', '2024-01-15T10:30:00Z', 'A comprehensive guide to learning Go programming language from scratch', 'Blog'),
(2, 'Web Development Best Practices', 'https://example.com/images/web-dev.png', '2024-01-16T14:20:00Z', 'Essential practices every web developer should follow for building scalable applications', 'Blog'),
(1, 'Database Design Patterns', 'https://example.com/images/database.jpg', '2024-01-17T09:15:00Z', 'Common patterns and anti-patterns in database design with practical examples', 'Blog'),
(3, 'Introduction to Microservices', 'https://example.com/images/microservices.png', '2024-01-18T16:45:00Z', 'Understanding microservices architecture and when to use it in your projects', 'Blog'),
(2, 'React Performance Optimization', NULL, '2024-01-19T11:30:00Z', 'Tips and tricks to optimize React applications for better performance', 'Blog'),
(4, 'Docker for Beginners', 'https://example.com/images/docker-intro.jpg', '2024-01-20T13:25:00Z', 'Learn containerization with Docker from basic concepts to advanced usage', 'Blog'),
(3, 'API Design Guidelines', 'https://example.com/images/api-design.png', '2024-01-21T08:40:00Z', 'Best practices for designing RESTful APIs that are maintainable and scalable', 'Blog'),
(5, 'Testing Strategies', NULL, '2024-01-22T15:10:00Z', 'Comprehensive guide to different testing approaches including unit, integration, and e2e testing', 'Blog'),
(1, 'Cloud Architecture Patterns', 'https://example.com/images/cloud-arch.jpg', '2024-01-23T12:00:00Z', 'Common architectural patterns for cloud-native applications', 'Blog'),
(4, 'Security in Web Applications', 'https://example.com/images/web-security.png', '2024-01-24T17:30:00Z', 'Essential security practices to protect your web applications from common vulnerabilities', 'Blog'),
(2, 'Machine Learning Basics', NULL, '2024-01-25T10:45:00Z', 'Introduction to machine learning concepts and algorithms for beginners', 'Blog'),
(5, 'DevOps Pipeline Setup', 'https://example.com/images/devops.jpg', '2024-01-26T14:55:00Z', 'Setting up CI/CD pipelines for automated testing and deployment', 'Blog'),
(3, 'Frontend Frameworks Comparison', 'https://example.com/images/frameworks.png', '2024-01-27T09:20:00Z', 'Comparing popular frontend frameworks: React, Vue, and Angular', 'Blog'),
(1, 'Mobile App Development', NULL, '2024-01-28T16:15:00Z', 'Cross-platform mobile development strategies and tools', 'Blog'),
(4, 'Blockchain Fundamentals', 'https://example.com/images/blockchain.jpg', '2024-01-29T11:50:00Z', 'Understanding blockchain technology and its practical applications', 'Blog'),
(2, 'CSS Grid and Flexbox', 'https://example.com/images/css-grid.png', '2024-01-30T13:35:00Z', 'Master modern CSS layout techniques with practical examples', 'Blog'),
(5, 'Advanced JavaScript Concepts', NULL, '2024-01-31T08:25:00Z', 'Deep dive into closures, prototypes, and async programming', 'Blog'),
(3, 'Git Workflow Best Practices', 'https://example.com/images/git-tips.jpg', '2024-02-01T15:40:00Z', 'Essential git commands and workflow strategies every developer should know', 'Blog'),
(1, 'System Design Principles', NULL, '2024-02-02T12:10:00Z', 'Scalable system design patterns and principles for large applications', 'Blog'),
(4, 'VS Code Tips and Extensions', 'https://example.com/images/vscode.png', '2024-02-03T10:05:00Z', 'Must-have VS Code extensions and tips for developer productivity', 'Blog');

INSERT INTO posts (uid, title, image, time, "desc", content) VALUES
(2, NULL, 'https://example.com/images/untitled-project.jpg', '2024-02-04T18:20:00Z', 'Accidentally invented a toaster that tweets. Stay tuned. 🍞✨ #TechFails', 'Bite'),
(3, 'Draft Article', NULL, '2024-02-05T21:45:00Z', 'This post is like your fridge at 3 AM — empty but promising 🥲 #WriterProblems', 'Bite'),
(5, 'Work in Progress', NULL, '2024-02-06T07:30:00Z', 'Still cooking… might be edible soon. Bring ketchup 🍅 #DevLife #WIP', 'Bite'),
(1, NULL, NULL, '2024-02-07T14:12:00Z', 'Untitled, unfiltered, and 100% mysterious 🎭 #RandomThoughts #Mystery', 'Bite'),
(4, 'Quick CSS Tip', 'https://example.com/images/css-quick.jpg', '2024-02-08T16:33:00Z', 'One line of CSS that will blow your mind 🤯 margin: 0 auto; #WebDev', 'Bite'),
(2, 'Coffee Break Thoughts', NULL, '2024-02-09T11:22:00Z', 'Why do we call it debugging when bugs were never supposed to be there? ☕🐛 #Philosophy', 'Bite'),
(5, 'Monday Motivation', 'https://example.com/images/motivation.png', '2024-02-10T08:00:00Z', 'Your code is like fine wine... sometimes it gets better with age 🍷💻 #MondayMotivation', 'Bite'),
(3, 'Random Discovery', NULL, '2024-02-11T19:47:00Z', 'TIL: You can use emojis as variable names in JavaScript. Should you? Absolutely not. 😂 #JavaScript', 'Bite');