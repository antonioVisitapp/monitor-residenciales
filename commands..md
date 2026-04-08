# Comandos para uso dentro del proyecto

### Tablas
#### residenciales
#### raspberrys
#### usuarios
#### roles

1. Conexion con base de datos una vez dentro del servidor
```
psql -p 5432 -U crm_user -dpruebas_monitor_typescript
```

2. ver tablas de la base de datos
```
\d
```
3. ver detalles de una tabla de la base de datos
```
\d (nombre de la tabla)
```
4. ver detalles de una tabla de la base de datos
```
\d (nombre de la tabla)
```
5. selecccionar raspberrys de un residencial especifico
```
SELECT * FROM raspberrys WHERE hostname like '%(residencial_name)%' 
```
6. tunel de prueba para desarrollo
```
```

