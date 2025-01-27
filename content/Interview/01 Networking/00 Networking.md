# Disclaimer  
This section provides concise, easy-to-read recaps of basic networking concepts and components. It also includes clarifications and additional insights to reinforce foundational knowledge.

## Bit  
- The smallest unit of data  
- Can only hold "0" or "1"  

Computers use binary code to represent characters and symbols. For example, in ASCII (American Standard Code for Information Interchange):  
- **Letter A:** 01000001  
- **Number 9:** 00111001  
- **Symbol #:** 00100011  

## Personal Data  
### Volunteered Data  
- Information you willingly share  
- Requires explicit consent to collect and store  

### Inferred Data  
- Generated from your activities  
- Example: Credit card use reveals spending patterns  

### Observed Data  
- Captured from your behavior  
- Example: Location data from GPS  

## Data Transmission  
Three common methods of data transmission in networks:  
- **Electrical signals** (on wires)  
- **Optical signals** (light pulses)  
- **Wireless signals** (radio, infrared, or microwaves)  

## Bandwidth  
- Measures a network medium’s capacity to transfer data  
- Indicates the amount of data sent within a specific time frame  
- Common units:  
  - Kbps (kilobits per second)  
  - Mbps (megabits per second)  
  - Gbps (gigabits per second)  

## Throughput  
- Practical data transfer rate over a network  
- Typically less than bandwidth due to factors such as:  
  - Network traffic  
  - Data types  
  - Latency (delays between endpoints)  

Throughput is constrained by the slowest link, often referred to as the "bottleneck."

## Clients & Servers  
- **Client:** Requests resources or services  
- **Server:** Provides resources or performs tasks for clients  
- Roles are flexible — a single device can act as both  

Example: A PC hosting a website (server) while browsing another site (client).

## Peer-to-Peer (P2P) Network  
Common in home and small business networks, where devices act as both clients and servers.  

### Pros:  
- Simple to set up  
- Low cost  

### Cons:  
- No centralized management  
- Less secure  
- Limited scalability and performance  

## Network Components  
Networks consist of:  
- **End devices:** Computers, printers, mobile phones  
- **Intermediate devices:** Switches, routers  
- **Network media:** Cables, wireless signals  

## ISP  
An Internet Service Provider (ISP) links home networks to the internet using various methods, including cable, DSL, cellular, and satellite connections. ISPs interconnect globally to route data efficiently between users.

Home connections typically use wireless-integrated routers with built-in switching, wireless access points, and security features.

## Wireless Networks  
Mobile phones use radio waves to transmit voice and data between cellular towers. Networks like GSM, 4G-LTE, and 5G optimize mobile data speed and connectivity.

**Wi-Fi:** Enables local network access.  
**Bluetooth:** Short-range wireless communication for devices.  
**NFC:** Supports close-proximity data exchanges.

## Mobile Device Connectivity  
To protect wireless communications:  
- Avoid sending sensitive data over unencrypted connections  
- Use VPNs for secure transmissions  
- Enable WPA2 or higher encryption  

Mobile devices prioritize Wi-Fi when available, falling back to cellular networks as needed.

## Home Network Basics  
Home networks typically consist of:  
- A public-facing ISP connection  
- A private LAN using a wired or wireless router  

Common devices include PCs, smart TVs, gaming consoles, and IoT devices. Most home routers combine Ethernet ports with a wireless access point.

## Wireless Standards  
Wireless LANs use IEEE 802.11 standards in 2.4 GHz and 5 GHz frequency bands. Important configuration options:  
- **SSID:** Identifies the network  
- **Channel:** Specifies communication frequency  
- **Network Mode:** Defines the wireless standard in use  
## Communication Protocols

Communication protocols are essential rules and standards that enable computers to communicate effectively over networks. Key elements include message format, size, timing, encoding, encapsulation, and patterns.

- **Message Format**: Defines the structure and layout of a message to ensure proper interpretation.
- **Message Size**: Specifies strict rules on how much data can be transmitted at a time, varying by transmission channel.
- **Timing**: Determines the transmission speed, data intervals, and how much information can be sent in one session.
- **Encoding**: Converts data into signals suitable for transmission, such as electrical impulses, light pulses, or radio waves.
- **Encapsulation**: Adds necessary headers, including source and destination addresses, to packets for transmission.
- **Message Pattern**: Describes communication flow—some systems require acknowledgments, while others stream data continuously.

## Communication Standards

Network topologies visually represent device connections, but devices perceive networks only through addressing and protocol rules. Protocols split data into packets for efficient transmission.

Standards are universal rules ensuring interoperability among diverse networked devices. Internet standards are the result of extensive testing and refinement. Standards are documented as RFCs (Request for Comments) and maintained by organizations like the IETF.

## Network Communication Models

### The TCP/IP Model

Layered models illustrate protocol interaction and functionality across a network, providing design clarity and flexibility.

Benefits of layered models:

- Simplifies protocol development by defining clear roles.
- Promotes compatibility among different vendors.
- Allows technological upgrades without redesigning the entire stack.
- Uses a common framework for describing networking tasks.

