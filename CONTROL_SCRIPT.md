# Script de Control para el Validador de Tecnologías

Este script `control-app.sh` te permite gestionar la aplicación Validador de Tecnologías, proporcionando funcionalidades para iniciar, detener y monitorear la aplicación, así como acceder a los logs del sistema.

## Funcionalidades

- **Arranque y parada** controlada de la aplicación
- **Sistema de logging** para facilitar la depuración
- **Monitoreo** del estado de la aplicación
- **Gestión de dependencias** automática

## Comandos disponibles

```bash
./control-app.sh [comando]
```

### Comandos:

- `start`: Inicia la aplicación
- `stop`: Detiene la aplicación de forma ordenada
- `restart`: Reinicia la aplicación (detiene e inicia)
- `status`: Muestra el estado actual de la aplicación y uso de recursos
- `logs [tipo]`: Muestra los logs (opciones: app, error, system)

## Estructura de logs

El script crea y gestiona un directorio `logs/` con tres archivos:

- **app.log**: Registra la salida estándar de la aplicación
- **error.log**: Registra los errores de la aplicación
- **system.log**: Registra información sobre operaciones del script (arranque, parada, etc.)

## Ejemplos de uso

### Iniciar la aplicación

```bash
./control-app.sh start
```

La aplicación será accesible en http://localhost:3000

### Detener la aplicación

```bash
./control-app.sh stop
```

### Ver el estado actual

```bash
./control-app.sh status
```

### Ver los logs de la aplicación

```bash
./control-app.sh logs app    # Logs principales
./control-app.sh logs error  # Logs de errores
./control-app.sh logs system # Logs del sistema
```

## Notas técnicas

- El script guarda el PID (identificador del proceso) en un archivo `.pid` para gestionar la aplicación
- Utiliza señales SIGTERM para un cierre ordenado, con failover a SIGKILL si es necesario
- Verifica si las dependencias están instaladas antes de iniciar
- Captura y registra tanto la salida estándar como los errores

## Requisitos

- Sistema basado en Unix/Linux
- Bash shell
- Node.js y npm instalados 