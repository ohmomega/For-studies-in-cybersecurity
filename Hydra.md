# Hydra - Write up For education

[English Version](#english-version) | [🇹🇭 ภาษาไทย](#ภาษาไทย)


## English Version

**Credit:**[TryHackme - Hydra](https://tryhackme.com/room/hydra)

<img width="1914" height="947" alt="image" src="https://github.com/user-attachments/assets/6ba90672-08fd-401c-9086-a02366f58d31" />


---

## Task 1 Hydra Introduction

What is Hydra?
--

Hydra is a brute force online password cracking program, a quick system login password “hacking” tool.

<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/dde33686-655d-492c-b69e-0b728cf8a9bf" />


Hydra can run through a list and “brute force” some authentication services. Imagine trying to manually guess someone’s password on a particular service (SSH, Web Application Form, FTP or SNMP) - we can use Hydra to run through a password list and speed this process up for us, determining the correct password.

According to its official repository, Hydra supports, i.e., has the ability to brute force the following protocols: “Asterisk, AFP, Cisco AAA, Cisco auth, Cisco enable, CVS, Firebird, FTP, HTTP-FORM-GET, HTTP-FORM-POST, HTTP-GET, HTTP-HEAD, HTTP-POST, HTTP-PROXY, HTTPS-FORM-GET, HTTPS-FORM-POST, HTTPS-GET, HTTPS-HEAD, HTTPS-POST, HTTP-Proxy, ICQ, IMAP, IRC, LDAP, MEMCACHED, MONGODB, MS-SQL, MYSQL, NCP, NNTP, Oracle Listener, Oracle SID, Oracle, PC-Anywhere, PCNFS, POP3, POSTGRES, Radmin, RDP, Rexec, Rlogin, Rsh, RTSP, SAP/R3, SIP, SMB, SMTP, SMTP Enum, SNMP v1+v2+v3, SOCKS5, SSH (v1 and v2), SSHKEY, Subversion, TeamSpeak (TS2), Telnet, VMware-Auth, VNC and XMPP.”

For more information on the options of each protocol in Hydra, you can check the Kali Hydra tool page.

This shows the importance of using a strong password; if your password is common, doesn’t contain special characters and is not above eight characters, it will be prone to be guessed. A one-hundred-million-password list contains common passwords, so when an out-of-the-box application uses an easy password to log in, change it from the default! CCTV cameras and web frameworks often use admin:password as the default login credentials, which is obviously not strong enough.

## Advantages and limitations of Hydra

Advantages of Hydra

1. Supports multiple protocols/services (SSH, FTP, HTTP forms, SMB, MSSQL, etc.) → Very flexible

2. Fast and can run multi-threaded (-t) to speed up password testing

3. Supports username/password lists (files), username lists (-L), or password lists (-P)

4. Ideal for online demonstrations/penetration tests (immediate results)

5. Easily scriptable/automated (shell scripts)

Hydra's limitations

1. These attacks are online — so they are easily detected (IDS/IPS, rate limits, and logs).

2. Risks account lockouts or potential DoS (Dosage if too many threads are used).

3. Not suitable for MFA (two-factor authentication) or key-based SSH (passwordless).

4. Some websites use CSRF tokens, dynamic form fields, and complex JavaScript, requiring the correct headers, cookies, and CSRF tokens for http-post-forms. Hydra is not easily able to detect these cases.

5. If you want to attack with masked rules, variations, or a very large keyspace offline, it's better to use hashcat:<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/3f336b6c-e3d1-4b29-971f-762bd8a78172" />
 / john: <img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/000bee2f-2789-4aa1-9e0a-0a36b83beeb4" />
 (which cracks hashes offline).

6. Using very large wordlists will require significant time and bandwidth.


Installing Hydra
--
Hydra is already installed on the AttackBox. You can access it by clicking on the Start AttackBox button.

If you prefer to use the in-browser Kali machine, Hydra also comes pre-installed, as is the case with all Kali distributions. You can access it by selecting Use Kali Linux and clicking on Start Kali Linux button.

However, you can check its official repositories if you prefer to use another Linux distribution. For instance, you can install Hydra on an Ubuntu or Fedora system by executing apt install hydra or dnf install hydra. Furthermore, you can download it from its official [THC-Hydra repository](https://github.com/vanhauser-thc/thc-hydra).

---
## Task 2 Using Hydra

Start the AttackBox by pressing the Start AttackBox button at the top of this page. The AttackBox machine will start in Split-Screen view. If it is not visible, use the blue Show Split View button at the top of the page.

Press the green Start Machine button below to deploy the machine attached to this task, then navigate to http://MACHINE_IP on the AttackBox (this machine can take up to 3 minutes to boot)

<img width="153" height="34" alt="image" src="https://github.com/user-attachments/assets/c00c4180-ba16-4255-a30a-2cd02ed87674" />

Hydra Commands
--
The options we pass into Hydra depend on which service (protocol) we’re attacking. For example, if we wanted to brute force FTP with the username being <img width="39" height="31" alt="image" src="https://github.com/user-attachments/assets/65199225-2b99-421b-ab29-cf55515e028b" />
 and a password list being <img width="101" height="19" alt="image" src="https://github.com/user-attachments/assets/8a06add1-0dbc-4db3-9779-19edf2fd04e9" />
, we’d use the following command:

<img width="362" height="25" alt="image" src="https://github.com/user-attachments/assets/299ea20a-d727-40f3-b532-ad3794d82aaa" />


For this deployed machine, here are the commands to use Hydra on SSH and a web form (POST method).

SSH
--

<img width="485" height="29" alt="image" src="https://github.com/user-attachments/assets/8bb862ad-8f8f-4375-861c-d2686a543e66" />


| Option | Description | 
|:------------------|:------------------:| 
| -l | specifies the (SSH) username for login |
|-P | indicates a list of passwords | 
| -t | sets the number of threads to spawn|

For example, <img width="396" height="24" alt="image" src="https://github.com/user-attachments/assets/ac25db92-4cf2-4f18-b40f-88673f659507" /> will run with the following arguments:

1. Hydra will use root as the username for ssh

2. It will try the passwords in the passwords.txt file

3. There will be four threads running in parallel as indicated by -t 4

Post Web Form
--

We can use Hydra to brute force web forms too. You must know which type of request it is making; GET or POST methods are commonly used. You can use your browser’s network tab (in developer tools) to see the request types or view the source code.

<img width="828" height="26" alt="image" src="https://github.com/user-attachments/assets/0b7b26c5-1c84-467e-8ff2-aa3e9f78d9b3" />


| Option | Description | 
|:------------------|:------------------:| 
| -l | username for (web form) login  |
| -P | the password list to use | 
| http-post-form | the type of the form is POST|
| <img width="56" height="26" alt="image" src="https://github.com/user-attachments/assets/c2a634ed-8bd6-4c83-8f27-9e541e3e4c6e" />| the login page URL, for example, login.php |
| <login_credentials> | the username and password used to log in, for example, username=^USER^&password=^PASS^ |
| <invalid_response> | part of the response when the login fails |
| -V | verbose output for every attempt |

Below is a more concrete example Hydra command to brute force a POST login form:

<img width="861" height="28" alt="image" src="https://github.com/user-attachments/assets/1f5c578a-b94d-4efb-a5da-b3061c8ddde1" />

1. The login page is only /, i.e., the main IP address.

2. The username is the form field where the username is entered

3. The specified username(s) will replace ^USER^

4. The password is the form field where the password is entered

5. The provided passwords will be replacing ^PASS^

Finally, F=incorrect is a string that appears in the server reply when the login fails

You should now have enough information to put this to practice and brute force your credentials to the deployed machine!

Answer the questions below
--
1. Use Hydra to bruteforce molly's web password. What is flag 1?

Hints: If you've tried more than 30 passwords from RockYou.txt, you are doing something wrong!

2. Use Hydra to bruteforce molly's SSH password. What is flag 2?

---
May the force be with you.

## ภาษาไทย

[English Version](#english-version) | [🇹🇭 ภาษาไทย](#ภาษาไทย)

**เครดิต:**[TryHackme - Hydra](https://tryhackme.com/room/hydra)

<img width="1914" height="947" alt="image" src="https://github.com/user-attachments/assets/6ba90672-08fd-401c-9086-a02366f58d31" />

---

## งานที่ 1 บทนำ Hydra

Hydra คืออะไร
--

Hydra คือโปรแกรมถอดรหัสรหัสผ่านออนไลน์แบบบรูทฟอร์ซ ซึ่งเป็นเครื่องมือ "แฮ็ก" รหัสผ่านเข้าสู่ระบบอย่างรวดเร็ว 

<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/8e4e93b5-7644-4232-b138-97a1bdb9c65d" />


Hydra สามารถรันผ่านรายการและ "บรูทฟอร์ซ" บริการตรวจสอบสิทธิ์บางอย่างได้ ลองนึกภาพการลองเดารหัสผ่านของใครบางคนด้วยตนเองในบริการเฉพาะ (SSH, Web Application Form, FTP หรือ SNMP) เราสามารถใช้ Hydra รันผ่านรายการรหัสผ่านและเร่งกระบวนการนี้ให้เรา เพื่อค้นหารหัสผ่านที่ถูกต้อง

ตามข้อมูลจากที่เก็บข้อมูลอย่างเป็นทางการ Hydra รองรับโปรโตคอลต่อไปนี้: Asterisk, AFP, Cisco AAA, Cisco auth, Cisco enable, CVS, Firebird, FTP, HTTP-FORM-GET, HTTP-FORM-POST, HTTP-GET, HTTP-HEAD, HTTP-POST, HTTP-PROXY, HTTPS-FORM-GET, HTTPS-FORM-POST, HTTPS-GET, HTTPS-HEAD, HTTPS-POST, HTTP-Proxy, ICQ, IMAP, IRC, LDAP, MEMCACHED, MONGODB, MS-SQL, MYSQL, NCP, NNTP, Oracle Listener, Oracle SID, Oracle, PC-Anywhere, PCNFS, POP3, POSTGRES, Radmin, RDP, Rexec, Rlogin, Rsh, RTSP, SAP/R3, SIP, SMB, SMTP, SMTP Enum, SNMP v1+v2+v3, SOCKS5, SSH (v1 และ v2), SSHKEY, Subversion, TeamSpeak (TS2), Telnet, VMware-Auth, VNC และ XMPP”

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับตัวเลือกของแต่ละโปรโตคอลใน Hydra คุณสามารถดูหน้าเครื่องมือ Kali Hydra ได้

สิ่งนี้แสดงให้เห็นถึงความสำคัญของการใช้รหัสผ่านที่แข็งแกร่ง หากรหัสผ่านของคุณเป็นรหัสผ่านทั่วไป ไม่มีอักขระพิเศษ และไม่เกินแปดตัวอักษร รหัสผ่านนั้นจะถูกเดาได้ง่าย รายการรหัสผ่านหนึ่งร้อยล้านรหัสประกอบด้วยรหัสผ่านทั่วไป ดังนั้นเมื่อแอปพลิเคชันที่ใช้งานได้ทันทีใช้รหัสผ่านที่ง่ายในการเข้าสู่ระบบ ให้เปลี่ยนจากค่าเริ่มต้น! กล้องวงจรปิดและเฟรมเวิร์กเว็บมักใช้ admin:password เป็นข้อมูลรับรองการเข้าสู่ระบบเริ่มต้น ซึ่งเห็นได้ชัดว่าไม่แข็งแกร่งพอ

## ข้อดีและข้อจำกัดของไฮดรา

ข้อดีของไฮดรา

1. รองรับ โปรโตคอล/บริการหลายชนิด (SSH, FTP, HTTP forms, SMB, MSSQL ฯลฯ) → ยืดหยุ่นมาก

2. เร็ว และสามารถรันแบบ multi-threaded (-t) เพื่อเพิ่มความเร็วในการลอง password

3. รองรับ username/password lists (ไฟล์), username list (-L) หรือ password list (-P)

4. เหมาะสำหรับการสาธิต/penetration-test แบบ online (เห็นผลจริงทันที)

5. สามารถ script/automate ได้ง่าย (shell scripts)

ข้อจำกัดของไฮดรา

1. เป็นการโจมตีแบบ online — ดังนั้นจะถูกตรวจจับได้ง่าย (IDS/IPS, rate limit, logs)

2. เสี่ยงล็อกบัญชี หรือทำระบบใช้งานจริงเกิดปัญหา (DoS ถ้าใช้ threads มากเกินไป)

3. ไม่ดีเมื่อมี MFA (two-factor) หรือเมื่อระบบใช้ key-based SSH (ไม่มีรหัสผ่าน)

4. บางเว็บใช้ CSRF token, dynamic form fields, complex JavaScript ทำให้ http-post-form ต้องตั้งค่า headers/cookies/CSRF token ให้ถูก — Hydra จับบางกรณีไม่ได้ง่าย ๆ

5. หากต้องการ attack แบบ masked rules/variations/very large keyspace แบบ offline จะดีกว่าใช้ hashcat: <img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/3f336b6c-e3d1-4b29-971f-762bd8a78172" />
/john:<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/000bee2f-2789-4aa1-9e0a-0a36b83beeb4" /> (ซึ่งเป็น offline cracking ของ hash)

6. ถ้าใช้ wordlist ขนาดใหญ่มาก จะใช้เวลาและ bandwidth สูง





การติดตั้ง Hydra
--
Hydra ได้รับการติดตั้งไว้ใน AttackBox แล้ว คุณสามารถเข้าถึงได้โดยคลิกที่ปุ่ม Start AttackBox

หากคุณต้องการใช้เครื่อง Kali ในเบราว์เซอร์ Hydra ก็ติดตั้งมาให้ล่วงหน้า เช่นเดียวกับ Kali ทุกเวอร์ชัน คุณสามารถเข้าถึงได้โดยเลือก "ใช้ Kali Linux" และคลิกปุ่ม "เริ่ม Kali Linux"

อย่างไรก็ตาม คุณสามารถตรวจสอบคลังเก็บอย่างเป็นทางการของ Hydra ได้ หากต้องการใช้ Linux เวอร์ชันอื่น ตัวอย่างเช่น คุณสามารถติดตั้ง Hydra บนระบบ Ubuntu หรือ Fedora ได้โดยการรันคำสั่ง apt install hydra หรือ dnf install hydra นอกจากนี้ คุณยังสามารถดาวน์โหลด Hydra จากคลังเก็บอย่างเป็นทางการได้อีกด้วย

---

## งานที่ 2 การใช้ Hydra

เริ่มต้น AttackBox โดยกดปุ่ม Start AttackBox ที่ด้านบนของหน้านี้ เครื่อง AttackBox จะเริ่มทำงานในมุมมองแบบแยกหน้าจอ หากมองไม่เห็น ให้ใช้ปุ่ม Show Split View สีน้ำเงินที่ด้านบนของหน้านี้

กดปุ่ม Start Machine สีเขียวด้านล่างเพื่อติดตั้งเครื่องที่เชื่อมต่อกับงานนี้ จากนั้นไปที่ http://MACHINE_IP บน AttackBox (เครื่องนี้อาจใช้เวลาบูตสูงสุด 3 นาที)

<img width="153" height="34" alt="image" src="https://github.com/user-attachments/assets/c00c4180-ba16-4255-a30a-2cd02ed87674" />

คำสั่ง Hydra
--
ตัวเลือกที่ส่งไปยัง Hydra ขึ้นอยู่กับบริการ (โปรโตคอล) ที่เรากำลังโจมตี ตัวอย่างเช่น หากเราต้องการใช้ FTP แบบ Brute Force โดยใช้ชื่อผู้ใช้เป็น <img width="39" height="31" alt="image" src="https://github.com/user-attachments/assets/65199225-2b99-421b-ab29-cf55515e028b" /> และรายการรหัสผ่านเป็น <img width="101" height="19" alt="image" src="https://github.com/user-attachments/assets/8a06add1-0dbc-4db3-9779-19edf2fd04e9" />
เราจะใช้คำสั่งดังต่อไปนี้:<img width="362" height="25" alt="image" src="https://github.com/user-attachments/assets/299ea20a-d727-40f3-b532-ad3794d82aaa" />

สำหรับเครื่องที่ปรับใช้นี้ ต่อไปนี้เป็นคำสั่งสำหรับใช้ Hydra บน SSH และแบบฟอร์มเว็บ (วิธี POST)

SSH
--

<img width="485" height="29" alt="image" src="https://github.com/user-attachments/assets/8bb862ad-8f8f-4375-861c-d2686a543e66" />

| ตัวเลือก | คำอธิบาย | 
|:------------------|:------------------:| 
| -l | ระบุชื่อผู้ใช้ (SSH) สำหรับการเข้าสู่ระบบ  |
|-P | ระบุรายการรหัสผ่าน | 
| -t | กำหนดจำนวนเธรดที่จะสร้าง|

ตัวอย่างเช่น, <img width="396" height="24" alt="image" src="https://github.com/user-attachments/assets/ac25db92-4cf2-4f18-b40f-88673f659507" /> จะทำงานโดยมีอาร์กิวเมนต์ดังต่อไปนี้:

1. Hydra จะใช้ root เป็นชื่อผู้ใช้สำหรับ ssh

2. จะลองป้อนรหัสผ่านในไฟล์ passwords.txt

3. จะมีเธรดสี่เธรดทำงานพร้อมกันตามที่ระบุด้วย -t 4

โพสต์ฟอร์มเว็บ
--

เราสามารถใช้ Hydra เพื่อรันฟอร์มเว็บแบบ Brute Force ได้เช่นกัน คุณต้องรู้ว่ามันกำลังสร้างคำขอประเภทใด ซึ่งโดยทั่วไปจะใช้เมธอด GET หรือ POST คุณสามารถใช้แท็บเครือข่ายของเบราว์เซอร์ (ในเครื่องมือสำหรับนักพัฒนา) เพื่อดูประเภทคำขอหรือดูซอร์สโค้ด

<img width="828" height="26" alt="image" src="https://github.com/user-attachments/assets/0b7b26c5-1c84-467e-8ff2-aa3e9f78d9b3" />

| ตัวเลือก | คำอธิบาย | 
|:------------------|:------------------:| 
| -l | ชื่อผู้ใช้สำหรับการเข้าสู่ระบบ (แบบฟอร์มเว็บ) |
| -P | รายการรหัสผ่านที่จะใช้ | 
| http-post-form | ชนิดของแบบฟอร์มคือ POST|
| <img width="56" height="26" alt="image" src="https://github.com/user-attachments/assets/c2a634ed-8bd6-4c83-8f27-9e541e3e4c6e" />| URL หน้าเข้าสู่ระบบ เช่น login.php |
| <login_credentials> | ชื่อผู้ใช้และรหัสผ่านที่ใช้ในการเข้าสู่ระบบ เช่น, username=^USER^&password=^PASS^ |
| <invalid_response> | ส่วนหนึ่งของการตอบสนองเมื่อการเข้าสู่ระบบล้มเหลว |
| -V | เอาต์พุตแบบละเอียดสำหรับทุกความพยายาม |

ด้านล่างนี้เป็นตัวอย่างคำสั่ง Hydra ที่เป็นรูปธรรมมากขึ้นในการบังคับใช้แบบฟอร์มเข้าสู่ระบบ POST:

<img width="861" height="28" alt="image" src="https://github.com/user-attachments/assets/1f5c578a-b94d-4efb-a5da-b3061c8ddde1" />

1. หน้าล็อกอินมีเพียง / เท่านั้น กล่าวคือ ที่อยู่ IP หลัก

2. ชื่อผู้ใช้คือช่องกรอกแบบฟอร์มที่กรอกชื่อผู้ใช้

3. ชื่อผู้ใช้ที่ระบุจะแทนที่ ^USER^

4. รหัสผ่านคือช่องกรอกแบบฟอร์มที่กรอกรหัสผ่าน

5. รหัสผ่านที่ระบุจะแทนที่ ^PASS^

สุดท้าย F=incorrect คือสตริงที่ปรากฏในข้อความตอบกลับของเซิร์ฟเวอร์เมื่อการล็อกอินล้มเหลว

ตอนนี้คุณควรมีข้อมูลเพียงพอที่จะนำไปปฏิบัติและ Brute Force ข้อมูลประจำตัวของคุณไปยังเครื่องที่ใช้งาน!

ตอบคำถามด้านล่าง
--
1. ใช้ Hydra เพื่อ Bruteforce รหัสผ่านเว็บ ธงที่ 1 ของ Molly คืออะไร?

คำแนะนำ: หากคุณลองใช้รหัสผ่านมากกว่า 30 รหัสจาก RockYou.txt แสดงว่าคุณกำลังทำบางอย่างผิดพลาด!

2. ใช้ Hydra เพื่อ Bruteforce รหัสผ่าน SSH ธงที่ 2 ของ Molly คืออะไร?

---
ขอพลังจงสถิตอยู่กับท่าน
