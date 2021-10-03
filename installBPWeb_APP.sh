#!/bin/bash
#############################################################################
#                    Main script for BPWeb APP installation                 #
#                                                                           #
#                             Author: Ahmed Bebars                          #
#      for More info call: +201024614238,ahmed.hussien.ali.bebars@gmail.com #
#############################################################################
set -x
#define Main Variable
installPath="/opt/install"
nodeversion="node-v12.22.0"
mysqlversion="mysql-8.0.26-1.el7.x86_64"
#start Create Local repo for installtion
if [ $USER != "root" ]
then
echo "Must be login as root to run this script."
else
#set Linux firewall
firewall-cmd --zone=public --permanent --add-port=3000/tcp
firewall-cmd --zone=public --permanent --add-port=3306/tcp
firewall-cmd --reload
mount_dir="/mnt/disc"
repoversion="BPwebrepo"
if [ -d "$mount_dir" ]; then

	echo $mount_dir exist 

else 
	mkdir -p /mnt/disc
	
fi

mount -o loop /dev/cdrom /mnt/disc

echo -e "
[$repoversion] \n\
name=$repoversion Enterprise Version \n\
baseurl=file:///mnt/disc/ \n\
enabled=1  \n\
gpgcheck=0 "  >> /etc/yum.repos.d/$repoversion.repo

chmod 644 /etc/yum.repos.d/$repoversion.repo
yum clean all
yum repolist enabled


#install pre-requiste RPM
yum -y install gcc gcc-c++ make

if [ -f "$installPath/$nodeversion.tar.gz" ]
then
	tar xvf $installPath/$nodeversion.tar.gz -C $installPath
	cd $installPath/$nodeversion
	yum -y install *.rpm
	if [ $? -eq 0 ]
	then
	npm install -g nodemon
	fi
	
else
	echo "Node Package doesn't exist please check first if it exist"
	exit 1;
fi
#install mysql DataBase
if [ $? -eq 0 ]
then
	tar xvf $installPath/$mysqlversion.rpm-bundle.tar -C $installPath
	cd $installPath
	yum -y install mysql-community*
	systemctl start mysqld
	systemctl enable mysqld
	rootpwd=$(grep 'temporary password' /var/log/mysqld.log | awk -F ':' '{print $4}' | tr -d ' ')
	mysql -u root -p$rootpwd --connect-expired-password <<EOF
	ALTER USER 'root'@'localhost' IDENTIFIED BY 'Nokia_1234';
	DELETE FROM mysql.user WHERE User='';
	DELETE FROM mysql.db WHERE Db='test' OR Db='test\_%';
	FLUSH PRIVILEGES;
EOF
#new root password
rootpwd="Nokia_1234"
database="bankproject"

mysql -u root -p$rootpwd <<EOF
	CREATE DATABASE bankproject;
	CREATE USER 'developer'@'%' IDENTIFIED with mysql_native_password BY 'Systel@1234';
	GRANT ALL PRIVILEGES ON * . * TO 'developer'@'%';
	FLUSH PRIVILEGES;
	SET GLOBAL log_bin_trust_function_creators = 1;

EOF

#start create tables and views and SP
	mysql -u root -p$rootpwd $database <<EOF
