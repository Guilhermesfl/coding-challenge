class SicknessController {
  async index(req, res) {
    try {
      let { absences } = req;

      absences = absences.filter((e) => e.type === 'sickness');

      return res.status(200).json({ total: absences.length, absences: absences });
    } catch (e) {
      return res.status(500).json({ error: 'Error retrieving absences due to sickness' });
    }
  }
}

export default new SicknessController();
