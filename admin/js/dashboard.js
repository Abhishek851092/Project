// Check authentication
function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}

// Load content based on hash
function loadContent(hash = '') {
    const contentArea = document.getElementById('content-area');
    checkAuth();
    
    // Update active nav link
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
    
    switch(hash) {
        case '#projects':
            loadProjects(contentArea);
            break;
        case '#media':
            loadMediaLibrary(contentArea);
            break;
        case '#about':
            loadAbout(contentArea);
            break;
        case '#skills':
            loadSkills(contentArea);
            break;
        case '#messages':
            loadMessages(contentArea);
            break;
        case '#settings':
            loadSettings(contentArea);
            break;
        case '#contact':
            loadContact(contentArea);
            break;
        case '#social':
            loadSocialMedia(contentArea);
            break;
        case '#images':
            loadImageLibrary(contentArea);
            break;
        default:
            loadDashboardStats(contentArea);
    }
}

// Load dashboard statistics
function loadDashboardStats(container) {
    // Get portfolio data from localStorage
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
    const messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
    
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h2 mb-0">Dashboard</h1>
            <a href="../index.html" class="btn btn-outline-primary" target="_blank">
                <i class="bi bi-eye me-2"></i>View Portfolio
            </a>
        </div>
        
        <div class="row g-4">
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2 text-muted">Projects</h6>
                                <h2 class="card-title mb-0">${projects.length}</h2>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-folder"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2 text-muted">Skills</h6>
                                <h2 class="card-title mb-0">${skills.length}</h2>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-stars"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2 text-muted">Messages</h6>
                                <h2 class="card-title mb-0">${messages.length}</h2>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-envelope"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="card-subtitle mb-2 text-muted">Views</h6>
                                <h2 class="card-title mb-0">${localStorage.getItem('portfolioViews') || 0}</h2>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Recent Projects</h5>
                        <div class="list-group list-group-flush">
                            ${projects.slice(0, 5).map(project => `
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="mb-0">${project.title}</h6>
                                        <small class="text-muted">${project.technologies.join(', ')}</small>
                                    </div>
                                    <a href="#projects" class="btn btn-sm btn-outline-primary">Edit</a>
                                </div>
                            `).join('') || '<p class="text-muted">No projects yet</p>'}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Recent Messages</h5>
                        <div class="list-group list-group-flush">
                            ${messages.slice(0, 5).map(message => `
                                <div class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-0">${message.name}</h6>
                                        <small class="text-muted">${new Date(message.date).toLocaleDateString()}</small>
                                    </div>
                                    <p class="mb-0 text-truncate">${message.message}</p>
                                </div>
                            `).join('') || '<p class="text-muted">No messages yet</p>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Project Management Functions
function loadProjects(container) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h2 mb-0">Projects</h1>
            <button class="btn btn-primary" onclick="showAddProjectModal()">
                <i class="bi bi-plus-lg me-2"></i>Add New Project
            </button>
        </div>
        
        <!-- Project Modal -->
        <div class="modal fade" id="projectModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title" id="modalTitle">Add New Project</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="projectForm" onsubmit="handleProjectSubmit(event)">
                            <input type="hidden" id="projectId">
                            <div class="mb-3">
                                <label class="form-label">Project Title</label>
                                <input type="text" class="form-control" id="projectTitle" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" id="projectDescription" rows="3" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Technologies (comma-separated)</label>
                                <input type="text" class="form-control" id="projectTechnologies">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Project Image</label>
                                <input type="file" class="form-control" id="projectImage" accept="image/*">
                                <div id="imagePreview" class="mt-2"></div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Project Video URL (optional)</label>
                                <input type="url" class="form-control" id="projectVideo">
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Live Demo URL</label>
                                    <input type="url" class="form-control" id="projectLiveUrl">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">GitHub URL</label>
                                    <input type="url" class="form-control" id="projectGithubUrl">
                                </div>
                            </div>
                            <div class="form-check mb-3">
                                <input type="checkbox" class="form-check-input" id="projectFeatured">
                                <label class="form-check-label">Featured Project</label>
                            </div>
                            <button type="submit" class="btn btn-primary">Save Project</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            ${projects.map(project => `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <img src="${project.image}" class="card-img-top" alt="${project.title}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title mb-0">${project.title}</h5>
                                ${project.featured ? '<span class="badge bg-primary">Featured</span>' : ''}
                            </div>
                            <p class="card-text">${project.description}</p>
                            <div class="d-flex gap-2 flex-wrap mb-3">
                                ${project.technologies.map(tech => `
                                    <span class="badge bg-secondary">${tech}</span>
                                `).join('')}
                            </div>
                            <div class="d-flex gap-2 mb-3">
                                ${project.liveUrl ? `
                                    <a href="${project.liveUrl}" class="btn btn-sm btn-outline-primary" target="_blank">
                                        <i class="bi bi-link-45deg"></i> Live Demo
                                    </a>
                                ` : ''}
                                ${project.githubUrl ? `
                                    <a href="${project.githubUrl}" class="btn btn-sm btn-outline-secondary" target="_blank">
                                        <i class="bi bi-github"></i> GitHub
                                    </a>
                                ` : ''}
                            </div>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-outline-primary btn-sm" onclick="editProject(${project.id})">
                                    <i class="bi bi-pencil me-1"></i>Edit
                                </button>
                                <button class="btn btn-outline-danger btn-sm" onclick="deleteProject(${project.id})">
                                    <i class="bi bi-trash me-1"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Show Add Project Modal
function showAddProjectModal() {
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('modalTitle').textContent = 'Add New Project';
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// Edit Project
function editProject(id) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    const project = projects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectTechnologies').value = project.technologies.join(', ');
    document.getElementById('projectVideo').value = project.videoUrl || '';
    document.getElementById('projectLiveUrl').value = project.liveUrl || '';
    document.getElementById('projectGithubUrl').value = project.githubUrl || '';
    document.getElementById('projectFeatured').checked = project.featured;

    if (project.image) {
        document.getElementById('imagePreview').innerHTML = `
            <img src="${project.image}" alt="Preview" style="max-width: 200px; max-height: 200px;">
        `;
    }

    document.getElementById('modalTitle').textContent = 'Edit Project';
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// Handle Project Form Submit
async function handleProjectSubmit(event) {
    event.preventDefault();
    
    const projectId = document.getElementById('projectId').value;
    const imageFile = document.getElementById('projectImage').files[0];
    
    let imageUrl = '';
    if (imageFile) {
        imageUrl = await readFileAsDataURL(imageFile);
    } else if (projectId) {
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        const existingProject = projects.find(p => p.id === parseInt(projectId));
        if (existingProject) {
            imageUrl = existingProject.image;
        }
    }

    const projectData = {
        id: projectId ? parseInt(projectId) : Date.now(),
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        technologies: document.getElementById('projectTechnologies').value.split(',').map(t => t.trim()).filter(t => t),
        image: imageUrl,
        videoUrl: document.getElementById('projectVideo').value,
        liveUrl: document.getElementById('projectLiveUrl').value,
        githubUrl: document.getElementById('projectGithubUrl').value,
        featured: document.getElementById('projectFeatured').checked
    };

    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    
    if (projectId) {
        const index = projects.findIndex(p => p.id === parseInt(projectId));
        if (index !== -1) {
            projects[index] = projectData;
        }
    } else {
        projects.push(projectData);
    }

    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    bootstrap.Modal.getInstance(document.getElementById('projectModal')).hide();
    loadProjects(document.getElementById('content-area'));
}

// Delete Project
function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    const updatedProjects = projects.filter(p => p.id !== id);
    localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    loadProjects(document.getElementById('content-area'));
}

// Utility function to read file as Data URL
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// About Section Management
function loadAbout(container) {
    const aboutData = JSON.parse(localStorage.getItem('portfolioAbout')) || {
        title: '',
        description: '',
        skills: [],
        image: '',
        resumeUrl: ''
    };

    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title mb-4">About Me</h2>
                <form id="aboutForm" onsubmit="handleAboutSubmit(event)">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" id="aboutTitle" value="${aboutData.title}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" id="aboutDescription" rows="5" required>${aboutData.description}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Skills (comma-separated)</label>
                        <input type="text" class="form-control" id="aboutSkills" value="${aboutData.skills.join(', ')}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Profile Image</label>
                        <input type="file" class="form-control" id="aboutImage" accept="image/*">
                        ${aboutData.image ? `
                            <div class="mt-2">
                                <img src="${aboutData.image}" alt="Profile" style="max-width: 200px; max-height: 200px;">
                            </div>
                        ` : ''}
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Resume URL</label>
                        <input type="url" class="form-control" id="aboutResumeUrl" value="${aboutData.resumeUrl}">
                    </div>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    `;
}

async function handleAboutSubmit(event) {
    event.preventDefault();
    
    const imageFile = document.getElementById('aboutImage').files[0];
    const currentData = JSON.parse(localStorage.getItem('portfolioAbout')) || {};
    
    let imageUrl = currentData.image;
    if (imageFile) {
        imageUrl = await readFileAsDataURL(imageFile);
    }

    const aboutData = {
        title: document.getElementById('aboutTitle').value,
        description: document.getElementById('aboutDescription').value,
        skills: document.getElementById('aboutSkills').value.split(',').map(s => s.trim()).filter(s => s),
        image: imageUrl,
        resumeUrl: document.getElementById('aboutResumeUrl').value
    };

    localStorage.setItem('portfolioAbout', JSON.stringify(aboutData));
    showToast('About section updated successfully!');
}

// Contact Section Management
function loadContact(container) {
    const contactData = JSON.parse(localStorage.getItem('portfolioContact')) || {
        email: '',
        phone: '',
        address: '',
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: ''
        }
    };

    container.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="card-title mb-4">Contact Information</h2>
                        <form id="contactForm" onsubmit="handleContactSubmit(event)">
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="contactEmail" value="${contactData.email}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" id="contactPhone" value="${contactData.phone}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Address</label>
                                <textarea class="form-control" id="contactAddress" rows="3">${contactData.address}</textarea>
                            </div>
                            <h5 class="mt-4 mb-3">Social Links</h5>
                            <div class="mb-3">
                                <label class="form-label">GitHub</label>
                                <input type="url" class="form-control" id="socialGithub" value="${contactData.socialLinks.github}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">LinkedIn</label>
                                <input type="url" class="form-control" id="socialLinkedin" value="${contactData.socialLinks.linkedin}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Twitter</label>
                                <input type="url" class="form-control" id="socialTwitter" value="${contactData.socialLinks.twitter}">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Instagram</label>
                                <input type="url" class="form-control" id="socialInstagram" value="${contactData.socialLinks.instagram}">
                            </div>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-body">
                        <h2 class="card-title mb-4">Messages</h2>
                        <div id="messagesList">
                            ${loadMessages()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleContactSubmit(event) {
    event.preventDefault();

    const contactData = {
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        address: document.getElementById('contactAddress').value,
        socialLinks: {
            github: document.getElementById('socialGithub').value,
            linkedin: document.getElementById('socialLinkedin').value,
            twitter: document.getElementById('socialTwitter').value,
            instagram: document.getElementById('socialInstagram').value
        }
    };

    localStorage.setItem('portfolioContact', JSON.stringify(contactData));
    showToast('Contact information updated successfully!');
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    if (messages.length === 0) {
        return '<p class="text-muted">No messages received yet</p>';
    }

    return messages.map(msg => `
        <div class="card mb-3 bg-dark">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${msg.name}</h6>
                    <small class="text-muted">${new Date(msg.date).toLocaleDateString()}</small>
                </div>
                <p class="mb-1"><a href="mailto:${msg.email}" class="text-primary">${msg.email}</a></p>
                <p class="card-text">${msg.message}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${msg.id})">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const updatedMessages = messages.filter(m => m.id !== id);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    document.getElementById('messagesList').innerHTML = loadMessages();
    showToast('Message deleted successfully!');
}

// Messages Management
function loadMessages(container) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="card-title mb-0">Contact Messages</h2>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary" onclick="markAllAsRead()">
                            <i class="bi bi-check-all me-2"></i>Mark All as Read
                        </button>
                        <button class="btn btn-outline-danger" onclick="deleteAllMessages()">
                            <i class="bi bi-trash me-2"></i>Delete All
                        </button>
                    </div>
                </div>

                <!-- Message Reply Modal -->
                <div class="modal fade" id="replyModal" tabindex="-1">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title">Reply to Message</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <div class="original-message mb-4 p-3 bg-dark border border-secondary rounded">
                                    <div class="d-flex justify-content-between mb-2">
                                        <h6 class="mb-0" id="senderName"></h6>
                                        <small class="text-muted" id="messageDate"></small>
                                    </div>
                                    <p class="mb-2" id="originalMessage"></p>
                                    <div class="text-muted" id="senderEmail"></div>
                                </div>
                                <form id="replyForm" onsubmit="handleReplySubmit(event)">
                                    <input type="hidden" id="messageId">
                                    <div class="mb-3">
                                        <label class="form-label">Your Reply</label>
                                        <textarea class="form-control" id="replyContent" rows="5" required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email Template</label>
                                        <select class="form-select" id="emailTemplate" onchange="loadEmailTemplate()">
                                            <option value="">Select Template</option>
                                            <option value="thank_you">Thank You</option>
                                            <option value="project_inquiry">Project Inquiry Response</option>
                                            <option value="custom">Custom Response</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Send Reply</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="messages-container">
                    ${messages.length ? messages.map(msg => `
                        <div class="card mb-3 ${msg.read ? 'bg-dark' : 'bg-dark border-primary'}">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <div>
                                        <h5 class="card-title mb-1 d-flex align-items-center">
                                            ${msg.name}
                                            ${!msg.read ? '<span class="badge bg-primary ms-2">New</span>' : ''}
                                        </h5>
                                        <div class="text-muted small">
                                            <i class="bi bi-envelope me-2"></i>${msg.email}
                                        </div>
                                    </div>
                                    <div class="text-end">
                                        <div class="text-muted small mb-2">
                                            ${new Date(msg.date).toLocaleString()}
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-outline-primary" onclick="showReplyModal(${msg.id})">
                                                <i class="bi bi-reply"></i>
                                            </button>
                                            <button class="btn btn-sm ${msg.read ? 'btn-outline-secondary' : 'btn-outline-primary'}"
                                                onclick="toggleMessageRead(${msg.id})">
                                                <i class="bi bi-${msg.read ? 'envelope' : 'envelope-open'}"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${msg.id})">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p class="card-text mb-3">${msg.message}</p>
                                ${msg.replies ? msg.replies.map(reply => `
                                    <div class="reply-message ms-4 mt-3 p-3 bg-dark border border-secondary rounded">
                                        <div class="d-flex justify-content-between mb-2">
                                            <small class="text-primary">Your Reply</small>
                                            <small class="text-muted">${new Date(reply.date).toLocaleString()}</small>
                                        </div>
                                        <p class="mb-0">${reply.content}</p>
                                    </div>
                                `).join('') : ''}
                            </div>
                        </div>
                    `).join('') : `
                        <div class="text-center text-muted py-5">
                            <i class="bi bi-inbox display-1"></i>
                            <p class="mt-3">No messages received yet</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;

    updateMessageCount();
}

function showReplyModal(messageId) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    document.getElementById('messageId').value = message.id;
    document.getElementById('senderName').textContent = message.name;
    document.getElementById('senderEmail').textContent = message.email;
    document.getElementById('messageDate').textContent = new Date(message.date).toLocaleString();
    document.getElementById('originalMessage').textContent = message.message;

    const modal = new bootstrap.Modal(document.getElementById('replyModal'));
    modal.show();
}

function handleReplySubmit(event) {
    event.preventDefault();

    const messageId = parseInt(document.getElementById('messageId').value);
    const replyContent = document.getElementById('replyContent').value;

    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const messageIndex = messages.findIndex(m => m.id === messageId);

    if (messageIndex === -1) return;

    const reply = {
        content: replyContent,
        date: new Date().toISOString()
    };

    if (!messages[messageIndex].replies) {
        messages[messageIndex].replies = [];
    }
    messages[messageIndex].replies.push(reply);
    messages[messageIndex].read = true;

    localStorage.setItem('contactMessages', JSON.stringify(messages));
    bootstrap.Modal.getInstance(document.getElementById('replyModal')).hide();
    loadMessages(document.getElementById('content-area'));
    showToast('Reply sent successfully!');

    // Simulate sending email
    simulateEmailSend(messages[messageIndex], reply);
}

function toggleMessageRead(messageId) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    message.read = !message.read;
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages(document.getElementById('content-area'));
    updateMessageCount();
}

function markAllAsRead() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.forEach(msg => msg.read = true);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages(document.getElementById('content-area'));
    updateMessageCount();
    showToast('All messages marked as read');
}

function deleteAllMessages() {
    if (!confirm('Are you sure you want to delete all messages? This cannot be undone.')) return;

    localStorage.setItem('contactMessages', JSON.stringify([]));
    loadMessages(document.getElementById('content-area'));
    updateMessageCount();
    showToast('All messages deleted');
}

function updateMessageCount() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const unreadCount = messages.filter(m => !m.read).length;
    
    // Update sidebar badge
    const messageBadge = document.querySelector('#messagesCount');
    if (messageBadge) {
        messageBadge.textContent = unreadCount || '';
        messageBadge.style.display = unreadCount ? 'inline' : 'none';
    }
}

