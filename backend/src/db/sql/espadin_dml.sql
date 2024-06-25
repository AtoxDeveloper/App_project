INSERT INTO ConnectorState (ID,Name) VALUES
	 (1,'ACTIVE'),
	 (2,'INACTIVE'),
	 (3,'DEPRECATED');

INSERT INTO ContractState (ID,Name) VALUES
	 (1,'ACTIVE'),
	 (2,'PENDING'),
	 (3,'REVOKED');

INSERT INTO Participant (ID,Name,LogoURL,Address,WebUrl,Email) VALUES
	 ('1158a6a8-27b6-4d02-b827-f006887fa985','Administrator',NULL,NULL,NULL,'fakemail@fake.foo');

	
INSERT INTO "User" (ID,Username,Name,Lastname,ParticipantID) VALUES
	 ('9d05c0f5-bba0-47cf-b5c0-a7d39afad93a','admin','Administrator',NULL,'1158a6a8-27b6-4d02-b827-f006887fa985');

INSERT INTO "Role" (ID,Name) VALUES
	 ('SUPER_USER','Admin Superuser');
	
INSERT INTO User_Role (UserID,RoleID) VALUES
	 ('9d05c0f5-bba0-47cf-b5c0-a7d39afad93a','SUPER_USER');
	
--commit;

