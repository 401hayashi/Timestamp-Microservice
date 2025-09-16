// Simulación de API para GitHub Pages
const handleAPICall = (path) => {
  // Extraer el parámetro de fecha de la URL
  let dateString = typeof path === 'string' ? path.replace('/api/', '') : '';
  let date;
  
  // Si no se proporciona fecha, usar la actual
  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    // Es un timestamp Unix
    date = new Date(parseInt(dateString));
  } else {
    // Es una cadena de fecha
    date = new Date(dateString);
  }
  
  // Validar la fecha
  if (date.toString() === 'Invalid Date') {
    return { error: "Invalid Date" };
  } else {
    return {
      unix: date.getTime(),
      utc: date.toUTCString()
    };
  }
};

// Interceptar llamadas a /api/ para simular el backend
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('/api/')) {
      const response = handleAPICall(args[0]);
      return Promise.resolve({
        json: () => Promise.resolve(response),
        ok: true,
        status: 200,
        text: () => Promise.resolve(JSON.stringify(response))
      });
    }
    return originalFetch.apply(this, args);
  };
}

// También manejar navegación directa a URLs de API
if (typeof window !== 'undefined' && window.location.pathname.includes('/api/')) {
  const response = handleAPICall(window.location.pathname);
  document.write(JSON.stringify(response, null, 2));
  document.close();
}
