Subdomain enumeration refers to mapping all available subdomains within a domain name. It increases our attack surface and may uncover hidden management backend panels or intranet web applications that network administrators expected to keep hidden using the "security by obscurity" strategy. At this point, we will only perform passive subdomain enumeration using third-party services or publicly available information. Still, we will expand the information we gather in future active subdomain enumeration activities.

---

# **VirusTotal**

VirusTotal maintains its DNS replication service, which is developed by preserving DNS resolutions made when users visit URLs given by them. To receive information about a domain, type the domain name into the search bar and click on the "Relations" tab.

![https://academy.hackthebox.com/storage/modules/144/virustotal.png](https://academy.hackthebox.com/storage/modules/144/virustotal.png)

---

# **Project Sonar**

Rapid7's Project Sonar is a security research project that conducts internet-wide surveys across various services and protocols to gather insight into worldwide vulnerability exposure. The information collected is made public to facilitate security research. We can use this project to discover subdomains and other domains used by our target organization by visiting the URL [https://sonar.omnisint.io](https://sonar.omnisint.io) or using the `curl` command. Currently, by using `cURL`, we can reach the following API endpoints according to the documentation:

```
<https://sonar.omnisint.io/subdomains/{domain}> - All subdomains for a given domain
<https://sonar.omnisint.io/tlds/{domain}>       - All tlds found for a given domain
<https://sonar.omnisint.io/all/{domain}>        - All results across all tlds for a given domain
<https://sonar.omnisint.io/reverse/{ip}>        - Reverse DNS lookup on IP address
<https://sonar.omnisint.io/reverse/{ip}/{mask}> - Reverse DNS lookup of a CIDR range

```

Some example queries we can use are:

### **Find all Subdomains**

Find all Subdomains

```
pavka@htb[/htb]$ export TARGET="facebook.com"pavka@htb[/htb]$ curl -s <https://sonar.omnisint.io/subdomains/$TARGET> | jq -r '.[]' | sort -u<SNIP>

69-171-244-96.mail-mail.facebook.com
69-171-244-97.mail-mail.facebook.com
69-171-244-98.mail-mail.facebook.com
69-171-244-99.mail-mail.facebook.com
a.ns.c10r.facebook.com
a.ns.facebook.com
a.ns.vvv.facebook.com
alf.facebook.com
atlas-pp-shv-01-hkg4.facebook.com
atlas-pp-shv-01-kut2.facebook.com
atlas-pp-shv-01-nrt1.facebook.com
atlas-pp-shv-01-sin6.facebook.com
atlas-pp-shv-02-hkg4.facebook.com
atlas-pp-shv-02-kut2.facebook.com
atlas-pp-shv-02-sin6.facebook.com

<SNIP>

```

### **Find other TLDs**

Find other TLDs

```
pavka@htb[/htb]$ curl -s <https://sonar.omnisint.io/tlds/$TARGET> | jq -r '.[]' | sort -u<SNIP>

facebook.barcelona
facebook.be
facebook.beer
facebook.bet
facebook.bg
facebook.bi
facebook.bible
facebook.bio
facebook.biz
facebook.biz.ni
facebook.biz.tj
facebook.biz.tr
facebook.black
facebook.blackfriday
facebook.blog
facebook.blog.br
facebook.bo
facebook.boston

<SNIP>

```

### **Find Results Across all TLDs**

Find Results Across all TLDs

```
pavka@htb[/htb]$ curl -s <https://sonar.omnisint.io/all/$TARGET> | jq -r '.[]' | sort -u<SNIP>

traceroute-fbonly-bgp-02-sof1.facebook.com
traceroute-fbonly-bgp-02-xsp1.facebook.com
traceroute-fbonly-bgp-03-sin6.facebook.com
traceroute-fbonly-bgp-03-xsp1.facebook.com
traceroute-fbonly-bgp-04-sin6.facebook.com
twitter.facebook.com.al
vc.facebook.net
webdisk.facebook.ba
webdisk.facebook.bg
webdisk.facebook.bi
webdisk.facebook.blog.br
webdisk.facebook.co.in
webdisk.facebook.co.ma
webdisk.facebook.com.al

<SNIP>

```

We can pipe the output from these commands to a file for later processing. For example:

Find Results Across all TLDs

```
pavka@htb[/htb]$ curl -s <https://sonar.omnisint.io/subdomains/$TARGET> | jq -r '.[]' | sort -u > "${TARGET}_omnisint.txt" # this will create the file facebook.com_omnisint.txt containing the results.
```

Find Results Across all TLDs

```
pavka@htb[/htb]$ head -n20 facebook.com_omnisint.txt66-220-144-128.mail-mail.facebook.com
66-220-144-129.mail-mail.facebook.com
66-220-144-130.mail-mail.facebook.com
66-220-144-131.mail-mail.facebook.com
66-220-144-132.mail-mail.facebook.com
66-220-144-133.mail-mail.facebook.com
66-220-144-134.mail-mail.facebook.com
66-220-144-135.mail-mail.facebook.com
66-220-144-136.mail-mail.facebook.com
66-220-144-137.mail-mail.facebook.com
66-220-144-138.mail-mail.facebook.com
66-220-144-139.mail-mail.facebook.com
66-220-144-140.mail-mail.facebook.com
66-220-144-141.mail-mail.facebook.com
66-220-144-142.mail-mail.facebook.com
66-220-144-143.mail-mail.facebook.com
66-220-144-144.mail-mail.facebook.com
66-220-144-145.mail-mail.facebook.com
66-220-144-146.mail-mail.facebook.com
66-220-144-147.mail-mail.facebook.com

```

We can learn our target organization naming patterns from the results. These patterns will be handy for further discovery activities. Some examples we can observe are:

- `atlas-pp-shv-{NUMBER}-sin6.facebook.com`

Find Results Across all TLDs

```
atlas-pp-shv-01-sin6.facebook.com
atlas-pp-shv-02-sin6.facebook.com
atlas-pp-shv-03-sin6.facebook.com

```

- `lert-api-shv-{NUMBER}-sin6.facebook.com`

Find Results Across all TLDs

```
lert-api-shv-01-sin6.facebook.com
lert-api-shv-02-sin6.facebook.com
lert-api-shv-03-sin6.facebook.com
lert-api-shv-04-sin6.facebook.com

```

---

# **Certificates**

Another interesting source of information we can use to extract subdomains is SSL/TLS certificates. The main reason is Certificate Transparency (CT), a project that requires every SSL/TLS certificate issued by a Certificate Authority (CA) to be published in a publicly accessible log.

We will learn how to examine CT logs to discover additional domain names and subdomains for a target organization using two primary resources:

- [](https://censys.io/)[https://censys.io](https://censys.io)
- [](https://crt.sh/)[https://crt.sh](https://crt.sh)

We can navigate to [https://search.censys.io/certificates](https://search.censys.io/certificates) or [https://crt.sh](https://crt.sh) and introduce the domain name of our target organization to start discovering new subdomains.

![https://academy.hackthebox.com/storage/modules/144/censys_facebook.png](https://academy.hackthebox.com/storage/modules/144/censys_facebook.png)

![https://academy.hackthebox.com/storage/modules/144/crt_facebook.png](https://academy.hackthebox.com/storage/modules/144/crt_facebook.png)

Although the website is excellent, we would like to have this information organized and be able to combine it with other sources found throughout the information-gathering process. Let us perform a curl request to the target website asking for a JSON output as this is more manageable for us to process. We can do this via the following commands:

### **Certificate Transparency**

Certificate Transparency

```
pavka@htb[/htb]$ export TARGET="facebook.com"pavka@htb[/htb]$ curl -s "<https://crt.sh/?q=${TARGET}&output=json>" | jq -r '.[] | "\\(.name_value)\\n\\(.common_name)"' | sort -u > "${TARGET}_crt.sh.txt"
```

Certificate Transparency

```
pavka@htb[/htb]$ head -n20 facebook.com_crt.sh.txt*.adtools.facebook.com
*.ak.facebook.com
*.ak.fbcdn.net
*.alpha.facebook.com
*.assistant.facebook.com
*.beta.facebook.com
*.channel.facebook.com
*.cinyour.facebook.com
*.cinyourrc.facebook.com
*.connect.facebook.com
*.cstools.facebook.com
*.ctscan.facebook.com
*.dev.facebook.com
*.dns.facebook.com
*.extern.facebook.com
*.extools.facebook.com
*.f--facebook.com
*.facebook.com
*.facebookcorewwwi.onion
*.facebookmail.com

```

We also can manually perform this operation against a target using OpenSSL via:

Certificate Transparency

```
pavka@htb[/htb]$ export TARGET="facebook.com"pavka@htb[/htb]$ export PORT="443"pavka@htb[/htb]$ openssl s_client -ign_eof2>/dev/null <<<$'HEAD / HTTP/1.0\\r\\n\\r' -connect "${TARGET}:${PORT}" | openssl x509 -noout -text -in - | grep 'DNS' | sed -e 's|DNS:|\\n|g' -e 's|^\\*.*||g' | tr -d ',' | sort -u*.facebook.com
*.facebook.net
*.fbcdn.net
*.fbsbx.com
*.m.facebook.com
*.messenger.com
*.xx.fbcdn.net
*.xy.fbcdn.net
*.xz.fbcdn.net
facebook.com
messenger.com

```

---

# **Automating Passive Subdomain Enumeration**

We have learned how to acquire helpful information from our target organization, like subdomains, naming patterns, alternate TLDs, IP ranges, etc., using third-party services without interacting directly with their infrastructure or relying on automated tools. Now, we will learn how to enumerate subdomains using tools and previously obtained information.

---

### **TheHarvester**

[TheHarvester](https://github.com/laramies/theHarvester) is a simple-to-use yet powerful and effective tool for early-stage penetration testing and red team engagements. We can use it to gather information to help identify a company's attack surface. The tool collects `emails`, `names`, `subdomains`, `IP addresses`, and `URLs` from various public data sources for passive information gathering. For now, we will use the following modules:

To automate this, we will create a file called sources.txt with the following contents.

TheHarvester

```
pavka@htb[/htb]$ cat sources.txtbaidu
bufferoverun
crtsh
hackertarget
otx
projecdiscovery
rapiddns
sublist3r
threatcrowd
trello
urlscan
vhost
virustotal
zoomeye

```

Once the file is created, we will execute the following commands to gather information from these sources.

TheHarvester

```
pavka@htb[/htb]$ export TARGET="facebook.com"pavka@htb[/htb]$ cat sources.txt | while read source; do theHarvester -d "${TARGET}" -b $source -f "${source}_${TARGET}";done<SNIP>
*******************************************************************
*  _   _                                            _             *
* | |_| |__   ___    /\\  /\\__ _ _ ____   _____  ___| |_ ___ _ __  *
* | __|  _ \\ / _ \\  / /_/ / _` | '__\\ \\ / / _ \\/ __| __/ _ \\ '__| *
* | |_| | | |  __/ / __  / (_| | |   \\ V /  __/\\__ \\ ||  __/ |    *
*  \\__|_| |_|\\___| \\/ /_/ \\__,_|_|    \\_/ \\___||___/\\__\\___|_|    *
*                                                                 *
* theHarvester 4.0.0                                              *
* Coded by Christian Martorella                                   *
* Edge-Security Research                                          *
* cmartorella@edge-security.com                                   *
*                                                                 *
*******************************************************************

[*] Target: facebook.com

[*] Searching Urlscan.

[*] ASNS found: 29
--------------------
AS12578
AS13335
AS13535
AS136023
AS14061
AS14618
AS15169
AS15817

<SNIP>

```

When the process finishes, we can extract all the subdomains found and sort them via the following command:

TheHarvester

```
pavka@htb[/htb]$ cat *.json | jq -r '.hosts[]'2>/dev/null | cut -d':' -f 1 | sort -u > "${TARGET}_theHarvester.txt"
```

Now we can merge all the passive reconnaissance files via:

TheHarvester

```
pavka@htb[/htb]$ cat facebook.com_*.txt | sort -u > facebook.com_subdomains_passive.txtpavka@htb[/htb]$ cat facebook.com_subdomains_passive.txt | wc -l11947

```

So far, we have managed to find 11947 subdomains merging the passive reconnaissance result files. It is important to note here that there are many more methods to find subdomains passively. More possibilities are shown, for example, in the [OSINT: Corporate Recon](https://academy.hackthebox.com/course/preview/osint-corporate-recon) module.