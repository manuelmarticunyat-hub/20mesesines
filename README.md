# Web de mesaversario

Esta carpeta contiene una web estatica romantica lista para personalizar y publicar.

## Que tienes que tocar

1. Mete tus fotos en estas carpetas:
   - `photos/recuerdos/`
   - `photos/futuro/`
2. Edita el archivo `app.js`
3. Cambia las rutas `image` y los textos `title` dentro de:
   - `appContent.memories`
   - `appContent.future`

## Ejemplo

```js
{
  image: "./photos/recuerdos/cena.jpg",
  title: "Nuestra cena favorita"
}
```

## Verla en tu ordenador

Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Y luego abre:

`http://localhost:8000`

## Para sacar un link y enviarselo

La opcion mas simple es subir esta carpeta a uno de estos sitios:

- GitHub Pages
- Netlify
- Vercel

Si quieres, en el siguiente paso te la dejo publicada tambien.
