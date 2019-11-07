class AbsenceController {
  async index(req, res) {
    try {
      const { userId, startDate, endDate } = req.query;
      let { absences } = req;

      if (userId) {
        absences = absences.filter((e) => String(e.userId) === userId);

        if (absences.length === 0) {
          return res.status(404).json({ error: 'No absence was found with provided user id' });
        }
      }

      if (startDate && endDate) {
        let [startYear, startMonth, startDay] = startDate.split('-');
        let [endYear, endMonth, endDay] = endDate.split('-');
        const filterStart = new Date().setUTCFullYear(startYear, startMonth, startDay);
        const filterEnd = new Date().setUTCFullYear(endYear, endMonth, endDay);

        absences = absences.filter((e) => {
          [startYear, startMonth, startDay] = e.startDate.split('-');
          [endYear, endMonth, endDay] = e.endDate.split('-');
          const absStart = new Date().setUTCFullYear(startYear, startMonth, startDay);
          const absEnd = new Date().setUTCFullYear(endYear, endMonth, endDay);
          return (absStart >= filterStart && absStart <= filterEnd)
            || (absEnd >= filterStart && absEnd <= filterEnd);
        });

        if (absences.length === 0) {
          return res.status(404).json({ error: 'No absence was found in the given date range' });
        }
      }

      return res.status(200).json({ total: absences.length, absences: absences });
    } catch (err) {
      return res.status(500).json({ error: 'Error retrieving absences' });
    }
  }
}

export default new AbsenceController();
