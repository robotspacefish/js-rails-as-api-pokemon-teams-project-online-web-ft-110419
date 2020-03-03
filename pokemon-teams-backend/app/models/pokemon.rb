class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.generate_nickname
    Faker::Name.first_name
  end

  def self.generate_species
    Faker::Games::Pokemon.name
  end
end
