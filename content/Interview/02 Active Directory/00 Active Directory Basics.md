Active Directory (AD) is a directory service used in Windows environments for centralized management of resources, such as users, computers, and policies. It provides authentication and authorization within a Windows domain, enabling administrators to manage permissions and access control efficiently.
## Core Concepts and Terminology

### Object

An object represents a resource in AD, such as users, computers, or printers. Each object is an instance of a specific class defined in the AD schema.

**Example:** A user object represents an employee, while a computer object represents a workstation.

**Interview Tip:** AD objects are foundational elements, with unique attributes and identifiers that allow system administrators to organize and control access within a domain.

### Attributes

Attributes define the properties of objects. Each attribute has a Lightweight Directory Access Protocol (LDAP) name, used for querying and manipulating directory information.

**Example:** A user object may have attributes like `displayName` (Full Name) and `sAMAccountName` (Logon Name).

**Interview Tip:** Common attributes, such as `sAMAccountName`, are used for authentication, while `userPrincipalName` provides a more user-friendly logon name.

### Schema

The schema is a blueprint that defines object types and their attributes. It ensures consistency and structure in how objects are created and managed.

**Example:** User objects belong to the "user" class, while computer objects are instances of the "computer" class.

**Interview Tip:** Changes to the schema should be carefully planned and tested, as they impact the entire forest.

### Domain

A domain is a logical grouping of objects sharing a common directory database. Domains form the core unit of security and administration.

**Example:** `example.local` may include users and computers managed within the domain.

**Interview Tip:** Each domain has its own security policies, trust relationships, and a distinct namespace.

### Forest

A forest is a collection of one or more domains that share a common schema and configuration.

**Example:** Multiple domains like `corp.example.local` and `dev.example.local` may exist in a single forest.

**Interview Tip:** Trust relationships between domains within a forest are automatic and transitive.

### Tree

A tree is a hierarchy of domains with a contiguous namespace starting from a single root domain.

**Example:** `company.local` with child domains `sales.company.local` and `support.company.local`.

**Interview Tip:** Trees allow for organizational scalability and structured domain management.

### Organizational Unit (OU)

OUs are containers used to group objects and apply policies within a domain.

**Example:** An "IT" OU contains user and computer objects specific to the IT department.

**Interview Tip:** Delegating administrative control at the OU level enables granular management of user permissions without granting full domain access.

## Common Objects

### Users

Users are leaf objects and security principals with unique identifiers (SID and GUID). Attributes include name, email, and password information. With over 800 possible attributes, users are key targets for attackers aiming to enumerate or compromise a domain.

**Example:** A user object may have a `displayName` of "Jane Doe" and a `sAMAccountName` of "jdoe".

**Interview Tip:** Explain the importance of secure user account management and attribute visibility, such as `lastLogon` for auditing.

### Contacts

Contacts represent external users and contain informational attributes such as name and email. They are leaf objects but not security principals, lacking a SID.

**Example:** A vendor contact card with an email address and phone number.

**Interview Tip:** Highlight the non-authenticating role of contact objects and their use in distribution lists.

### Printers

Printer objects reference network printers and have attributes like driver name and port. They are leaf objects without a SID.

**Example:** A printer object with the name "OfficePrinter" and location attribute "Floor 2".

**Interview Tip:** Emphasize printer object management for resource access control.

### Computers

Computer objects represent workstations and servers. They are leaf objects and security principals with both SID and GUID.

**Example:** A server object named `srv01.example.local`.

**Interview Tip:** Discuss the significance of securing computer objects to prevent unauthorized system access.

### Shared Folders

Shared folder objects link to network-shared directories. They have attributes for location and access control settings.

**Example:** A shared folder with the path `\\fileserver\HRdocs`.

**Interview Tip:** Mention best practices for securing shared folder permissions.

### Groups

Groups are container objects managing permissions by aggregating users, computers, or other groups. They are security principals with a SID.

**Example:** A "HelpDesk" group with permissions to reset passwords.

**Interview Tip:** Describe the utility of group nesting and tools like BloodHound for auditing.

### Organizational Units (OUs)

