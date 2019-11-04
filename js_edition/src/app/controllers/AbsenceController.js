import { absences, members } from '../../api';
import Helper from '../../lib/Helper';

class AbsenceController {
  async index(req, res) {
    try {
      let _absences = await absences();
      let _members = await members();

      const { userId, startDate, endDate } = req.query;

      if (userId) {
        _absences = _absences.filter((e) => String(e.userId) === userId);
        _members = _members.filter((e) => String(e.userId) === userId);

        if (_absences.length === 0 || _members.length === 0) {
          return res.status(404).json({ error: 'Member not found with provided user id' });
        }
      }

      if (startDate && endDate) {
        let [startYear, startMonth, startDay] = startDate.split('-');
        let [endYear, endMonth, endDay] = endDate.split('-');
        const filterStart = new Date().setUTCFullYear(startYear, startMonth, startDay);
        const filterEnd = new Date().setUTCFullYear(endYear, endMonth, endDay);

        _absences = _absences.filter((e) => {
          [startYear, startMonth, startDay] = e.startDate.split('-');
          [endYear, endMonth, endDay] = e.endDate.split('-');
          const absStart = new Date().setUTCFullYear(startYear, startMonth, startDay);
          const absEnd = new Date().setUTCFullYear(endYear, endMonth, endDay);
          return (absStart >= filterStart && absStart <= filterEnd)
            || (absEnd >= filterStart && absEnd <= filterEnd);
        });

        if (_absences.length === 0) {
          return res.status(404).json({ error: 'No absence found in the given date' });
        }
      }

      _absences = Helper.mergeAbsencesAndMember(_absences, _members);

      return res.status(200).json({ total: _absences.length, absences: _absences });
    } catch (err) {
      return res.status(500).json({ error: 'Error retrieving absences' });
    }
  }
}

export default new AbsenceController();
