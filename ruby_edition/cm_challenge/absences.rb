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
    end
  end
end
