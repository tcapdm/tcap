<div class="home-section3">
	<div id="map"></div>
	<div class="container">
		<div class="row">
			<div class="comment-form">
				<h2>contact us:</h2>
				<form action="" method="post" id="contact_form" class="form-horizontal">
					<fieldset>
						<div class="row form-group">
							<div class="col-sm-12">
								<label for="contact-name" class="label_title">Name:</label>
								<input type="text" name="contact_name" class="form-control" autocomplete="off">
							</div>
						</div>
						<div class="row form-group">
							<div class="col-sm-6">
								<label for="subject" class="label_title">Position Title:</label>
								<input type="text" name="contact_position" class="form-control" autocomplete="off">
							</div>
							<div class="col-sm-6">
								<label for="subject" class="label_title">Company:</label>
								<input type="text" name="contact_company" class="form-control" autocomplete="off">
							</div>
						</div>
						<div class="row form-group">
							<div class="col-sm-6">
								<label for="subject" class="label_title">Email Address:</label>
								<input type="email" name="contact_email" class="form-control" autocomplete="off">
							</div>
							<div class="col-sm-6">
								<label for="subject" class="label_title">Contact Number:</label>
								<input type="text" name="contact_number" class="form-control" autocomplete="off">
							</div>
						</div>
						<div class="row form-group">
							<div class="col-sm-12">
								<label for="subject" class="label_title">Your Message:</label>
								<textarea name="contact_message" cols="30" rows="10" autocomplete="off" class="comment-form-msg"></textarea>
							</div>
						</div>

						<div class="row form-group">
							<div class="col-sm-12">
								<div class="contact-subscribe clearfix">
									<div class="input_styled checklist">
										<div class="rowCheckbox">
											<label for="contact-subscribe" class="hover" >Would you like to subscribe to our mailing list?</label>
											<input name="contact-subscribe" type="checkbox" id="contact-subscribe" value="contact-subscribe" hidefocus="true">
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- Success message -->
						<div class="alert alert-success" role="alert" id="success_message">Success <i class="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>
						<!-- Button -->
						<div class="read-more-button">
							<button type="submit" class="ripple-btn contact-btn" >Submit</button>
							<button type="submit" class="btn-reset" >reset</button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>