OUs are containers for organizing objects and delegating administrative tasks. They facilitate Group Policy application.

**Example:** An "HR" OU containing user accounts for human resources.

**Interview Tip:** Discuss delegation of control at the OU level to limit administrative scope.

## Trusts

Trusts allow cross-domain or cross-forest authentication. Trusts can be transitive or non-transitive, with various types for specific scenarios.

|Trust Type|Description|
|---|---|
|Parent-child|Two-way transitive trust between parent and child domains.|
|Cross-link|Direct trust between two child domains to optimize authentication.|
|External|Non-transitive trust with SID filtering between separate forests.|
|Tree-root|Two-way transitive trust between a forest root and a new tree root domain.|
|Forest|Transitive trust between forest root domains.|

**Interview Tip:** Explain how trust types influence security boundaries and access control.

## Unique Identifiers and Names

### Global Unique Identifier (GUID)

A 128-bit value that uniquely identifies an object.

**Example:** A user object has a unique GUID stored in its `objectGUID` attribute.

### Security Identifier (SID)

Uniquely identifies security principals like users and groups.

**Example:** A user SID appears in access tokens for authorization.

### Distinguished Name (DN)

Specifies an object’s path in the directory hierarchy.

**Example:** `cn=John Doe,ou=IT,dc=example,dc=com`.

### Relative Distinguished Name (RDN)

The portion of a DN that uniquely identifies an object at its level.

**Example:** In `cn=John Doe,ou=IT`, "John Doe" is the RDN.

### sAMAccountName

A legacy logon name limited to 20 characters.

**Example:** `jdoe`.

### userPrincipalName (UPN)

An alternative logon name in email format.

**Example:** `jdoe@example.local`.

**Interview Tip:** Use UPNs for simplified logon processes and better compatibility.

## Key Roles and Features

### Flexible Single Master Operations (FSMO)

FSMO roles prevent conflicts in AD replication.

- **Schema Master**: Controls schema modifications (forest-wide).
    
- **Domain Naming Master**: Manages domain additions (forest-wide).
    
- **RID Master**: Allocates unique relative identifiers (domain-specific).
    
- **PDC Emulator**: Provides backward compatibility and time synchronization (domain-specific).
    
- **Infrastructure Master**: Updates references between domains (domain-specific).
    

**Interview Tip:** Understand each FSMO role’s scope and responsibility.

### Global Catalog (GC)

A GC holds a partial replica of all objects, enabling forest-wide searches.

### Read-Only Domain Controller (RODC)

An RODC stores a read-only copy of the AD database for security and reduced replication traffic.

### Replication

Synchronizes AD data across domain controllers, ensuring consistency.

### Group Policy Object (GPO)

GPOs manage policy settings for users and computers.

**Example:** A GPO enforcing password complexity requirements.

### Access Control List (ACL)

Defines permissions on objects.

**Example:** Granting a user read-only access to a folder.

### Tombstone and AD Recycle Bin

- **Tombstone**: Marks deleted objects for a set duration.
    
- **Recycle Bin**: Allows easy restoration of deleted objects.
    

### Fully Qualified Domain Name (FQDN)

Specifies a host’s complete name.

**Example:** `dc01.example.local`.

### Service Principal Name (SPN)

Maps services to user accounts for Kerberos authentication.

**Example:** `MSSQLSvc/sqlserver.example.com:1433`.

## NTLM
### NTLM Authentication Process

1. **NTLM Hash Generation**
    
    - When a user creates a password, Windows stores a one-way hashed version of the password as an **NTLM hash**. This hash is used for authentication instead of the plain-text password.
2. **Challenge-Response Mechanism**
    
    - In NTLM authentication, the client does not send the password or hash directly. Instead, a challenge-response mechanism is used:
        - The client sends a username to the server.
        - The server generates a random **challenge** and sends it to the client.
        - The client encrypts the challenge using the NTLM hash of the user's password and sends it back.
        - The server verifies the response using the stored hash. If they match, access is granted.
![[Pasted image 20250107203104.png]]
Source: https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-nlmp/1bf72e97-a970-482d-90fc-776732fea1be

