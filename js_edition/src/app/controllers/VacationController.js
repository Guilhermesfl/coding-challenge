import { absences, members } from '../../api';

class VacationController {
  async index(req, res) {
    try {
      let _absences = await absences();
      const _members = await members();
      let response = [];

      _absences = _absences.filter((e) => e.type === 'vacation');

      _absences.forEach((absence) => {
        const abs = absence;
        for (let i = 0; i < _members.length; i++) {
          if (abs.userId === _members[i].userId) {
            response.push(`${_members[i].name} is on vacation`);
            break;
          }
        }
      });

      response = [...new Set(response)];

      return res.json({ total: response.length, vacations: response });
    } catch (e) {
      return res.json({ error: 'Error retrieving members on vacation' });
    }
  }
}

export default new VacationController();
