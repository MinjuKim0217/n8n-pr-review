// API 기본 URL
const API_BASE = '/api';

// 사용자 목록 불러오기
async function loadUsers() {
    const container = document.getElementById('users-container');
    container.innerHTML = '<div class="loading">사용자 목록을 불러오는 중...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/users`);
        const result = await response.json();
        
        if (result.success) {
            displayUsers(result.data);
        } else {
            throw new Error('Failed to load users');
        }
    } catch (error) {
        container.innerHTML = `<div class="error">사용자 목록을 불러오는데 실패했습니다: ${error.message}</div>`;
    }
}

// 사용자 목록 표시
function displayUsers(users) {
    const container = document.getElementById('users-container');
    
    if (users.length === 0) {
        container.innerHTML = '<p>등록된 사용자가 없습니다.</p>';
        return;
    }
    
    const usersHTML = users.map(user => `
        <div class="user-card">
            <h3>${user.name}</h3>
            <p><strong>이메일:</strong> ${user.email}</p>
            <p><strong>나이:</strong> ${user.age}세</p>
            <p><strong>ID:</strong> ${user.id}</p>
        </div>
    `).join('');
    
    container.innerHTML = usersHTML;
}

// 게시글 목록 불러오기
async function loadPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '<div class="loading">게시글 목록을 불러오는 중...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/posts`);
        const result = await response.json();
        
        if (result.success) {
            displayPosts(result.data);
        } else {
            throw new Error('Failed to load posts');
        }
    } catch (error) {
        container.innerHTML = `<div class="error">게시글 목록을 불러오는데 실패했습니다: ${error.message}</div>`;
    }
}

// 게시글 목록 표시
function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    
    if (posts.length === 0) {
        container.innerHTML = '<p>등록된 게시글이 없습니다.</p>';
        return;
    }
    
    const postsHTML = posts.map(post => `
        <div class="post-card">
            <h3>${post.title}</h3>
            <p><strong>내용:</strong> ${post.content}</p>
            <p><strong>작성자 ID:</strong> ${post.authorId}</p>
            <p><strong>작성일:</strong> ${new Date(post.createdAt).toLocaleString()}</p>
        </div>
    `).join('');
    
    container.innerHTML = postsHTML;
}

// 사용자 추가 폼 표시
function showAddUserForm() {
    const name = prompt('사용자 이름을 입력하세요:');
    const email = prompt('이메일을 입력하세요:');
    const age = prompt('나이를 입력하세요:');
    
    if (name && email) {
        addUser({ name, email, age: parseInt(age) || 0 });
    }
}

// 사용자 추가
async function addUser(userData) {
    try {
        const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('사용자가 성공적으로 추가되었습니다!');
            loadUsers(); // 목록 새로고침
        } else {
            throw new Error(result.error || 'Failed to add user');
        }
    } catch (error) {
        alert(`사용자 추가에 실패했습니다: ${error.message}`);
    }
}

// 게시글 추가 폼 표시
function showAddPostForm() {
    const title = prompt('게시글 제목을 입력하세요:');
    const content = prompt('게시글 내용을 입력하세요:');
    const authorId = prompt('작성자 ID를 입력하세요:');
    
    if (title && content) {
        addPost({ title, content, authorId: parseInt(authorId) || 1 });
    }
}

// 게시글 추가
async function addPost(postData) {
    try {
        const response = await fetch(`${API_BASE}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('게시글이 성공적으로 추가되었습니다!');
            loadPosts(); // 목록 새로고침
        } else {
            throw new Error(result.error || 'Failed to add post');
        }
    } catch (error) {
        alert(`게시글 추가에 실패했습니다: ${error.message}`);
    }
}

// 페이지 로드 시 초기 데이터 불러오기
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    loadPosts();
});
