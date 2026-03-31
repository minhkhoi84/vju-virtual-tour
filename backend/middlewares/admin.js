export function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;
  const provided = req.headers['x-admin-key'];

  if (!expected) {
    return res.status(500).json({ message: 'Server misconfiguration: ADMIN_API_KEY not set' });
  }
  if (!provided || provided !== expected) {
    return res.status(403).json({ message: 'Forbidden: invalid or missing x-admin-key' });
  }
  next();
}
