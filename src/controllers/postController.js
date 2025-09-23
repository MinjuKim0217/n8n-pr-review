// 임시 데이터베이스
let posts = [
    { id: 1, title: 'First Post', content: 'This is the first post content', authorId: 1, createdAt: new Date().toISOString() },
    { id: 2, title: 'Second Post', content: 'This is the second post content', authorId: 2, createdAt: new Date().toISOString() }
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

        posts.splice(postIndex, 1);
        res.json({
            success: true,
            message: 'Post deleted successfully'
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
    deletePost
};
