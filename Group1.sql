use master
drop database FPTUniversity
--Tạo database
CREATE DATABASE FPTUniversity
GO

USE FPTUniversity
--Tạo bảng phòng ban
CREATE TABLE Department(
	DID INT IDENTITY(1,1) PRIMARY KEY, --Mã phòng ban
	D_Name NVARCHAR(30),--Tên phòng ban
	WorkingTime INT,--Thời gian làm việc (tháng)
);

--Tạo bảng công việc
CREATE TABLE Job(
	JID INT IDENTITY(1,1) PRIMARY KEY,--Mã công việc
	J_Name NVARCHAR(30),--Tên công việc
	Request NVARCHAR (100),--Yêu cầu công việc
	DID INT--Mã phòng ban (Khóa ngoại)
	CONSTRAINT J_D_FK FOREIGN KEY (DID) REFERENCES Department(DID),--Tạo khóa ngoại
);

--Tạo bảng lương 
CREATE TABLE SalaryDetail(
	SID INT IDENTITY(1,1) PRIMARY KEY,--Mã lương
	SalaryLever NVARCHAR(10),--Bậc lương
);

--Tạo bảng Chức vụ
CREATE TABLE Position(
	PoID INT IDENTITY(1,1) PRIMARY KEY,--Mã chức vụ
	P_Name NVARCHAR (30),--Tên chức vụ
);

--Tạo bảng nối Lương và chức vụ
CREATE TABLE Salary_Position(
	SPoID INT IDENTITY(1,1) PRIMARY KEY,--Mã bảng nối
	--Tạo khóa ngoại nối với bảng lương bà bảng chức vụ
	SID INT,
	PoID INT,
	CONSTRAINT SP_S_FK FOREIGN KEY (SID) REFERENCES SalaryDetail(SID),
	CONSTRAINT SP_P_FK FOREIGN KEY (PoID) REFERENCES Position(PoID),
	Salary MONEY,--Tiền lương
);

--Bảng nhân lực
CREATE TABLE Personnel(
	PID INT IDENTITY(1,1) PRIMARY KEY,--Mã nhân viên
	P_Name NVARCHAR(30),--Tên
	DateOfBirth DATE,--NGày sinh
	Literacy NVARCHAR(50),	
	Date_Start DATE,--Ngày bắt đầu làm
	--Khóa ngoại nối với bảng công việc
	JID INT,
	CONSTRAINT P_J_FK FOREIGN KEY (JID) REFERENCES Job(JID),
	--Khóa ngoại nối với bảng nối giữa tiền lương và chức vụ
	SPoID INT,
	CONSTRAINT P_SPo_FK FOREIGN KEY (SPoID) REFERENCES Salary_Position(SPoID),
); 

--insert dữ liệu vào bảng lương
INSERT INTO SalaryDetail VALUES (N'Bậc 1')
INSERT INTO SalaryDetail VALUES (N'Bậc 2')
INSERT INTO SalaryDetail VALUES (N'Bậc 3')

--insert dữ liệu vào bảng chức vụ
INSERT INTO Position VALUES( N'Giam đốc')
INSERT INTO Position VALUES( N'Trưởng phòng')
INSERT INTO Position VALUES( N'Nhân viên')
INSERT INTO Position VALUES( N'Nhân viên thử việc')

--insert dữ liệu vào bảng nối giữa chức vu và tiền lương
INSERT INTO Salary_Position VALUES (1,1,5000)
INSERT INTO Salary_Position VALUES (1,2,4000)
INSERT INTO Salary_Position VALUES (1,3,3000)
INSERT INTO Salary_Position VALUES (2,1,5500)
INSERT INTO Salary_Position VALUES (2,2,4500)
INSERT INTO Salary_Position VALUES (2,3,3500)
INSERT INTO Salary_Position VALUES (3,1,6000)
INSERT INTO Salary_Position VALUES (3,2,5500)
INSERT INTO Salary_Position VALUES (3,3,5000)

--insert vào bảng phòng ban
INSERT INTO Department VALUES (N'Phòng IT',24)

--insert vào bảng công việc
INSERT INTO Job VALUES (N'Lập trình','Có bằng Đại Học',1)

--insert vào bảng nhân viên
INSERT INTO Personnel VALUES (N'Nguyễn Văn A','2000-12-12',N'Tốt Ngiệp Đại Học','Nhân viên','2020-12-12',1,2)


select Personnel.P_Name, SalaryDetail.SalaryLever,  Position.P_Name, Salary FROM Personnel
inner join Salary_Position ON
Personnel.SPoID = Salary_Position.SPoID
inner join Position on
Position.PoID = Salary_Position.PoID
inner join SalaryDetail on
Salary_Position.SID = SalaryDetail.SID WHERE PID = 2



SELECT * FROM Personnel