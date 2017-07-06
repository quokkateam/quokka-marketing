class InquiriesController < ApplicationController

  def create
    email = params[:email]
    school = params[:school]

    if email.present? && school.present?
      begin
        inquiry = Inquiry.create!(school: school, email: email)

        # send email to us about inquiry
        render json: {}, status: 200
      rescue Exception => e
        puts "Error creating Inquiry: #{e.message}"
        render json: { error: 'Error creating Inquiry' }, status: 500
      end
    else
      render json: { error: 'Both email and school required' }, status: 500
    end
  end

end