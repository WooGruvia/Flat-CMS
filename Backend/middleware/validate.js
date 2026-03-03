function validateSection(req, res, next) {
  const { title } = req.body;
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'El titulo no puede estar vacio' });
  }
  next();
}

function validateItem(req, res, next) {
  const { title, imageUrl } = req.body;
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'El titulo no puede estar vacio' });
  }
  if (imageUrl !== undefined && imageUrl.trim() !== '') {
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(imageUrl.trim())) {
      return res.status(400).json({ error: 'La URL de la imagen debe comenzar con http:// o https://' });
    }
  }
  next();
}

function validateSite(req, res, next) {
  const { name } = req.body;
  if (name !== undefined && name.trim() === '') {
    return res.status(400).json({ error: 'El nombre del sitio no puede estar vacio' });
  }
  next();
}

module.exports = { validateSection, validateItem, validateSite };