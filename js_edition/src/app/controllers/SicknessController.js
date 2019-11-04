import { absences, members } from '../../api';
import Helper from '../../lib/Helper';

class SicknessController {
  async index(req, res) {
    try {
      let _absences = await absences();
      const _members = await members();

      _absences = _absences.filter((e) => e.type === 'sickness');
      _absences = Helper.mergeAbsencesAndMember(_absences, _members);
      _absences = _absences.map((absence) => `${absence.userName} is sick`);
      _absences = [...new Set(_absences)];

      return res.json({ total: _absences.length, sickness: _absences });
    } catch (e) {
      return res.json({ error: 'Error retrieving members that are sick' });
    }
  }
}

export default new SicknessController();
