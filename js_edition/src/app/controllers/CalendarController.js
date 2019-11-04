import fs from 'fs';
import { absences, members } from '../../api';
import Helper from '../../lib/Helper';

class CalendarController {
  async index(req, res) {
    try {
      let _absences = await absences();
      const _members = await members();

      _absences = Helper.mergeAbsencesAndMember(_absences, _members);

      const logger = fs.createWriteStream('./temp/absences.ics');
      logger.write('BEGIN:VCALENDAR\n');
      logger.write('VERSION:2.0\n');
      _absences.forEach((absence) => {
        logger.write('BEGIN:VEVENT\n');
        logger.write(`UID:${absence.id}\n`);
        logger.write(`DTSTART:${absence.startDate.replace(/-/g, '')}\n`);
        logger.write(`DTEND:${absence.endDate.replace(/-/g, '')}\n`);
        logger.write(`SUMMARY:${absence.userName} is absent due to: ${absence.type}\n`);
        logger.write('TZID:W. Europe Standard Time\n');
        logger.write(`DESCRIPTION:${absence.memberNote}\n`);
        logger.write('END:VEVENT\n');
      });
      logger.write('END:VCALENDAR\n');
      logger.end();

      logger.on('close', () => {
        return res.download('./temp/absences.ics');
      });
    } catch (e) {
      return res.json({ error: 'Error getting calendar file' });
    }
  }
}

export default new CalendarController();
