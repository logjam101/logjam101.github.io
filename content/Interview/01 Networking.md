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

## Sanity Check 1
**Question 1**  
> [!question]- **What is the order of bandwidth measurement from smallest to largest?**  
> Kbps, Mbps, Gbps, Tbps  

**Question 2**  
>[!question]- **What data representation is used when a computer processes data?**  
> Binary  

**Question 3**  
> [!question]- **Which is a characteristic of the internet?**  
> It is not centrally governed.  

**Question 4**  
> [!question]- **Which items are collectively referred to as network media?**  
> PCs and laptops  

**Question 5**  
>[!question]- **How many unique values are possible using a single binary digit?**  
> 2  

**Question 6**  
>[!question]- **Match the devices to categories:**  
> PC (end device), printer (end device), router (intermediate), switch (intermediate)  

**Question 7**  
>[!question]- **What are three intermediate devices?**  
> Router, switch, wireless access point  

**Question 8**  
>[!question]- **Name two wired internet connection types:**  
> Cable, DSL  

**Question 9**  
>[!question]- **Two methods mobile devices use for internet:**  
> Wi-Fi, cellular  

**Question 10**  
>[!question]- **What tech allows proximity payments?**  
> NFC  

**Question 11**  
>[!question]- **Which tech is used for wireless headphones?**  
> Bluetooth  

**Question 12**  
>[!question]- **What info may be requested during Bluetooth pairing?**  
> A PIN  

**Question 13**  
>[!question]- **Which frequency band is used by 802.11b/g?**  
> 2.4 GHz  

**Question 14**  
>[!question]- **Which bands are used in home WLANs?**  
> 2.4 GHz, 5 GHz  

**Question 15**  
>[!question]- **What uniquely identifies a WLAN?**  
> SSID  

**Question 16**  
>[!question]- **What is a characteristic of MAC filtering?**  
> Restricts access by MAC address  
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
Switches, which have replaced hubs, use MAC tables to direct traffic. A switch dynamically learns MAC addresses by examining source data in frames.

![[Pasted image 20250106191132.png]]
## The Access Layer
The access layer is the part of the network in which people gain access to other hosts and to shared files and printers. The access layer provides the first line of networking devices that connect hosts to the wired Ethernet network. Within an Ethernet network, each host can connect directly to an access layer networking device using an Ethernet cable. Ethernet hubs contain multiple ports that are used to connect hosts to the network. Only one message can be sent through an Ethernet hub at a time. Two or more messages sent at the same time will cause a collision. Because excessive retransmissions can clog up the network and slow down network traffic, hubs are now considered obsolete and have been replaced by Ethernet switches.

An Ethernet switch is a device that is used at Layer 2. When a host sends a message to another host connected to the same switched network, the switch accepts and decodes the frames to read the MAC address portion of the message. A table on the switch, called a MAC address table, contains a list of all the active ports and the host MAC addresses that are attached to them. When a message is sent between hosts, the switch checks to see if the destination MAC address is in the table. If it is, the switch builds a temporary connection, called a circuit, between the source and destination ports. Ethernet switches also allow for sending and receiving frames over the same Ethernet cable simultaneously. This improves the performance of the network by eliminating collisions.

A switch builds the MAC address table by examining the source MAC address of each frame that is sent between hosts. When a new host sends a message or responds to a flooded message, the switch immediately learns its MAC address and the port to which it is connected. The table is dynamically updated each time a new source MAC address is read by the switch.


## Sanity Check 2
**Question 1**
> [!question]- Match the protocol function to the description while taking into consideration that a network client is visiting a web site: 1. application protocol, 2. transport protocol, 3. internet protocol, 4. network access protocol
> 1. Governing the way a web server and a web client interact
> 2. managing the individual conversations between web servers and web clients
> 3. taking the segments from transport protocol, encapsulating them into packets, and assigning them with appropriate addresses
> 4. preparing packets to be transmitted over the network media
> 

**Question 2**
> [!question]- Which three layers of the OSI model map to the application layer of the TCP/IP model?  
> Application, Presentation, Session

**Question 3
> [!question]- Which two OSI model layers have the same functionality as two layers of the TCP/IP model?
> Transport, Network

**Question 4**
> [!question]- Match the TCP/IP model layer to the function: Application, Transport, Internet, Network access
> 1. determines the best path to forward data through the network.
> 2. controls hardware devices and media that make up the network.
> 3. represents data to the user, data encoding, and dialog control.
> 4. supports communication between diverse devices across networks.

**Question 5**
> [!question]- Which statement defines a data communications protocol? 
> a set of rules that govern the communication process

**Question 6**
> [!question]- Which data encoding technology is used in fiber-optic cables?
> pulses of light

**Question 7**
> [!question]- Which type of network cable is commonly used in backbone networks and telephone companies?
> fiber-optic cable

**Question 8**
> [!question]- What is one advantage of using fiber optic cabling rather than copper cabling?
> It is able to carry signals much farther than copper cabling.

**Question 9**
> [!question]- Which two applications are suitable for deploying coaxial cables?
> 1. to connect a TV set to the wall plug at home
> 2. to connect various components in a satellite communication system

**Question 10**
> [!question]- Which type of address does a switch use to build the MAC address table?
> source MAC address

**Question 11**
> [!question]- Which term refers to the process of placing one message format inside another message format?
> encapsulation

**Question 12**
> [!question]- How much data can be encapsulated into a normal sized Ethernet frame before it is sent over the network?
> 46 to 1500 bytes