---

### NTLM Roles in Active Directory

1. **Fallback Authentication Method**
    
    - NTLM is used when:
        - **Kerberos is not available**, such as when the client cannot reach a domain controller (DC).
        - **Non-domain-joined computers** attempt to access resources in a domain.
        - **Legacy systems or applications** that do not support Kerberos require authentication.
2. **Local Authentication**
    
    - NTLM is used for authenticating local user accounts on individual computers (accounts stored in the local Security Account Manager, or SAM).
3. **Cross-Forest Trusts**
    
    - In environments where trust relationships are not configured for Kerberos, NTLM may be used.
## NTLM Hash

The **NTLM hash** plays a critical role in authentication within Windows and Active Directory (AD) environments. It is part of the **NTLM (NT LAN Manager)** authentication protocol, which has been largely superseded by Kerberos but is still supported for backward compatibility.

### What is an NTLM Hash?

An NTLM hash is a cryptographic representation of a user's password. It is derived using the MD4 hashing algorithm applied to the Unicode representation of the password. Unlike modern hashing methods, NTLM does not use a salt, making it vulnerable to certain types of attacks.

#### NTLM Hash Types

- **NTLMv1**: Uses the password hash directly for authentication. It is considered weak and deprecated.
- **NTLMv2**: Introduces additional security with a more complex challenge-response mechanism and a session-based key, but it still relies on the underlying NTLM hash.

### Role of NTLM Hash in Active Directory

NTLM hashes are used primarily in these areas within AD environments:

#### 1. Authentication (Legacy or Non-Kerberos-Compatible Systems)

- When Kerberos cannot be used, NTLM is the fallback authentication protocol.
- For NTLM-based authentication, the password’s NTLM hash is sent in a challenge-response exchange to prove the user's identity without transmitting the password in plaintext.

#### 2. Password Storage in AD

- Active Directory does not store plaintext passwords. Instead, it stores the **NTLM hash** of the user’s password in the database.
- The stored NTLM hash is used for authentication when needed for non-Kerberos services or backward compatibility.

#### 3. Ticket Encryption in Kerberos

- In Kerberos, a user’s **Ticket Granting Ticket (TGT)** is encrypted using their NTLM hash-derived key. This process links the user’s credentials to their session without storing or transmitting the actual password.

### Security Implications of NTLM Hashes

1. **Lack of Salt**: Since NTLM hashes are unsalted, identical passwords across different accounts result in identical hashes, making them susceptible to rainbow table attacks.
2. **Pass-the-Hash Attacks**: If an attacker obtains the NTLM hash of a user, they can use it to authenticate as that user without needing the plaintext password.
3. **Protection Strategies**:
    - Enforce strong, complex passwords.
    - Disable NTLM wherever possible, relying on Kerberos.
    - Use tools like **LSA Protection** and **Credential Guard** to prevent NTLM hash theft from memory.

---
### Security Implications

1. **Vulnerabilities**
    - NTLM is more susceptible to attacks compared to Kerberos:
        - **Pass-the-Hash Attacks**: Attackers who obtain an NTLM hash can use it to authenticate without knowing the original password.
        - **Relay Attacks**: NTLM messages can be intercepted and reused by attackers.
2. **Mitigation**
    - Use **Kerberos** as the primary authentication method wherever possible.
    - Disable NTLM where not needed or configure it with restrictions.
    - Implement **network security measures**, such as enforcing SMB signing and using NTLMv2 (a more secure version).

## Kerberos
Kerberos is the default authentication protocol in Windows domains. It provides secure, mutual authentication between clients and servers using tickets rather than transmitting passwords over the network.

1. **User Logon and Initial Authentication (AS-REQ & AS-REP)**
    
    - When a user logs in, their password is hashed into an NTLM hash.
    - The client sends an **Authentication Service Request (AS-REQ)** to the Key Distribution Center (KDC), which is part of the domain controller (DC).
    - The KDC verifies the user’s credentials against the AD database.
    - If valid, the KDC generates a **Ticket Granting Ticket (TGT)** and a session key, both encrypted with the user’s NTLM password hash.
    - The TGT allows the user to request access to services without sending their password again.