function loadEmailTemplate() {
    const template = document.getElementById('emailTemplate').value;
    const replyContent = document.getElementById('replyContent');
    const senderName = document.getElementById('senderName').textContent;

    const templates = {
        thank_you: `Dear ${senderName},\n\nThank you for your message. I appreciate you taking the time to reach out.\n\nBest regards,\n[Your Name]`,
        project_inquiry: `Dear ${senderName},\n\nThank you for your project inquiry. I'm interested in learning more about your requirements.\n\nCould you please provide more details about:\n- Project timeline\n- Budget range\n- Specific features needed\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]`,
        custom: ''
    };

    replyContent.value = templates[template] || '';
}

function simulateEmailSend(message, reply) {
    console.log('Simulating email send to:', message.email);
    console.log('Reply content:', reply.content);
    // In a real implementation, this would integrate with an email service
}

// Social Media Management
function loadSocialMedia(container) {
    const socialData = JSON.parse(localStorage.getItem('portfolioSocial')) || {
        links: []
    };

    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="card-title mb-0">Social Media Links</h2>
                    <button class="btn btn-primary" onclick="showAddSocialModal()">
                        <i class="bi bi-plus-lg me-2"></i>Add New Link
                    </button>
                </div>

                <!-- Social Media Modal -->
                <div class="modal fade" id="socialModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title" id="socialModalTitle">Add Social Media Link</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="socialForm" onsubmit="handleSocialSubmit(event)">
                                    <input type="hidden" id="socialId">
                                    <div class="mb-3">
                                        <label class="form-label">Platform</label>
                                        <select class="form-select" id="socialPlatform" required>
                                            <option value="">Select Platform</option>
                                            <option value="github">GitHub</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="twitter">Twitter</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="youtube">YouTube</option>
                                            <option value="dribbble">Dribbble</option>
                                            <option value="behance">Behance</option>
                                            <option value="medium">Medium</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>
                                    <div class="mb-3" id="customPlatformField" style="display: none;">
                                        <label class="form-label">Custom Platform Name</label>
                                        <input type="text" class="form-control" id="customPlatform">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">URL</label>
                                        <input type="url" class="form-control" id="socialUrl" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Display Name (optional)</label>
                                        <input type="text" class="form-control" id="socialDisplayName">
                                    </div>
                                    <div class="form-check mb-3">
                                        <input type="checkbox" class="form-check-input" id="socialActive" checked>
                                        <label class="form-check-label">Active</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Save Link</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-dark table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Platform</th>
                                <th>Display Name</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${socialData.links.length ? socialData.links.map(link => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-${getPlatformIcon(link.platform)} fs-5 me-2"></i>
                                            ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                                        </div>
                                    </td>
                                    <td>${link.displayName || '-'}</td>
                                    <td>
                                        <a href="${link.url}" target="_blank" class="text-truncate d-inline-block" style="max-width: 200px;">
                                            ${link.url}
                                        </a>
                                    </td>
                                    <td>
                                        <span class="badge bg-${link.active ? 'success' : 'secondary'}">
                                            ${link.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-outline-primary" onclick="editSocialLink(${link.id})">
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger" onclick="deleteSocialLink(${link.id})">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="5" class="text-center text-muted">
                                        No social media links added yet
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Handle platform selection change
    const platformSelect = document.getElementById('socialPlatform');
    if (platformSelect) {
        platformSelect.addEventListener('change', function() {
            const customField = document.getElementById('customPlatformField');
            customField.style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
}

function showAddSocialModal() {
    document.getElementById('socialForm').reset();
    document.getElementById('socialId').value = '';
    document.getElementById('socialModalTitle').textContent = 'Add Social Media Link';
    document.getElementById('customPlatformField').style.display = 'none';
    const modal = new bootstrap.Modal(document.getElementById('socialModal'));
    modal.show();
}

function editSocialLink(id) {
    const socialData = JSON.parse(localStorage.getItem('portfolioSocial')) || { links: [] };
    const link = socialData.links.find(l => l.id === id);
    if (!link) return;

    document.getElementById('socialId').value = link.id;
    document.getElementById('socialPlatform').value = link.platform;
    document.getElementById('socialUrl').value = link.url;
    document.getElementById('socialDisplayName').value = link.displayName || '';
    document.getElementById('socialActive').checked = link.active;

    if (link.platform === 'custom') {
        document.getElementById('customPlatformField').style.display = 'block';
        document.getElementById('customPlatform').value = link.customPlatform || '';
    }

    document.getElementById('socialModalTitle').textContent = 'Edit Social Media Link';
    const modal = new bootstrap.Modal(document.getElementById('socialModal'));
    modal.show();
}

function handleSocialSubmit(event) {
    event.preventDefault();

    const socialId = document.getElementById('socialId').value;
    const platform = document.getElementById('socialPlatform').value;
    const customPlatform = platform === 'custom' ? document.getElementById('customPlatform').value : '';

    const linkData = {
        id: socialId ? parseInt(socialId) : Date.now(),
        platform: platform,
        customPlatform: customPlatform,
        url: document.getElementById('socialUrl').value,
        displayName: document.getElementById('socialDisplayName').value,
        active: document.getElementById('socialActive').checked
    };

    const socialData = JSON.parse(localStorage.getItem('portfolioSocial')) || { links: [] };

    if (socialId) {
        const index = socialData.links.findIndex(l => l.id === parseInt(socialId));
        if (index !== -1) {
            socialData.links[index] = linkData;
        }
    } else {
        socialData.links.push(linkData);
    }

    localStorage.setItem('portfolioSocial', JSON.stringify(socialData));
    bootstrap.Modal.getInstance(document.getElementById('socialModal')).hide();
    loadSocialMedia(document.getElementById('content-area'));
    showToast('Social media link saved successfully!');
}

function deleteSocialLink(id) {
    if (!confirm('Are you sure you want to delete this social media link?')) return;

    const socialData = JSON.parse(localStorage.getItem('portfolioSocial')) || { links: [] };
    socialData.links = socialData.links.filter(l => l.id !== id);
    localStorage.setItem('portfolioSocial', JSON.stringify(socialData));
    loadSocialMedia(document.getElementById('content-area'));
    showToast('Social media link deleted successfully!');
}

function getPlatformIcon(platform) {
    const icons = {
        github: 'github',
        linkedin: 'linkedin',
        twitter: 'twitter',
        instagram: 'instagram',
        facebook: 'facebook',
        youtube: 'youtube',
        dribbble: 'dribbble',
        behance: 'behance',
        medium: 'medium',
        custom: 'link-45deg'
    };
    return icons[platform] || 'link-45deg';
}

// Image Management
function loadImageLibrary(container) {
    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || {
        hero: '',
        about: '',
        projects: []
    };

    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title mb-4">Image Library</h2>

                <!-- Hero Section Image -->
                <div class="mb-5">
                    <h3 class="h5 mb-3">Hero Section Image</h3>
                    <div class="image-upload-container">
                        <div class="current-image ${portfolioImages.hero ? '' : 'no-image'}" 
                             id="heroImagePreview" 
                             style="background-image: url('${portfolioImages.hero || ''}')">
                            ${!portfolioImages.hero ? '<i class="bi bi-image"></i>' : ''}
                        </div>
                        <div class="image-details">
                            <div class="mb-3">
                                <label class="form-label">Upload New Image</label>
                                <input type="file" class="form-control" 
                                       accept="image/*" 
                                       onchange="handleImageUpload(event, 'hero')" />
                            </div>
                            ${portfolioImages.hero ? `
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">Current Image Size: <span id="heroImageSize"></span></small>
                                    <button class="btn btn-sm btn-outline-danger" onclick="removeImage('hero')">
                                        <i class="bi bi-trash me-2"></i>Remove
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- About Section Image -->
                <div class="mb-5">
                    <h3 class="h5 mb-3">About Section Image</h3>
                    <div class="image-upload-container">
                        <div class="current-image ${portfolioImages.about ? '' : 'no-image'}" 
                             id="aboutImagePreview"
                             style="background-image: url('${portfolioImages.about || ''}')">
                            ${!portfolioImages.about ? '<i class="bi bi-image"></i>' : ''}
                        </div>
                        <div class="image-details">
                            <div class="mb-3">
                                <label class="form-label">Upload New Image</label>
                                <input type="file" class="form-control" 
                                       accept="image/*" 
                                       onchange="handleImageUpload(event, 'about')" />
                            </div>
                            ${portfolioImages.about ? `
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">Current Image Size: <span id="aboutImageSize"></span></small>
                                    <button class="btn btn-sm btn-outline-danger" onclick="removeImage('about')">
                                        <i class="bi bi-trash me-2"></i>Remove
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Project Images -->
                <div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="h5 mb-0">Project Images</h3>
                        <button class="btn btn-primary btn-sm" onclick="showAddProjectImageModal()">
                            <i class="bi bi-plus-lg me-2"></i>Add Project Image
                        </button>
                    </div>
                    <div class="row g-4" id="projectImagesGrid">
                        ${portfolioImages.projects.map((img, index) => `
                            <div class="col-md-4">
                                <div class="card bg-dark">
                                    <div class="project-image-preview" style="background-image: url('${img.url}')"></div>
                                    <div class="card-body">
                                        <h5 class="card-title text-truncate">${img.title}</h5>
                                        <p class="card-text small text-muted mb-3">Size: <span class="project-image-size" data-index="${index}"></span></p>
                                        <div class="btn-group w-100">
                                            <button class="btn btn-sm btn-outline-primary" onclick="editProjectImage(${index})">
                                                <i class="bi bi-pencil"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger" onclick="removeProjectImage(${index})">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${!portfolioImages.projects.length ? `
                        <div class="text-center text-muted py-5">
                            <i class="bi bi-images display-1"></i>
                            <p class="mt-3">No project images added yet</p>
                        </div>
                    ` : ''}
                </div>

                <!-- Project Image Modal -->
                <div class="modal fade" id="projectImageModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title" id="projectImageModalTitle">Add Project Image</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="projectImageForm" onsubmit="handleProjectImageSubmit(event)">
                                    <input type="hidden" id="projectImageIndex">
                                    <div class="mb-3">
                                        <label class="form-label">Image Title</label>
                                        <input type="text" class="form-control" id="projectImageTitle" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Project Image</label>
                                        <input type="file" class="form-control" id="projectImageFile" accept="image/*">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description (optional)</label>
                                        <textarea class="form-control" id="projectImageDescription" rows="3"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Save Image</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Update image sizes
    updateImageSizes();
}

function handleImageUpload(event, section) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || {
            hero: '',
            about: '',
            projects: []
        };

        portfolioImages[section] = e.target.result;
        localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));

        // Update preview
        const preview = document.getElementById(`${section}ImagePreview`);
        preview.style.backgroundImage = `url('${e.target.result}')`;
        preview.innerHTML = '';
        preview.classList.remove('no-image');

        updateImageSizes();
        showToast('Image uploaded successfully!');
    };

    reader.readAsDataURL(file);
}

function removeImage(section) {
    if (!confirm('Are you sure you want to remove this image?')) return;

    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || {
        hero: '',
        about: '',
        projects: []
    };

    portfolioImages[section] = '';
    localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));

    // Update preview
    const preview = document.getElementById(`${section}ImagePreview`);
    preview.style.backgroundImage = '';
    preview.innerHTML = '<i class="bi bi-image"></i>';
    preview.classList.add('no-image');

    // Update size display
    const sizeElement = document.getElementById(`${section}ImageSize`);
    if (sizeElement) sizeElement.textContent = '';

    showToast('Image removed successfully!');
}

function showAddProjectImageModal() {
    document.getElementById('projectImageForm').reset();
    document.getElementById('projectImageIndex').value = '';
    document.getElementById('projectImageModalTitle').textContent = 'Add Project Image';
    const modal = new bootstrap.Modal(document.getElementById('projectImageModal'));
    modal.show();
}

function editProjectImage(index) {
    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || { projects: [] };
    const image = portfolioImages.projects[index];
    if (!image) return;

    document.getElementById('projectImageIndex').value = index;
    document.getElementById('projectImageTitle').value = image.title;
    document.getElementById('projectImageDescription').value = image.description || '';
    document.getElementById('projectImageModalTitle').textContent = 'Edit Project Image';

    const modal = new bootstrap.Modal(document.getElementById('projectImageModal'));
    modal.show();
}

function handleProjectImageSubmit(event) {
    event.preventDefault();

    const index = document.getElementById('projectImageIndex').value;
    const title = document.getElementById('projectImageTitle').value;
    const description = document.getElementById('projectImageDescription').value;
    const file = document.getElementById('projectImageFile').files[0];

    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || { projects: [] };

    function saveProjectImage(imageUrl) {
        const imageData = {
            title: title,
            description: description,
            url: imageUrl,
            date: new Date().toISOString()
        };

        if (index === '') {
            portfolioImages.projects.push(imageData);
        } else {
            const existingImage = portfolioImages.projects[index];
            imageData.url = file ? imageUrl : existingImage.url;
            portfolioImages.projects[index] = imageData;
        }

        localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));
        bootstrap.Modal.getInstance(document.getElementById('projectImageModal')).hide();
        loadImageLibrary(document.getElementById('content-area'));
        showToast('Project image saved successfully!');
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveProjectImage(e.target.result);
        };
        reader.readAsDataURL(file);
    } else if (index !== '') {
        saveProjectImage(portfolioImages.projects[index].url);
    } else {
        showToast('Please select an image file', 'error');
        return;
    }
}

function removeProjectImage(index) {
    if (!confirm('Are you sure you want to remove this project image?')) return;

    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || { projects: [] };
    portfolioImages.projects.splice(index, 1);
    localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));
    loadImageLibrary(document.getElementById('content-area'));
    showToast('Project image removed successfully!');
}

function updateImageSizes() {
    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || {
        hero: '',
        about: '',
        projects: []
    };

    // Update hero image size
    if (portfolioImages.hero) {
        const heroSize = getBase64Size(portfolioImages.hero);
        document.getElementById('heroImageSize').textContent = formatFileSize(heroSize);
    }

    // Update about image size
    if (portfolioImages.about) {
        const aboutSize = getBase64Size(portfolioImages.about);
        document.getElementById('aboutImageSize').textContent = formatFileSize(aboutSize);
    }

    // Update project image sizes
    portfolioImages.projects.forEach((img, index) => {
        const sizeElement = document.querySelector(`.project-image-size[data-index="${index}"]`);
        if (sizeElement) {
            const size = getBase64Size(img.url);
            sizeElement.textContent = formatFileSize(size);
        }
    });
}

function getBase64Size(base64String) {
    const padding = base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0;
    return (base64String.length * 0.75) - padding;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Utility function to show toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast position-fixed bottom-0 end-0 m-3 bg-${type === 'error' ? 'danger' : 'success'}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${type === 'error' ? 'Error' : 'Success'}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// Media Upload and Management
function loadMediaLibrary(container) {
    const portfolioMedia = JSON.parse(localStorage.getItem('portfolioMedia')) || {
        images: [],
        documents: []
    };

    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="card-title mb-0">Media Library</h2>
                    <div class="btn-group">
                        <button class="btn btn-primary" onclick="showUploadModal()">
                            <i class="bi bi-cloud-upload me-2"></i>Upload Files
                        </button>
                        <button class="btn btn-outline-danger" onclick="clearMediaLibrary()">
                            <i class="bi bi-trash me-2"></i>Clear All
                        </button>
                    </div>
                </div>

                <!-- Upload Modal -->
                <div class="modal fade" id="uploadModal" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title">Upload Files</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <form id="uploadForm" onsubmit="handleFileUpload(event)">
                                    <div class="mb-3">
                                        <label class="form-label">Select Files</label>
                                        <input type="file" class="form-control" id="fileInput" multiple accept="image/*,.pdf,.doc,.docx">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">File Category</label>
                                        <select class="form-select" id="fileCategory" required>
                                            <option value="hero">Hero Section</option>
                                            <option value="about">About Section</option>
                                            <option value="projects">Projects</option>
                                            <option value="gallery">Gallery</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Title/Description (optional)</label>
                                        <input type="text" class="form-control" id="fileDescription" placeholder="Enter a description for the files">
                                    </div>
                                    <div class="upload-preview mb-3" id="uploadPreview"></div>
                                    <button type="submit" class="btn btn-primary">Upload Files</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Media Categories -->
                <ul class="nav nav-tabs mb-4" role="tablist">
                    <li class="nav-item">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#imagesTab">
                            Images (${portfolioMedia.images.length})
                        </button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#documentsTab">
                            Documents (${portfolioMedia.documents.length})
                        </button>
                    </li>
                </ul>

                <!-- Media Content -->
                <div class="tab-content">
                    <!-- Images Tab -->
                    <div class="tab-pane fade show active" id="imagesTab">
                        <div class="row g-4">
                            ${portfolioMedia.images.map((img, index) => `
                                <div class="col-md-4 col-lg-3">
                                    <div class="card bg-dark h-100">
                                        <div class="media-preview" style="background-image: url('${img.url}')"></div>
                                        <div class="card-body">
                                            <h6 class="card-title text-truncate">${img.title || 'Untitled'}</h6>
                                            <p class="card-text small text-muted mb-2">
                                                Category: ${img.category}<br>
                                                Size: ${formatFileSize(img.size)}<br>
                                                Added: ${new Date(img.date).toLocaleDateString()}
                                            </p>
                                            <div class="btn-group w-100">
                                                <button class="btn btn-sm btn-outline-primary" onclick="copyMediaUrl('${img.url}')">
                                                    <i class="bi bi-link-45deg"></i>
                                                </button>
                                                <button class="btn btn-sm btn-outline-secondary" onclick="downloadMedia('${img.url}', '${img.title}')">
                                                    <i class="bi bi-download"></i>
                                                </button>
                                                <button class="btn btn-sm btn-outline-danger" onclick="deleteMedia('images', ${index})">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            ${portfolioMedia.images.length === 0 ? `
                                <div class="col-12 text-center text-muted py-5">
                                    <i class="bi bi-images display-1"></i>
                                    <p class="mt-3">No images uploaded yet</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Documents Tab -->
                    <div class="tab-pane fade" id="documentsTab">
                        <div class="list-group">
                            ${portfolioMedia.documents.map((doc, index) => `
                                <div class="list-group-item bg-dark border-secondary">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 class="mb-1">${doc.title || 'Untitled'}</h6>
                                            <small class="text-muted">
                                                Category: ${doc.category} | 
                                                Size: ${formatFileSize(doc.size)} | 
                                                Added: ${new Date(doc.date).toLocaleDateString()}
                                            </small>
                                        </div>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-outline-primary" onclick="copyMediaUrl('${doc.url}')">
                                                <i class="bi bi-link-45deg"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-secondary" onclick="downloadMedia('${doc.url}', '${doc.title}')">
                                                <i class="bi bi-download"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger" onclick="deleteMedia('documents', ${index})">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                            ${portfolioMedia.documents.length === 0 ? `
                                <div class="text-center text-muted py-5">
                                    <i class="bi bi-file-earmark display-1"></i>
                                    <p class="mt-3">No documents uploaded yet</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize file input handler
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', previewFiles);
    }
}

function showUploadModal() {
    document.getElementById('uploadForm').reset();
    document.getElementById('uploadPreview').innerHTML = '';
    const modal = new bootstrap.Modal(document.getElementById('uploadModal'));
    modal.show();
}

function previewFiles(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('uploadPreview');
    previewContainer.innerHTML = '';

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewContainer.innerHTML += `
                    <div class="preview-item mb-2">
                        <img src="${e.target.result}" class="preview-image">
                        <span class="preview-name">${file.name}</span>
                        <span class="preview-size">${formatFileSize(file.size)}</span>
                    </div>
                `;
            };
            reader.readAsDataURL(file);
        } else {
            previewContainer.innerHTML += `
                <div class="preview-item mb-2">
                    <i class="bi bi-file-earmark"></i>
                    <span class="preview-name">${file.name}</span>
                    <span class="preview-size">${formatFileSize(file.size)}</span>
                </div>
            `;
        }
    });
}

function handleFileUpload(event) {
    event.preventDefault();

    const files = document.getElementById('fileInput').files;
    const category = document.getElementById('fileCategory').value;
    const description = document.getElementById('fileDescription').value;

    if (files.length === 0) {
        showToast('Please select files to upload', 'error');
        return;
    }

    const portfolioMedia = JSON.parse(localStorage.getItem('portfolioMedia')) || {
        images: [],
        documents: []
    };

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const mediaItem = {
                id: Date.now(),
                title: file.name,
                description: description,
                category: category,
                url: e.target.result,
                size: file.size,
                type: file.type,
                date: new Date().toISOString()
            };

            if (file.type.startsWith('image/')) {
                portfolioMedia.images.push(mediaItem);
            } else {
                portfolioMedia.documents.push(mediaItem);
            }

            localStorage.setItem('portfolioMedia', JSON.stringify(portfolioMedia));
        };
        reader.readAsDataURL(file);
    });

    bootstrap.Modal.getInstance(document.getElementById('uploadModal')).hide();
    loadMediaLibrary(document.getElementById('content-area'));
    showToast('Files uploaded successfully!');
}

function copyMediaUrl(url) {
    navigator.clipboard.writeText(url)
        .then(() => showToast('URL copied to clipboard!'))
        .catch(() => showToast('Failed to copy URL', 'error'));
}

function downloadMedia(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function deleteMedia(type, index) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const portfolioMedia = JSON.parse(localStorage.getItem('portfolioMedia')) || {
        images: [],
        documents: []
    };

    portfolioMedia[type].splice(index, 1);
    localStorage.setItem('portfolioMedia', JSON.stringify(portfolioMedia));
    loadMediaLibrary(document.getElementById('content-area'));
    showToast('Item deleted successfully!');
}

function clearMediaLibrary() {
    if (!confirm('Are you sure you want to clear the entire media library? This cannot be undone.')) return;

    localStorage.setItem('portfolioMedia', JSON.stringify({
        images: [],
        documents: []
    }));
    loadMediaLibrary(document.getElementById('content-area'));
    showToast('Media library cleared successfully!');
}

// Event Listeners
window.addEventListener('hashchange', () => loadContent(window.location.hash));
window.addEventListener('load', () => loadContent(window.location.hash));

document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    
    // Navigation event listeners
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#sidebar .nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const section = link.getAttribute('href').substring(1);
            switch(section) {
                case 'dashboard':
                    loadDashboardStats(contentArea);
                    break;
                case 'projects':
                    loadProjects(contentArea);
                    break;
                case 'about':
                    loadAbout(contentArea);
                    break;
                case 'contact':
                    loadContact(contentArea);
                    break;
                case 'social':
                    loadSocialMedia(contentArea);
                    break;
                case 'messages':
                    loadMessages(contentArea);
                    break;
                case 'images':
                    loadImageLibrary(contentArea);
                    break;
                case 'media':
                    loadMediaLibrary(contentArea);
                    break;
            }
        });
    });

    // Load dashboard by default
    loadDashboardStats(contentArea);
});
