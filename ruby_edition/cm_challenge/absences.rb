require_relative './api'

module CmChallenge
  class Absences
    class << self
      def to_ical
        # Your implementation here
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
