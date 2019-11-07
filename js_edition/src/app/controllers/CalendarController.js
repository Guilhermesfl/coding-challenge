import fs from 'fs';

class CalendarController {
  async index(req, res) {
    try {
      const { absences } = req;

      const logger = fs.createWriteStream('./tmp/absences.ics');
      logger.write('BEGIN:VCALENDAR\n');
      logger.write('VERSION:2.0\n');
      absences.forEach((absence) => {
        logger.write('BEGIN:VEVENT\n');
        logger.write(`UID:${absence.id}\n`);
        logger.write(`DTSTART:${absence.startDate.replace(/-/g, '')}\n`);
        logger.write(`DTEND:${absence.endDate.replace(/-/g, '')}\n`);
        logger.write(`SUMMARY:${absence.message}\n`);
        logger.write('TZID:W. Europe Standard Time\n');
        logger.write(`DESCRIPTION:${absence.memberNote}\n`);
        logger.write('END:VEVENT\n');
      });
      logger.write('END:VCALENDAR\n');
      logger.end();

      logger.on('close', () => {
        return res.status(200).download('./tmp/absences.ics');
      });
    } catch (e) {
      return res.status(500).json({ error: 'Error getting calendar file' });
    }
  }
}

export default new CalendarController();
