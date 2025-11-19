// ancient-tech-background.js
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const bgArtist = document.querySelector('.bg-artist') || document.body;
    
    // Replace existing background elements with canvas
    if (bgArtist) {
        bgArtist.innerHTML = '';
        bgArtist.appendChild(canvas);
        
        // Add CSS for positioning
        bgArtist.style.position = 'fixed';
        bgArtist.style.top = '0';
        bgArtist.style.left = '0';
        bgArtist.style.width = '100%';
        bgArtist.style.height = '100%';
        bgArtist.style.zIndex = '-1';
        bgArtist.style.overflow = 'hidden';
        
        canvas.style.display = 'block';
    }
    
    // Set canvas to full size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Ancient Symbols & Runes
    const ancientSymbols = [
        'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', // Elder Futhark
        '☉', '☽', '♂', '♀', '♃', '♄', '♅', // Alchemical
        '𓂀', '𓆣', '𓋹', '𓁩', '𓊹', // Egyptian
        '⚡', '🜁', '🜂', '🜃', '🜄', // Alchemical elements
        'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ' // More runes
    ];
    
    // Code brackets and symbols
    const codeBrackets = ['{', '}', '[',  '(', ')', '<', '>', '/', '\\'];
    
    // Configuration
    const config = {
        colorThemes: [
            {
                name: "Ancient Stone",
                symbols: ['#8B7355', '#A0522D', '#CD853F', '#D2691E', '#F4A460'],
                background: 'rgba(20, 12, 8, 0.95)',
                connection: 'rgba(139, 115, 85, 0.4)',
                splatter: 'rgba(160, 82, 45, 0.3)'
            },
            {
                name: "Mystic Crystal",
                symbols: ['#9370DB', '#BA55D3', '#9932CC', '#8A2BE2', '#4B0082'],
                background: 'rgba(15, 8, 30, 0.95)',
                connection: 'rgba(147, 112, 219, 0.4)',
                splatter: 'rgba(186, 85, 211, 0.3)'
            },
            {
                name: "Digital Relic",
                symbols: ['#00CED1', '#20B2AA', '#48D1CC', '#40E0D0', '#00FFFF'],
                background: 'rgba(8, 20, 30, 0.95)',
                connection: 'rgba(0, 206, 209, 0.4)',
                splatter: 'rgba(32, 178, 170, 0.3)'
            },
            {
                name: "Blood Ink",
                symbols: ['#8B0000', '#B22222', '#DC143C', '#FF0000', '#FF6347'],
                background: 'rgba(30, 8, 8, 0.95)',
                connection: 'rgba(139, 0, 0, 0.4)',
                splatter: 'rgba(220, 20, 60, 0.4)'
            }
        ],
        currentTheme: 0,
        speed: 1,
        elementCount: 120,
        connectionDistance: 200
    };
    
    // Element system - mixed types
    const elements = [];
    
    class AncientElement {
        constructor() {
            this.type = Math.floor(Math.random() * 4); // 0:Symbol, 1:Crystal, 2:Bracket, 3:Splatter
            this.reset();
            this.size = Math.random() * 8 + 4;
            this.baseSize = this.size;
            
            // Movement properties
            this.angle = Math.random() * Math.PI * 2;
            this.velocity = Math.random() * 0.8 + 0.3;
            this.oscillation = Math.random() * 0.1;
            this.oscillationSpeed = Math.random() * 0.03 + 0.01;
            this.oscillationOffset = Math.random() * Math.PI * 2;
            
            // Color from current theme
            const colors = config.colorThemes[config.currentTheme].symbols;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.7 + 0.3;
            
            // Type-specific properties
            if (this.type === 0) { // Symbol
                this.symbol = ancientSymbols[Math.floor(Math.random() * ancientSymbols.length)];
            } else if (this.type === 2) { // Bracket
                this.bracket = codeBrackets[Math.floor(Math.random() * codeBrackets.length)];
            } else if (this.type === 1) { // Crystal
                this.sides = Math.floor(Math.random() * 4) + 4; // 4-7 sides
                this.rotation = Math.random() * Math.PI * 2;
            }
            
            // For generative patterns
            this.patternOffset = Math.random() * Math.PI * 2;
            this.growthPhase = Math.random() * Math.PI * 2;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        
        update(mouseX, mouseY) {
            // Generative movement based on type
            const time = Date.now() * 0.001;
            
            if (this.type === 0 || this.type === 2) { // Symbols and Brackets - floating movement
                this.angle += this.velocity * 0.01 * config.speed;
                this.x += Math.cos(this.angle) * 0.5 * config.speed;
                this.y += Math.sin(this.angle) * 0.5 * config.speed;
                
                // Add gentle oscillation
                this.x += Math.cos(time * this.oscillationSpeed + this.oscillationOffset) * 2;
                this.y += Math.sin(time * this.oscillationSpeed + this.oscillationOffset) * 2;
            } 
            else if (this.type === 1) { // Crystals - geometric patterns
                const gridSize = 80;
                const gridX = Math.floor(this.x / gridSize) * gridSize;
                const gridY = Math.floor(this.y / gridSize) * gridSize;
                
                this.x = gridX + Math.sin(time * 0.002 + gridX * 0.01) * 15;
                this.y = gridY + Math.cos(time * 0.002 + gridY * 0.01) * 15;
                
                // Rotate crystals slowly
                this.rotation += 0.01 * config.speed;
            }
            else { // Splatters - organic flow
                const noiseX = Math.sin(this.x * 0.005 + time) * 0.8;
                const noiseY = Math.cos(this.y * 0.005 + time) * 0.8;
                
                this.x += noiseX * config.speed;
                this.y += noiseY * config.speed;
                
                // Pulsing size for splatters
                this.size = this.baseSize + Math.sin(time * 2 + this.growthPhase) * 2;
            }
            
            // Wrap around edges
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.y > canvas.height + 50) this.y = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            
            // Mouse interaction
            if (mouseX && mouseY) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const mouseRadius = 120;
                
                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    
                    this.x += Math.cos(angle) * force * 6 * config.speed;
                    this.y += Math.sin(angle) * force * 6 * config.speed;
                    
                    // Size increase on hover
                    this.size = this.baseSize + force * 4;
                } else {
                    this.size = this.baseSize;
                }
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            
            // Draw with glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            
            if (this.type === 0) { // Ancient Symbol
                ctx.font = `${this.size * 3}px "Segoe UI Symbol", "Apple Symbols", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.symbol, this.x, this.y);
            }
            else if (this.type === 1) { // Crystal
                ctx.lineWidth = 1.5;
                this.drawCrystal(this.x, this.y, this.size, this.sides, this.rotation);
            }
            else if (this.type === 2) { // Code Bracket
                ctx.font = `bold ${this.size * 2}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.bracket, this.x, this.y);
            }
            else { // Splatter
                this.drawSplatter(this.x, this.y, this.size);
            }
            
            ctx.restore();
        }
        
        drawCrystal(x, y, size, sides, rotation) {
            ctx.beginPath();
            for (let i = 0; i < sides; i++) {
                const angle = rotation + (i / sides) * Math.PI * 2;
                const px = x + Math.cos(angle) * size;
                const py = y + Math.sin(angle) * size;
                
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            
            // Add inner crystal lines
            ctx.beginPath();
            ctx.moveTo(x, y);
            for (let i = 0; i < sides; i++) {
                const angle = rotation + (i / sides) * Math.PI * 2;
                const px = x + Math.cos(angle) * size * 0.7;
                const py = y + Math.sin(angle) * size * 0.7;
                ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
        }
        
        drawSplatter(x, y, size) {
            ctx.beginPath();
            const points = 12;
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const radius = size * (0.7 + Math.random() * 0.6);
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            
            // Add smaller secondary splatters
            ctx.globalAlpha = this.alpha * 0.5;
            for (let i = 0; i < 3; i++) {
                const offsetX = (Math.random() - 0.5) * size * 1.5;
                const offsetY = (Math.random() - 0.5) * size * 1.5;
                const smallSize = size * (0.3 + Math.random() * 0.4);
                
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, smallSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Initialize elements
    function initElements() {
        elements.length = 0;
        for (let i = 0; i < config.elementCount; i++) {
            elements.push(new AncientElement());
        }
    }
    
    function resetElements() {
        elements.forEach(element => element.reset());
    }
    
    initElements();
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Draw generative connections
    function drawGenerativeConnections() {
        for (let a = 0; a < elements.length; a++) {
            for (let b = a + 1; b < elements.length; b++) {
                const dx = elements[a].x - elements[b].x;
                const dy = elements[a].y - elements[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.save();
                    ctx.globalAlpha = opacity * 0.25;
                    ctx.strokeStyle = config.colorThemes[config.currentTheme].connection;
                    
                    // Different line styles based on element types
                    if (elements[a].type === elements[b].type) {
                        ctx.lineWidth = 1.5;
                        ctx.setLineDash([]);
                    } else {
                        ctx.lineWidth = 0.8;
                        ctx.setLineDash([3, 3]);
                    }
                    
                    ctx.beginPath();
                    ctx.moveTo(elements[a].x, elements[a].y);
                    ctx.lineTo(elements[b].x, elements[b].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        ctx.setLineDash([]);
    }
    
    // Draw ancient patterns in background
    function drawAncientPatterns() {
        const time = Date.now() * 0.001;
        ctx.save();
        ctx.globalAlpha = 0.03;
        ctx.strokeStyle = config.colorThemes[config.currentTheme].symbols[0];
        ctx.lineWidth = 1;
        
        // Sacred geometry patterns
        for (let i = 0; i < 5; i++) {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const size = 100 + i * 80 + Math.sin(time * 0.5 + i) * 30;
            
            ctx.beginPath();
            // Draw concentric circles with patterns
            for (let j = 0; j < 3; j++) {
                const radius = size + j * 40;
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                
                // Add symbolic marks around circle
                for (let k = 0; k < 8; k++) {
                    const angle = (k / 8) * Math.PI * 2 + time * 0.1;
                    const markX = centerX + Math.cos(angle) * radius;
                    const markY = centerY + Math.sin(angle) * radius;
                    
                    ctx.moveTo(markX, markY);
                    ctx.arc(markX, markY, 3, 0, Math.PI * 2);
                }
            }
            ctx.stroke();
        }
        ctx.restore();
        
        // Draw splatter background effects
        ctx.save();
        ctx.globalAlpha = 0.02;
        ctx.fillStyle = config.colorThemes[config.currentTheme].splatter;
        
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(time * 0.2 + i) * 0.5 + 0.5) * canvas.width;
            const y = (Math.cos(time * 0.25 + i) * 0.5 + 0.5) * canvas.height;
            const size = 50 + Math.sin(time + i) * 20;
            
            // Large background splatters
            ctx.beginPath();
            for (let j = 0; j < 24; j++) {
                const angle = (j / 24) * Math.PI * 2;
                const radius = size * (0.5 + Math.random() * 0.7);
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                
                if (j === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
    
    // Draw generative code patterns
    function drawCodePatterns() {
        const time = Date.now() * 0.001;
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px monospace';
        
        for (let i = 0; i < 25; i++) {
            const x = (Math.sin(time * 0.15 + i * 0.5) * 0.5 + 0.5) * canvas.width;
            const y = (Math.cos(time * 0.2 + i * 0.5) * 0.5 + 0.5) * canvas.height;
            
            const codePatterns = [
                `function ${ancientSymbols[Math.floor(Math.random() * 5)]}() {`,
                `const ${ancientSymbols[Math.floor(Math.random() * 5)]} = new Ancient();`,
                `glyph.rotate(${Math.floor(Math.random() * 360)});`,
                `runes.forEach(r => r.illuminate());`,
                `crystal.grow(${Math.floor(Math.random() * 100)});`,
                `ink.splatter(${Math.floor(Math.random() * 10)});`,
                `symbols.connect();`,
                `ancientTech.merge(modern);`,
                `pattern.generate(${Math.floor(Math.random() * 1000)});`
            ];
            
            const pattern = codePatterns[Math.floor(Math.random() * codePatterns.length)];
            ctx.fillText(pattern, x, y);
        }
        ctx.restore();
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with theme background
        ctx.fillStyle = config.colorThemes[config.currentTheme].background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw background patterns
        drawAncientPatterns();
        drawCodePatterns();
        
        // Update and draw elements
        elements.forEach(element => {
            element.update(mouseX, mouseY);
            element.draw();
        });
        
        // Draw generative connections
        drawGenerativeConnections();
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Public API for controlling the background
    window.ancientTechBackground = {
        setTheme: function(themeIndex) {
            if (themeIndex >= 0 && themeIndex < config.colorThemes.length) {
                config.currentTheme = themeIndex;
                initElements();
            }
        },
        setSpeed: function(speed) {
            config.speed = speed;
        },
        addMoreElements: function(count) {
            for (let i = 0; i < count; i++) {
                elements.push(new AncientElement());
            }
        },
        getConfig: function() {
            return { ...config };
        }
    };
});