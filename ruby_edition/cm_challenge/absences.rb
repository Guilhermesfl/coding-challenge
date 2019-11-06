require_relative './api'

module CmChallenge
  class Absences
    class << self
      def to_ical(absences)
        calendar_file = File.new("absences.ics", "w")
        calendar_file.puts('BEGIN:VCALENDAR');
        calendar_file.puts('VERSION:2.0');
        absences.each do |absence|
          calendar_file.puts('BEGIN:VEVENT');
          calendar_file.puts("UID:#{absence[:id]}\n");
          calendar_file.puts("DTSTART:#{absence[:start_date].gsub('-', '')}\n");
          calendar_file.puts("DTEND:#{absence[:end_date].gsub('-', '')}\n");
          calendar_file.puts("SUMMARY:#{absence[:userName]} is absent due to: #{absence[:type]}\n");
          calendar_file.puts('TZID:W. Europe Standard Time');
          calendar_file.puts("DESCRIPTION:#{absence[:member_note]}\n");
          calendar_file.puts('END:VEVENT');
        end
        calendar_file.puts('END:VCALENDAR');
        calendar_file.close
      end
      def merge_absences_and_members(absences, members)
        absences.each do |absence|
          members.each do |member|
            if absence[:user_id] == member[:user_id]
              absence[:userName] = member[:name]
              break;
            end
          end
        end
      end
      def transform_response(absences)
        return absences.map do |absence|
          absence = {
            :admitterId =>  absence[:admitter_id],
            :admitterNote =>  absence[:admitter_note],
            :confirmedAt =>  absence[:confirmed_at],
            :createdAt =>  absence[:created_at],
            :crewId =>  absence[:crew_id],
            :endDate =>  absence[:end_date],
            :id =>  absence[:id],
            :memberNote =>  absence[:member_note],
            :rejectedAt =>  absence[:rejected_at],
            :startDate =>  absence[:start_date],
            :type =>  absence[:type],
            :userId =>  absence[:user_id],
            :message =>  absence[:message],
            :userName =>  absence[:userName],
          }
        end
      end
    end
  end
end
