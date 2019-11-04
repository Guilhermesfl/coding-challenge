import { absences, members } from '../../api';

class AbsenceController {
  async index(req, res) {
    try {
      let _absences = await absences();
      let _members = await members();

      const { userId } = req.query;
      const { startDate } = req.query;
      const { endDate } = req.query;

      if (userId) {
        _absences = _absences.filter((e) => String(e.userId) === userId);
        _members = _members.filter((e) => String(e.userId) === userId);

        if (_absences.length > 0 && _members.length > 0) {
          _absences.map((el) => {
            const abs = el;
            abs.name = _members[0].name;
            return abs;
          });
          return res.json(_absences);
        }

        return res.json({ error: 'Member not found with provided user id' });
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
            || (absEnd >= filterStart && absEnd <= filterEnd)
        });

        _absences.map((absence) => {
          const abs = absence;
          for (let i = 0; i < _members.length; i++) {
            if (abs.userId === _members[i].userId) {
              abs.userName = _members[i].name;
              return abs;
            }
          }
        });

        if (_absences.length > 0) {
          return res.json({ total: _absences.length, absences: _absences });
        }

        return res.json({ error: 'No absence found in the given date' });
      }
    } catch (err) {
      return res.json({ error: 'Error retrieving absences' });
    }
  }
}

export default new AbsenceController();
