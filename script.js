document.addEventListener('DOMContentLoaded', () => {
    // Crear el contenedor de fondo
    const bg = document.createElement('div');
    bg.className = 'matrix-bg';
    document.body.prepend(bg);

    function createRain() {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        
        // Posición aleatoria en X
        column.style.left = Math.random() * 100 + 'vw';
        
        // Duración aleatoria
        column.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        // Caracteres aleatorios
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        column.innerHTML = Array.from({length: 30}, () => 
            chars[Math.floor(Math.random() * chars.length)]
        ).join('<br>');
        
        bg.appendChild(column);
        
        // Eliminar después de la animación
        column.addEventListener('animationend', () => {
            column.remove();
        });
    }

    // Crear gotas continuamente
    setInterval(createRain, 100);
});

document.getElementById('scrapingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = document.getElementById('urlInput').value;
    const resultadoDiv = document.getElementById('resultado');
    
    try {
        const response = await fetch('http://localhost:5000/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });
        
        const data = await response.json();
        
        resultadoDiv.innerHTML = `
            <h3>Resultados:</h3>
            <h4>Título:</h4>
            <p>${data.titulo}</p>
            
            <h4>Enlaces (${data.enlaces.length}):</h4>
            <ul>
                ${data.enlaces.map(enlace => 
                    `<li><a href="${enlace.href}" target="_blank">${enlace.texto || enlace.href}</a></li>`
                ).join('')}
            </ul>
            
            <h4>Imágenes (${data.imagenes.length}):</h4>
            <ul>
                ${data.imagenes.map(img => 
                    `<li>Alt: ${img.alt}<br>Src: ${img.src}</li>`
                ).join('')}
            </ul>
            
            <h4>Párrafos (${data.parrafos.length}):</h4>
            <ul>
                ${data.parrafos.map(parrafo => 
                    `<li>${parrafo}</li>`
                ).join('')}
            </ul>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = `<p style="color: red">Error: ${error.message}</p>`;
    }
}); document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        // Toggle la clase active
        button.classList.toggle('active');
        
        // Encuentra el contenido del acordeón
        const content = button.nextElementSibling;
        
        // Toggle la visibilidad del contenido
        if (button.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = 0;
        }
    });
});