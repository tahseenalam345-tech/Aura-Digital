import { saveMessageToFirebase } from './firebase-config.js';

// --- Data: Portfolio Projects ---
const projects = [
    {
        id: 1,
        title: "FinTrack Mobile Banking",
        category: "app",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=FinTrack",
        client: "FinTech Corp",
        stack: "Flutter, Firebase, Node.js",
        description: "A secure and intuitive mobile banking application allowing users to track expenses and manage investments."
    },
    {
        id: 2,
        title: "Urban Eat Delivery",
        category: "web",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=Urban+Eat",
        client: "Urban Eat Ltd",
        stack: "Next.js, Tailwind CSS, Stripe",
        description: "High-conversion landing page and ordering system for a metropolitan food delivery network."
    },
    {
        id: 3,
        title: "Neon Analytics",
        category: "marketing",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=Neon+Analytics",
        client: "DataView Inc",
        stack: "Google Analytics 4, Tableau",
        description: "Comprehensive data dashboard design and marketing strategy for a SaaS analytics firm."
    },
    {
        id: 4,
        title: "TravelMate Explorer",
        category: "app",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=TravelMate",
        client: "Global Travels",
        stack: "React Native, Google Maps API",
        description: "An adventurous travel companion app that helps users find hidden gems in 50+ countries."
    },
    {
        id: 5,
        title: "EcoMarket Store",
        category: "web",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=EcoMarket",
        client: "Green Earth",
        stack: "Shopify, Liquid, Vue.js",
        description: "A sustainable e-commerce platform focused on carbon-neutral shipping and green products."
    },
    {
        id: 6,
        title: "HealthCore Portal",
        category: "web",
        image: "https://placehold.co/600x400/1a1a2e/FFF?text=HealthCore",
        client: "MediCare Plus",
        stack: "React, Python Django",
        description: "Patient management portal designed for healthcare professionals to streamline appointments."
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
        card.innerHTML = `
            <div class="project-img" style="background-image: url('${project.image}');">
                <div class="overlay">
                    <button class="btn btn-primary btn-sm view-details" data-id="${project.id}">View Details</button>
                </div>
            </div>
            <div class="project-info">
                <h4>${project.title}</h4>
                <p>${project.category.toUpperCase()}</p>
            </div>
        `;
        portfolioGrid.appendChild(card);
    });

    // Re-attach listeners to new buttons
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
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        // Render
        renderProjects(btn.dataset.filter);
    });
});

// --- 3. Modal Logic ---
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

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = 'none';
});

// --- 4. Firebase Form Submission ---
const contactForm = document.getElementById('contactForm');

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
            alert('Message Sent Successfully!');
            contactForm.reset();
            submitBtn.innerText = originalText;
        })
        .catch((error) => {
            console.error(error);
            alert('Error sending message. Check console.');
            submitBtn.innerText = originalText;
        });
});
