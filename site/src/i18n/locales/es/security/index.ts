export default {
  "title": "Seguridad — AnyModelBot",
  "description": "A dónde van los datos de AnyModelBot, las protecciones locales y los límites conocidos: qué se queda en tu dispositivo y qué tiene que salir de él.",
  "h1": "Seguridad",
  "lead": "La versión extendida del diagrama de flujo de datos de la página de inicio: qué se queda en tu dispositivo, qué tiene que salir, las protecciones que puedes verificar en el código y las promesas que no hacemos.",
  "stays": "Se queda en tu dispositivo",
  "leaves": "Sale de tu dispositivo",
  "leavesItems": [
    "Lo que envías al modelo (incluido el contenido de la pantalla durante el uso de la computadora) pasa por el gateway de Modelflare hasta el proveedor que elijas.",
    "Modelflare conserva los registros de solicitudes durante un periodo de retención (puedes elegir de 7 a 365 días en tu perfil), según su documento “Retención de datos”; cuando una solicitud falla definitivamente, o cuando una ruta falla antes de que un respaldo funcione, el gateway guarda una copia de la solicitud original (sin el encabezado Authorization) para diagnosticar el problema y la elimina a las 72 horas (según el mismo documento).",
    "Por naturaleza, los mensajes de Slack, Telegram y Discord pasan por los servidores de esas plataformas.",
    "Si conectas apps como Notion o GitHub, o agregas un conector MCP personalizado, lo que los bots leen y escriben llega a esos servicios, y lo que leen también se incluye en las solicitudes al modelo.",
    "Las apps de escritorio instaladas buscan actualizaciones en GitHub después de iniciarse y cada 6 horas, y de forma predeterminada descargan los archivos de actualización en segundo plano. Puedes desactivar las descargas automáticas en Ajustes → General. Las solicitudes no contienen credenciales de la cuenta ni contenido de los chats. Para instalar, tienes que hacer clic en Reiniciar y actualizar, sin tareas en curso."
  ],
  "guardsTitle": "Protecciones en el código",
  "limitsTitle": "Límites y promesas que no hacemos",
  "limits": [
    "No hay modelos sin conexión ni locales; las solicitudes de inferencia siempre salen de tu dispositivo.",
    "El uso de la computadora funciona en automático de forma predeterminada (se puede cambiar para que pregunte antes de acciones que modifican la interfaz); el modo directo de macOS no se ha verificado en equipos reales.",
    "El comportamiento de red de la app no ha sido auditado por terceros, así que no afirmamos tener “cero telemetría”.",
    "Las plataformas distintas de Linux no tienen la capa de bubblewrap; la solidez del sandbox varía según la plataforma."
  ],
  "report": "¿Encontraste una vulnerabilidad? Escribe a {email}."
};
