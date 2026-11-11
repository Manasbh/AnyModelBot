// group · es: chats grupales (screens/group.js)
export default {
  /** The item in the @ list that means every member; it's also what goes into the input box (src/core/groups.ts knows it) */
  everyone: "everyone",
  placeholder: "Envía un mensaje; menciona con @ a quien quieras que responda",
  mentionLabel: "Elige un miembro para mencionar con @",
  editTitle: "Nombre y miembros del grupo",
  empty: "Responde el bot que menciones con @. Sin @, continúa el último bot que respondió. Cada bot usa su propio modelo, espacio de trabajo y memoria.",
  /** The name shown on replies left by a bot that was deleted */
  removedBot: "Bot eliminado",
  working: "{name} está respondiendo…",
  noMessages: "Aún no hay mensajes",
  sheet: {
    newTitle: "Nuevo chat grupal",
    editTitle: "Nombre y miembros del grupo",
    name: "Nombre",
    namePlaceholder: "Déjalo en blanco para usar los nombres de los miembros",
    members: "Miembros",
    membersHint: "Elige al menos dos bots",
    create: "Crear",
    save: "Guardar",
  },
  delete: {
    title: "¿Eliminar “{name}”?",
    body: "Esto elimina de forma permanente el chat grupal y sus mensajes. Los bots y sus chats individuales no se ven afectados.",
    confirm: "Eliminar permanentemente",
  },
};
