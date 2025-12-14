
document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.getElementById('projects-grid');
    const username = 'emptier-lab';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`;

    async function fetchProjects() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch repositories');
            const uniqueProjects = await response.json();

            renderProjects(uniqueProjects);
        } catch (error) {
            console.error('Error loading projects:', error);
            projectsGrid.innerHTML = `
                <div class="error-state" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                    <p>couldn't load repos from github</p>
                    <a href="https://github.com/${username}?tab=repositories" class="btn-primary" style="margin-top: 20px;">
                        view on github
                    </a>
                </div>
            `;

        }
    }

    function renderProjects(projects) {
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects">no public repos found</p>';
            return;
        }

        projectsGrid.innerHTML = projects.map(project => {
            const description = project.description || 'no description yet';
            const lang = project.language;

            return `
                <a href="${project.html_url}" target="_blank" class="project-card">
                    <div class="project-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                    </div>
                    <div class="project-info">
                        <h4>${project.name}</h4>
                        <p>${description.length > 80 ? description.substring(0, 80) + '...' : description}</p>
                        <div class="project-tags">
                            ${lang ? `<span>${lang.toLowerCase()}</span>` : ''}
                            <span>${new Date(project.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="project-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </div>
                </a>
            `;
        }).join('');


    }

    fetchProjects();
});
