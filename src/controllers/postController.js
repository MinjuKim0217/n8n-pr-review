// 임시 데이터베이스 - 게시글 데이터
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post content', authorId: 1, createdAt: new Date().toISOString(), views: 125, likes: 5, tags: ['javascript', 'tutorial'] },
    { id: 2, title: 'Second Post', content: 'This is the second post content', authorId: 2, createdAt: new Date().toISOString(), views: 89, likes: 12, tags: ['nodejs', 'backend'] },
    { id: 3, title: 'New Features in ES2024', content: 'Exploring the latest JavaScript features', authorId: 1, createdAt: new Date().toISOString(), views: 256, likes: 8, tags: ['javascript', 'es2024', 'features'] }
];

const getAllPosts = (req, res) => {
    try {
        res.json({
            success: true,
            data: posts,
            count: posts.length
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const newPost = {
            id: posts.length + 1,
            title,
            content,
            authorId: authorId || 1,
            createdAt: new Date().toISOString()
        };

        posts.push(newPost);
        res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const post = posts.find(p => p.id === id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // 조회수 증가
        post.views = (post.views || 0) + 1;
        console.log(`Post viewed: "${post.title}" - Views: ${post.views}`);

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const postIndex = posts.findIndex(p => p.id === id);

        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        posts[postIndex] = { ...posts[postIndex], ...req.body };
        res.json({
            success: true,
            data: posts[postIndex]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const postIndex = posts.findIndex(p => p.id === id);

        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const deletedPost = posts[postIndex];
        posts.splice(postIndex, 1);
        console.log(`Post deleted: "${deletedPost.title}" (ID: ${id})`);
        
        res.json({
            success: true,
            message: 'Post deleted successfully',
            deletedPost: {
                id: deletedPost.id,
                title: deletedPost.title
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 새로운 함수: 게시글 좋아요
const likePost = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const post = posts.find(p => p.id === id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.likes = (post.likes || 0) + 1;
        console.log(`Post liked: "${post.title}" - Likes: ${post.likes}`);

        res.json({
            success: true,
            message: 'Post liked successfully',
            data: {
                id: post.id,
                title: post.title,
                likes: post.likes
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 새로운 함수: 인기 게시글 조회 (좋아요 순)
const getPopularPosts = (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const popularPosts = posts
            .sort((a, b) => (b.likes || 0) - (a.likes || 0))
            .slice(0, limit);

        res.json({
            success: true,
            data: popularPosts,
            count: popularPosts.length,
            message: `Top ${limit} popular posts`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    getPopularPosts
};
