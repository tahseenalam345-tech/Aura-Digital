import { saveMessageToFirebase } from './firebase-config.js';

// --- Data: Portfolio Projects ---
const projects = [
    {
        id: 1,
        title: "Pharma Inventory System",
        category: "web",
        type: "real", // This is your REAL project
        url: "https://pharma-inventory-theta.vercel.app/", 
        image: "https://placehold.co/600x400/103a2e/FFF?text=Pharma+System", // You can replace this with a screenshot later
        client: "Local Pharmacy",
        stack: "React, Firebase",
        description: "A complete inventory management solution for pharmacies to track medicine stock, sales, and expiry dates."
    },
    {
        id: 2,
        title: "FinTrack Mobile Banking",
        category: "app",
        type: "dummy",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=FinTrack",
        client: "FinTech Corp",
        stack: "Flutter, Firebase, Node.js",
        description: "A secure mobile banking app for tracking expenses and investments."
    },
    {
        id: 3,
        title: "Urban Eat Delivery",
        category: "web",
        type: "dummy",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=Urban+Eat",
        client: "Urban Eat Ltd",
        stack: "Next.js, Tailwind CSS",
        description: "Food delivery platform with real-time order tracking."
    },
    {
        id: 4,
        title: "Neon Analytics",
        category: "web",
        type: "dummy",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=Neon+Analytics",
        client: "DataView Inc",
        stack: "React, D3.js",
        description: "Marketing analytics dashboard for SaaS companies."
    }
];

// --- 1. Render Portfolio ---
const portfolioGrid = document.getElementById('portfolio-grid');

function renderProjects(filter = 'all') {
    portfolioGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Logic: If real, link to website. If dummy, open modal.
        let buttonHtml = '';
        if(project.type === 'real') {
            buttonHtml = `<a href="${project.url}" target="_blank" class="btn btn-primary btn-sm">Visit Website</a>`;
        } else {
            buttonHtml = `<button class="btn btn-outline btn-sm view-details" data-id="${project.id}">View Details</button>`;
        }

        card.innerHTML = `
            <div class="project-img" style="background-image: url('${project.image}');">
                <div class="overlay">
                    ${buttonHtml}
                </div>
            </div>
            <div class="project-info">
                <h4>${project.title}</h4>
                <p>${project.category.toUpperCase()}</p>
            </div>
        `;
        portfolioGrid.appendChild(card);
    });

    // Re-attach listeners ONLY to "View Details" buttons (Dummy projects)
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => openModal(e.target.dataset.id));
    });
}

// Initial Render
renderProjects();

// --- 2. Filter Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// --- 3. Modal Logic (For Dummy Projects) ---
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modal-body-content');
const closeModal = document.querySelector('.close-modal');

function openModal(id) {
    const project = projects.find(p => p.id == id);
    if (!project) return;

    modalBody.innerHTML = `
        <img src="${project.image}" style="width:100%; border-radius:8px; margin-bottom:20px;">
        <h2>${project.title}</h2>
        <p style="color:#6C63FF; margin-bottom:10px;"><strong>Client:</strong> ${project.client}</p>
        <p style="margin-bottom:15px;">${project.description}</p>
        <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px;">
            <small><strong>Tech Stack:</strong> ${project.stack}</small>
        </div>
    `;
    modal.style.display = 'flex';
}

if(closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = 'none';
});

// --- 4. Firebase Form Submission ---
const contactForm = document.getElementById('contactForm');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        const submitBtn = contactForm.querySelector('button');

        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';

        saveMessageToFirebase({ name, email, service, message })
            .then(() => {
                alert('Message Sent Successfully! We will contact you at ' + email);
                contactForm.reset();
                submitBtn.innerText = originalText;
            })
            .catch((error) => {
                console.error(error);
                alert('Error sending message. Check console.');
                submitBtn.innerText = originalText;
            });
    });
}
