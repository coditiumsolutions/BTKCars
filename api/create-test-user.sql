-- Test user credentials:
-- Email: test@example.com
-- Password: password123

-- BCrypt hash for "password123"
INSERT INTO users (email, password, role)
VALUES (
    'test@example.com',
    '$2a$11$zQh0YnXqRGJxVvC0z.Nd4.rKxJGvVK6PxJ5LqW5yGhGqKIJ2HqW4K',
    'user'
)
ON CONFLICT (email) DO NOTHING;
