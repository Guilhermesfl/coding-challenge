# frozen_string_literal: true

module CmChallenge
  # Absences class holds the methods related to transforming the absences object
  # and setting up the response
  class Absences
    class << self
      def to_ical(absences)
        calendar_file = File.new('./tmp/absences.ics', 'w')
        calendar_file.puts("BEGIN:VCALENDAR\nVERSION:2.0")
        absences.each { |absence| write_event(calendar_file, absence) }
        calendar_file.puts('END:VCALENDAR')
        calendar_file.close
      end

      def write_event(file, event)
        file.puts("BEGIN:VEVENT\nUID:#{event[:id]}")
        file.puts("DTSTART:#{event[:start_date].gsub('-', '')}")
        file.puts("DTEND:#{event[:end_date].gsub('-', '')}")
        file.puts("SUMMARY:#{event[:message]}")
        file.puts('TZID:W. Europe Standard Time')
        file.puts("DESCRIPTION:#{event[:member_note]}")
        file.puts('END:VEVENT')
      end

      def merge_absences_and_members(absences, members)
        absences.each do |absence|
          members.each do |member|
            if absence[:user_id] == member[:user_id]
              absence[:userName] = member[:name]
              if absence[:type] == 'vacation'
                absence[:message] = "#{absence[:userName]} is on vacation"
              else
                absence[:message] = "#{absence[:userName]} is sick"
              end
              break
            end
          end
        end
      end

      def transform_response(absences)
        absences.map do |absence|
          { admitterId: absence[:admitter_id],
            admitterNote: absence[:admitter_note],
            confirmedAt: absence[:confirmed_at],
            createdAt: absence[:created_at],
            crewId: absence[:crew_id],
            endDate: absence[:end_date],
            id: absence[:id],
            memberNote: absence[:member_note],
            rejectedAt: absence[:rejected_at],
            startDate: absence[:start_date],
            type: absence[:type],
            userId: absence[:user_id],
            message: absence[:message],
            userName: absence[:userName] }
        end
      end
    end
  end
end
