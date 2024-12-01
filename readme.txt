Comencé este proyecto utilizando vue create y seleccionando la opción de configuración manual 
(Manually select features). Habilité Babel, Router y Pinia para el manejo del estado global, 
y elegí Vue 3 como framework principal. Utilicé package.json para centralizar la configuración del 
proyecto y npm como gestor de dependencias. Incorporé Quasar Framework para disponer de estilos rápidos

Opté por implementar un archivo api.js como capa de abstracción para centralizar la lógica de interacción 
con la API, separando responsabilidades y manteniendo el código del store más limpio y legible

El proyecto se desarrolló completamente utilizando la Composition API, lo que me permitió estructurar 
los componentes y su lógica de manera modular

Cada vista tiene asignada una ruta específica a través del router. Configuré la navegación con:

'/' como página de bienvenida.
'/empty-list' para la vista donde no hay resultados.
'/list' como página principal para listar y filtrar Pokémon.
El diseño de cada vista sigue un enfoque mobile-first, adaptándose con estilos específicos para 
dispositivos de escritorio. Comencé por la vista de bienvenida (Welcome Page), 
utilizando un layout principal y aplicando esta misma lógica a las demás vistas.

Para mejorar la escalabilidad y el mantenimiento del proyecto, aislé componentes reutilizables 
como SearchInput.vue, ya que se utiliza en varias vistas (EmptyList y List) con las mismas 
propiedades tanto en móvil como en escritorio. De igual manera, diseñé BottomNav.vue para 
manejar la navegación entre "All" y "Favorites".

En el store centralicé las interacciones con la API, implementando:

Una función para listar todos los Pokémon.
Una función para buscar y mostrar un Pokémon específico (consultando la lista existente o llamando a la API)
Una función para obtener los detalles de un Pokémon cuando se selecciona.

Sinceramente, disfruté muchísimo desarrollando esta aplicación. 
No esperaba que un proyecto pudiera ser tan divertido y desafiante al mismo tiempo. 
Me recordó la emoción que sentí a los 21 años cuando supe que 
la programación era algo que realmente me gustaba, parecía entrar en meditación cuando lo hacía! 
y en estos días, con este desafío, me volvió a pasar!

Aunque trabajé como full stack web developer por las necesidades de mis roles previos,
siempre he sentido una inclinación especial hacia el diseño y la funcionalidad visible del frontend. 
Disfruto mucho de la estética de las cosas (de la ciudad, ver lindos 
edificios... de lo que sea) y siento que eso cuando
lo traslado a la programación me divierte más que los roles estrictamente analíticos. 
Este desafío reafirmó mi deseo de especializarme en el mundo del frontend, 
con la ventaja de contar con una buena base de conocimientos en backend

Estoy entusiasmado por seguir creciendo en este campo y encontrar un rol
donde pueda continuar aprendiendo, explorando y creando experiencias interactivas 
y estéticamente atractivas para los usuarios