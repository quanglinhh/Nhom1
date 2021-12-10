﻿use master
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
	Literacy NVARCHAR(50),--Trình độ học vấn	
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
INSERT INTO Salary_Position VALUES (1,1,5000)-- bậc1 -- giám đốc--1
INSERT INTO Salary_Position VALUES (1,2,4000)-- bậc1-- trưởng phòng--2
INSERT INTO Salary_Position VALUES (1,3,3000)-- bậc1-- nhân viên--3
INSERT INTO Salary_Position VALUES (2,1,5500)---bậc2--giám đốc--4
INSERT INTO Salary_Position VALUES (2,2,4500)-- bậc2-- trưởng phòng--5
INSERT INTO Salary_Position VALUES (2,3,3500)-- bậc2-- nhân viên--6
INSERT INTO Salary_Position VALUES (3,1,6000)-- bậc3-- giám đốc--7
INSERT INTO Salary_Position VALUES (3,2,5500)-- bậc3-- trưởng phòng--8
INSERT INTO Salary_Position VALUES (3,3,5000)-- bậc3-- nhân viên--9

--insert vào bảng phòng ban
INSERT INTO Department VALUES (N'Phòng IT',24)
INSERT INTO Department VALUES (N'Phòng thiết bị',24)
INSERT INTO Department VALUES (N'Phòng đào tạo',24)

--insert vào bảng công việc
INSERT INTO Job VALUES (N'Lập trình',N'Có bằng Đại Học',1)
INSERT INTO Job VALUES (N'Quản lý trang thiết bị',N'Có bằng cao đẳng',2)
INSERT INTO Job VALUES (N'Tư vấn tuyển sinh',N'Có bằng Đại Học',3)

--insert vào bảng nhân viên
INSERT INTO Personnel VALUES (N'Nguyễn Văn A','2000-12-12',N'Tốt Ngiệp Đại Học','2020-12-12',1,2)
INSERT INTO Personnel VALUES (N'Nguyễn Văn B','2000-12-12',N'Tốt Ngiệp Cao Đẳng','2020-12-12',2,5)
INSERT INTO Personnel VALUES (N'Nguyễn Văn C','2000-12-12',N'Tốt Ngiệp Đại Học','2020-12-12',3,7)

----+ Bổ sung\cập nhật hồ sơ nhân viên
--Cập nhật lại ngày tháng năm sinh của nhân viên có PID = 2
UPDATE Personnel
SET DateOfBirth = '1998-12-12' WHERE PID = 2
SELECT * FROM Personnel

---+ Quản lý quyết định liên quan tới một nhân viên: thay đổi chức vụ, thay đổi bậc lương, chuyển công tác, ...
--Điều chyển nhân viên trên 40 tuổi sang phòng đào tạo
UPDATE Personnel
SET JID = 3 WHERE YEAR(GETDATE()) - YEAR(Personnel.DateOfBirth) > 40

DROP TRIGGER trg_DieuChuyenCongTac
--Thay đổi bậc lương cho nhân viên làm sau 1 năm
--
INSERT INTO Personnel VALUES (N'Trần Văn C','2000-12-12',N'Tốt Ngiệp Đại Học','2019-12-12',1,2)
--
UPDATE Personnel
SET SPoID = SPoID+3 WHERE YEAR(GETDATE()) - YEAR(Personnel.Date_Start) >1

--+ Quản lý hồ sơ các ứng viên (những người dự tuyển vào một vị trí nào đó)
--ứng viên cho công việc tư vấn tuyển sinh
SELECT Personnel.P_Name FROM Position 
JOIN Salary_Position ON 
Position.PoID = Salary_Position.PoID
JOIN Personnel ON 
Salary_Position.SPoID = Personnel.SPoID
JOIN Job ON 
Personnel.JID = Job.JID
JOIN Department ON Job.DID = Department.DID WHERE Literacy = N'Tốt Ngiệp Đại Học'


--+ Thống kê về nhân sự theo các tiêu chí khác nhau"
/*ai ten j - lam o phong ban nao - time lam viec (thang) - ten cong viec - muc luong - chuc vu */
SELECT Personnel.P_Name, D_Name, WorkingTime, J_Name, Salary, Position.P_Name FROM Position 
JOIN Salary_Position ON 
Position.PoID = Salary_Position.PoID
JOIN Personnel ON 
Salary_Position.SPoID = Personnel.SPoID
JOIN Job ON 
Personnel.JID = Job.JID
JOIN Department ON Job.DID = Department.DID WHERE PID = 3

------Thống kê nhân viên có bằng đại học
select Personnel.P_Name from Personnel where Literacy = N'Tốt Ngiệp Đại Học'

-------Thống kê nhân viên lương trên 4000
SELECT Personnel.P_Name, D_Name, WorkingTime, J_Name, Salary, Position.P_Name FROM Position 
JOIN Salary_Position ON 
Position.PoID = Salary_Position.PoID
JOIN Personnel ON 
Salary_Position.SPoID = Personnel.SPoID
JOIN Job ON 
Personnel.JID = Job.JID
JOIN Department ON Job.DID = Department.DID WHERE Salary > 4000

-- Tìm kiếm tt nhân viên theo ID 
CREATE PROC Search_ID (@PID INT)
AS
BEGIN
     SELECT Personnel.P_Name, D_Name, WorkingTime, J_Name, Salary, Position.P_Name FROM Position 
	JOIN Salary_Position ON 
	Position.PoID = Salary_Position.PoID
	JOIN Personnel ON 
	Salary_Position.SPoID = Personnel.SPoID
	JOIN Job ON 
	Personnel.JID = Job.JID
	JOIN Department ON Job.DID = Department.DID WHERE PID = @PID
END

EXEC Search_ID '1'
--Không thể xóa thông tin nhân viên trên 40 tuổi
CREATE TRIGGER trg_PersonnelDelete ON Personnel FOR DELETE
AS
	BEGIN
	DECLARE @Count INT = 0
	SELECT @Count = COUNT(*) FROM deleted
	WHERE YEAR(GETDATE()) - YEAR(deleted.DateOfBirth) > 40
	IF (@Count > 0)
	BEGIn
	PRINT N'Không thể xóa thông tin nhân viên trên 40 tuổi'
	ROLLBACK TRANSACTION
	END
END
--INSERT NGƯỜI TÊN 40 TUỔI
INSERT INTO Personnel VALUES (N'Trần Văn C','1977-12-12',N'Tốt Ngiệp Đại Học','2019-12-12',1,2)

--
SELECT * FROM Personnel
--XÓA THỬ
DELETE FROM Personnel WHERE PID = 7