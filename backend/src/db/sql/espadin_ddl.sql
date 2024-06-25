-- Tabla: Connector
CREATE TABLE Connector (
    ID VARCHAR PRIMARY KEY,
    Name VARCHAR,
    Description VARCHAR,
    Url VARCHAR,
    ConnectorInfo TEXT,
    Notes VARCHAR,
    createdBy VARCHAR,
    created TIMESTAMP,
    lastUpdated TIMESTAMP
);

-- Tabla: ConnectorState
CREATE TABLE ConnectorState (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR
);

-- Tabla: Connector_State
CREATE TABLE Connector_State (
    ID SERIAL PRIMARY KEY,
    StateID INTEGER REFERENCES ConnectorState(ID),
    ConnectorID VARCHAR REFERENCES Connector(ID),
    created TIMESTAMP
);

-- Tabla: ContractState
CREATE TABLE ContractState (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR
);

-- Tabla: Contract_State
CREATE TABLE Contract_State (
    ID SERIAL PRIMARY KEY,
    StateID VARCHAR REFERENCES ContractState(ID),
    AgreementID VARCHAR,
    created TIMESTAMP
);

-- Tabla: Participant
CREATE TABLE Participant (
    ID VARCHAR PRIMARY KEY,
    Name VARCHAR,
    LogoURL VARCHAR,
    Address VARCHAR,
    WebUrl VARCHAR,
    Email VARCHAR
);

-- Tabla: User
CREATE TABLE User (
    ID VARCHAR PRIMARY KEY,
    Username VARCHAR UNIQUE,
    Name VARCHAR,
    Lastname VARCHAR,
    ParticipantID VARCHAR REFERENCES Participant(ID)
);

-- Tabla: UserContract
CREATE TABLE UserContract (
    ConnectorID VARCHAR,
    UserID VARCHAR,
    AgreementID VARCHAR UNIQUE,
    created TIMESTAMP,
    lastUpdated TIMESTAMP,
    PRIMARY KEY (ConnectorID, UserID),
    FOREIGN KEY (ConnectorID) REFERENCES Connector(ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- Tabla: Role
CREATE TABLE Role (
    ID VARCHAR PRIMARY KEY,
    Name VARCHAR
);

-- Tabla: User_Role
CREATE TABLE User_Role (
    UserID VARCHAR REFERENCES User(ID),
    RoleID VARCHAR REFERENCES Role(ID),
    PRIMARY KEY (UserID, RoleID)
);

-- Tabla: ActivityLog
CREATE TABLE ActivityLog (
    ID SERIAL PRIMARY KEY,
    Event VARCHAR,
    UserID VARCHAR REFERENCES User(ID),
    ConnectorID VARCHAR REFERENCES Connector(ID),
    Detail TEXT,
    created TIMESTAMP
);
