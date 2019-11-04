import { absences, members } from '../../api';
import Helper from '../../lib/Helper';

class VacationController {
  async index(req, res) {
    try {
      let _absences = await absences();
      const _members = await members();

      _absences = _absences.filter((e) => e.type === 'vacation');
      _absences = Helper.mergeAbsencesAndMember(_absences, _members);
      _absences = _absences.map((absence) => `${absence.userName} is on vacation`);
      _absences = [...new Set(_absences)];

      return res.json({ total: _absences.length, vacations: _absences });
    } catch (e) {
      return res.json({ error: 'Error retrieving members on vacation' });
    }
  }
}

export default new VacationController();
