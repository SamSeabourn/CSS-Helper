<Container>

						<h1>Editing: <strong>{ this.state.name }</strong></h1>
						<Form onSubmit={ this._handleSubmit }>
							<Form.Group>
								<Card>
									<Card.Body>
										<Card.Title>
											<Form.Label>Slave Name</Form.Label>
											<Form.Control type="text" placeholder="Update name..." value={ this.state.name } onChange={ this._handleChangeName } />
										</Card.Title>
									</Card.Body>
								</Card>
							</Form.Group>

							<Form.Group>
								<Card>
									<Card.Body>
										<Form.Check type="checkbox" label="Fill Murray?" value={true} isValid={ this.state.fill_murray } onClick={ this._handleOnClickFillMurray } />
									</Card.Body>
								</Card>
							</Form.Group>

							<Form.Group>
								<Card>
									<Card.Body>
										<Form.Check type="checkbox" label="Place Cage?" value={ this.state.place_cage } onChange={ this._handleChangePlaceCage } />
									</Card.Body>
								</Card>
							</Form.Group>

							<Form.Group>
								<Card>
									<Card.Body>
										<Form.Label>Custom Heading</Form.Label>
										<Form.Check type="checkbox" label="Custom H1 text..." value={ this.state.custom_header } onChange={ this._handleChangeCustomHeader } />
										<Form.Control type="text" placeholder="Custom heading text..." value={ this.state.custom_header_text } onChange={ this._handleChangeCustomHeaderText } />
									</Card.Body>
								</Card>
							</Form.Group>

							<Form.Group>
								<Card>
									<Card.Body>
										<Form.Label>Paragraph Background Hex</Form.Label>
										<Form.Check type="checkbox" label="Change paragraph background color?" value={ this.state.custom_header } onChange={ this._handleChangeParagraphBackground } />
										<Form.Control type="text" placeholder="#A2B3C4 etc..." value={ this.state.paragraph_background } onChange={ this._handleChangeParagraphColor } />
									</Card.Body>
								</Card>
							</Form.Group>

							<Form.Group>
								<Card>
									<Card.Body>
										<Form.Label>Paragraph Text Color #Hex</Form.Label>
										<Form.Check type="checkbox" label="Change paragraph text color?" value={ this.state.custom_header } onChange={ this._handleInputChange } />
										<Form.Control type="text" placeholder="#D4E5F6 etc..." value={ this.state.paragraph_color } onChange={ this._handleInputChange } />
									</Card.Body>
								</Card>
							</Form.Group>

							<Form.Group>
								<Card>
									<Card.Body>
										<Form.Check type="checkbox" label="Chrome 'Aww Snap' Page?" value={ this.state.snap } onChange={ this._handleChangeSnap } />
									</Card.Body>
								</Card>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>

					</Container>
