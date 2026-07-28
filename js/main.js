// ====================== MAIN ======================
window.onload = function() {
    configurarBanco();
    inicializarContas();
    
    // Navegação por teclado
    const inputs = document.querySelectorAll('input, select, button');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && index < inputs.length-1) { 
                e.preventDefault(); 
                inputs[index+1].focus(); 
            }
        });
    });
};