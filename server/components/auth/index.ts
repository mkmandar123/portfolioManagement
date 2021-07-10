export default function (req: any, res: any, next: Function): any {
  if (!req.get('authorization') || (req.get('authorization').split(' ')[0] !== 'token')) {
    return res.status(401).json({message: 'Unauthorized Request.'});
  }

  return next();
}