2. **Requesting Service Access (TGS-REQ & TGS-REP)**
    
    - To access a resource (like a file share), the client uses the TGT to request a **Ticket Granting Service (TGS)** ticket from the KDC.
    - This is known as a **TGS Request (TGS-REQ)**, specifying the service they want to access.
    - The KDC validates the TGT and creates a TGS ticket, encrypting it with the NTLM hash of the service’s account.
3. **Service Ticket Presentation (AP-REQ & AP-REP)**
    
    - The client presents the TGS ticket to the service (e.g., a file server).
    - If the service can decrypt the ticket with its own NTLM hash and validates it, the user is granted access.
    - This final message is an **Application Request (AP-REQ)**.
4. **Session Established**
    
    - The service sends a response if mutual authentication is required, completing the process.

![[Pasted image 20250107202959.png]]
Source: https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-kile/b4af186e-b2ff-43f9-b18e-eedb366abf13

This process enhances security by avoiding direct password transmission and using session-based encryption.

### LDAP Authentication Process in Active Directory

LDAP (Lightweight Directory Access Protocol) is used to query and manage objects in AD. It also supports authentication through binding.

1. **Types of LDAP Authentication**
    
    - **Simple Authentication**
        - This uses a straightforward username and password for the BIND request.
        - Three variations include:
            - **Anonymous**: No credentials provided.
            - **Unauthenticated**: A username is supplied with no password (for identification).
            - **Authenticated**: A valid username/password combination is sent.
    - **SASL Authentication (Simple Authentication and Security Layer)**
        - SASL allows more secure methods (like Kerberos or NTLM) to authenticate.
        - The LDAP server sends a challenge, and the client responds using the chosen mechanism.
2. **Simple Authentication Process**
    
    - The client sends a BIND request with a username and password.
    - The LDAP server verifies these credentials against AD.
    - If correct, the session is authenticated.
3. **SASL Authentication Process (Kerberos as an example)**
    
    - SASL abstracts authentication from the LDAP protocol.
    - A challenge-response exchange occurs between the client and the LDAP server.
    - The server checks with the KDC for Kerberos-based validation.
    - The result determines if the session is authenticated.
4. **Security Considerations**
    
    - LDAP sends messages in cleartext by default.
    - To secure LDAP, use **LDAP over TLS (LDAPS)**, which encrypts communication to prevent credential sniffing.

### Local Accounts

**Definition:** Local accounts are user accounts that reside locally on a specific server or workstation. Rights assigned to these accounts are limited to the host machine and do not extend across a domain.

**Example:** Default local accounts on a Windows system include:

- `Administrator`: The first account created during Windows installation with full control over most system resources.
    
- `Guest`: A limited-access account disabled by default.
    
- `SYSTEM`: A service account with the highest permission level for internal functions.
    
- `Network Service` and `Local Service`: Predefined local accounts for running Windows services.
    

**Interview Tip:** Be ready to explain how local accounts differ from domain accounts and why disabling or managing default accounts (like Guest or Administrator) is crucial for security.

---

### Domain Users

**Definition:** Domain users are accounts managed by a domain controller, granting rights across resources within the domain, such as file servers and printers.

**Example:** The `KRBTGT` account, a service account for the Key Distribution service, is a common target for attackers due to its role in authenticating domain resources.

**Interview Tip:** Understand attacks like "Golden Ticket" and why securing the `KRBTGT` account is vital in mitigating privilege escalation.

---

### Domain-Joined vs. Non-Domain-Joined Machines

**Definition:**

- **Domain-joined**: Machines linked to a domain with centralized management via domain controllers.
    
- **Non-domain-joined**: Machines managed individually or in a workgroup without centralized policies.
    

**Example:** A domain-joined host applies Group Policies from the domain, while a non-domain-joined computer relies on local policies.

**Interview Tip:** Highlight the benefits of domain-joined environments, such as policy enforcement and easier user management, and understand security implications of workgroup setups.

---

### Groups

