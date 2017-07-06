class UserMailer < ActionMailer::Base
  require 'utils/env'

  default from: "Quokka <#{ENV['TEAM_EMAIL']}>", return_path: ENV['TEAM_EMAIL']

  def register_inquiry(inquiry)
    @email = inquiry.email
    @school = inquiry.school

    send_email(@email, 'New Quokka Inquiry')
  end

  def send_email(email, subject, custom_from = nil)
    if Utils::Env.is_enabled?('MAILER_PERFORM_DELIVERIES')
      logger.info { "Sending email to: #{email}, with subject, #{subject}" }

      custom_from.present? ?
        mail(to: ENV['MAIL_TO_OVERRIDE'] || email, subject: subject, from: custom_from) :
        mail(to: ENV['MAIL_TO_OVERRIDE'] || email, subject: subject)
    else
      logger.info { 'Not sending email - MAILER_PERFORM_DELIVERIES not enabled.' }
    end
  end

end