TCP/IP, the primary model for internet communication, organizes protocols into four layers:

1. **Application**: User interaction with network services.
2. **Transport**: Manages data segmentation, transmission, and reassembly.
3. **Internet**: Determines packet routing.
4. **Network Access**: Controls physical transmission.

![[Pasted image 20250106184925.png]]
### The OSI Reference Model
![[Pasted image 20250106185107.png]]A seven-layer conceptual framework detailing networking functions:

1. **Application**: Interfaces with software applications.
2. **Presentation**: Ensures data format consistency.
3. **Session**: Manages connections between devices.
4. **Transport**: Handles end-to-end communication.
5. **Network**: Routes data packets across networks.
6. **Data Link**: Manages data transfer across physical media.
7. **Physical**: Governs hardware-level transmission.
## Network Media Types

Networks use different media types:

1. **Copper Cables**: Use electrical impulses.
2. **Fiber-Optic Cables**: Use light pulses.
3. **Wireless Media**: Use electromagnetic waves.

Selection criteria include:

- Maximum transmission distance
- Installation environment
- Data capacity and speed
- Installation cost

Common cables:

- **Twisted-Pair**: Predominant in Ethernet networks.
- **Coaxial**: Used for cable TV and satellite systems.
- **Fiber-Optic**: Suitable for long distances with minimal interference.
## Access Layer and Ethernet Frames

Encapsulation wraps messages in specific formats for delivery. De-encapsulation removes the envelope-like structure upon receipt.

Ethernet frames contain:

- Source and destination MAC addresses
- Length/type identifiers
- Frame check sequences for error detection

![[Pasted image 20250106190342.png]]
### MAC table
Switches, which have replaced hubs, use MAC tables to direct traffic. A switch dynamically learns MAC addresses by examining source data in frames. A MAC address table stores mappings of each MAC address to the switch port it is connected to. When a switch receives a frame, it checks its MAC table to determine the correct port for forwarding the frame, ensuring efficient and accurate data delivery. If the destination MAC address is unknown, the switch broadcasts the frame to all ports except the one it was received on, awaiting a reply to update its table. Switches also eliminate collisions through full-duplex communication, allowing simultaneous data transmission and reception on a single link. Advanced switches may support VLANs and other features to segment networks and enhance security.

![[Pasted image 20250106191132.png]]
## IPv4
IPv4 addressing is a system that assigns unique, logical network addresses to devices for communication within a LAN or across the internet. Each IPv4 address is tied to a network interface, typically via a Network Interface Card (NIC). Packets traveling over networks contain source and destination IPv4 addresses, guiding routers and switches in delivering the data correctly.

### IPv4 Structure
An IPv4 address is 32 bits, split into a network and host portion. For example, in 192.168.5.11/24, the first three octets (192.168.5) represent the network, while the last octet (11) identifies the host.

### Unicast, Broadcast, and Multicast
- **Unicast**: One-to-one communication where data is sent from one source to a single destination.
- **Broadcast**: One-to-all communication using a destination IP with all bits set to 1 (e.g., 255.255.255.255). Broadcasts are processed by all devices within the same broadcast domain.
- **Multicast**: One-to-many communication to a selected group of hosts using reserved addresses (224.0.0.0 to 239.255.255.255). Protocols like OSPF use multicast for efficient routing updates.
### Private vs. Public IPv4 Addresses
Private IPv4 ranges:
- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16

Network Address Translation (NAT) allows devices with private addresses to communicate on the internet by mapping them to a public address at the router.

### Special IPv4 Addresses
- **Loopback (127.0.0.1)**: Tests a device’s own network stack.
- **Link-Local (169.254.x.x)**: Self-assigned when DHCP fails.

### Segmentation and Subnetting
Subnetting divides a large network into smaller segments, reducing broadcast traffic and enhancing security. This involves reallocating host bits to create subnets.

## IPv6
IPv6 addresses are 128-bit and written in hexadecimal. Notable features include:
- **Zero Compression**: Replace contiguous 0s with "::" (once per address).
- **Leading Zero Omission**: Skip leading zeros in hextets (e.g., 01ab becomes 1ab).

Example: `2001:db8::1` simplifies `2001:0db8:0000:0000:0000:0000:0000:0001`.

### Addressing Methods
- **Static**: Manual configuration of IP settings.
- **Dynamic (DHCP)**: Automated assignment from a DHCP server.

## DHCP Process
A DHCP server assigns addresses through these steps:
1. **Discover**: Broadcasts request for IP configuration.
2. **Offer**: DHCP server suggests an address.
3. **Request**: Client accepts the offered address.
4. **Acknowledgment**: Server confirms the assignment.

## Gateways
A default gateway connects local networks to external networks. It’s typically provided by a router with both DHCP client (for ISP connection) and DHCP server (for internal network) functions.

## MAC and IP
Networking uses:
- **MAC Address**: Physical hardware identifier.
- **IP Address**: Logical identifier for routing.

ARP resolves IP addresses to MAC addresses within local networks, storing them in an ARP table. IPv6 uses Neighbor Discovery for similar functionality.

