import { useState, useEffect } from "react";

const MainApp = () => {
  const [microfrontends, setMicrofrontends] = useState([]);

  useEffect(() => {
    const fetchMicrofrontendsConfig = async () => {
      try {
        // Recupera la configuración de microfrontends desde un servicio remoto o archivo JSON
        const response = await fetch("/microfrontends-config");
        const microfrontendsConfig = await response.json();

        // Carga dinámica de microfrontends
        const promises = microfrontendsConfig.map(async (config) => {
          try {
            // Utiliza la importación dinámica para cargar el módulo del microfrontend
            const { default: MicrofrontendContent } = await import(config.url);
            return { name: config.name, content: <MicrofrontendContent /> };
          } catch (error) {
            console.error(`Error fetching ${config.name}:`, error);
            return { name: config.name, content: null };
          }
        });

        // Espera a que todas las promesas se resuelvan y actualiza el estado
        const microfrontendsData = await Promise.all(promises);
        setMicrofrontends(microfrontendsData);
      } catch (error) {
        console.error("Error fetching microfrontends config:", error);
      }
    };

    // Llamada a la función para cargar la configuración de microfrontends
    fetchMicrofrontendsConfig();
  }, []);

  return (
    <div>
      <h1>Main App</h1>
      {microfrontends.map((microfrontend) => (
        <div key={microfrontend.name}>
          <h2>{`Microfrontend ${microfrontend.name} Content:`}</h2>
          {microfrontend.content}
        </div>
      ))}
    </div>
  );
};

export default MainApp;
