class InquiriesController < ApplicationController

  def create
    email = params[:email]
    school = params[:school]

    if email.present? && school.present?
      begin
        # Create new Inquiry
        inquiry = Inquiry.create!(school: school, email: email)

        # Email the Quokka team about new Inquiry
        UserMailer.delay.register_inquiry(inquiry)

        render json: {}, status: 200
      rescue Exception => e
        logger.error { "Error creating Inquiry: #{e.message}" }
        render json: { error: 'Error creating Inquiry' }, status: 500
      end
    else
      render json: { error: 'Both email and school required' }, status: 500
    end
  end

end