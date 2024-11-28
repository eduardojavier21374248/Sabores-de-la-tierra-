document.addEventListener('DOMContentLoaded', function() {
    // Animación para los elementos de la lista de aspectos destacados
    const highlights = document.querySelectorAll('#highlights li');
    highlights.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Cambio de color del botón CTA al pasar el mouse
    const ctaButton = document.querySelector('.btn');
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#4a7d2a';
        });
        ctaButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#5a8d3b';
        });
    }

    // Galería de imágenes con lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.zIndex = '1000';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';

            const img = document.createElement('img');
            img.src = this.src;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';

            lightbox.appendChild(img);
            document.body.appendChild(lightbox);

            lightbox.addEventListener('click', e => {
                if (e.target !== e.currentTarget) return;
                document.body.removeChild(lightbox);
            });
        });
    });

    // Testimonios dinámicos
    const testimonials = [
        { name: "María García", text: "El programa de capacitación me ayudó a mejorar mis técnicas de cultivo orgánico." },
        { name: "Juan Pérez", text: "Aprendí mucho sobre comercio justo y cómo aplicarlo en nuestro negocio." },
        { name: "Ana Rodríguez", text: "Las habilidades de resiliencia agrícola que adquirí son invaluables." }
    ];

    const testimonialContainer = document.getElementById('testimonials');
    if (testimonialContainer) {
        let currentTestimonial = 0;
        function showTestimonial() {
            const testimonial = testimonials[currentTestimonial];
            testimonialContainer.innerHTML = `
                <div class="testimonial">
                    <p>"${testimonial.text}"</p>
                    <strong>- ${testimonial.name}</strong>
                </div>
            `;
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
        showTestimonial();
        setInterval(showTestimonial, 5000);
    }

    // Calendario interactivo
    const calendar = document.getElementById('calendar');
    if (calendar) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        function generateCalendar(month, year) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            let html = `<h3>${firstDay.toLocaleString('default', { month: 'long' })} ${year}</h3>`;
            html += '<table><tr><th>Dom</th><th>Lun</th><th>Mar</th><th>Mié</th><th>Jue</th><th>Vie</th><th>Sáb</th></tr><tr>';

            for (let i = 0; i < firstDay.getDay(); i++) {
                html += '<td></td>';
            }

            for (let day = 1; day <= lastDay.getDate(); day++) {
                if ((day + firstDay.getDay() - 1) % 7 === 0) {
                    html += '</tr><tr>';
                }
                html += `<td>${day}</td>`;
            }

            html += '</tr></table>';
            calendar.innerHTML = html;
        }

        generateCalendar(currentMonth, currentYear);
    }
});

