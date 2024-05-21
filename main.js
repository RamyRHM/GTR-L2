document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'; 
    document.getElementById('welcomeMessage').innerText = `Welcome ${username} to the website`;

    const settingsButton = document.getElementById('settingsButton');
    settingsButton.addEventListener('click', () => {
        window.location.href = 'settings.html';
    });

    const commentsContainer = document.getElementById('commentsContainer');
    const commentForm = document.getElementById('commentForm');
    const newComment = document.getElementById('newComment');

    
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach((comment, index) => {
        const commentWrapper = document.createElement('div'); 
        commentWrapper.className = 'comment-wrapper';

        const commentElement = document.createElement('div');
        commentElement.className = 'comment-container';

        const commentContent = document.createElement('div');
        commentContent.className = 'comment-content';
        commentContent.innerHTML = `<strong>User:</strong> ${comment.author}<br>${comment.text}`; 

        
        const commentButtons = document.createElement('div');
        commentButtons.className = 'comment-buttons';

        
        const showRepliesBtn = document.createElement('button');
        showRepliesBtn.className = 'show-replies-btn';
        showRepliesBtn.innerText = 'Show Replies';
        showRepliesBtn.addEventListener('click', () => {
            const repliesContainer = commentElement.querySelector('.replies-container');
            if (repliesContainer.classList.contains('hidden')) {
                repliesContainer.classList.remove('hidden');
            } else {
                repliesContainer.classList.add('hidden');
            }
        });
        commentButtons.appendChild(showRepliesBtn);

        
        const replyButton = document.createElement('button');
        replyButton.className = 'reply-button';
        replyButton.innerText = 'Reply';
        replyButton.addEventListener('click', () => {
            const replyForm = document.getElementById(`replyForm-${index}`);
            if (replyForm.classList.contains('hidden')) {
                replyForm.classList.remove('hidden');
            } else {
                replyForm.classList.add('hidden');
            }
        });
        commentButtons.appendChild(replyButton);

        
        const likeButton = document.createElement('button');
        likeButton.className = 'like-button';
        likeButton.innerHTML = `<i class='bx ${comment.likedBy && comment.likedBy.includes(username) ? 'bxs-like' : 'bx-like'}'></i> Like (${comment.likes || 0})`;
        likeButton.addEventListener('click', () => {
            if (!comment.likedBy) comment.likedBy = [];
            if (!comment.dislikedBy) comment.dislikedBy = [];

            if (!comment.likedBy.includes(username)) {
                if (comment.dislikedBy.includes(username)) {
                    comment.dislikedBy = comment.dislikedBy.filter(user => user !== username);
                    comment.dislikes -= 1;
                }
                comment.likedBy.push(username);
                comment.likes = (comment.likes || 0) + 1;
                localStorage.setItem('comments', JSON.stringify(comments));
                likeButton.innerHTML = `<i class='bx bxs-like'></i> Like (${comment.likes})`;
                dislikeButton.innerHTML = `<i class='bx bx-dislike'></i> Dislike (${comment.dislikes || 0})`;
            }
        });
        commentButtons.appendChild(likeButton);

        
        const dislikeButton = document.createElement('button');
        dislikeButton.className = 'dislike-button';
        dislikeButton.innerHTML = `<i class='bx ${comment.dislikedBy && comment.dislikedBy.includes(username) ? 'bxs-dislike' : 'bx-dislike'}'></i> Dislike (${comment.dislikes || 0})`;
        dislikeButton.addEventListener('click', () => {
            if (!comment.likedBy) comment.likedBy = [];
            if (!comment.dislikedBy) comment.dislikedBy = [];

            if (!comment.dislikedBy.includes(username)) {
                if (comment.likedBy.includes(username)) {
                    comment.likedBy = comment.likedBy.filter(user => user !== username);
                    comment.likes -= 1;
                }
                comment.dislikedBy.push(username);
                comment.dislikes = (comment.dislikes || 0) + 1;
                localStorage.setItem('comments', JSON.stringify(comments));
                dislikeButton.innerHTML = `<i class='bx bxs-dislike'></i> Dislike (${comment.dislikes})`;
                likeButton.innerHTML = `<i class='bx bx-like'></i> Like (${comment.likes || 0})`;
            }
        });
        commentButtons.appendChild(dislikeButton);

        
        if (isAdmin) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-comment-button';
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                comments.splice(index, 1); 
                localStorage.setItem('comments', JSON.stringify(comments)); 
                commentWrapper.remove(); 
            });
            commentButtons.appendChild(deleteBtn);
        }

        
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'replies-container hidden';
        repliesContainer.innerHTML = '<ul></ul>'; 
        
        commentElement.appendChild(commentContent);
        commentElement.appendChild(commentButtons);
        commentElement.appendChild(repliesContainer);

        
        commentWrapper.appendChild(commentElement);

        
        comment.replies = comment.replies || [];

        
        if (comment.replies.length > 0) {
            comment.replies.forEach((reply, replyIndex) => {
                const replyElement = document.createElement('li');
                replyElement.innerHTML = `<strong>User:</strong> ${reply.author}<br>${reply.text}`;

                
                const replyLikeButton = document.createElement('button');
                replyLikeButton.className = 'reply-like-button';
                replyLikeButton.innerHTML = `<i class='bx ${reply.likedBy && reply.likedBy.includes(username) ? 'bxs-like' : 'bx-like'}'></i> Like (${reply.likes || 0})`;
                replyLikeButton.addEventListener('click', () => {
                    if (!reply.likedBy) reply.likedBy = [];
                    if (!reply.dislikedBy) reply.dislikedBy = [];

                    if (!reply.likedBy.includes(username)) {
                        if (reply.dislikedBy.includes(username)) {
                            reply.dislikedBy = reply.dislikedBy.filter(user => user !== username);
                            reply.dislikes -= 1;
                        }
                        reply.likedBy.push(username);
                        reply.likes = (reply.likes || 0) + 1;
                        localStorage.setItem('comments', JSON.stringify(comments));
                        replyLikeButton.innerHTML = `<i class='bx bxs-like'></i> Like (${reply.likes})`;
                        replyDislikeButton.innerHTML = `<i class='bx bx-dislike'></i> Dislike (${reply.dislikes || 0})`;
                    }
                });
                replyElement.appendChild(replyLikeButton);

                
                const replyDislikeButton = document.createElement('button');
                replyDislikeButton.className = 'reply-dislike-button';
                replyDislikeButton.innerHTML = `<i class='bx ${reply.dislikedBy && reply.dislikedBy.includes(username) ? 'bxs-dislike' : 'bx-dislike'}'></i> Dislike (${reply.dislikes || 0})`;
                replyDislikeButton.addEventListener('click', () => {
                    if (!reply.likedBy) reply.likedBy = [];
                    if (!reply.dislikedBy) reply.dislikedBy = [];

                    if (!reply.dislikedBy.includes(username)) {
                        if (reply.likedBy.includes(username)) {
                            reply.likedBy = reply.likedBy.filter(user => user !== username);
                            reply.likes -= 1;
                        }
                        reply.dislikedBy.push(username);
                        reply.dislikes = (reply.dislikes || 0) + 1;
                        localStorage.setItem('comments', JSON.stringify(comments));
                        replyDislikeButton.innerHTML = `<i class='bx bxs-dislike'></i> Dislike (${reply.dislikes})`;
                        replyLikeButton.innerHTML = `<i class='bx bx-like'></i> Like (${reply.likes || 0})`;
                    }
                });
                replyElement.appendChild(replyDislikeButton);

                
                if (isAdmin) {
                    const replyDeleteBtn = document.createElement('button');
                    replyDeleteBtn.className = 'delete-reply-button';
                    replyDeleteBtn.innerText = 'Delete';
                    replyDeleteBtn.addEventListener('click', () => {
                        comment.replies.splice(replyIndex, 1); 
                        localStorage.setItem('comments', JSON.stringify(comments)); 
                        replyElement.remove(); 
                    });
                    replyElement.appendChild(replyDeleteBtn);
                }

                repliesContainer.querySelector('ul').appendChild(replyElement);
            });
        }

        
        const replyForm = document.createElement('form');
        replyForm.id = `replyForm-${index}`;
        replyForm.className = 'reply-form hidden';
        replyForm.innerHTML = `
            <textarea id="replyComment-${index}" placeholder="Type your reply..."></textarea>
            <button type="submit">Post Reply</button>
        `;
        replyForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const replyText = document.getElementById(`replyComment-${index}`).value.trim();
            if (replyText) {
                comment.replies.push({ author: username, text: replyText, likes: 0, dislikes: 0, likedBy: [], dislikedBy: [] });
                localStorage.setItem('comments', JSON.stringify(comments));
                document.getElementById(`replyComment-${index}`).value = '';
                location.reload(); 
            }
        });
        commentWrapper.appendChild(replyForm); 

        commentsContainer.appendChild(commentWrapper); 
    });

    
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const commentText = newComment.value.trim();
        if (commentText) {
            comments.push({ author: username, text: commentText, likes: 0, dislikes: 0, likedBy: [], dislikedBy: [] });
            localStorage.setItem('comments', JSON.stringify(comments));
            newComment.value = '';
            location.reload(); 
        }
    });
});
