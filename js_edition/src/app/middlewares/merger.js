import { members, absences } from '../../api';
// Disable no-param-reassing lint rule here because in a middleware it is
// many times useful to add parameters to the request
/* eslint-disable no-param-reassign */
export default async (req, res, next) => {
  try {
    const _absences = await absences();
    const _members = await members();

    _absences.map((absence) => {
      const abs = absence;
      _members.forEach((member) => {
        if (abs.userId === member.userId) {
          abs.userName = member.name;
          abs.message = abs.type === 'vacation'
            ? `${abs.userName} is on vacation`
            : `${abs.userName} is sick`;
          return abs;
        }
      });
    });

    req.absences = _absences;

    next();
  } catch (e) {
    return res.status(500).json({ error: 'Error retrieving absences' });
  }
};
/* eslint-enable no-param-reassign */
