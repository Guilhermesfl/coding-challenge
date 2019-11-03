import { absences, members } from '../../api';

class AbsenceController {
  async index(req, res) {
    try {
      const _absences = await absences();
      const _members = await members();
      const response = [];

      _absences.forEach((absence) => {
        const abs = absence;
        for (let i = 0; i < _members.length; i++) {
          if (abs.userId === _members[i].userId) {
            abs.userName = _members[i].name;
            response.push(abs);
            break;
          }
        }
      });

      return res.json(_absences);
    } catch (err) {
      return res.json({ error: 'Error retrieving absences' });
    }
  }
}

export default new AbsenceController();
