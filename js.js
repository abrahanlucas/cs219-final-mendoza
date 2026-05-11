document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('blogGrid')) {
        const posts = [
            { title: "E-Commerce Website Project", category: "webdev", excerpt: "7+ page responsive site using HTML5, CSS3 Flexbox/Grid, and JavaScript. Academic project 2023." },
            { title: "Adobe Photoshop Certification", category: "cert", excerpt: "Earned 2023 through web design classes at Career Technology Center (CTC)." },
            { title: "Building My First PC", category: "hardware", excerpt: "From parts to POST: PC assembly, troubleshooting, and lessons learned." },
            { title: "Merchandising Leadership at Gabe's", category: "work", excerpt: "How I managed store sections and increased sales through data analysis." },
            { title: "Dunkin' Donuts: Customer Service Skills", category: "work", excerpt: "High-volume environment, inventory management, and team training." }
        ];
        
        let currentPage = 1;
        const postsPerPage = 3;
        let currentCategory = "all";
        let currentSearch = "";
        
        function renderBlog() {
            let filtered = posts;
            if (currentCategory !== "all") {
                filtered = filtered.filter(p => p.category === currentCategory);
            }
            if (currentSearch) {
                filtered = filtered.filter(p => p.title.toLowerCase().includes(currentSearch));
            }
            const totalPages = Math.ceil(filtered.length / postsPerPage);
            const start = (currentPage - 1) * postsPerPage;
            const pagePosts = filtered.slice(start, start + postsPerPage);
            
            const grid = document.getElementById('blogGrid');
            if (pagePosts.length === 0) {
                grid.innerHTML = '<p>No posts found.</p>';
            } else {
                grid.innerHTML = pagePosts.map(post => `
                    <div class="card">
                        <h3>${post.title}</h3>
                        <p>${post.excerpt}</p>
                        <a href="blog-post.html">Read more →</a>
                    </div>
                `).join('');
            }
            
            document.getElementById('pageInfo').innerText = `Page ${currentPage} of ${totalPages || 1}`;
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        }
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.toLowerCase();
                currentPage = 1;
                renderBlog();
            });
        }
        
        document.querySelectorAll('.pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCategory = pill.dataset.category;
                currentPage = 1;
                renderBlog();
            });
        });
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) { currentPage--; renderBlog(); }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentPage++; renderBlog();
            });
        }
        
        renderBlog();
    }
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            document.getElementById('nameError').innerText = '';
            document.getElementById('emailError').innerText = '';
            document.getElementById('msgError').innerText = '';
            
            if (!name.value.trim()) {
                document.getElementById('nameError').innerText = 'Name is required';
                isValid = false;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                document.getElementById('emailError').innerText = 'Valid email is required';
                isValid = false;
            }
            if (!message.value.trim()) {
                document.getElementById('msgError').innerText = 'Message cannot be empty';
                isValid = false;
            }
            
            if (isValid) {
                document.getElementById('formSuccess').innerText = '✅ Message sent successfully! (demo)';
                form.reset();
                setTimeout(() => document.getElementById('formSuccess').innerText = '', 3000);
            }
        });
    }
    
    const pdfBtn = document.getElementById('downloadPDF');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('📄 Abrahan_Mendoza_Resume.pdf would be downloaded.');
        });
    }
});