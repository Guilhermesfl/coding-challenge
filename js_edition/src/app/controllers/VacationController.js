import { absences, members } from '../../api';
import Helper from '../../lib/Helper';

class VacationController {
  async index(req, res) {
    try {
      let _absences = await absences();
      const _members = await members();

      _absences = _absences.filter((e) => e.type === 'vacation');
      _absences = Helper.mergeAbsencesAndMember(_absences, _members);
      _absences = _absences.map((absence) => {
        const abs = absence;
        abs.message = `${abs.userName} is on a vacation`;
        return abs;
      });
      _absences = [...new Set(_absences)];

      return res.status(200).json({ total: _absences.length, absences: _absences });
    } catch (e) {
      return res.status(500).json({ error: 'Error retrieving members on vacation' });
    }
  }
}

export default new VacationController();