**Definition:** Groups simplify permissions management by grouping users together and assigning rights to the group instead of individual users.

- **Security Groups**: Assign permissions to resources.
    
- **Distribution Groups**: Used by email systems for message distribution.
    

**Example:** A "Domain Admins" security group grants administrative privileges across the domain.

**Interview Tip:** Explain how groups reduce management overhead and why nesting groups can introduce privilege escalation risks.

---

### Group Scopes

**Definition:** Group scopes define the boundaries where a group can be used.

**Examples:**

- **Domain Local Group**: Manages permissions in its own domain but can include users from other domains.
    
- **Global Group**: Contains users from its own domain and can be used across domains.
    
- **Universal Group**: Manages permissions across domains within a forest.
    

**Interview Tip:** Understand the implications of replication when managing universal groups and best practices for minimizing network overhead.

---

### Built-in vs. Custom Groups

**Definition:**

- **Built-in Groups**: Predefined security groups with specific administrative roles.
    
- **Custom Groups**: Created by administrators to meet organizational needs.
    

**Example:** The "Domain Admins" built-in group has global scope and administrative privileges.

**Interview Tip:** Describe scenarios where custom groups are preferred for more granular access control.

---

### Nested Group Membership

**Definition:** Nested groups allow a group to be a member of another group, inheriting permissions.

**Example:** A "Help Desk" group nested within a "Tier 1 Admins" group grants all privileges assigned to "Tier 1 Admins" to "Help Desk" members.

**Interview Tip:** Discuss how tools like BloodHound can visualize nested group memberships to identify privilege escalation paths.

---

# Security in Active Directory (AD)

**Definition:** AD is designed for centralized management, making it inherently susceptible to security risks without proper hardening.

#### CIA Triad
![[Pasted image 20250108105245.png]]
Source: https://www.f5.com/labs/learning-center/what-is-the-cia-triad

**Example:** The balance between Confidentiality, Integrity, and Availability is foundational to cybersecurity.

**Interview Tip:** Be ready to explain why AD emphasizes availability and how to strengthen confidentiality and integrity.

---

### General AD Hardening Measures

#### LAPS

**Definition:** Microsoft Local Administrator Password Solution (LAPS) randomizes and rotates local administrator passwords.

**Example:** LAPS reduces the risk of lateral movement by managing unique local admin passwords.

**Interview Tip:** Describe how LAPS mitigates lateral movement and complements broader defense-in-depth strategies.

---

#### Audit Policy Settings

**Definition:** Audit policies enable logging and monitoring of AD changes.

**Example:** Monitoring account lockouts or password changes can help detect unauthorized access.

**Interview Tip:** Highlight the importance of continuous monitoring for proactive threat detection.

---

#### Group Policy Security Settings

**Definition:** Group Policies apply configurations and security settings to users and computers.

**Example:** Applying account policies to enforce password complexity and lockout thresholds.

**Interview Tip:** Explain how Group Policies can enforce security standards consistently across an organization.

---

#### Update Management

**Definition:** Systems like WSUS and SCCM automate patch management.

**Example:** SCCM offers advanced deployment features for timely Windows updates.

**Interview Tip:** Discuss the risks of manual patching and how automated solutions minimize vulnerabilities.

---

#### Group Managed Service Accounts (gMSA)

**Definition:** gMSAs provide secure, automatically managed service account credentials.

**Example:** gMSAs eliminate the need for manual password management by auto-rotating passwords.

**Interview Tip:** Explain the benefits of using gMSAs for security and administrative simplicity.

---

#### Security Groups

**Definition:** Security groups manage access control and permissions.

**Example:** The "Domain Admins" group is highly privileged.

**Interview Tip:** Discuss how security groups streamline permission management and how misuse can lead to privilege escalation.

---

#### Account Separation

**Definition:** Using separate accounts for daily tasks and administrative duties.

**Example:** `user_account` for general use and `admin_account` for elevated tasks.

**Interview Tip:** Explain how account separation reduces risk in case of compromised credentials.

---

#### Password Complexity Policies + 2FA

**Definition:** Enforcing strong passwords and multi-factor authentication (MFA) to enhance security.