CREATE TABLE bankproject.tbl_user (
  userid int NOT NULL AUTO_INCREMENT,
  username varchar(45) DEFAULT NULL,
  password varchar(45) DEFAULT NULL,
  PRIMARY KEY (userid)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO bankproject.tbl_user
(
username,
password)
VALUES
('admin',
'Systel@0987');

CREATE TABLE bankproject.tbl_apinfo (
  Bank_ID int NOT NULL,
  AP_Name varchar(45) DEFAULT NULL,
  AP_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  AP_freq varchar(45) DEFAULT NULL,
  AP_BW varchar(45) DEFAULT NULL,
  AP_Azmith varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  AP_Serial varchar(45) DEFAULT NULL,
  AP_MACAddr varchar(45) DEFAULT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_bankinfo (
  Bank_ID int NOT NULL AUTO_INCREMENT,
  Bank_Name varchar(90) DEFAULT NULL,
  Bank_Branch varchar(90) DEFAULT NULL,
  Bank_Address varchar(200) DEFAULT NULL,
  Bank_GPS varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Zone_ID varchar(45) DEFAULT NULL,
  PRIMARY KEY (Bank_ID)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_camerainfo (
  Bank_ID int NOT NULL,
  camera_name varchar(45) NOT NULL,
  camera_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  camera_Serial varchar(45) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (camera_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_mergeapinfo (
  Bank_ID int NOT NULL,
  AP_Name varchar(45) DEFAULT NULL,
  AP_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  AP_freq varchar(45) DEFAULT NULL,
  AP_BW varchar(45) DEFAULT NULL,
  AP_Azmith varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  AP_Serial varchar(45) DEFAULT NULL,
  AP_MACAddr varchar(45) DEFAULT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_mergebankinfo (
  Bank_ID int DEFAULT NULL,
  Bank_Name varchar(90) DEFAULT NULL,
  Bank_Branch varchar(90) DEFAULT NULL,
  Bank_Address varchar(100) DEFAULT NULL,
  Bank_GPS varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Zone_ID varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_mergecamerainfo (
  Bank_ID int NOT NULL,
  camera_name varchar(45) NOT NULL,
  camera_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  camera_Serial varchar(45) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (camera_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_mergeptpinfo (
  Bank_ID int NOT NULL,
  PTP_Name varchar(45) DEFAULT NULL,
  PTP_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  PTP_freq varchar(45) DEFAULT NULL,
  PTP_BW varchar(45) DEFAULT NULL,
  PTP_Azmith varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  PTP_Serial varchar(45) DEFAULT NULL,
  PTP_MACAddr varchar(45) NOT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (PTP_MACAddr)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_mergesminfo (
  Bank_ID int NOT NULL,
  SM_Name varchar(45) DEFAULT NULL,
  SM_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  SM_Serial varchar(45) DEFAULT NULL,
  SM_MACAddr varchar(45) NOT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (SM_MACAddr)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_mergeswitchinfo (
  Bank_ID int NOT NULL,
  switch_Name varchar(45) DEFAULT NULL,
  switch_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  switch_Serial varchar(45) NOT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  configfile varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (switch_Serial)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_ptpinfo (
  Bank_ID int NOT NULL,
  PTP_Name varchar(45) DEFAULT NULL,
  PTP_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  PTP_freq varchar(45) DEFAULT NULL,
  PTP_BW varchar(45) DEFAULT NULL,
  PTP_Azmith varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  PTP_Serial varchar(45) DEFAULT NULL,
  PTP_MACAddr varchar(45) NOT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (PTP_MACAddr)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_sminfo (
  Bank_ID int NOT NULL,
  SM_Name varchar(45) DEFAULT NULL,
  SM_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  SM_Serial varchar(45) DEFAULT NULL,
  SM_MACAddr varchar(45) NOT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (SM_MACAddr)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_switchinfo (
  Bank_ID int NOT NULL,
  switch_Name varchar(45) DEFAULT NULL,
  switch_IP varchar(45) DEFAULT NULL,
  Status varchar(45) DEFAULT NULL,
  SW_Version varchar(45) DEFAULT NULL,
  Note varchar(100) DEFAULT NULL,
  switch_Serial varchar(45) NOT NULL,
  CivilWork varchar(100) DEFAULT NULL,
  configfile varchar(100) DEFAULT NULL,
  insertedby varchar(45) DEFAULT NULL,
  inseration_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (switch_Serial)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE bankproject.tbl_zoneinfo (
  Zone_ID int DEFAULT NULL,
  Zone_Name varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO bankproject.tbl_zoneinfo
(
Zone_ID,
Zone_Name)
VALUES
('1',
'Cairo');

CREATE VIEW vw_apinfo AS select bank.Bank_Name AS Bank_Name,bank.Bank_Branch AS Bank_Branch,tbl_apinfo.AP_Name AS AP_Name,tbl_apinfo.AP_IP AS AP_IP,tbl_apinfo.Status AS Status,tbl_apinfo.SW_Version AS SW_Version,tbl_apinfo.AP_freq AS AP_freq,tbl_apinfo.AP_BW AS AP_BW,tbl_apinfo.AP_Azmith AS AP_Azmith,tbl_apinfo.Note AS Note,tbl_apinfo.AP_Serial AS AP_Serial,tbl_apinfo.AP_MACAddr AS AP_MACAddr,tbl_apinfo.CivilWork AS CivilWork,tbl_apinfo.insertedby AS insertedby,tbl_apinfo.inseration_date AS inseration_date from (tbl_apinfo join tbl_bankinfo bank on((bank.Bank_ID = tbl_apinfo.Bank_ID)));

CREATE VIEW vw_bankdata AS select bank.Bank_Name AS Bank_Name,bank.Bank_Branch AS Bank_Branch,bank.Bank_Address AS Bank_Address,zone.Zone_Name AS Zone_Name from (tbl_bankinfo bank join tbl_zoneinfo zone on((bank.Zone_ID = zone.Zone_ID)));


CREATE VIEW vw_statusreport AS select bank.Bank_Name AS Bank_Name,bank.Bank_Branch AS Bank_Branch,bank.Bank_Address AS Bank_Address,zone.Zone_Name AS Zone_Name,concat(sm.SM_Name,'||',sm.Status) AS SM_Status,concat(ptp.PTP_Name,'||',ptp.Status) AS PTP_Status,concat(ap.AP_Name,'||',ap.Status) AS AP_Status,concat(sw.switch_Name,'||',sw.Status) AS Switch_Status,concat(cam.camera_name,'||',cam.Status) AS camera_Status,concat(cam.Note,' ',sm.Note,' ',ptp.Note,' ',ap.Note,' ',sw.Note) AS note from ((((((tbl_bankinfo bank join tbl_zoneinfo zone on((bank.Zone_ID = zone.Zone_ID))) left join tbl_sminfo sm on((sm.Bank_ID = bank.Bank_ID))) left join tbl_ptpinfo ptp on((ptp.Bank_ID = bank.Bank_ID))) left join tbl_apinfo ap on((ap.Bank_ID = bank.Bank_ID))) left join tbl_switchinfo sw on((sw.Bank_ID = bank.Bank_ID))) left join tbl_camerainfo cam on((cam.Bank_ID = bank.Bank_ID))) where (concat(sm.SM_Name,'||',sm.Status) is not null);


CREATE VIEW vw_smdata AS select bank.Bank_Name AS Bank_Name,bank.Bank_Branch AS Bank_Branch,bank.Bank_Address AS Bank_Address,zone.Zone_Name AS Zone_Name,sminfo.SM_IP AS SM_IP,sminfo.SM_Serial AS SM_Serial,sminfo.SM_MACAddr AS SM_MACAddr from ((tbl_sminfo sminfo join tbl_bankinfo bank on((bank.Bank_ID = sminfo.Bank_ID))) join tbl_zoneinfo zone on((zone.Zone_ID = bank.Zone_ID)));

DELIMITER \$\$
CREATE DEFINER=root@localhost FUNCTION bankproject.fn_returnbankid(bankname VARCHAR(90),bankbranch VARCHAR(90)) RETURNS int
BEGIN
	    DECLARE bankID INT;
        SELECT Bank_ID INTO bankID
        FROM bankproject.tbl_bankinfo
        WHERE Bank_Branch = bankbranch
        AND Bank_Name = bankname; 
        return bankID;
END\$\$
DELIMITER ;


DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_insertintoapinfo(IN apName VARCHAR(45),apip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), apserial VARCHAR(45), macaddress VARCHAR(45), civil VARCHAR(100),apfreq VARCHAR(45),apbw VARCHAR(45),apazmith VARCHAR(45), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
        truncate table tbl_mergeapinfo;
		set bankid = fn_returnbankid(bankname,bankbranch);
        INSERT INTO tbl_mergeapinfo (Bank_ID,AP_Name,AP_IP,Status,SW_Version,Note,AP_Serial,AP_MACAddr,CivilWork,AP_freq,AP_BW,AP_Azmith) VALUES (bankid,apName,apip,status,swversion,note,apserial,macaddress,civil,apfreq,apbw,apazmith);
        REPLACE
	   INTO tbl_apinfo
			select merg.BANK_ID,
			CASE when ap.AP_Name = '' OR ap.AP_Name IS NULL Then merg.AP_NAME
			else ap.AP_Name
			END as AP_NAME,
			CASE when ap.AP_IP = '' OR ap.AP_IP IS NULL Then merg.AP_IP
			else ap.AP_IP
			END as AP_IP,
			CASE when ap.status = '' OR ap.status IS NULL Then merg.Status
			else ap.status
			END as status,
			CASE when ap.SW_Version = '' OR ap.SW_Version IS NULL Then merg.SW_Version
			else ap.SW_Version
			END as SW_Version,
			CASE when ap.AP_freq = '' OR ap.AP_freq IS NULL Then merg.AP_freq
			else ap.AP_freq
			END as AP_freq,
			CASE when ap.AP_BW = '' OR ap.AP_BW IS NULL Then merg.AP_BW
			else ap.AP_BW
			END as AP_BW,
			CASE when ap.AP_Azmith = '' OR ap.AP_Azmith IS NULL Then merg.AP_Azmith
			else ap.AP_Azmith
			END as AP_Azmith,
			CASE when ap.Note = '' OR ap.Note IS NULL Then merg.Note
			else ap.Note
			END as Note,
			CASE when ap.AP_Serial = '' OR ap.AP_Serial IS NULL Then merg.AP_Serial
			else ap.AP_Serial
			END as AP_Serial,
			CASE when ap.AP_MACAddr = '' OR ap.AP_MACAddr IS NULL Then merg.AP_MACAddr
			else ap.AP_MACAddr
			END as AP_MACAddr,
			CASE when ap.CivilWork = '' OR ap.CivilWork IS NULL Then merg.CivilWork
			else ap.CivilWork
			END as CivilWork,
			merg.insertedby,
			merg.inseration_date
			from  bankproject.tbl_mergeapinfo merg
			left join bankproject.tbl_apinfo  ap
			on ap.AP_MACAddr = merg.AP_MACAddr
			AND ap.AP_Name = merg.AP_Name

		  ;

END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_insertintoBankinfo(IN bankname VARCHAR(90),bankbranch VARCHAR(90),bankaddress VARCHAR(100),bankgps VARCHAR(100),zonename VARCHAR(45))
BEGIN
		Declare zoneid varchar(45);
        truncate table tbl_mergebankinfo;
		SELECT Zone_ID 
		INTO zoneid
		FROM tbl_zoneinfo
        where Zone_Name = zonename;
        INSERT INTO tbl_mergebankinfo (Bank_Name,Bank_Branch,Bank_Address,Bank_GPS,Zone_ID) VALUES (bankname,bankbranch,bankaddress,bankgps,zoneid);
        if exists (select 1 from tbl_bankinfo where Bank_Name=bankname and Bank_Branch = bankbranch)
        Then
        update tbl_bankinfo bank, tbl_mergebankinfo merg
        SET 
			bank.Bank_Name = merg.Bank_Name,
			bank.Bank_Branch = merg.Bank_Branch,
			bank.Bank_Address = merg.Bank_Address,
			bank.Bank_GPS = merg.Bank_GPS,
            bank.insertedby = merg.insertedby,
			bank.inseration_date = merg.inseration_date,
			bank.Zone_ID = merg.Zone_ID
            Where merg.Bank_Name = bank.Bank_Name
            and merg.Bank_Branch = bank.Bank_Branch;
            else
		          INSERT INTO tbl_bankinfo
			SELECT * FROM tbl_mergebankinfo;
          
          END IF;

END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_insertintocamerainfo(IN cameraName VARCHAR(45),cameraip VARCHAR(45),status VARCHAR(45),note VARCHAR(100), cameraserial VARCHAR(45), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
        truncate table tbl_mergecamerainfo;
		set bankid = fn_returnbankid(bankname,bankbranch);
        INSERT INTO tbl_mergecamerainfo (Bank_ID,camera_Name,camera_IP,Status,Note,camera_Serial) VALUES (bankid,cameraName,cameraip,status,note,cameraserial);
		REPLACE
	   INTO tbl_camerainfo
			select merg.BANK_ID,
			CASE when camera.camera_Name = '' OR camera.camera_Name IS NULL Then merg.camera_Name
			else camera.camera_Name
			END as camera_Name,
			CASE when camera.camera_IP = '' OR camera.camera_IP IS NULL Then merg.camera_IP
			else camera.camera_IP
			END as camera_IP,
			CASE when camera.status = '' OR camera.status IS NULL  Then merg.Status
			else camera.status
			END as status,
			CASE when camera.Note = '' OR camera.Note IS NULL Then merg.Note
			else camera.Note
			END as Note,
			CASE when camera.camera_Serial = '' OR  camera.camera_Serial IS NULL Then merg.camera_Serial
			else camera.camera_Serial
			END as camera_Serial,
			merg.insertedby,
			merg.inseration_date
			from  bankproject.tbl_mergecamerainfo merg
			left join bankproject.tbl_camerainfo  camera
			on camera.camera_Name = merg.camera_Name
		  ;
END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_insertintoptpinfo(IN ptpName VARCHAR(45),ptpip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), ptpserial VARCHAR(45), macaddress VARCHAR(45), civil VARCHAR(100),ptpfreq VARCHAR(45),ptpbw VARCHAR(45),ptpazmith VARCHAR(45), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
        truncate table tbl_mergeptpinfo;
		set bankid = fn_returnbankid(bankname,bankbranch);
        INSERT INTO tbl_mergeptpinfo (Bank_ID,PTP_Name,PTP_IP,Status,SW_Version,Note,PTP_Serial,PTP_MACAddr,CivilWork,PTP_freq,PTP_BW,PTP_Azmith) VALUES (bankid,ptpName,ptpip,status,swversion,note,ptpserial,macaddress,civil,ptpfreq,ptpbw,ptpazmith);
        if exists (select 1 from tbl_ptpinfo where Bank_ID=bankid and PTP_NAME = ptpName)
        Then
		REPLACE
	   INTO tbl_ptpinfo
			select merg.BANK_ID,
			CASE when ptp.ptp_Name = '' OR ptp.ptp_Name IS NULL Then merg.PTP_NAME
			else ptp.ptp_Name
			END as PTP_NAME,
			CASE when ptp.ptp_IP = '' OR ptp.ptp_IP IS NULL Then merg.PTP_IP
			else ptp.ptp_IP
			END as PTP_IP,
			CASE when ptp.status = '' OR ptp.status IS NULL Then merg.Status
			else ptp.status
			END as status,
			CASE when ptp.SW_Version = '' OR ptp.SW_Version IS NULL Then merg.SW_Version
			else ptp.SW_Version
			END as SW_Version,
			CASE when ptp.PTP_freq = '' OR ptp.PTP_freq IS NULL Then merg.PTP_freq
			else ptp.PTP_freq
			END as PTP_freq,
			CASE when ptp.PTP_BW = '' OR ptp.PTP_BW IS NULL Then merg.PTP_BW
			else ptp.PTP_BW
			END as PTP_BW,
			CASE when ptp.PTP_Azmith = '' OR ptp.PTP_Azmith IS NULL Then merg.PTP_Azmith
			else ptp.PTP_Azmith
			END as PTP_Azmith,
			CASE when ptp.Note = '' OR ptp.Note IS NULL Then merg.Note
			else ptp.Note
			END as Note,
			CASE when ptp.PTP_Serial = '' OR ptp.PTP_Serial IS NULL Then merg.PTP_Serial
			else ptp.PTP_Serial
			END as PTP_Serial,
			CASE when ptp.PTP_MACAddr = '' OR ptp.PTP_MACAddr IS NULL Then merg.PTP_MACAddr
			else ptp.PTP_MACAddr
			END as PTP_MACAddr,
			CASE when ptp.CivilWork = '' OR ptp.CivilWork IS NULL Then merg.CivilWork
			else ptp.CivilWork
			END as CivilWork,
			merg.insertedby,
			merg.inseration_date
			from  bankproject.tbl_mergeptpinfo merg
			left join bankproject.tbl_ptpinfo  ptp
			on ptp.PTP_MACAddr = merg.PTP_MACAddr
            AND ptp.PTP_Name = merg.PTP_Name;
          ELSE
          INSERT INTO tbl_ptpinfo
			SELECT * FROM tbl_mergeptpinfo;
          
          END IF;
END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_insertintosminfo(IN smName VARCHAR(45),smip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), smserial VARCHAR(45), macaddress VARCHAR(45), civil VARCHAR(100), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
        truncate table tbl_mergesminfo;
		set bankid = fn_returnbankid(bankname,bankbranch);
        INSERT INTO tbl_mergesminfo (Bank_ID,SM_Name,SM_IP,Status,SW_Version,Note,SM_Serial,SM_MACAddr,CivilWork) VALUES (bankid,smName,smip,status,swversion,note,smserial,macaddress,civil);
        REPLACE
	   INTO tbl_sminfo
			select merg.BANK_ID,
			CASE when sm.SM_Name = '' OR sm.SM_Name IS NULL Then merg.SM_NAME
			else sm.SM_Name
			END as SM_NAME,
			CASE when sm.SM_IP = '' OR sm.SM_IP IS NULL Then merg.SM_IP
			else sm.SM_IP
			END as SM_IP,
			CASE when sm.status = '' OR sm.status IS NULL  Then merg.Status
			else sm.status
			END as status,
			CASE when sm.SW_Version = '' OR sm.SW_Version  IS NULL Then merg.SW_Version
			else sm.SW_Version
			END as SW_Version,
			CASE when sm.Note = '' OR sm.Note IS NULL Then merg.Note
			else sm.Note
			END as Note,
			CASE when sm.SM_Serial = '' OR  sm.SM_Serial IS NULL Then merg.SM_Serial
			else sm.SM_Serial
			END as SM_Serial,
			CASE when sm.SM_MACAddr = '' OR sm.SM_MACAddr IS NULL Then merg.SM_MACAddr
			else sm.SM_MACAddr
			END as SM_MACAddr,
			CASE when sm.CivilWork = ''  OR sm.CivilWork IS NULL Then merg.CivilWork
			else sm.CivilWork
			END as CivilWork,
			merg.insertedby,
			merg.inseration_date
			from  bankproject.tbl_mergesminfo merg
			left join bankproject.tbl_sminfo  sm
			on sm.SM_MACAddr = merg.SM_MACAddr
		  ;

END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_insertintoswitchinfo(IN switchName VARCHAR(45),switchip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), switchserial VARCHAR(45),civil VARCHAR(100),configfile VARCHAR(100), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
        truncate table tbl_mergeswitchinfo;
		set bankid = fn_returnbankid(bankname,bankbranch);
        INSERT INTO tbl_mergeswitchinfo (Bank_ID,switch_Name,switch_IP,Status,SW_Version,Note,switch_Serial,CivilWork,configfile) VALUES (bankid,switchName,switchip,status,swversion,note,switchserial,civil,configfile);
		REPLACE
	   INTO tbl_switchinfo
			select merg.BANK_ID,
			CASE when switch.switch_Name = '' OR switch.switch_Name IS NULL Then merg.switch_Name
			else switch.switch_Name
			END as switch_Name,
			CASE when switch.switch_IP = '' OR switch.switch_IP IS NULL Then merg.switch_IP
			else switch.switch_IP
			END as switch_IP,
			CASE when switch.status = '' OR switch.status IS NULL  Then merg.Status
			else switch.status
			END as status,
			CASE when switch.SW_Version = '' OR switch.SW_Version  IS NULL Then merg.SW_Version
			else switch.SW_Version
			END as SW_Version,
			CASE when switch.Note = '' OR switch.Note IS NULL Then merg.Note
			else switch.Note
			END as Note,
			CASE when switch.switch_Serial = '' OR  switch.switch_Serial IS NULL Then merg.switch_Serial
			else switch.switch_Serial
			END as switch_Serial,
			CASE when switch.CivilWork = ''  OR switch.CivilWork IS NULL Then merg.CivilWork
			else switch.CivilWork
			END as CivilWork,
			CASE when switch.configfile = ''  OR switch.configfile IS NULL Then merg.configfile
			else switch.configfile
			END as configfile,
			merg.insertedby,
			merg.inseration_date
			from  bankproject.tbl_mergeswitchinfo merg
			left join bankproject.tbl_switchinfo  switch
			on switch.switch_Serial = merg.switch_Serial
            AND switch.switch_Name = merg.switch_Name
		  ;
END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_updateapinfo(IN apName VARCHAR(45),apip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), apserial VARCHAR(45), macaddress VARCHAR(45), civil VARCHAR(100),apfreq VARCHAR(45),apbw VARCHAR(45),apazmith VARCHAR(45), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
		set bankid = fn_returnbankid(bankname,bankbranch);
        update tbl_apinfo
			set AP_Name = apName,
			AP_IP = apip,
			status = status,
			SW_Version = swversion,
            AP_freq = apfreq,
            AP_BW = apbw,
            AP_Azmith = apazmith,
			Note = note,
			AP_Serial = apserial,
			CivilWork = civil
			where Bank_ID = bankid
            AND AP_MACAddr = macaddress
		  ;

END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_updatecamerainfo(IN cameraName VARCHAR(45),cameraip VARCHAR(45),status VARCHAR(45),note VARCHAR(100), cameraserial VARCHAR(45), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
		set bankid = fn_returnbankid(bankname,bankbranch);
        update tbl_camerainfo
			set 
			camera_IP = cameraip,
			status = status,
			Note = note,
			camera_Serial = cameraserial
			where Bank_ID = bankid
            AND  camera_Name = cameraName
		  ;

END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_updateptpinfo(IN ptpName VARCHAR(45),ptpip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), ptpserial VARCHAR(45), macaddress VARCHAR(45), civil VARCHAR(100),ptpfreq VARCHAR(45),ptpbw VARCHAR(45),ptpazmith VARCHAR(45), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
		set bankid = fn_returnbankid(bankname,bankbranch);
        update tbl_ptpinfo
			set PTP_Name = ptpName,
			PTP_IP = ptpip,
			status = status,
			SW_Version = swversion,
            PTP_freq = ptpfreq,
            PTP_BW = ptpbw,
            PTP_Azmith = ptpazmith,
			Note = note,
			PTP_Serial = ptpserial,
			CivilWork = civil
			where Bank_ID = bankid
            AND PTP_MACAddr = macaddress
		  ;

END\$\$
DELIMITER ;

DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_updatesminfo(IN smName VARCHAR(45),smip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), smserial VARCHAR(45), macaddress VARCHAR(45), civil VARCHAR(100), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
		set bankid = fn_returnbankid(bankname,bankbranch);
        update tbl_sminfo
			set Bank_ID = bankid,
            SM_Name = smName,
			SM_IP = smip,
			status = status,
			SW_Version = swversion,
			Note = note,
			SM_Serial = smserial,
			CivilWork = civil
			where SM_MACAddr = macaddress
		  ;

END\$\$
DELIMITER ;


DELIMITER \$\$
CREATE DEFINER=root@localhost PROCEDURE bankproject.sp_updateswitchinfo(IN switchName VARCHAR(45),switchip VARCHAR(45),status VARCHAR(45),swversion VARCHAR(45),note VARCHAR(100), switchserial VARCHAR(45),civil VARCHAR(100), bankname VARCHAR(90), bankbranch VARCHAR(90))
BEGIN
		Declare bankid varchar(45);
		set bankid = fn_returnbankid(bankname,bankbranch);
        update tbl_switchinfo
			set switch_Name = switchName,
			switch_IP = switchip,
			status = status,
			SW_Version = swversion,
			Note = note,
			CivilWork = civil
			where Bank_ID = bankid
            AND  switch_Serial = switchserial
		  ;

END\$\$
DELIMITER ;

EOF
else
	echo "DB installation Fail"
	exit 1;
fi

if [ $? -eq 0 ]
then
	mkdir -p /opt/web/bankproject/
	tar xvf $installPath/bankproject.tar.gz -C /opt/web/bankproject/
	cd /opt/web/bankproject/BPWeb
	npm install
	
echo -e "
#!/bin/bash
#############################################################################
#                    start Bankproject web   Server                         #
#                    COPYRIGHT (C) Ahmed Bebars , Egypt                     #
#                    Author: Ahmed Bebars                                   #
#                   for More info call: +201024614238                       #
#############################################################################
logpath='/var/log'
nodemon /opt/web/bankproject/BPWeb/server.js 2>>$logpath/bpweberr.log 1>>$logpath/bpwebout.log"  >> /opt/web/bankproject/serverstart.sh
	
echo -e "
[Unit]
Description=start systel Bank Project web
After=mysql.service
[Service]
User=root
WorkingDirectory=/opt/web/bankproject/
ExecStart=/opt/web/bankproject/serverstart.sh
Restart=always

[Install]
WantedBy=multi-user.target"  >> /etc/systemd/system/bpwebd.service
systemctl daemon-reload
systemctl start bpwebd.service
systemctl enable bpwebd.service
fi

fi

