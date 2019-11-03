import fs from 'fs';
import { absences, members } from '../../api';

class CalendarController {
  async index(req, res) {
    try {
      const _absences = await absences();
      const _members = await members();

      const logger = fs.createWriteStream('./temp/absences.ics');
      logger.write('BEGIN:VCALENDAR\n');
      logger.write('VERSION:2.0\n');
      _absences.forEach((absence) => {
        logger.write('BEGIN:VEVENT\n');
        const abs = absence;
        for (let i = 0; i < _members.length; i++) {
          if (abs.userId === _members[i].userId) {
            logger.write(`UID:${absence.id}\n`);
            logger.write(`DTSTART:${absence.startDate.replace(/-/g, '')}\n`);
            logger.write(`DTEND:${absence.endDate.replace(/-/g, '')}\n`);
            logger.write(`SUMMARY:${_members[i].name} is absent due to: ${absence.type}\n`);
            logger.write('TZID:W. Europe Standard Time\n');
            logger.write(`DESCRIPTION:${absence.memberNote}\n`);
            break;
          }
        }
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