**Example:** Using 16-character passphrases and requiring MFA for Remote Desktop.

**Interview Tip:** Understand password spraying and how MFA mitigates unauthorized access.

---

#### Limiting Domain Admin Usage

**Definition:** Restricting Domain Admin accounts to domain controllers only.

**Example:** Preventing login to personal workstations with Domain Admin credentials.

**Interview Tip:** Demonstrate awareness of how limiting admin account usage reduces attack surfaces.

---

#### Auditing and Removing Stale Objects

**Definition:** Periodic review and cleanup of inactive user accounts and groups.

**Example:** Disabling accounts for former employees to prevent unauthorized access.

**Interview Tip:** Explain how regular audits maintain a secure and well-managed AD environment.

#### Auditing Permissions and Access

**Definition:** Periodic audits to ensure users have appropriate access levels.

**Example:** Reviewing local admin rights and limiting Domain Admins.

**Interview Tip:** Discuss how auditing minimizes the attack surface by reducing unnecessary privileges.

---

#### Audit Policies & Logging

**Definition:** Implementing robust logging for detecting anomalous activity.

**Example:** Monitoring for failed logins to detect password spraying attempts.

**Interview Tip:** Reference Microsoft's Audit Policy Recommendations for detecting compromises.

---

#### Using Restricted Groups

**Definition:** Controlling group membership via Group Policy.

**Example:** Limiting local admin groups to specified accounts only.

**Interview Tip:** Explain how restricted groups prevent unauthorized privilege escalation.

---

#### Limiting Server Roles

**Definition:** Minimizing unnecessary roles on sensitive servers.

**Example:** Avoiding IIS installation on Domain Controllers.

**Interview Tip:** Discuss how role separation reduces attack surfaces.

---

#### Limiting Local Admin and RDP Rights

**Definition:** Restricting local admin and Remote Desktop rights.

**Example:** Using Restricted Groups to limit RDP access to necessary users.

**Interview Tip:** Explain how reducing admin rights lowers the risk of lateral movement and privilege escalation.

---

This [link](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) provides further reading on Microsoft's Best Practices for Securing Active Directory.

## Examining Group Policy

**Definition:** Group Policy is a Windows feature that provides administrators with advanced settings for user and computer accounts in a domain. It is a critical tool for applying security configurations and improving a domain's defense-in-depth strategy.

**Example:** Applying policies such as enforcing password complexity, disabling USB ports, or deploying software across multiple hosts.

**Interview Tip:** Be ready to explain how attackers can abuse GPOs for privilege escalation and persistence, emphasizing the need for securing GPO management.

---

#### Group Policy Objects (GPOs)

**Definition:** GPOs are collections of settings that manage configurations and security for users or computers in a domain.

**Example:** Configuring screen lock timeout, deploying software, or disabling removable media usage.

**Interview Tip:** Understand GPO linking to OUs, domains, and sites and explain how precedence rules determine which settings apply.

---

#### Example GPOs

**Examples:**

- Different password policies for service and admin accounts.
    
- Restricting access to PowerShell or cmd.exe.
    
- Enforcing a login banner.
    
- Blocking removable media.
    

**Interview Tip:** Familiarize yourself with granular GPO settings and how they enhance security posture.

---

#### Order of Precedence

**Definition:** Defines how GPOs are processed in AD hierarchy.

**Example:** OU-linked GPOs override domain-level GPOs.

**Interview Tip:** Explain how GPO order affects policy application and how conflicts are resolved.
![[Pasted image 20250108110526.png]]
Source: https://emeneye.wordpress.com/2016/02/16/group-policy-order-of-precedence-faq/

---

#### Security Considerations of GPOs

**Definition:** GPOs can be exploited to modify permissions, add admin users, or create scheduled tasks for persistence.

**Example:** Using BloodHound to identify GPOs that allow modifying admin rights for lateral movement.

**Interview Tip:** Demonstrate knowledge of securing GPOs by restricting access and auditing changes.

This [link](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/best-practices-for-securing-active-directory) provides further reading on Microsoft's Best Practices for Securing Active Directory.