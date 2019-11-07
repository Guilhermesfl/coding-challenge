class VacationController {
  async index(req, res) {
    try {
      let { absences } = req;

      absences = absences.filter((e) => e.type === 'vacation');

      return res.status(200).json({ total: absences.length, absences: absences });
    } catch (e) {
      return res.status(500).json({ error: 'Error retrieving members on vacation' });
    }
  }
}

export default new VacationController();