## Broadcast Domains and ARP
Broadcast domains encompass devices that receive network-wide broadcast traffic. ARP works by:
1. Broadcasting a query for a MAC address.
2. Receiving a reply with the MAC.
3. Storing the result in the ARP table.

Routers segment networks to manage broadcast traffic efficiently.
### Network Splitting

As networks grow, dividing an access layer network into multiple networks becomes essential. This division improves performance and management. Methods for network splitting include:

- **Broadcast Containment**: Routers at the distribution layer limit broadcasts to local networks, preventing unnecessary traffic from spreading.
- **Security Requirements**: Certain computers or data can be isolated for protection by using routers to create secure segments.
- **Physical Locations**: Distributed routers link local networks across geographically separate sites within an organization.
- **Logical Grouping**: Routers can group users by common needs, like organizing departments within a company.

The distribution layer connects these networks and manages inter-network traffic while keeping local traffic contained within its network.

### Routers and Forwarding

- **Router Functionality**: Routers connect multiple Layer 3 IP networks, making forwarding decisions based on IP addresses.
- **Forwarding Decisions**: Routers forward packets when source and destination IP networks differ.
- **Encapsulation**: A router decodes incoming frames, retrieves the packet, and uses the destination IP to guide routing decisions.

### Routing Tables

Routing tables guide the forwarding of packets:

- Each router interface connects to a unique local network.
- **Routing Process**:
  - The router extracts the destination IP from the frame.
  - Matches the network portion of the destination IP to a routing table entry.
  - Encapsulates the packet into a new frame for forwarding.
- **MAC Address Resolution**: ARP tables provide MAC addresses for devices on the next hop.
- **Default Gateway**: Hosts use a configured default gateway (router interface IP) to reach external networks.

### Routing Table Entries

- **Dynamic Updates**: Automatic entries from information exchanges with other routers.
- **Manual Entries**: Configured by network administrators.

### LAN Construction

- **Single Local Network**:
  - All hosts share one broadcast domain.
  - Hosts use ARP to find each other.
- **Multiple Networks**:
  - Reduces network congestion.
  - Requires routing for inter-network communication.
  - Adds complexity and potential latency.

### TCP and UDP

- **UDP (User Datagram Protocol)**:
  - Connectionless, does not confirm delivery.
  - Ideal for real-time uses like streaming or VoIP.
- **TCP (Transmission Control Protocol)**:
  - Connection-oriented with sequence numbers.
  - Retransmits lost data segments.
  - Suitable for reliable communication.

### Ports

Ports help identify specific processes:

- **Port Number Usage**:
  - Identifies protocols and services.
  - Tracks conversations with source and destination ports.
- **Port Categories**:
  - **Well-Known Ports**: 1–1023, assigned to standard services.
  - **Registered Ports**: 1024–49151, available for proprietary services.
  - **Private Ports**: 49152–65535, typically source ports.
- **ICANN**: Manages port number assignments.

### Servers and Applications

- **Servers**: Provide information or services, e.g., web servers.
- **Client Software**: Browsers like Chrome or Firefox access services.
- **Client/Server Model**: Clients request, and servers respond. Common example: a web browser requesting a web page using HTTP.

### URI Components

- **URN (Uniform Resource Name)**: Identifies a namespace without location.
- **URL (Uniform Resource Locator)**: Specifies a resource’s network location.

### Common Internet Services and Protocols

- **DNS (Domain Name System)**:
  - Translates domain names to IP addresses.
  - Queries other DNS servers if local records are absent.
- **Web Servers**:
  - Use HTTP on port 80 and HTTPS on port 443.
  - HTTP is non-secure; HTTPS encrypts traffic.
  - HTML defines web page structure.
- **FTP (File Transfer Protocol)**:
  - Uses port 21 for control, port 20 for data.
  - Supports file upload, download, and management.
- **Remote Access**:
  - **Telnet**: Uses port 23 but transmits data in plaintext.
  - **SSH**: Provides encrypted, secure remote access.
For additional information please visit: [[01 Ports & Protocols]]. The most common protocols and ports are very important to memorize.
### Email Protocols

- **SMTP (Simple Mail Transfer Protocol)**: Sends messages, uses port 25.
- **POP3 (Post Office Protocol v3)**: Downloads messages, uses port 110.
- **IMAP4 (Internet Message Access Protocol v4)**: Stores messages on servers, uses port 143.

### Messaging and VoIP

- **Instant Messaging**: Real-time communication using text messages.
- **VoIP (Voice over IP)**: Converts voice into digital data encapsulated in IP packets.

### Useful Networking Commands

- **ipconfig**: Displays a host’s IP configuration.
- **ping**: Tests connectivity to another host.
- **netstat**: Shows active connections.
- **tracert**: Displays the route to a destination.
- **nslookup**: Queries DNS for a domain’s IP address.

# Conclusion

These topics cover the foundational networking concepts essential for a cybersecurity position. A solid understanding of network splitting, routing, TCP/UDP protocols, ports, and key internet services provides a strong basis for identifying and mitigating security risks. To reinforce your knowledge and explore practical applications, refer to the [[02 Networking Questions]] section.
